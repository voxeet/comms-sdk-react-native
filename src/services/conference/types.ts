/**
 * @ignore
 * */

export enum ConferenceServiceEventNames {
  ParticipantAdded = 'ParticipantAdded',
  ParticipantUpdated = 'ParticipantUpdated',
  ParticipantRemoved = 'ParticipantRemoved',
  PermissionsUpdated = 'PermissionsUpdated',
  ConferenceStatusUpdated = 'ConferenceStatusUpdated',
  StreamAdded = 'StreamAdded',
  StreamUpdated = 'StreamUpdated',
  StreamRemoved = 'StreamRemoved',
}

export type ParticipantAddedEventType = {};
export type ParticipantUpdatedEventType = {};
export type ParticipantRemovedEventType = {};
export type PermissionsUpdatedEventType = {};
export type ConferenceStatusUpdatedEventType = {};
export type StreamAddedEventType = {};
export type StreamUpdatedEventType = {};
export type StreamRemovedEventType = {};

export interface ConferenceServiceEventMap {
  [ConferenceServiceEventNames.ParticipantAdded]: ParticipantAddedEventType;
  [ConferenceServiceEventNames.ParticipantUpdated]: ParticipantUpdatedEventType;
  [ConferenceServiceEventNames.ParticipantRemoved]: ParticipantRemovedEventType;
  [ConferenceServiceEventNames.PermissionsUpdated]: PermissionsUpdatedEventType;
  [ConferenceServiceEventNames.ConferenceStatusUpdated]: ConferenceStatusUpdatedEventType;
  [ConferenceServiceEventNames.StreamAdded]: StreamAddedEventType;
  [ConferenceServiceEventNames.StreamUpdated]: StreamUpdatedEventType;
  [ConferenceServiceEventNames.StreamRemoved]: StreamRemovedEventType;
}
