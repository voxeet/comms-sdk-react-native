import type { ConferencePermission } from '../../notification';
import type Participant from './Participant';

export interface ParticipantPermission {
  participant: Participant;
  permissions: Array<ConferencePermission>;
}
