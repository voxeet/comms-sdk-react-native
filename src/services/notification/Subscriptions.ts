import type { ParticipantNotification } from './ParticipantNotification';

export enum SubscriptionType {
  ConferenceCreatedNotification,
  ConferenceEndedNotification,
  InvitationReceivedNotification,
  ParticipantJoinedNotification,
  ParticipantLeftNotification,
}

/**
 * conferenceAlias is not used for InvitationReceived
 */
export interface Subscription {
  type: SubscriptionType;
  conferenceAlias?: string;
}

export interface ConferenceCreatedNotification {
  conferenceId: string;
  conferenceAlias: string;
}

export interface ConferenceEndedNotification {
  conferenceId: string;
  conferenceAlias: string;
}

export interface InvitationReceivedNotification {
  conferenceId: string;
  participant: ParticipantNotification;
}

export interface ParticipantJoinedNotification {
  conferenceId: string;
  conferenceAlias?: string;
  participant: ParticipantNotification;
}

export interface ParticipantLeftNotification {
  conferenceId: string;
  conferenceAlias?: string;
  participant: ParticipantNotification;
}

export interface SubscriptionMapping {
  [SubscriptionType.ConferenceCreatedNotification]: ConferenceCreatedNotification;
  [SubscriptionType.ConferenceEndedNotification]: ConferenceEndedNotification;
  [SubscriptionType.InvitationReceivedNotification]: InvitationReceivedNotification;
  [SubscriptionType.ParticipantJoinedNotification]: ParticipantJoinedNotification;
  [SubscriptionType.ParticipantLeftNotification]: ParticipantLeftNotification;
}
