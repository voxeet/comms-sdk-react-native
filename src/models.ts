/** @internal */
export type RefreshAccessTokenType = () => Promise<string>;
/** @internal */
export type RefreshAccessTokenInBackgroundType = () => void;

export {
  ParticipantInfo,
  Participant,
  Conference,
  ParticipantStatus,
  ConferenceStatus,
  ParticipantType,
} from './services/conference/models';
