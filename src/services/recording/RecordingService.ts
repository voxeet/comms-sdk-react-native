import type { Recording } from './models';
import { NativeModules } from 'react-native';

const { DolbyIoIAPIRecordingServiceModule } = NativeModules;

/**
 * The RecordingService allows an application to record conferences by using the start and stop methods that turn
 * the recording on and off.
 */
export class RecordingService {
  /**
   * Returns information about the current recording. Use this accessor if you wish to receive information that is
   * available in the Recording object, such as the ID of the participant who started the recording or the timestamp
   * that informs when the recording was started.
   * @returns {Promise<Recording | null>} Promise with the Recording or null
   */
  public current(): Promise<Recording | null> {
    return DolbyIoIAPIRecordingServiceModule.current();
  }

  /**
   * Starts recording a conference.
   */
  public start(): Promise<void> {
    return DolbyIoIAPIRecordingServiceModule.start();
  }

  /**
   * Stops recording a conference.
   */
  public stop(): Promise<void> {
    return DolbyIoIAPIRecordingServiceModule.stop();
  }
}

export default new RecordingService();
