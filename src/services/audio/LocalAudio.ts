import { NativeModules } from 'react-native';

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

  /**
   * Returns the local participant's audio capture mode in Dolby Voice conferences.
   */
  public async getCaptureMode(): Promise<AudioCaptureModeOptions> {
    return this._localAudio.getCaptureMode();
  }

  /**
   * Sets the local participant's audio capture mode in Dolby Voice conferences.
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
}

export default new LocalAudio();
