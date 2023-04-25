import {
  ParticipantInfo as _ParticipantInfo,
  Participant as _Participant,
  Conference as _Conference,
  ParticipantStatus as _ParticipantStatus,
  ConferenceStatus as _ConferenceStatus,
  ParticipantType as _ParticipantType,
} from './services/conference/models';

export { default } from './CommsAPI';

export { default as Command } from './services/command/CommandService';
export { default as Conference } from './services/conference/ConferenceService';
export { default as FilePresentation } from './services/filePresentation/FilePresentationService';
export { default as MediaDevice } from './services/mediaDevice/MediaDeviceService';
export { default as Notification } from './services/notification/NotificationService';
export { default as Recording } from './services/recording/RecordingService';
export { default as Session } from './services/session/SessionService';
export { default as VideoPresentation } from './services/videoPresentation/VideoPresentationService';

export { default as VideoView } from './VideoView/VideoView';

export module Models {
  // conference models
  export const ParticipantStatus = _ParticipantStatus;
  export type ParticipantStatus = _ParticipantStatus;
  export const ConferenceStatus = _ConferenceStatus;
  export type ConferenceStatus = _ConferenceStatus;
  export const ParticipantType = _ParticipantType;
  export type ParticipantType = _ParticipantType;
  export type ParticipantInfo = _ParticipantInfo;
  export type Participant = _Participant;
  export type Conference = _Conference;
}
