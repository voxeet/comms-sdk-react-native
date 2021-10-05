import type {
  Participant,
  MediaStreamType,
  ConferencePermission,
  ConferenceStatus,
} from './models';

export enum ConferenceServiceEventNames {
  /** Emitted when a new participant is invited to a conference or joins a conference. */
  ParticipantAdded = 'ParticipantAdded',
  /** Emitted when a participant changes ConferenceParticipantStatus. */
  ParticipantUpdated = 'ParticipantUpdated',
  /** Emitted when a participant leaves a conference. */
  ParticipantRemoved = 'ParticipantRemoved',
  /** Emitted when the local participant's permissions are updated. */
  PermissionsUpdated = 'PermissionsUpdated',
  /** Emitted when ta conference changes status. */
  ConferenceStatusUpdated = 'ConferenceStatusUpdated',
  /** Emitted when the SDK adds a new stream to a conference participant. */
  StreamAdded = 'StreamAdded',
  /** Emitted when a conference participant who is connected to the audio and video stream changes the stream by enabling a microphone while using a camera or by enabling a camera while using a microphone.  */
  StreamUpdated = 'StreamUpdated',
  /** Emitted when the SDK removes a stream from a conference participant.  */
  StreamRemoved = 'StreamRemoved',
}

export interface ParticipantAddedEventType {
  /** The conference participant. */
  participant: Participant;
}

export interface ParticipantUpdatedEventType {
  /** The conference participant. */
  participant: Participant;
}

export interface ParticipantRemovedEventType {
  /** The conference participant. */
  participant: Participant;
}

export interface PermissionsUpdatedEventType {
  /** The updated conference permissions. */
  permissions: ConferencePermission[];
}

export interface ConferenceStatusUpdatedEventType {
  /** The new status. */
  status: ConferenceStatus;
}

export interface StreamAddedEventType {
  /** The conference participant. */
  participant: Participant;
  /** The media stream. */
  mediaStream: MediaStreamType;
}

export interface StreamUpdatedEventType {
  /** The conference participant. */
  participant: Participant;
  /** The media stream. */
  mediaStream: MediaStreamType;
}

export interface StreamRemovedEventType {
  /** The conference participant. */
  participant: Participant;
  /** The media stream. */
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
