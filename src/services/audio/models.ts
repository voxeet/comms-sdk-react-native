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
 * The AudioCaptureModeOptions model allows selecting the preferred audio capture mode and additional options for the preferred mode.
 *
 * This model is available in SDK 3.7 and later.
 */
export interface AudioCaptureModeOptions {
  /** The preferred audio mode for capturing the local participant's audio. */
  mode: AudioCaptureMode;
  /** The preferred level of noise reduction. This property is supported only in the Standard mode. */
  noiseReduction?: NoiseReductionLevel;
  /** The preferred voice modification effect that you can use to change the local participant's voice in real time. This property is supported only in the Standard mode in SDK 3.10 and later. */
  voiceFont?: VoiceFont;
}

/** The AudioCaptureMode model allows selecting the preferred mode for capturing the local participant's audio.
 *
 * This model is available in SDK 3.7 and later.
 */
export enum AudioCaptureMode {
  /** The default mode aimed at enhancing speech to create a conversation-focused conference environment. This mode optimizes captured audio for speech by aggressively removing non-speech content, such as background noise. The mode is supported in SDK 3.7 and later.
   */
  Standard = 'STANDARD',
  /** Disables audio processing to allow transmitting non-voice audio to a conference. The mode is supported in SDK 3.7 and later. */
  Unprocessed = 'UNPROCESSED',
}
/**
 * The NoiseReductionLevel model allows selecting the preferred level of noise reduction.
 *
 * This model is available in SDK 3.7 and later.
 */
export enum NoiseReductionLevel {
  /** The default level that removes all background sounds to improve voice quality. Use this mode if you want to send only voice to a conference. */
  High = 'HIGH',

  /**
   * Removes stationary background sounds, such as the sound of a computer fan, air conditioning, or microphone hum, from audio transmitted to a conference. In this mode, non-stationary sounds are transmitted to give participants full context of other participants' environments and create a more realistic audio experience. If you want to send only voice to a conference, use the [High](#high) level.
   */
  Low = 'LOW',
}

/**
 * The VoiceFont model gathers the possible voice modification effects that you can use to change the local participant's voice in real time. The model is supported only in SDK 3.10 and later.
 * <br><br>
 * The following table lists audio samples for each available voice font:
 *
 * <table>
 *     <tbody>
 *         <tr style="height:60px">
 *             <th align='center' width=20%><b>Voice font</b></th>
 *             <th align='center' width=40%><b>Example 1</b></th>
 *             <th align='center' width=40%><b>Example 2</b></th>
 *         </tr>
 *         <tr>
 *             <td><code>none</code></td>
 *             <td><audio controls preload="auto"><source src="https://dolbyio.s3.us-west-1.amazonaws.com/public/voice-fonts/skywalker/original_male.wav" >Sorry, your browser does not support the audio element.</audio></td>
 *             <td><audio controls preload="auto"><source src="https://dolbyio.s3.us-west-1.amazonaws.com/public/voice-fonts/skywalker/original_female.wav" >Sorry, your browser does not support the audio element.</audio></td>
 *         </tr>
 *         <tr>
 *           <td><code>abyss</code></td>
 *             <td><audio controls preload="auto"><source src="https://dolbyio.s3.us-west-1.amazonaws.com/public/voice-fonts/skywalker/abyss_male.wav" >Sorry, your browser does not support the audio element.</audio></td>
 *             <td><audio controls preload="auto"><source src="https://dolbyio.s3.us-west-1.amazonaws.com/public/voice-fonts/skywalker/abyss_female.wav" >Sorry, your browser does not support the audio element.</audio></td>
 *         </tr>
 *         <tr>
 *             <td><code>amRadio</code></td>
 *             <td><audio controls preload="auto"><source src="https://dolbyio.s3.us-west-1.amazonaws.com/public/voice-fonts/skywalker/amradio_male.wav" >Sorry, your browser does not support the audio element.</audio></td>
 *             <td><audio controls preload="auto"><source src="https://dolbyio.s3.us-west-1.amazonaws.com/public/voice-fonts/skywalker/amradio_female.wav" >Sorry, your browser does not support the audio element.</audio></td>
 *         </tr>
 *         <tr>
 *             <td><code>brokenRobot</code></td>
 *             <td><audio controls preload="auto"><source src="https://dolbyio.s3.us-west-1.amazonaws.com/public/voice-fonts/skywalker/broken_robot_male.wav" >Sorry, your browser does not support the audio element.</audio></td>
 *             <td><audio controls preload="auto"><source src="https://dolbyio.s3.us-west-1.amazonaws.com/public/voice-fonts/skywalker/broken_robot_female.wav" >Sorry, your browser does not support the audio element.</audio></td>
 *         </tr>
 *         <tr>
 *             <td><code>darkModulation</code></td>
 *             <td><audio controls preload="auto"><source src="https://dolbyio.s3.us-west-1.amazonaws.com/public/voice-fonts/skywalker/dark_modulation_male.wav" >Sorry, your browser does not support the audio element.</audio></td>
 *             <td><audio controls preload="auto"><source src="https://dolbyio.s3.us-west-1.amazonaws.com/public/voice-fonts/skywalker/dark_modulation_female.wav" >Sorry, your browser does not support the audio element.</audio></td>
 *         </tr>
 *         <tr>
 *             <td><code>feminine</code></td>
 *             <td><audio controls preload="auto"><source src="https://dolbyio.s3.us-west-1.amazonaws.com/public/voice-fonts/skywalker/feminine_male.wav" >Sorry, your browser does not support the audio element.</audio></td>
 *             <td><audio controls preload="auto"><source src="https://dolbyio.s3.us-west-1.amazonaws.com/public/voice-fonts/skywalker/feminine_female.wav" >Sorry, your browser does not support the audio element.</audio></td>
 *         </tr>
 *         <tr>
 *             <td><code>helium</code></td>
 *             <td><audio controls preload="auto"><source src="https://dolbyio.s3.us-west-1.amazonaws.com/public/voice-fonts/skywalker/helium_male.wav" >Sorry, your browser does not support the audio element.</audio></td>
 *             <td><audio controls preload="auto"><source src="https://dolbyio.s3.us-west-1.amazonaws.com/public/voice-fonts/skywalker/helium_female.wav" >Sorry, your browser does not support the audio element.</audio></td>
 *         </tr>
 *         <tr>
 *             <td><code>interference</code></td>
 *             <td><audio controls preload="auto"><source src="https://dolbyio.s3.us-west-1.amazonaws.com/public/voice-fonts/skywalker/interference_male.wav" >Sorry, your browser does not support the audio element.</audio></td>
 *             <td><audio controls preload="auto"><source src="https://dolbyio.s3.us-west-1.amazonaws.com/public/voice-fonts/skywalker/interference_female.wav" >Sorry, your browser does not support the audio element.</audio></td>
 *         </tr>
 *         <tr>
 *             <td><code>masculine</code></td>
 *             <td><audio controls preload="auto"><source src="https://dolbyio.s3.us-west-1.amazonaws.com/public/voice-fonts/skywalker/masculine_male.wav" >Sorry, your browser does not support the audio element.</audio></td>
 *             <td><audio controls preload="auto"><source src="https://dolbyio.s3.us-west-1.amazonaws.com/public/voice-fonts/skywalker/masculine_female.wav" >Sorry, your browser does not support the audio element.</audio></td>
 *         </tr>
 *         <tr>
 *             <td><code>nervousRobot</code></td>
 *             <td><audio controls preload="auto"><source src="https://dolbyio.s3.us-west-1.amazonaws.com/public/voice-fonts/skywalker/nervous_robot_male.wav" >Sorry, your browser does not support the audio element.</audio></td>
 *             <td><audio controls preload="auto"><source src="https://dolbyio.s3.us-west-1.amazonaws.com/public/voice-fonts/skywalker/nervous_robot_female.wav" >Sorry, your browser does not support the audio element.</audio></td>
 *         </tr>
 *         <tr>
 *             <td><code>starshipCaptain</code></td>
 *             <td><audio controls preload="auto"><source src="https://dolbyio.s3.us-west-1.amazonaws.com/public/voice-fonts/skywalker/starship_captain_male.wav" >Sorry, your browser does not support the audio element.</audio></td>
 *             <td><audio controls preload="auto"><source src="https://dolbyio.s3.us-west-1.amazonaws.com/public/voice-fonts/skywalker/starship_captain_female.wav" >Sorry, your browser does not support the audio element.</audio></td>
 *         </tr>
 *         <tr>
 *             <td><code>swarm</code></td>
 *             <td><audio controls preload="auto"><source src="https://dolbyio.s3.us-west-1.amazonaws.com/public/voice-fonts/skywalker/swarm_male.wav" >Sorry, your browser does not support the audio element.</audio></td>
 *             <td><audio controls preload="auto"><source src="https://dolbyio.s3.us-west-1.amazonaws.com/public/voice-fonts/skywalker/swarm_female.wav" >Sorry, your browser does not support the audio element.</audio></td>
 *         </tr>
 *         <tr>
 *             <td><code>wobble</code></td>
 *             <td><audio controls preload="auto"><source src="https://dolbyio.s3.us-west-1.amazonaws.com/public/voice-fonts/skywalker/wobble_male.wav" >Sorry, your browser does not support the audio element.</audio></td>
 *             <td><audio controls preload="auto"><source src="https://dolbyio.s3.us-west-1.amazonaws.com/public/voice-fonts/skywalker/wobble_female.wav" >Sorry, your browser does not support the audio element.</audio></td>
 *         </tr>
 *     </tbody>
 * </table>
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
