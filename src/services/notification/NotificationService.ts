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

export class NotificationService {
  /** @internal */
  _nativeModule = DolbyIoIAPINotificationService;
  /** @internal */
  _nativeEvents = new NativeEvents(DolbyIoIAPINotificationService);

  /**
   * Notifies conference participants about a conference invitation.
   * @param conference<Conference> The conference object.
   * @param participants<ParticipantInvited[]> Information about the invited application users.
   * @returns {Promise<void>}
   */
  public async invite(
    conference: Conference,
    participants: ParticipantInvited[]
  ): Promise<void> {
    return this._nativeModule.invite(conference, participants);
  }

  /**
   * Declines the conference invitation.
   * @param conference<Conference> The conference object.
   * @returns {Promise<void>}
   */
  public async decline(conference: Conference): Promise<void> {
    return this._nativeModule.decline(conference);
  }

  /**
   * Add a handler for invitation received
   * @param handler {(data: InvitationReceivedEventType) => void} Handling function
   * @returns {() => void} Function that removes handler
   */
  public onInvitationReceived(
    handler: (data: InvitationReceivedEventType) => void
  ): UnsubscribeFunction {
    return this._nativeEvents.addListener(
      NotificationServiceEventNames.InvitationReceived,
      (data) => {
        handler(data);
      }
    );
  }
}

export default new NotificationService();
