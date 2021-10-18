package io.dolby.sdk.reactnative.utils

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

/**
 * Abstract class of a module which could emit event to JS
 */
abstract class RNEventEmitterModule(reactContext: ReactApplicationContext?) :
  ReactContextBaseJavaModule(reactContext),
  RNEventEmitter {

  override var listenerCount: Int = 0
}
