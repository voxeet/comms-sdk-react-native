package io.dolby.sdk.comms.reactnative.eventemitters

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.voxeet.android.media.capture.audio.preview.RecorderStatus
import com.voxeet.sdk.models.Participant
import com.voxeet.sdk.services.AudioService
import com.voxeet.sdk.services.ConferenceService

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
  private val previewCallback: (RecorderStatus) -> Unit = { status ->
    android.util.Log.d(TAG, "onStatusChanged status: ${status.name}")
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
    audioService.local.preview().callback = previewCallback
  }

  override fun unregisterNativeEventBus() {
    isRegister = false
    audioService.local.preview().callback = null
  }

  private object NotificationEvent {
    object OnStatusChanged : RNEvent("EVENT_AUDIO_PREVIEW_STATUS_CHANGED")
  }

  companion object {
    private const val KEY_ON_STATUS_CHANGED = "status"
    private val TAG = RNAudioPreviewEventEmitter::class.java.simpleName
  }
}
