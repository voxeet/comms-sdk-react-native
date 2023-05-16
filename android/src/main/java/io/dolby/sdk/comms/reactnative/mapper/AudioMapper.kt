package io.dolby.sdk.comms.reactnative.mapper

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.voxeet.android.media.capture.audio.AudioCaptureMode
import com.voxeet.android.media.capture.audio.Mode
import com.voxeet.android.media.capture.audio.noise.NoiseReduction
import com.voxeet.android.media.capture.audio.noise.StandardNoiseReduction
import com.voxeet.android.media.utils.ComfortNoiseLevel
import com.voxeet.android.media.capture.audio.VoiceFont

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
      Mode.STANDARD -> AudioCaptureMode.standard(
        noiseReductionFromRN(audioCaptureRN.getString(NOISE_REDUCTION)), voiceFontFromRN(audioCaptureRN.getString(VOICE_FONT)))
      Mode.UNPROCESSED -> AudioCaptureMode.unprocessed()
    }

  fun audioCaptureToRN(audioCaptureMode: AudioCaptureMode) = Arguments.createMap().apply {
    putString(MODE, audioCaptureMode.mode.toRN())
    audioCaptureMode.noiseReduction?.let { putString(NOISE_REDUCTION, it.toRN()) }
    audioCaptureMode.voiceFont?.let { putString(VOICE_FONT, it.toRN()) }
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

   private fun VoiceFont.toRN(): String = when (this) {
         VoiceFont.MASCULINE -> "MASCULINE"
         VoiceFont.FEMININE -> "FEMININE"
         VoiceFont.HELIUM -> "HELIUM"
         VoiceFont.DARK_MODULATION -> "DARK_MODULATION"
         VoiceFont.BROKEN_ROBOT -> "BROKEN_ROBOT"
         VoiceFont.INTERFERENCE -> "INTERFERENCE"
         VoiceFont.ABYSS -> "ABYSS"
         VoiceFont.WOBBLE -> "WOBBLE"
         VoiceFont.STARSHIP_CAPTAIN -> "STARSHIP_CAPTAIN"
         VoiceFont.NERVOUS_ROBOT -> "NERVOUS_ROBOT"
         VoiceFont.SWARM -> "SWARM"
         VoiceFont.AM_RADIO -> "AM_RADIO"
         else -> "NONE"
     }

  private fun voiceFontFromRN(font: String?): VoiceFont = when (font) {
    "MASCULINE" -> VoiceFont.MASCULINE
    "FEMININE" -> VoiceFont.FEMININE
    "HELIUM" -> VoiceFont.HELIUM
    "DARK_MODULATION" -> VoiceFont.DARK_MODULATION
    "BROKEN_ROBOT" -> VoiceFont.BROKEN_ROBOT
    "INTERFERENCE" -> VoiceFont.INTERFERENCE
    "ABYSS" -> VoiceFont.ABYSS
    "WOBBLE" -> VoiceFont.WOBBLE
    "STARSHIP_CAPTAIN" -> VoiceFont.STARSHIP_CAPTAIN
    "NERVOUS_ROBOT" -> VoiceFont.NERVOUS_ROBOT
    "SWARM" -> VoiceFont.SWARM
    "AM_RADIO" -> VoiceFont.AM_RADIO
    else -> VoiceFont.NONE
  }

  companion object {
    private const val MODE = "mode"
    private const val NOISE_REDUCTION = "noiseReduction"
    private const val VOICE_FONT = "voiceFont"
  }
}
