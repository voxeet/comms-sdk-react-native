package io.dolby.sdk.comms.reactnative.services.audio

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.voxeet.sdk.services.audio.LocalAudio
import io.dolby.sdk.comms.reactnative.eventemitters.RNAudioPreviewEventEmitter
import io.dolby.sdk.comms.reactnative.mapper.AudioMapper
import io.dolby.sdk.comms.reactnative.services.RNEventEmitterModule
import io.dolby.sdk.comms.reactnative.utils.Promises
import io.dolby.sdk.comms.reactnative.utils.Promises.forward
import io.dolby.sdk.comms.reactnative.utils.Promises.thenValue
import io.dolby.sdk.comms.reactnative.utils.ReactPromise

class RNAudioPreviewModule(
  reactContext: ReactApplicationContext,
  eventEmitter: RNAudioPreviewEventEmitter,
  private val localAudio: LocalAudio,
  private val audioMapper: AudioMapper
) : RNEventEmitterModule(reactContext, eventEmitter) {
  override fun getName() = "CommsAPIAudioPreviewModule"

  @ReactMethod
  fun status(promise: ReactPromise) {
    Promises.promise(localAudio.preview().status.name)
      .forward(promise)
  }

  @ReactMethod
  fun getCaptureMode(promise: ReactPromise) {
    Promises.promise(localAudio.preview().captureMode) { "Could not get capture mode" }
      .thenValue(audioMapper::audioCaptureToRN)
      .forward(promise)
  }

  @ReactMethod
  fun setCaptureMode(captureMode: ReadableMap, promise: ReactPromise) {
    Promises.promise({ audioMapper.audioCaptureFromRN(captureMode) }) { "Invalid capture mode" }
      .thenValue { cm ->
        localAudio.preview().captureMode = cm
      }
      .forward(promise, ignoreReturnType = true)
  }

  @ReactMethod
  fun record(duration: Int?, promise: ReactPromise) {
    Promises.promise({ duration }) { "Invalid params: duration is required" }
      .thenValue { d ->
        localAudio.preview().record(d)
      }
      .forward(promise)
  }

  @ReactMethod
  fun play(loop: Boolean, promise: ReactPromise) {
    localAudio.preview().play(loop)
      .forward(promise)
  }

  @ReactMethod
  fun cancel(promise: ReactPromise) {
    Promises.promise({ localAudio.preview().cancel() })
      .forward(promise)
  }

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
