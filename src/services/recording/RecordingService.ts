import { NativeModules } from 'react-native';

import type { Recording } from './models';

const { CommsAPIRecordingServiceModule } = NativeModules;

/**
 * The RecordingService is responsible for recording conferences. For more information about the recording function, see the [Recording Conferences](doc:guides-recording-conferences).
 */
export class RecordingService {
  /** @internal */
  _nativeModule = CommsAPIRecordingServiceModule;

  /**
   * Returns information about the current recording.
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
