import type {
  Participant,
  ConferencePermission,
  ConferenceStatus,
  MediaStream,
} from './models';

export enum ConferenceServiceEventNames {
  /** Emitted when a new participant is invited to a conference. The SDK does not emit the participantAdded event for the local participant. Listeners only receive the participantAdded events about users; they do not receive events for other listeners. Users receive the participantAdded events about users and do not receive any events about listeners.*/
  ParticipantAdded = 'EVENT_CONFERENCE_PARTICIPANT_ADDED',
  /** Emitted when a conference participant changes status. Listeners only receive the participantUpdated events about users; they do not receive events for other listeners. Users receive the participantUpdated events about users and do not receive any events about listeners.*/
  ParticipantUpdated = 'EVENT_CONFERENCE_PARTICIPANT_UPDATED',
  /** Emitted when the local participant's permissions are updated. */
  PermissionsUpdated = 'EVENT_CONFERENCE_PERMISSIONS_UPDATED',
  /** Emitted when a conference changes status. */
  StatusUpdated = 'EVENT_CONFERENCE_STATUS_UPDATED',
  /** Emitted when the SDK adds a new stream to a conference participant. Each conference participant can be connected to two streams: the `audio and video` stream and the `screen-share` stream. If a participant enables audio or video, the SDK adds the `audio and video` stream to the participant and emits the streamAdded event to all participants. When a participant is connected to the `audio and video` stream and changes the stream, for example, enables a camera while using a microphone, the SDK updates the `audio and video` stream and emits the [streamUpdated](#streamupdated) event. When a participant starts sharing a screen, the SDK adds the `screen-share` stream to this participants and emits the streamAdded event to all participants. The following graphic shows this behavior:
   * [block:image]
   * {
   * "images": [
   * {
   * "image": [
   * "https://files.readme.io/21575c1-conference-stream-added.png",
   * "conference-stream-added.png",
   * 3048,
   * 2060,
   * "#f6f7f7"
   * ],
   * "caption": "The difference between the streamAdded and streamUpdated events"
   * }
   * ]
   * }
   * [/block]
   * Based on the stream type, the application chooses to either render a camera view or a screen-share view.
   * When a new participant joins a conference with enabled audio and video, the SDK emits the streamAdded event that includes audio and video tracks.
   * The SDK can also emit the streamAdded event only for the local participant. When the local participant uses the [stopAudio](#stopaudio) method to locally mute the selected remote participant who does not use a camera, the local participant receives the [streamRemoved](#streamremoved) event. After using the [startAudio](#startaudio) method for this remote participant, the local participant receives the streamAdded event.
   */
  StreamAdded = 'EVENT_CONFERENCE_STREAM_ADDED',
  /** Emitted when a conference participant who is connected to the `audio and video` stream changes the stream by enabling a microphone while using a camera or by enabling a camera while using a microphone. The event is emitted to all conference participants. The following graphic shows this behavior:
   * [block:image]
   * {
   * "images": [
   * {
   * "image": [
   * "https://files.readme.io/21575c1-conference-stream-added.png",
   * "conference-stream-added.png",
   * 3048,
   * 2060,
   * "#f6f7f7"
   * ],
   * "caption": "The difference between the streamAdded and streamUpdated events"
   * }
   * ]
   * }
   * [/block]
   * The SDK can also emit the streamUpdated event only for the local participant. When the local participant uses the [stopAudio](#stopaudio) or [startAudio](#startaudio) method to locally mute or unmute a selected remote participant who uses a camera, the local participant receives the streamUpdated event.
   */
  StreamUpdated = 'EVENT_CONFERENCE_STREAM_UPDATED',
  /** Emitted when the SDK removes a stream from a conference participant. Each conference participant can be connected to two streams: the `audio and video` stream and the `screen-share` stream. If a participant disables audio and video or stops a screen-share presentation, the SDK removes the proper stream and emits the streamRemoved event to all conference participants.
   * The SDK can also emit the streamRemoved event only for the local participant. When the local participant uses the [stopAudio](#stopaudio) method to locally mute a selected remote participant who does not use a camera, the local participant receives the streamRemoved event.
   */
  StreamRemoved = 'EVENT_CONFERENCE_STREAM_REMOVED',
}

/** The ParticipantChangedEventType gathers events that inform about the changed statuses of conference participants. */
export interface ParticipantChangedEventType {
  /** The conference participant. */
  participant: Participant;
}

/** The PermissionsUpdatedEventType gathers events that inform about the updated permissions of the local participant. */
export interface PermissionsUpdatedEventType {
  /** The updated conference permissions. */
  permissions: ConferencePermission[];
}

/** The ConferenceStatusUpdatedEventType gathers events that inform about the changed status of a conference. */
export interface ConferenceStatusUpdatedEventType {
  /** The new status. */
  status: ConferenceStatus;
}

/** The StreamChangedEventType gathers events that inform about the added, updated, and removed streams. */
export interface StreamChangedEventType {
  /** The conference participant. */
  participant: Participant;
  /** The media stream. */
  mediaStream: MediaStream;
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
