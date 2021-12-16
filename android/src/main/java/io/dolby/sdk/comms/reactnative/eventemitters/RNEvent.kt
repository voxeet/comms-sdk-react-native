package io.dolby.sdk.comms.reactnative.eventemitters

import com.facebook.react.bridge.ReadableMap

open class RNEvent(val name: String) {
  var data: ReadableMap? = null
    private set

  fun withData(data: ReadableMap) = apply { this.data = data }
}
