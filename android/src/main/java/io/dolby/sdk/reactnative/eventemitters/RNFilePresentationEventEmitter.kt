package io.dolby.sdk.reactnative.eventemitters

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.voxeet.sdk.json.FilePresentationStarted
import com.voxeet.sdk.json.FilePresentationStopped
import com.voxeet.sdk.json.FilePresentationUpdated
import com.voxeet.sdk.models.Participant
import com.voxeet.sdk.services.ConferenceService
import com.voxeet.sdk.services.presentation.file.FilePresentation
import io.dolby.sdk.reactnative.eventemitters.RNFilePresentationEventEmitter.FilePresentationEvent.PresentationStarted
import io.dolby.sdk.reactnative.eventemitters.RNFilePresentationEventEmitter.FilePresentationEvent.PresentationStopped
import io.dolby.sdk.reactnative.eventemitters.RNFilePresentationEventEmitter.FilePresentationEvent.PresentationUpdated
import io.dolby.sdk.reactnative.mapper.FilePresentationMapper
import io.dolby.sdk.reactnative.state.FilePresentationHolder
import org.greenrobot.eventbus.Subscribe

/**
 * The file presentation event emitter
 * @param reactContext react application context for sending event
 * @param conferenceService [ConferenceService] from Android SDK
 * @param filePresentationHolder started file presentation data store
 * @param filePresentationMapper mapper for [FilePresentation] model
 */
class RNFilePresentationEventEmitter(
  reactContext: ReactApplicationContext,
  private val conferenceService: ConferenceService,
  private val filePresentationHolder: FilePresentationHolder,
  private val filePresentationMapper: FilePresentationMapper
) : RNEventEmitter(reactContext) {

  /**
   * Emitted when the presenter started the file presentation.
   */
  @Subscribe
  fun on(event: FilePresentationStarted) {
    val presentation = FilePresentation(event.fileId, "").apply {
      nbPage = event.imageCount
      page = event.position
    }

    filePresentationHolder.onStarted(
      conferenceId = event.conferenceId,
      ownerId = event.userId,
      presentation = presentation
    )

    getOwner(event.conferenceId, event.userId)
      ?.let { sendFilePresentationChanged(PresentationStarted, it, presentation) }
  }

  /**
   * Emitted when the presenter ended the file presentation.
   */
  @Subscribe
  fun on(event: FilePresentationStopped) {
    val presentation = filePresentationHolder.onStopped(event.conferenceId) ?: return

    getOwner(event.conferenceId, event.userId)
      ?.let { sendFilePresentationChanged(PresentationStopped, it, presentation) }
  }

  /**
   * Emitted when the presenter changed the displayed page of the shared file.
   * The event includes updated [FilePresentation] information.
   */
  @Subscribe
  fun on(event: FilePresentationUpdated) {
    val presentation = filePresentationHolder.onSeek(event.conferenceId, event.position) ?: return

    getOwner(event.conferenceId, event.userId)
      ?.let { sendFilePresentationChanged(PresentationUpdated, it, presentation) }
  }

  /**
   * Emitted when the file is converted.
   */
  fun onFileConverted(data: ReadableMap) {
    Arguments.createMap()
      .apply { putMap(KEY_FILE_CONVERTED, data) }
      .also { send(FilePresentationEvent.FileConverted.withData(it)) }
  }

  private fun sendFilePresentationChanged(event: RNEvent, owner: Participant, presentation: FilePresentation) {
    val filePresentationRN = filePresentationMapper.toRN(owner, presentation)
    Arguments.createMap()
      .apply { putMap(KEY_FILE_PRESENTATION, filePresentationRN) }
      .also { send(event.withData(it)) }
  }

  private fun getOwner(conferenceId: String, participantId: String) = conferenceService
    .getConference(conferenceId)
    .findParticipantById(participantId)

  /**
   * File presentation events
   */
  private object FilePresentationEvent {
    object FileConverted : RNEvent("EVENT_FILEPRESENTATION_FILE_CONVERTED")
    object PresentationStarted : RNEvent("EVENT_FILEPRESENTATION_STARTED")
    object PresentationStopped : RNEvent("EVENT_FILEPRESENTATION_STOPPED")
    object PresentationUpdated : RNEvent("EVENT_FILEPRESENTATION_UPDATED")
  }

  /**
   * The event payload keys
   */
  companion object {
    private const val KEY_FILE_CONVERTED = "fileConverted"
    private const val KEY_FILE_PRESENTATION = "filePresentation"
  }

}
