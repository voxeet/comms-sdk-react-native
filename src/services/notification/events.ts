import type { Participant } from '../conference/models';

export enum NotificationServiceEventNames {
  /** Emitted when the application user received an invitation.  */
  InvitationReceived = 'InvitationReceived',
}

export interface InvitationReceivedEventType {
  /** The conference alias. */
  conferenceAlias: string;
  /** The conference ID. */
  conferenceId: string;
  /** The conference access token. */
  conferenceToken: string;
  /** The participant who sent the invitation. */
  participant: Participant;
}

export interface NotificationServiceEventMap {
  [NotificationServiceEventNames.InvitationReceived]: InvitationReceivedEventType;
}
