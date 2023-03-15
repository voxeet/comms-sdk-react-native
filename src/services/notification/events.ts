import type { Participant } from '../conference/models';

/** The NotificationServiceEventNames enum gathers the NotificationService events.  */
export enum NotificationServiceEventNames {
  /** Emitted when an application user receives an invitation.  */
  InvitationReceived = 'EVENT_NOTIFICATION_INVITATION_RECEIVED',
  ConferenceStatus = 'EVENT_NOTIFICATION_CONFERENCE_STATUS',
  ConferenceCreated = 'EVENT_NOTIFICATION_CONFERENCE_CREATED',
  ConferenceEnded = 'EVENT_NOTIFICATION_CONFERENCE_ENDED',
  ParticipantJoined = 'EVENT_NOTIFICATION_PARTICIPANT_JOINED',
  ParticipantLeft = 'EVENT_NOTIFICATION_PARTICIPANT_LEFT',
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

/** The ConferenceStatusEventType interface informs about the conference status. */
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

/** The ConferenceCreatedEventType interface gathers information about the received invitation. */
export interface ConferenceCreatedEventType {
  /** The conference alias. */
  conferenceAlias: string;
  /** The conference ID. */
  conferenceId: string;
}

/** The ConferenceEndedEventType interface gathers information about the received invitation. */
export interface ConferenceEndedEventType {
  /** The conference alias. */
  conferenceAlias: string;
  /** The conference ID. */
  conferenceId: string;
}

/** The ParticipantJoinedEventType interface gathers information about a participant who joined a conference. */
export interface ParticipantJoinedEventType {
  /** The conference alias. */
  conferenceAlias: string;
  /** The conference ID. */
  conferenceId: string;
  /** The participant who joined the conference. */
  participant: Participant;
}

/** The ParticipantLeftEventType interface gathers information about a participant who left a conference. */
export interface ParticipantLeftEventType {
  /** The conference alias. */
  conferenceAlias: string;
  /** The conference ID. */
  conferenceId: string;
  /** The participant who left the conference. */
  participant: Participant;
}

export interface NotificationServiceEventMap {
  [NotificationServiceEventNames.InvitationReceived]: InvitationReceivedEventType;
  [NotificationServiceEventNames.ConferenceStatus]: ConferenceStatusEventType;
  [NotificationServiceEventNames.ConferenceCreated]: ConferenceCreatedEventType;
  [NotificationServiceEventNames.ConferenceEnded]: ConferenceEndedEventType;
  [NotificationServiceEventNames.ParticipantJoined]: ParticipantJoinedEventType;
  [NotificationServiceEventNames.ParticipantLeft]: ParticipantLeftEventType;
}
