package io.dolby.sdk.comms.reactnative.eventemitters

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.voxeet.android.media.capture.audio.preview.AudioPreviewStatus
import com.voxeet.sdk.services.AudioService

/**
 * The audio preview event emitter
 * @param reactContext      react application context for sending event
 * @param audioService [AudioService] from Android SDK
 */
class RNAudioPreviewEventEmitter (
  reactContext: ReactApplicationContext,
  private val audioService: AudioService
) : RNEventEmitter(reactContext) {
  private var isRegister = false

  /**
   * Emitted when the application user received an audio preview status changed.
   */
  private val previewCallback: (AudioPreviewStatus) -> Unit = { status ->
    if (isRegister) {
      Arguments.createMap()
        .apply {
          putString(KEY_ON_STATUS_CHANGED, status.name)
        }
        .also {
          send(NotificationEvent.OnStatusChanged.withData(it))
        }
    }
  }

  override fun registerNativeEventBus() {
    isRegister = true
    audioService.local.preview().onStatusChanged = previewCallback
  }

  override fun unregisterNativeEventBus() {
    isRegister = false
    audioService.local.preview().onStatusChanged = null
  }

  private object NotificationEvent {
    object OnStatusChanged : RNEvent("EVENT_AUDIO_PREVIEW_STATUS_CHANGED")
  }

  companion object {
    private const val KEY_ON_STATUS_CHANGED = "status"
  }
}
