import { NativeModules } from 'react-native';

import type { ComfortNoiseLevel } from './models';

const { DolbyIoIAPIMediaDeviceService } = NativeModules;

export class MediaDeviceService {
  /** @internal */
  _nativeModule = DolbyIoIAPIMediaDeviceService;

  /**
   * Checks if the application uses the front-facing (true) or back-facing camera (false).
   * @returns {Promise<boolean>}
   */
  public async isFrontCamera(): Promise<boolean> {
    return this._nativeModule.isFrontCamera();
  }

  /**
   * Retrieves the comfort noise level setting for output devices in Dolby Voice conferences.
   * @returns {Promise<ComfortNoiseLevel>} Promise with the ComfortNoiseLevel
   */

  public async getComfortNoiseLevel(): Promise<ComfortNoiseLevel> {
    return this._nativeModule.getComfortNoiseLevel();
  }

  /**
   * Configures the comfort noise level for output devices in Dolby Voice conferences.
   * @param noiseLevel<ComfortNoiseLevel> The selected comfort noise level.
   * @returns {Promise<void>}
   */

  public async setComfortNoiseLevel(
    noiseLevel: ComfortNoiseLevel
  ): Promise<void> {
    return this._nativeModule.setComfortNoiseLevel(noiseLevel);
  }

  /**
   * Switches the current camera to another available camera that is connected to the device.
   * @returns {Promise<void}
   */

  public async switchCamera(): Promise<void> {
    return this._nativeModule.switchCamera();
  }

  /**
   * Switches the current speaker to another available speaker that is connected to the device.
   * @returns {Promise<void>}
   */
  public async switchSpeaker(): Promise<void> {
    return this._nativeModule.switchSpeaker();
  }
}

export default new MediaDeviceService();
