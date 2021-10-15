import NativeEvents from '../../utils/NativeEvents';
import type {
  Conference,
  UnsubscribeFunction,
  ParticipantInvited,
} from '../conference/models';
import { NotificationServiceEventNames } from './events';
import type { InvitationReceivedEventType } from './events';
import { NativeModules } from 'react-native';

const { DolbyIoIAPINotificationService } = NativeModules;

export class NotificationService {
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
    return DolbyIoIAPINotificationService.invite(conference, participants);
  }

  /**
   * Declines the conference invitation.
   * @param conference<Conference> The conference object.
   * @returns {Promise<void>}
   */
  public async decline(conference: Conference): Promise<void> {
    return DolbyIoIAPINotificationService.decline(conference);
  }

  /**
   * Add a handler for invitation received
   * @param handler<(data: InvitationReceivedEventType) => void> Handling function
   * @returns {() => void} Function that removes handler
   */
  public onInvitationReceived(
    handler: (data: InvitationReceivedEventType) => void
  ): UnsubscribeFunction {
    return NativeEvents.addListener(
      NotificationServiceEventNames.InvitationReceived,
      (data) => {
        handler(data);
      }
    );
  }
}

export default new NotificationService();
