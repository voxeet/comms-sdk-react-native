package io.dolby.sdk.reactnative.mapper

import com.voxeet.android.media.MediaEngine

/**
 * Provides methods that map media-related models to React Native models and vice versa
 */
class MediaMapper {

  fun fromRN(comfortNoiseLevelRN: String) = when (comfortNoiseLevelRN) {
    "default" -> MediaEngine.ComfortNoiseLevel.DEFAULT
    "medium" -> MediaEngine.ComfortNoiseLevel.MEDIUM
    "low" -> MediaEngine.ComfortNoiseLevel.LOW
    "off" -> MediaEngine.ComfortNoiseLevel.OFF
    else -> null
  }

  fun toRN(comfortNoiseLevel: MediaEngine.ComfortNoiseLevel) = when (comfortNoiseLevel) {
    MediaEngine.ComfortNoiseLevel.DEFAULT -> "default"
    MediaEngine.ComfortNoiseLevel.MEDIUM -> "medium"
    MediaEngine.ComfortNoiseLevel.LOW -> "low"
    MediaEngine.ComfortNoiseLevel.OFF -> "off"
  }
}
