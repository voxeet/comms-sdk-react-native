import type { Participant, MediaStreamType } from './models';

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

export interface ParticipantAddedEventType {}
export interface ParticipantUpdatedEventType {}
export interface ParticipantRemovedEventType {}
export interface PermissionsUpdatedEventType {}
export interface ConferenceStatusUpdatedEventType {}

export interface StreamAddedEventType {
  participant: Participant;
  mediaStream: MediaStreamType;
}

export interface StreamUpdatedEventType {
  participant: Participant;
  mediaStream: MediaStreamType;
}

export interface StreamRemovedEventType {
  participant: Participant;
  mediaStream: MediaStreamType;
}

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
