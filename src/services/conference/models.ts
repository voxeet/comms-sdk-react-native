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

export interface ConferenceLeaveOptions {
  leaveRoom: boolean;
}

export enum UserType {
  USER = 'user',
  LISTENER = 'listener',
}

export interface JoinUserInfo {
  type?: UserType;
}

export interface ConferenceJoinOptions {
  user?: JoinUserInfo;
  maxVideoForwarding?: number;
}

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
