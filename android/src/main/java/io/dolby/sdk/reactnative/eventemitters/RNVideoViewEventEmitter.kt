package io.dolby.sdk.reactnative.eventemitters

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext

/**
 * The VideoViewManager event emitter
 * @param reactContext react application context for sending event
 */
class RNVideoViewEventEmitter(
  reactContext: ReactApplicationContext,
) : RNEventEmitter(reactContext) {

  /**
   * Command Callback event.
   * Called as a result of command invocation in VideoViewManager
   */
  fun onCommandCallback(requestId: Int, result: Boolean) {
    Arguments.createMap()
      .apply {
        putInt(KEY_REQUEST_ID, requestId)
        putBoolean(KEY_RESULT, result)
      }
      .also { send(VideoViewEvent.CommandCallback.withData(it)) }
  }

  /**
   * Video View events
   */
  private object VideoViewEvent {
    object CommandCallback : RNEvent("EVENT_VIDEOVIEW_COMMAND_CALLBACK")
  }

  companion object {
    private const val KEY_RESULT = "result"
    private const val KEY_REQUEST_ID = "requestId"
  }
}
