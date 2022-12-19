package io.dolby.sdk.comms.reactnative.eventemitters

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.voxeet.sdk.json.RecordingStatusUpdatedEvent
import org.greenrobot.eventbus.Subscribe
import org.greenrobot.eventbus.ThreadMode

/**
 * The recording event emitter
 * @param reactContext react application context for sending event
 */
class RNRecordingEventEmitter(
  reactContext: ReactApplicationContext,
) : RNEventEmitter(reactContext) {

  /**
   * Emitted when the recording status is updated.
   */
  @Subscribe(threadMode = ThreadMode.MAIN)
  fun on(event: RecordingStatusUpdatedEvent) {

    Arguments.createMap()
      .apply {
        putString(KEY_RECORDING_STATUS, event.recordingStatus)
        putString(KEY_CONFERENCE_ID, event.conferenceId)
        putString(KEY_PARTICIPANT_ID, event.participantId)
        putDouble(KEY_TIME_STAMP, event.timeStamp.toDouble())
      }
      .also { send(RecordingEvent.RecordingStatusUpdated.withData(it)) }

  }

  /**
   * Recording events
   */
  private object RecordingEvent {
    object RecordingStatusUpdated : RNEvent("EVENT_RECORDING_STATUS_UPDATED")
  }

  /**
   * The event payload keys
   */
  companion object {
    private const val KEY_RECORDING_STATUS = "recordingStatus"
    private const val KEY_CONFERENCE_ID = "conferenceId"
    private const val KEY_PARTICIPANT_ID = "participantId"
    private const val KEY_TIME_STAMP = "timeStamp"
  }
}
