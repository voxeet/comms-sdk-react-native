import { NativeModules } from 'react-native';

import NativeEvents from '../../utils/NativeEvents';
import type {
  Conference,
  UnsubscribeFunction,
  ParticipantInvited,
} from '../conference/models';
import { NotificationServiceEventNames } from './events';
import type { InvitationReceivedEventType } from './events';

const { DolbyIoIAPINotificationService } = NativeModules;

/**
 * The NotificationService allows inviting participants to a conference.
 */
export class NotificationService {
  /** @internal */
  _nativeModule = DolbyIoIAPINotificationService;
  /** @internal */
  _nativeEvents = new NativeEvents(DolbyIoIAPINotificationService);

  /**
   * Notifies conference participants about a conference invitation.
   * @param conference The conference object.
   * @param participants Information about the invited application users.
   */
  public async invite(
    conference: Conference,
    participants: ParticipantInvited[]
  ): Promise<void> {
    return this._nativeModule.invite(conference, participants);
  }

  /**
   * Declines the conference invitation.
   * @param conference The conference object.
   */
  public async decline(conference: Conference): Promise<void> {
    return this._nativeModule.decline(conference);
  }

  /**
   * Adds a listener to the invitation received event.
   * @param handler An event callback function.
   * @returns A function that unsubscribes from event listeners.
   */
  public onInvitationReceived(
    handler: (data: InvitationReceivedEventType) => void
  ): UnsubscribeFunction {
    return this._nativeEvents.addListener(
      NotificationServiceEventNames.InvitationReceived,
      handler
    );
  }
}

export default new NotificationService();
