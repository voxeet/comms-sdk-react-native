package io.dolby.sdk.reactnative.eventemitters

import com.facebook.react.bridge.WritableMap

open class RNEvent(val name: String) {
  var data: WritableMap? = null
    private set

  fun withData(data: WritableMap) = apply { this.data = data }
}
