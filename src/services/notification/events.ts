import type { Participant } from '../conference/models';

/** The NotificationServiceEventNames enum gathers the NotificationService events.  */
export enum NotificationServiceEventNames {
  /** Emitted when an application user receives an invitation.  */
  InvitationReceived = 'EVENT_NOTIFICATION_INVITATION_RECEIVED',
  ConferenceStatus = 'EVENT_NOTIFICATION_CONFERENCE_STATUS',
}

/** The InvitationReceivedEventType interface gathers information about the received invitation. */
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

export interface ConferenceStatusEventType {
  /** The conference alias. */
  conferenceAlias: string;
  /** The conference ID. */
  conferenceId: string;
  /** Information whether the conference is ongoing. */
  live: boolean;
  /** The list of the conference participants. */
  participants: [Participant];
}
export interface NotificationServiceEventMap {
  [NotificationServiceEventNames.InvitationReceived]: InvitationReceivedEventType;
  [NotificationServiceEventNames.ConferenceStatus]: ConferenceStatusEventType;
}
