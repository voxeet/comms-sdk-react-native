package io.dolby.sdk.reactnative.mapper

import android.net.Uri
import android.provider.OpenableColumns.DISPLAY_NAME
import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.voxeet.sdk.models.Participant
import com.voxeet.sdk.models.v1.FilePresentationConverted
import com.voxeet.sdk.services.presentation.file.FilePresentation
import io.dolby.sdk.reactnative.utils.RnCollections.getOptionalDouble
import java.io.File
import java.io.FileOutputStream

/**
 * Provides methods that:
 * - create [File] from supplied url from React Native
 * - map [FilePresentation] model to React Native models and vice versa
 */
class FilePresentationMapper(
  private val reactContext: ReactApplicationContext,
  private val participantMapper: ParticipantMapper
) {

  fun fileFromRN(fileRN: ReadableMap): File {
    val uri = Uri.parse(fileRN.getString(FILE_URL)) ?: throw IllegalArgumentException("Invalid url")
    if (uri.scheme?.contains("http") == true) throw IllegalArgumentException("Unsupported url scheme")
    return createFile(uri)
  }

  fun toRN(
    owner: Participant,
    filePresentation: FilePresentation
  ): ReadableMap = Arguments.createMap().apply {
    putString(FILE_ID, filePresentation.key)
    putInt(FILE_IMAGE_COUNT, filePresentation.nbPage)
    putInt(PRESENTATION_POSITION, filePresentation.page)
    putMap(PRESENTATION_OWNER, participantMapper.toRN(owner))
  }

  fun toRNFileConverted(
    ownerId: String,
    fileName: String,
    filePresentation: FilePresentation
  ): ReadableMap = Arguments.createMap().apply {
    putString(FILE_ID, filePresentation.key)
    putString(FILE_NAME, fileName)
    putString(FILE_OWNER_ID, ownerId)
    putString(FILE_URL, filePresentation.url)
    putInt(FILE_IMAGE_COUNT, filePresentation.nbPage)
    putDouble(FILE_SIZE, 0.0)
  }

  fun fileConvertedFromRN(
    fileConvertedRN: ReadableMap
  ): FilePresentationConverted = FilePresentationConverted().apply {
    fileId = fileConvertedRN.getString(FILE_ID)
    name = fileConvertedRN.getString(FILE_NAME)
    nbImageConverted = fileConvertedRN.getInt(FILE_IMAGE_COUNT)
    size = fileConvertedRN.getOptionalDouble(FILE_SIZE)?.toLong() ?: 0
  }

  private fun createFile(uri: Uri): File {
    val fileName = getFileName(uri)
    val (name, extension) = fileName?.let(::splitFileName)
      ?: throw IllegalArgumentException("Unable to get file name")

    val tempFile = File.createTempFile(name, extension).rename(fileName)
    reactContext.contentResolver.openInputStream(uri)
      ?.use { input -> FileOutputStream(tempFile).use(input::copyTo) }
    return tempFile
  }

  private fun getFileName(uri: Uri): String? {
    return if (uri.scheme == "content") {
      reactContext.contentResolver.query(uri, null, null, null, null)
        ?.use { cursor ->
          if (cursor.moveToFirst()) cursor.getString(cursor.getColumnIndex(DISPLAY_NAME)) else null
        }
    } else {
      val path = uri.path
      path?.lastIndexOf(File.separator)
        ?.takeIf { it != -1 }
        ?.let { path.substring(it + 1) }
    }
  }

  private fun splitFileName(name: String) =
    name.lastIndexOf(".")
      .takeIf { it != -1 }
      ?.let { name.substring(0, it) to name.substring(it) }

  private fun File.rename(newName: String): File {
    val newFile = File(parent, newName)
    if (newFile != this) {
      if (newFile.exists() && newFile.delete()) {
        Log.d("FilePresentationMapper", "Delete old $newName file")
      }
      if (renameTo(newFile)) {
        Log.d("FilePresentationMapper", "Rename file to $newName")
      }
    }
    return newFile
  }

  companion object {
    private const val FILE_URL = "url"
    private const val FILE_ID = "id"
    private const val FILE_NAME = "name"
    private const val FILE_SIZE = "size"
    private const val FILE_OWNER_ID = "ownerId"
    private const val FILE_IMAGE_COUNT = "imageCount"
    private const val PRESENTATION_OWNER = "owner"
    private const val PRESENTATION_POSITION = "position"
  }
}
