import type {
  Participant,
  MediaStreamType,
  ConferencePermission,
  ConferenceStatus,
} from './models';

export enum ConferenceServiceEventNames {
  /** Emitted when a new participant is invited to a conference or joins a conference. */
  ParticipantAdded = 'EVENT_CONFERENCE_PARTICIPANT_ADDED',
  /** Emitted when a participant changes ConferenceParticipantStatus. */
  ParticipantUpdated = 'EVENT_CONFERENCE_PARTICIPANT_UPDATED',
  /** Emitted when the local participant's permissions are updated. */
  PermissionsUpdated = 'EVENT_CONFERENCE_PERMISSIONS_UPDATED',
  /** Emitted when ta conference changes status. */
  StatusUpdated = 'EVENT_CONFERENCE_STATUS_UPDATED',
  /** Emitted when the SDK adds a new stream to a conference participant. */
  StreamAdded = 'EVENT_CONFERENCE_STREAM_ADDED',
  /** Emitted when a conference participant who is connected to the audio and video stream changes the stream by enabling a microphone while using a camera or by enabling a camera while using a microphone.  */
  StreamUpdated = 'EVENT_CONFERENCE_STREAM_UPDATED',
  /** Emitted when the SDK removes a stream from a conference participant.  */
  StreamRemoved = 'EVENT_CONFERENCE_STREAM_REMOVED',
}

export interface ParticipantChangedEventType {
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

export interface StreamChangedEventType {
  /** The conference participant. */
  participant: Participant;
  /** The media stream. */
  mediaStream: MediaStreamType;
}

export interface ConferenceServiceEventMap {
  [ConferenceServiceEventNames.ParticipantAdded]: ParticipantChangedEventType;
  [ConferenceServiceEventNames.ParticipantUpdated]: ParticipantChangedEventType;
  [ConferenceServiceEventNames.PermissionsUpdated]: PermissionsUpdatedEventType;
  [ConferenceServiceEventNames.StatusUpdated]: ConferenceStatusUpdatedEventType;
  [ConferenceServiceEventNames.StreamAdded]: StreamChangedEventType;
  [ConferenceServiceEventNames.StreamUpdated]: StreamChangedEventType;
  [ConferenceServiceEventNames.StreamRemoved]: StreamChangedEventType;
}
