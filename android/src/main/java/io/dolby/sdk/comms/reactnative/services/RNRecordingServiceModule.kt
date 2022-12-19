package io.dolby.sdk.comms.reactnative.services

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.voxeet.sdk.services.ConferenceService
import com.voxeet.sdk.services.RecordingService
import io.dolby.sdk.comms.reactnative.eventemitters.RNRecordingEventEmitter
import io.dolby.sdk.comms.reactnative.mapper.RecordingMapper
import io.dolby.sdk.comms.reactnative.utils.Promises
import io.dolby.sdk.comms.reactnative.utils.Promises.forward
import io.dolby.sdk.comms.reactnative.utils.Promises.rejectIfFalse
import io.dolby.sdk.comms.reactnative.utils.Promises.rejectIfNull
import io.dolby.sdk.comms.reactnative.utils.Promises.thenValue
import io.dolby.sdk.comms.reactnative.utils.ReactPromise

/**
 * The RNRecordingServiceModule allows an application to record conferences by using the [start] and [stop] methods that turn the recording on and off.
 *
 * @constructor
 * Creates a bridge wrapper for [RecordingService].
 *
 * @param conferenceService [ConferenceService] form Android SDK
 * @param recordingService  [RecordingService] from Android SDK
 * @param reactContext      react context
 */
class RNRecordingServiceModule(
  private val conferenceService: ConferenceService,
  private val recordingService: RecordingService,
  reactContext: ReactApplicationContext,
  eventEmitter: RNRecordingEventEmitter,
  private val recordingMapper: RecordingMapper
) : RNEventEmitterModule(reactContext, eventEmitter) {

  override fun getName(): String = "CommsAPIRecordingServiceModule"

  /**
   * Starts recording a conference.
   *
   * @param promise returns null
   */
  @ReactMethod
  fun start(promise: ReactPromise) {
    recordingService.start()
      .rejectIfFalse { "Start recording operation failed" }
      .forward(promise)
  }

  /**
   * Stops recording a conference.
   *
   * @param promise returns null
   */
  @ReactMethod
  fun stop(promise: ReactPromise) {
    recordingService.stop()
      .rejectIfFalse { "Stop recording operation failed" }
      .forward(promise)
  }

  /**
   * Returns information about the current recording. Use this accessor if you wish to receive information that is available in the Recording object,
   * such as the ID of the participant who started the recording or the timestamp that informs when the recording was started.
   *
   * @param promise return current recording information if recording is started, rejects otherwise
   */
  @ReactMethod
  fun current(promise: ReactPromise) {
    Promises.promise(conferenceService.conference?.recordingInformation) { "Can't get current recording information" }
      .thenValue(recordingMapper::toRN)
      .rejectIfNull()
      .forward(promise)
  }

  /**
   * Every emitter module must implement this method in place, otherwise JS cannot receive event
   */
  @ReactMethod
  override fun addListener(eventName: String) = super.addListener(eventName)


  /**
   * Every emitter module must implement this method in place, otherwise JS cannot receive event
   */
  @ReactMethod
  override fun removeListeners(count: Int) = super.removeListeners(count)

}
