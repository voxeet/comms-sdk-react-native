package io.dolby.sdk.reactnative.eventemitters

import com.facebook.react.bridge.ReactApplicationContext

/**
 * The sdk event emitter
 * @param reactContext react application context for sending event
 */
class RNSdkEventEmitter(
  reactContext: ReactApplicationContext,
) : RNEventEmitter(reactContext) {

  /**
   * Refresh token needed event.
   * Called when there is need to refresh token.
   */
  fun onTokenRefreshNeeded() {
    send(SdkEvent.TokenRefresh)
  }

  /**
   * SDK events
   */
  private object SdkEvent {
    object TokenRefresh : RNEvent("EVENT_SDK_TOKEN_REFRESH")
  }
}
