import type { ParticipantInfo } from '../conference';
import type { ConferencePermission } from './ConferencePermission';

export default interface ParticipantInvited {
  participant: ParticipantInfo;
  permissions: Array<ConferencePermission>;
}
