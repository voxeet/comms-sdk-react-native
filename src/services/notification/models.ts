/** The SubscriptionType model gathers the subscription types.  */
export enum SubscriptionType {
  InvitationReceived = 'SUBSCRIPTION_TYPE_INVITATION_RECEIVED',
  ActiveParticipants = 'SUBSCRIPTION_TYPE_ACTIVE_PARTICIPANTS',
  ConferenceCreated = 'SUBSCRIPTION_TYPE_CONFERENCE_CREATED',
  ConferenceEnded = 'SUBSCRIPTION_TYPE_CONFERENCE_ENDED',
  ParticipantJoined = 'SUBSCRIPTION_TYPE_PARTICIPANT_JOINED',
  ParticipantLeft = 'SUBSCRIPTION_TYPE_PARTICIPANT_LEFT',
}

/** The Subscription model is an interface for all subscription types. The model is supported in SDK 3.8 and later. */
export interface Subscription {
  /** The subscription type. */
  type: string;
  /** The conference alias. */
  conferenceAlias: string;
}
