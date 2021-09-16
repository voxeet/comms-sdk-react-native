/** @ignore */

export type ConferenceLeaveOptions = {
  leaveRoom: boolean;
};

export enum UserType {
  USER = 'user',
  LISTENER = 'listener',
}

export type JoinUserInfo = {
  type?: UserType;
};

export type ConferenceJoinOptions = {
  user?: JoinUserInfo;
  maxVideoForwarding?: number;
};

export type ParticipantPermissions = {
  participant: Participant;
  permissions: Array<ConferencePermission>;
};

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

export type AudioProcessingOptions = {
  send?: AudioProcessingSenderOptions;
};

export type AudioProcessingSenderOptions = {
  audioProcessing?: boolean;
};

export enum AudioProcessing {
  VOCAL,
  ENVIRONMENT,
}

export type Conference = {
  conferenceId?: string;
  conferenceAlias?: string;
  isNew?: boolean;
  participants: Participant[];
  status: ConferenceStatus;
};

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

export type ConferenceCreateParameters = {
  ttl?: number;
  rtcpMode?: RTCPMode;
  mode?: Mode;
  videoCodec?: Codec;
  liveRecording?: boolean;
  dolbyVoice?: boolean;
  simulcast?: boolean;
};

export type ConferenceCreateOptions = {
  alias?: string;
  params?: ConferenceCreateParameters;
};

export type ConferenceReplayOptions = {
  conferenceAccessToken?: string;
  offset: number;
};

export type ConferenceMixingOptions = {
  enabled: boolean;
};

export type Participant = {
  participantId: string;
  conferenceStatus?: string;
  externalId?: string;
  name?: string;
  avatarUrl?: string;
};

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
