package io.dolby.sdk.reactnative.state

import com.voxeet.sdk.services.presentation.file.FilePresentation

class FilePresentationHolder {

  private val presentationOwners = mutableMapOf<String, String>()
  private val presentations = mutableMapOf<String, FilePresentation>()

  fun onStarted(conferenceId: String, ownerId: String, presentation: FilePresentation) {
    presentationOwners[conferenceId] = ownerId
    presentations[conferenceId] = presentation
  }

  fun onSeek(conferenceId: String, position: Int): FilePresentation? {
    return presentations[conferenceId]?.let {
      it.page = position
      it
    }
  }

  fun onStopped(conferenceId: String): FilePresentation? {
    presentationOwners.remove(conferenceId)
    return presentations.remove(conferenceId)
  }

  fun getOwnerId(conferenceId: String): String? = presentationOwners[conferenceId]

  fun getPresentation(conferenceId: String): FilePresentation? = presentations[conferenceId]

}
