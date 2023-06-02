/** The ComfortNoiseLevel enum gathers the available comfort noise levels. */
export enum ComfortNoiseLevel {
  /** The default comfort noise level that is based on the device database. The database includes the proper comfort noise levels, individual for all devices. */
  Default = 'default',
  /** The low comfort noise level. */
  Low = 'low',
  /** The medium comfort noise level. */
  Medium = 'medium',
  /** The disabled comfort noise. */
  Off = 'off',
}

/**
 * The AudioCaptureModeOptions model allows selecting the preferred audio capture mode and additional options for the selected mode.
 *
 * This model is available in SDK 3.7 and later.
 */
export interface AudioCaptureModeOptions {
  /** The preferred audio mode that allows enabling and disabling audio processing. */
  mode: AudioCaptureMode;
  /** The selected noise reduction level. */
  noiseReduction?: NoiseReductionLevel;
  /** The preferred voice modification effect that you can use to change the local participant's voice in real time.*/
  voiceFont?: VoiceFont;
}

/** The AudioCaptureMode model allows enabling and disabling audio processing for the local participant.
 *
 * By default, the Dolby Voice audio processing algorithm is enabled in Dolby Voice conferences to improve voice communication. However, audio processing lowers the quality of non-voice audio. To send non-voice audio, such as music, disable audio processing by using the Unprocessed mode.
 *
 * This model is available in SDK 3.7 and later.
 */
export enum AudioCaptureMode {
  /** Enables audio processing to improve voice quality. */
  Standard = 'STANDARD',
  /** Disables audio processing to allow transmitting non-voice audio to a conference. */
  Unprocessed = 'UNPROCESSED',
}
/**
 * The NoiseReductionLevel model allows selecting the preferred level of noise reduction.
 *
 * This model is available in SDK 3.7 and later.
 */
export enum NoiseReductionLevel {
  /** Removes all background sounds to improve voice quality. Use this mode if you want to send only voice to a conference. */
  High = 'HIGH',

  /**
   * Removes stationary background sounds, such as the sound of a computer fan, air conditioning, or microphone hum, from audio transmitted to a conference. In this mode, non-stationary sounds are transmitted to give participants full context of other participants' environments and create a more realistic audio experience. If you want to send only voice to a conference, use the High level.
   */
  Low = 'LOW',
}

/**
 * The VoiceFont model gathers the possible voice modification effects that you can use to change the local participant's voice in real time.
 *
 * This model is available in SDK 3.9 and later.
 */
export enum VoiceFont {
  None = 'NONE',
  Masculine = 'MASCULINE',
  Feminine = 'FEMININE',
  Helium = 'HELIUM',
  DarkModulation = 'DARK_MODULATION',
  BrokenRobot = 'BROKEN_ROBOT',
  Interference = 'INTERFERENCE',
  Abyss = 'ABYSS',
  Wobble = 'WOBBLE',
  StarshipCaptain = 'STARSHIP_CAPTAIN',
  NervousRobot = 'NERVOUS_ROBOT',
  Swarm = 'SWARM',
  AmRadio = 'AM_RADIO',
}
