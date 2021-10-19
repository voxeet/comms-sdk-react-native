package io.dolby.sdk.reactnative.eventemitters

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.voxeet.VoxeetSDK

/**
 * A component that handles native event and forward it to JS must implement this interface
 */
interface RNEventEmitter {

  /**
   * The react application context which will be used for sending event to JS
   */
  var context: ReactApplicationContext?

  /**
   * The supported events map
   *  key: event constants for JS
   *  vale: event name
   */
  val eventMap: Map<String, String>

  /**
   * Default implementation of emitting event, nothing will be sent if no listener is registered
   * @param eventName the name of the event
   * @param data the event data
   */
  fun send(eventName: String, data: WritableMap) =
    context?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)?.emit(eventName, data)

  /**
   * Register the event emitter for native events
   */
  fun register(context: ReactApplicationContext) {
    this.context = context
    VoxeetSDK.instance().register(this)
  }

  /**
   * Unregister the event emitter, and it won't receive any native events
   */
  fun unregister() {
    this.context = null
    VoxeetSDK.instance().unregister(this)
  }
}
