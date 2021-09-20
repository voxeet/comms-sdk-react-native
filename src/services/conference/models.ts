export interface ParticipantPermissions {
  participant: Participant;
  permissions: Array<ConferencePermission>;
}

export enum ConferencePermission {
  INVITE,
  KICK,
  UPDATE_PERMISSIONS,
  JOIN,
  SEND_AUDIO,
  SEND_VIDEO,
  SHARE_SCREEN,
  SHARE_VIDEO,
  SHARE_FILE,
  SEND_MESSAGE,
  RECORD,
  STREAM,
}

export interface AudioProcessingOptions {
  send?: AudioProcessingSenderOptions;
}

export interface AudioProcessingSenderOptions {
  audioProcessing?: boolean;
}

export enum AudioProcessing {
  VOCAL,
  ENVIRONMENT,
}

export interface Conference {
  conferenceId?: string;
  conferenceAlias?: string;
  isNew?: boolean;
  participants: Participant[];
  status: ConferenceStatus;
}

export enum ConferenceStatus {
  DEFAULT = 'DEFAULT',
  CREATING = 'CREATING',
  CREATED = 'CREATED',
  JOINING = 'JOINING',
  JOINED = 'JOINED',
  /** @deprecated */
  FIRST_PARTICIPANT = 'FIRST_PARTICIPANT',
  /** @deprecated */
  NO_MORE_PARTICIPANT = 'NO_MORE_PARTICIPANT',
  LEAVING = 'LEAVING',
  LEFT = 'LEFT',
  ERROR = 'ERROR',
  DESTROYED = 'DESTROYED',
  ENDED = 'ENDED',
}

export interface ConferenceCreateParameters {
  ttl?: number;
  rtcpMode?: RTCPMode;
  mode?: Mode;
  videoCodec?: Codec;
  liveRecording?: boolean;
  dolbyVoice?: boolean;
  simulcast?: boolean;
}

export interface ConferenceCreateOptions {
  alias?: string;
  params?: ConferenceCreateParameters;
}

export interface ConferenceReplayOptions {
  conferenceAccessToken?: string;
  offset: number;
}

export interface ConferenceMixingOptions {
  enabled: boolean;
}

export interface Participant {
  participantId: string;
  conferenceStatus?: string;
  externalId?: string;
  name?: string;
  avatarUrl?: string;
}

export enum RTCPMode {
  WORST = 'worst',
  AVERAGE = 'average',
  BEST = 'best',
}

export enum Mode {
  STANDARD = 'standard',
  PUSH = 'push',
}

export enum Codec {
  VP8 = 'VP8',
  H264 = 'H264',
}

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
export interface StreamAddedEventType {}
export interface StreamUpdatedEventType {}
export interface StreamRemovedEventType {}

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
