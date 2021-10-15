package io.dolby.sdk.reactnative.mapper

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableNativeMap
import com.voxeet.sdk.models.Conference.RecordingInformation

/**
 * Provides methods that map:
 * <p>- [RecordingInformation] to React Native models</p>
 */
class RecordingMapper {

  companion object {
    private const val PARTICIPANT_ID = "participantId"
    private const val RECORDING_START_TIMESTAMP = "startTimestamp"
  }

  fun encode(recordingInformation: RecordingInformation): ReadableMap? = with(recordingInformation) {
    return if (recordingParticipant != null && startRecordTimestamp != null) {
      WritableNativeMap().apply {
        putString(PARTICIPANT_ID, recordingParticipant)
        putDouble(RECORDING_START_TIMESTAMP, startRecordTimestamp.time.toDouble())
      }
    } else null
  }
}
