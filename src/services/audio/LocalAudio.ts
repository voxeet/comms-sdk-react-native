import { NativeModules } from 'react-native';

import { AudioPreview } from './AudioPreview';
import type { AudioCaptureModeOptions, ComfortNoiseLevel } from './models';

const { CommsAPILocalAudioModule } = NativeModules;

/**
 * The LocalAudio model allows enabling and disabling the local participant's audio as well as setting and checking the capture mode and comfort noise level.
 *
 * This model is supported only in SDK 3.7 and later.
 */
export class LocalAudio {
  /** @internal */
  _localAudio = CommsAPILocalAudioModule;
  /** @internal */
  _audioPreview = new AudioPreview();

  /**
   * Returns the local participant's audio capture mode in Dolby Voice conferences.
   */
  public async getCaptureMode(): Promise<AudioCaptureModeOptions> {
    return this._localAudio.getCaptureMode();
  }

  /**
   * Sets the local participant's audio capture mode. The following modes are available:
   *
   * - Standard: The default mode that optimizes captured audio for speech by aggressively removing non-speech content, such as background noise. The mode is supported in SDK 3.7 and later.
   *
   * - Unprocessed: Reduces latency that comes from audio processing and prevents over-processing audio in some scenarios. The mode is supported in SDK 3.7 and later.
   *
   * Note: In SDK 3.8 and prior releases, this API is supported only in Dolby Voice conferences.
   */
  public async setCaptureMode(options: AudioCaptureModeOptions): Promise<void> {
    return this._localAudio.setCaptureMode(options);
  }

  /**
   * Returns the comfort noise level setting for output devices in Dolby Voice conferences.
   */
  public async getComfortNoiseLevel(): Promise<ComfortNoiseLevel> {
    return this._localAudio.getComfortNoiseLevel();
  }

  /**
   * Configures the comfort noise level for output devices in Dolby Voice conferences.
   *
   * @param noiseLevel The selected comfort noise level.
   */
  public async setComfortNoiseLevel(
    noiseLevel: ComfortNoiseLevel
  ): Promise<void> {
    return this._localAudio.setComfortNoiseLevel(noiseLevel);
  }

  /**
   * Starts sending the local participant’s audio streams from the local client to the conference.
   * This method is not available for listeners in Dolby Voice conferences.
   *
   * The method requires up to a few seconds to become effective.
   *
   */
  public async start(): Promise<void> {
    return this._localAudio.start();
  }

  /**
   * Stops sending local participant’s audio from the local client to the conference.
   * This method is not available for listeners in Dolby Voice conferences.
   *
   * The method requires up to a few seconds to become effective.
   *
   */
  public async stop(): Promise<void> {
    return this._localAudio.stop();
  }

  /**
   * Allows the local participant to test different capture modes and voice fonts before a conference. The method sets a preview recorder that records the participant's audio and plays it back. Before playing the recorded audio, set the [captureMode](#setCaptureMode) to a preferred setting that you wish to try. The method is supported only in SDK 3.10 and later.
   */
  public preview(): AudioPreview {
    return this._audioPreview;
  }
}

export default new LocalAudio();
