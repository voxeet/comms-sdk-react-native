package io.dolby.sdk.reactnative.mapper

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.voxeet.android.media.MediaEngine

/**
 * Provides methods that map media-related models to React Native models and vice versa
 */
class MediaMapper() {

  fun fromRN(rationaleMap: ReadableMap) = when (rationaleMap.getString(COMFORT_NOISE_LEVEL)) {
    "DEFAULT" -> MediaEngine.ComfortNoiseLevel.DEFAULT
    "MEDIUM" -> MediaEngine.ComfortNoiseLevel.MEDIUM
    "LOW" -> MediaEngine.ComfortNoiseLevel.LOW
    "OFF" -> MediaEngine.ComfortNoiseLevel.OFF
    else -> null
  }

  fun toRN(comfortNoiseLevel: MediaEngine.ComfortNoiseLevel): ReadableMap =
    Arguments
      .createMap()
      .apply { putString(COMFORT_NOISE_LEVEL, comfortNoiseLevel.toRnComfortNoiseLevel()) }

  private fun MediaEngine.ComfortNoiseLevel.toRnComfortNoiseLevel() = when (this) {
    MediaEngine.ComfortNoiseLevel.DEFAULT -> "DEFAULT"
    MediaEngine.ComfortNoiseLevel.MEDIUM -> "MEDIUM"
    MediaEngine.ComfortNoiseLevel.LOW -> "LOW"
    MediaEngine.ComfortNoiseLevel.OFF -> "OFF"
  }

  private companion object {
    private const val COMFORT_NOISE_LEVEL = "comfortNoiseLevel"
  }
}
