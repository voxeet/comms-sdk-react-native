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
   * The supported events for JS
   */
  override val eventMap: Map<String, String>
    get() = mapOf(
      "EVENT_SDK_TOKEN_REFRESH" to EVENT_TOKEN_REFRESH
    )

  fun onTokenRefreshNeeded() {
    send(EVENT_TOKEN_REFRESH, null)
  }

  /**
   * The event names and payload keys, make sure they are unique in the application scope
   */
  companion object {
    private const val EVENT_TOKEN_REFRESH = "TokenRefresh"
  }
}
