import { NativeModules } from 'react-native';

import NativeEvents from '../../utils/NativeEvents';
import type { UnsubscribeFunction } from '../conference/models';
import type { MessageReceivedEventType } from './events';
import { CommandServiceEventNames } from './events';

const { DolbyIoIAPICommandServiceModule } = NativeModules;

/**
The CommandService allows the application to send and receive text messages and notifications during a conference.
 */
export class CommandService {
  /** @internal */
  _nativeModule = DolbyIoIAPICommandServiceModule;
  /** @internal */
  _nativeEvents = new NativeEvents(DolbyIoIAPICommandServiceModule);

  /**
   * Sends a message to all conference participants. The message is in a form of a basic stream.
   * @param message The message to send.
   */
  public async send(message: string): Promise<void> {
    return this._nativeModule.send(message);
  }

  /**
   * Adds a listener to events informing about received messages.
   * @param handler An event callback function.
   * @returns A function that unsubscribes from event listeners.
   */
  public onMessageReceived(
    handler: (data: MessageReceivedEventType) => void
  ): UnsubscribeFunction {
    return this._nativeEvents.addListener(
      CommandServiceEventNames.MessageReceived,
      handler
    );
  }
}

export default new CommandService();
