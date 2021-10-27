package io.dolby.sdk.reactnative.services

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import io.dolby.sdk.reactnative.eventemitters.RNEventEmitter
import kotlin.math.max

/**
 * Abstract class of a module which could emit event to JS
 * @see [Sending Events to JavaScript](https://reactnative.dev/docs/native-modules-android#sending-events-to-javascript)
 * @param reactContext the react application context
 * @param eventEmitter the event emitter which will send events to JS
 */
abstract class RNEventEmitterModule(
  private val reactContext: ReactApplicationContext,
  private val eventEmitter: RNEventEmitter
) : ReactContextBaseJavaModule(reactContext) {

  /**
   * Current listeners count
   */
  private var listenerCount: Int = 0

  /**
   * Check if we have registered listener
   */
  private fun hasListener(): Boolean = listenerCount > 0

  /**
   * Every emitter module must implement this method in place, and add @ReactMethod annotation
   * otherwise JS cannot receive event
   */
  open fun addListener(eventName: String) {
    if (listenerCount == 0) {
      eventEmitter.registerNativeEventBus()
    }
    listenerCount += 1
  }

  /**
   * Every emitter module must implement this method in place, and add @ReactMethod annotation
   * otherwise JS cannot receive event
   */
  open fun removeListeners(count: Int) {
    if (hasListener() && listenerCount <= count) {
      eventEmitter.unregisterNativeEventBus()
    }
    listenerCount = max(listenerCount - count, 0)
  }
}
