import NativeEvents from '../../utils/NativeEvents';
import type {
  ParticipantInfo,
  Conference,
  UnsubscribeFunction,
} from '../conference/models';
import { NotificationServiceEventNames } from './events';
import type { InvitationReceivedEventType } from './events';
import { NativeModules } from 'react-native';

const { DolbyIoIAPINotificationService } = NativeModules;

export class NotificationService {
  /**
   * Notifies conference participants about a conference invitation.
   * @param conference<Conference> The conference object.
   * @param participants<ParticipantInfo[]> Information about the invited application users.
   * @returns {Promise<any>}
   */

  public async invite(
    conference: Conference,
    participants: ParticipantInfo[]
  ): Promise<any> {
    return DolbyIoIAPINotificationService.invite(conference, participants);
  }

  /**
   * Declines the conference invitation.
   * @param conference<Conference> The conference object.
   * @returns {Promise<any>}
   */

  public async decline(conference: Conference): Promise<any> {
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
