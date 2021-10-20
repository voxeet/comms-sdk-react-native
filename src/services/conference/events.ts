import type {
  Participant,
  MediaStreamType,
  ConferencePermission,
  ConferenceStatus,
} from './models';

export enum ConferenceServiceEventNames {
  /** Emitted when a new participant is invited to a conference or joins a conference. */
  EVENT_CONFERENCE_PARTICIPANT_ADDED = 'EVENT_CONFERENCE_PARTICIPANT_ADDED',
  /** Emitted when a participant changes ConferenceParticipantStatus. */
  EVENT_CONFERENCE_PARTICIPANT_UPDATED = 'EVENT_CONFERENCE_PARTICIPANT_UPDATED',
  /** Emitted when a participant leaves a conference. */
  EVENT_CONFERENCE_PARTICIPANT_REMOVED = 'EVENT_CONFERENCE_PARTICIPANT_REMOVED',
  /** Emitted when the local participant's permissions are updated. */
  EVENT_CONFERENCE_PERMISSIONS_UPDATED = 'EVENT_CONFERENCE_PERMISSIONS_UPDATED',
  /** Emitted when ta conference changes status. */
  EVENT_CONFERENCE_STATUS_UPDATED = 'EVENT_CONFERENCE_STATUS_UPDATED',
  /** Emitted when the SDK adds a new stream to a conference participant. */
  EVENT_CONFERENCE_STREAM_ADDED = 'EVENT_CONFERENCE_STREAM_ADDED',
  /** Emitted when a conference participant who is connected to the audio and video stream changes the stream by enabling a microphone while using a camera or by enabling a camera while using a microphone.  */
  EVENT_CONFERENCE_STREAM_UPDATED = 'EVENT_CONFERENCE_STREAM_UPDATED',
  /** Emitted when the SDK removes a stream from a conference participant.  */
  EVENT_CONFERENCE_STREAM_REMOVED = 'EVENT_CONFERENCE_STREAM_REMOVED',
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
  [ConferenceServiceEventNames.EVENT_CONFERENCE_PARTICIPANT_ADDED]: ParticipantChangedEventType;
  [ConferenceServiceEventNames.EVENT_CONFERENCE_PARTICIPANT_UPDATED]: ParticipantChangedEventType;
  [ConferenceServiceEventNames.EVENT_CONFERENCE_PARTICIPANT_REMOVED]: ParticipantChangedEventType;
  [ConferenceServiceEventNames.EVENT_CONFERENCE_PERMISSIONS_UPDATED]: PermissionsUpdatedEventType;
  [ConferenceServiceEventNames.EVENT_CONFERENCE_STATUS_UPDATED]: ConferenceStatusUpdatedEventType;
  [ConferenceServiceEventNames.EVENT_CONFERENCE_STREAM_ADDED]: StreamChangedEventType;
  [ConferenceServiceEventNames.EVENT_CONFERENCE_STREAM_UPDATED]: StreamChangedEventType;
  [ConferenceServiceEventNames.EVENT_CONFERENCE_STREAM_REMOVED]: StreamChangedEventType;
}
