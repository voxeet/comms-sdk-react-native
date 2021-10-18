import { NativeModules } from 'react-native';

import type { Recording } from './models';

const { DolbyIoIAPIRecordingServiceModule } = NativeModules;

/**
 * The RecordingService allows an application to record conferences by using the start and stop methods that turn
 * the recording on and off.
 */
export class RecordingService {
  /** @internal */
  _nativeModule = DolbyIoIAPIRecordingServiceModule;

  /**
   * Returns information about the current recording. Use this accessor if you wish to receive information that is
   * available in the Recording object, such as the ID of the participant who started the recording or the timestamp
   * that informs when the recording was started.
   * @returns {Promise<Recording | null>} Promise with the Recording or null
   */
  public async current(): Promise<Recording | null> {
    return this._nativeModule.current();
  }

  /**
   * Starts recording a conference.
   */
  public async start(): Promise<void> {
    return this._nativeModule.start();
  }

  /**
   * Stops recording a conference.
   */
  public async stop(): Promise<void> {
    return this._nativeModule.stop();
  }
}

export default new RecordingService();
