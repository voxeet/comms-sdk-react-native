package io.dolby.sdk.reactnative.eventemitters

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.voxeet.VoxeetSDK

/**
 * An abstract class that handles native event and forward it to JS
 * @param context The react application context which will be used for sending event to JS
 */
abstract class RNEventEmitter(
  private var context: ReactApplicationContext
) {

  /**
   * Default implementation of emitting event, nothing will be sent if no listener is registered
   * @param eventRN
   */
  fun send(eventRN: RNEvent) =
    context
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      ?.emit(eventRN.name, eventRN.data)

  /**
   * Register the event emitter for native events
   */
  fun registerNativeEventBus() {
    VoxeetSDK.instance().register(this)
  }

  /**
   * Unregister the event emitter, and it won't receive any native events
   */
  fun unregisterNativeEventBus() {
    VoxeetSDK.instance().unregister(this)
  }
}
