package io.dolby.sdk.comms.reactnative.services.audio

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.voxeet.sdk.services.AudioService
import com.voxeet.sdk.services.MediaDeviceService
import com.voxeet.sdk.services.audio.LocalAudio
import io.dolby.sdk.comms.reactnative.eventemitters.RNAudioPreviewEventEmitter
import io.dolby.sdk.comms.reactnative.mapper.AudioMapper
import io.dolby.sdk.comms.reactnative.services.RNEventEmitterModule
import io.dolby.sdk.comms.reactnative.utils.Promises
import io.dolby.sdk.comms.reactnative.utils.Promises.forward
import io.dolby.sdk.comms.reactnative.utils.Promises.thenValue
import io.dolby.sdk.comms.reactnative.utils.ReactPromise

/**
 * The [RNAudioPreviewModule] allows recording and playing audio sample to test audio before joinning conference
 * checking the capture mode and comfort noise level.
 *
 * @constructor
 * Creates a bridge wrapper for [com.voxeet.sdk.services.audio.AudioPreview] model.
 *
 * @param reactContext          react context
 * @param localAudio          [LocalAudio] from Android SDK
 * @param audioMapper           mapper for a audio related models
 */
class RNAudioPreviewModule(
  reactContext: ReactApplicationContext,
  eventEmitter: RNAudioPreviewEventEmitter,
  private val localAudio: LocalAudio,
  private val audioMapper: AudioMapper
) : RNEventEmitterModule(reactContext, eventEmitter) {
  override fun getName() = "CommsAPIAudioPreviewModule"

  /**
   * Returns the audio preview status.
   *
   * @param promise returns preview status
   */
  @ReactMethod
  fun status(promise: ReactPromise) {
    Promises.promise(localAudio.preview().status.name)
      .forward(promise)
  }

  /**
   * Returns the local participant's audio capture mode from audio preview.
   *
   * @param promise  returns capture mode
   */
  @ReactMethod
  fun getCaptureMode(promise: ReactPromise) {
    Promises.promise(localAudio.preview().captureMode) { "Could not get capture mode" }
      .thenValue(audioMapper::audioCaptureToRN)
      .forward(promise)
  }

  /**
   * Sets the local participant's audio capture mode in audio preview.
   *
   * @param promise     returns null
   */
  @ReactMethod
  fun setCaptureMode(captureMode: ReadableMap, promise: ReactPromise) {
    Promises.promise({ audioMapper.audioCaptureFromRN(captureMode) }) { "Invalid capture mode" }
      .thenValue { cm ->
        localAudio.preview().captureMode = cm
      }
      .forward(promise, ignoreReturnType = true)
  }

  /**
   * Starts recording an audio sample if no recording is in progress. This method requires the Android AudioRecord permission.
   * Calling this method without the permission granted results in the promise to reject the call.
   * @param The preferred recording duration that ranges from 0 to 5, in seconds.
   * @param promise returns null
   */
  @ReactMethod
  fun record(duration: Int?, promise: ReactPromise) {
    Promises.promise({ duration }) { "Invalid params: duration is required" }
      .thenValue { d ->
        localAudio.preview().record(d)
      }
      .forward(promise, ignoreReturnType = true)
  }

  /**
   * Plays back the recorded audio sample. To test how your audio sounds while using different capture modes and voice fonts,
   * set the setCaptureMode method to a preferred setting before using the method.
   * @param loop A boolean that indicates whether the SDK should play the recorded audio in a loop.
   * @param promise returns null
   */
  @ReactMethod
  fun play(loop: Boolean, promise: ReactPromise) {
    localAudio.preview().play(loop)
      .forward(promise, ignoreReturnType = true)
  }

  /**
   * Stops recording or playing an audio sample.
   * @param promise returns Boolean.
   */
  @ReactMethod
  fun stop(promise: ReactPromise) {
    Promises.promise({ localAudio.preview().stop() })
      .forward(promise)
  }

  /**
   * Release the internal memory and restart the audio session configuration.
   * @param promise returns null
   */
  @ReactMethod
  fun release(promise: ReactPromise) {
    Promises.promise({ localAudio.preview().release() })
      .forward(promise, ignoreReturnType = true)
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
