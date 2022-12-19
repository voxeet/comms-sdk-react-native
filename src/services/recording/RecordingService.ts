import { NativeModules } from 'react-native';

import NativeEvents from '../../utils/NativeEvents';
import type { UnsubscribeFunction } from '../conference/models';
import { RecordingServiceEventNames } from './events';
import type { RecordingStatusUpdatedEventType } from './events';
import type { Recording } from './models';

const { CommsAPIRecordingServiceModule } = NativeModules;

/**
 * The RecordingService is responsible for recording conferences. For more information about the recording function, see the [Recording Conferences](doc:guides-recording-conferences) document.
 */
export class RecordingService {
  /** @internal */
  _nativeModule = CommsAPIRecordingServiceModule;

  /** @internal */
  _nativeEvents = new NativeEvents(CommsAPIRecordingServiceModule);

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

  /**
   * Adds a listener to the invitation received event.
   * @param handler An event callback function.
   * @returns A function that unsubscribes from event listeners.
   */
  public onRecordingStatusUpdated(
    handler: (data: RecordingStatusUpdatedEventType) => void
  ): UnsubscribeFunction {
    return this._nativeEvents.addListener(
      RecordingServiceEventNames.StatusUpdated,
      handler
    );
  }
}

export default new RecordingService();
