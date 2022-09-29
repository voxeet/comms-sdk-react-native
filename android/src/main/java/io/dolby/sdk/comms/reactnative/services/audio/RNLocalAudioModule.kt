package io.dolby.sdk.comms.reactnative.services.audio

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.voxeet.sdk.models.ParticipantPermissions
import com.voxeet.sdk.services.AudioService
import com.voxeet.sdk.services.MediaDeviceService
import com.voxeet.sdk.services.audio.LocalAudio
import io.dolby.sdk.comms.reactnative.eventemitters.RNCommandEventEmitter
import io.dolby.sdk.comms.reactnative.mapper.AudioMapper
import io.dolby.sdk.comms.reactnative.services.RNEventEmitterModule
import io.dolby.sdk.comms.reactnative.utils.Promises
import io.dolby.sdk.comms.reactnative.utils.Promises.forward
import io.dolby.sdk.comms.reactnative.utils.Promises.rejectIfFalse
import io.dolby.sdk.comms.reactnative.utils.Promises.thenValue
import io.dolby.sdk.comms.reactnative.utils.ReactPromise

/**
 * The [RNLocalAudioModule] allows enabling and disabling the local participant's audio as well as setting and
 * checking the capture mode and comfort noise level.
 *
 * @constructor
 * Creates a bridge wrapper for [LocalAudio] model.
 *
 * @param reactContext          react context
 * @param audioService          [AudioService] from Android SDK
 * @param mediaDeviceService    [MediaDeviceService] from Android SDK
 * @param audioMapper           mapper for a audio related models
 */
class RNLocalAudioModule(
  reactContext: ReactApplicationContext,
  private val audioService: AudioService,
  private val mediaDeviceService: MediaDeviceService,
  private val audioMapper: AudioMapper
) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "CommsAPILocalAudioModule"

  /**
   * Returns the local participant's audio capture mode in Dolby Voice conferences.
   *
   * @param promise     returns capture mode
   */
  @ReactMethod
  fun getCaptureMode(promise: ReactPromise) {
    Promises.promise(audioService.local.captureMode) { "Could not get capture mode" }
      .thenValue(audioMapper::audioCaptureToRN)
      .forward(promise)
  }

  /**
   * Sets the local participant's audio capture mode in Dolby Voice conferences.
   *
   * @param promise     returns null
   */
  @ReactMethod
  fun setCaptureMode(captureMode: ReadableMap, promise: ReactPromise) {
    Promises.promise({ audioMapper.audioCaptureFromRN(captureMode) }) { "Invalid capture mode" }
      .thenValue(audioService.local::setCaptureMode)
      .forward(promise, ignoreReturnType = true)
  }

  /**
   * The ComfortNoiseLevel model represents the possible comfort noise levels in Dolby Voice conferences.
   * The offered levels allow customizing the comfort noise intensity.
   * You can either use the default level that is based on the device database or choose the medium or low level if you wish to change the comfort noise intensity.
   * The model also allows disabling the comfort noise completely.
   * To find out currently used noise level call [getComfortNoiseLevel]
   *
   * @param comfortNoiseLevelRN   a comfort noise level
   * @param promise               returns null
   */
  @ReactMethod
  fun setComfortNoiseLevel(comfortNoiseLevelRN: String, promise: ReactPromise) {
    // TODO Use AudioService.local.setComfortNoiseLevel when added in future SDK versions
    Promises.promise({ audioMapper.fromRN(comfortNoiseLevelRN) }) { "Invalid comfort noise level" }
      .thenValue(mediaDeviceService::setComfortNoiseLevel)
      .forward(promise, ignoreReturnType = true)
  }

  /**
   * Returns comfort noise level set with [setComfortNoiseLevel]
   *
   * @param promise      returns comfort noise level
   */
  @ReactMethod
  fun getComfortNoiseLevel(promise: ReactPromise) {
    // TODO Use AudioService.local.getComfortNoiseLevel when added in future SDK versions
    Promises.promise({ mediaDeviceService.comfortNoiseLevel }) { "Could not get comfort noise level" }
      .then(audioMapper::toRN)
      .forward(promise)
  }

  /**
   * Enables the local participant's audio and sends the audio to a conference.
   * This method is not available for listeners and triggers the UnsupportedError.
   *
   * @param promise returns null
   */
  @ReactMethod
  fun start(promise: ReactPromise) {
    audioService.local.start()
      .rejectIfFalse { "Start audio operation failed" }
      .forward(promise)
  }

  /**
   * Disables the local participant's audio and stops sending the audio to a conference.
   * This method is not available for listeners and triggers the UnsupportedError.
   * The stop method requires a few seconds to become effective.
   *
   * @param promise returns null
   */
  @ReactMethod
  fun stop(promise: ReactPromise) {
    audioService.local.stop()
      .rejectIfFalse { "Stop audio operation failed" }
      .forward(promise)
  }

}
