package io.dolby.sdk.reactnative.mapper

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.voxeet.sdk.models.Participant
import com.voxeet.sdk.services.presentation.video.VideoPresentation

/**
 * Provides methods that map [VideoPresentation] to React Native model
 */
class VideoPresentationMapper(
  private val participantMapper: ParticipantMapper
) {

  // TODO tmp solution to make pause, play, seek work (test app uses `current` in those methods).
  //  Replace `1.0` by the real timestamp (as lastSeekTimestamp isn't 0 only for seek) in DEXA-236.
  fun toRN(videoPresentation: VideoPresentation, participant: Participant): ReadableMap? = with(videoPresentation) {
    Arguments.createMap().apply {
      putMap(OWNER, participantMapper.toRN(participant))
      putString(URL, url)
      putDouble(TIMESTAMP, 1.0)
    }
  }

  companion object {
    private const val OWNER = "owner"
    private const val URL = "url"
    private const val TIMESTAMP = "timestamp"
  }
}
