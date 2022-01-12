import { NativeModules, Platform } from 'react-native';

import Logger from '../../utils/Logger';
import type { ComfortNoiseLevel } from './models';

const { CommsAPIMediaDeviceServiceModule } = NativeModules;

/**
 * The MediaDeviceService allows an application to manage media devices that are used during a conference.
 */
export class MediaDeviceService {
  /** @internal */
  _nativeModule = CommsAPIMediaDeviceServiceModule;

  /**
   * Retrieves the comfort noise level setting for output devices in Dolby Voice conferences.
   */
  public async getComfortNoiseLevel(): Promise<ComfortNoiseLevel> {
    return this._nativeModule.getComfortNoiseLevel();
  }

  /**
   * Checks whether an application uses the front-facing (true) or back-facing camera (false).
   */
  public async isFrontCamera(): Promise<boolean> {
    return this._nativeModule.isFrontCamera();
  }

  /**
   * Configures the comfort noise level for output devices in Dolby Voice conferences.
   * @param noiseLevel The selected comfort noise level.
   */
  public async setComfortNoiseLevel(
    noiseLevel: ComfortNoiseLevel
  ): Promise<void> {
    return this._nativeModule.setComfortNoiseLevel(noiseLevel);
  }

  /**
   * Switches the current camera to another available camera that is connected to a device.
   * @returns {Promise<void}
   */
  public async switchCamera(): Promise<void> {
    return this._nativeModule.switchCamera();
  }

  /**
   * Switches the current speaker to another available speaker that is connected to a device.
   */
  public async switchSpeaker(): Promise<void> {
    if (Platform.OS === 'android') {
      Logger.warning('Switching speaker is not available on Android devices');
      return Promise.reject(
        'Switching speaker is not available on Android devices'
      );
    }
    return this._nativeModule.switchSpeaker();
  }
}

export default new MediaDeviceService();
