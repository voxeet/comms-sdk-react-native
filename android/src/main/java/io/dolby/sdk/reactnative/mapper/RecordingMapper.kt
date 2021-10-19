package io.dolby.sdk.reactnative.mapper

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.voxeet.sdk.models.Conference.RecordingInformation

/**
 * Provides methods that map [RecordingInformation] to React Native models
 */
class RecordingMapper {

  fun toRN(recordingInformation: RecordingInformation): ReadableMap? = with(recordingInformation) {
    return if (recordingParticipant != null && startRecordTimestamp != null) {
      Arguments.createMap().apply {
        putString(PARTICIPANT_ID, recordingParticipant)
        putDouble(RECORDING_START_TIMESTAMP, startRecordTimestamp.time.toDouble())
      }
    } else null
  }

  companion object {
    private const val PARTICIPANT_ID = "participantId"
    private const val RECORDING_START_TIMESTAMP = "startTimestamp"
  }
}
