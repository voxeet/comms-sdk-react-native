package io.dolby.sdk.comms.reactnative.mapper

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.voxeet.android.media.capture.audio.AudioCaptureMode
import com.voxeet.android.media.capture.audio.Mode
import com.voxeet.android.media.capture.audio.noise.NoiseReduction
import com.voxeet.android.media.capture.audio.noise.StandardNoiseReduction
import com.voxeet.android.media.utils.ComfortNoiseLevel

/**
 * Provides methods that map media-related models to React Native models and vice versa
 */
class AudioMapper {

  fun fromRN(comfortNoiseLevelRN: String) = when (comfortNoiseLevelRN) {
    "default" -> ComfortNoiseLevel.DEFAULT
    "medium" -> ComfortNoiseLevel.MEDIUM
    "low" -> ComfortNoiseLevel.LOW
    "off" -> ComfortNoiseLevel.OFF
    else -> null
  }

  fun toRN(comfortNoiseLevel: ComfortNoiseLevel) = when (comfortNoiseLevel) {
    ComfortNoiseLevel.DEFAULT -> "default"
    ComfortNoiseLevel.MEDIUM -> "medium"
    ComfortNoiseLevel.LOW -> "low"
    ComfortNoiseLevel.OFF -> "off"
  }

  fun audioCaptureFromRN(audioCaptureRN: ReadableMap): AudioCaptureMode =
    when (modeFromRN(audioCaptureRN.getString(MODE))) {
      Mode.STANDARD -> AudioCaptureMode.standard(noiseReductionFromRN(audioCaptureRN.getString(NOISE_REDUCTION)))
      Mode.UNPROCESSED -> AudioCaptureMode.unprocessed()
    }

  fun audioCaptureToRN(audioCaptureMode: AudioCaptureMode) = Arguments.createMap().apply {
    putString(MODE, audioCaptureMode.mode.toRN())
    audioCaptureMode.noiseReduction?.let { putString(NOISE_REDUCTION, it.toRN()) }
  }

  private fun Mode.toRN(): String = when (this) {
    Mode.STANDARD -> "STANDARD"
    Mode.UNPROCESSED -> "UNPROCESSED"
  }

  private fun NoiseReduction.toRN(): String = when (this) {
    NoiseReduction.HIGH -> "HIGH"
    else -> "LOW"
  }

  private fun modeFromRN(mode: String?) = when (mode) {
    "UNPROCESSED" -> Mode.UNPROCESSED
    else -> Mode.STANDARD
  }

  private fun noiseReductionFromRN(noiseReduction: String?) = when (noiseReduction) {
    "HIGH" -> StandardNoiseReduction.HIGH
    else -> StandardNoiseReduction.LOW
  }

  companion object {
    private const val MODE = "mode"
    private const val NOISE_REDUCTION = "noiseReduction"
  }
}
