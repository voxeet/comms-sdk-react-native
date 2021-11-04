package io.dolby.sdk.reactnative.utils

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap

object RnCollections {

  fun ReadableMap.getOptionalInt(key: String): Int? =
    if (hasKey(key)) getInt(key) else null

  fun ReadableMap.getOptionalBoolean(key: String): Boolean? =
    if (hasKey(key)) getBoolean(key) else null

  fun ReadableMap.getOptionalDouble(key: String): Double? =
    if (hasKey(key)) getDouble(key) else null

  fun ReadableMap.copy(): ReadableMap =
    Arguments.createMap().apply { merge(this@copy) }
}
