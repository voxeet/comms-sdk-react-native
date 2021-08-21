import { ParticipantInfo } from "../conference";
import { ParticipantNotification } from "./ParticipantNotification";

export enum Subscription {
  ConferenceCreated = "ConferenceCreated",
  ConferenceEnded = "ConferenceEnded",
  InvitationReceived = "InvitationReceived",
  ParticipantJoined = "ParticipantJoined",
  ParticipantLeft = "ParticipantLeft"
}

export interface ConferenceCreatedNotification {
  conferenceId: string,
  conferenceAlias: string
}

export interface ConferenceEndedNotification {
  conferenceId: string,
  conferenceAlias: string
}

export interface InvitationReceivedNotification {
  conferenceId: string,
  inviter: ParticipantInfo
}

export interface ParticipantJoinedNotification {
  conferenceId: string,
  conferenceAlias: string,
  participant: ParticipantNotification
}

export interface ParticipantLeftNotification {
  conferenceId: string,
  conferenceAlias: string,
  participant: ParticipantNotification
}

export interface SubscriptionMapping {
  [Subscription.ConferenceCreated]: ConferenceCreatedNotification,
  [Subscription.ConferenceEnded]: ConferenceEndedNotification,
  [Subscription.InvitationReceived]: InvitationReceivedNotification,
  [Subscription.ParticipantJoined]: ParticipantJoinedNotification,
  [Subscription.ParticipantLeft]: ParticipantLeftNotification,
}