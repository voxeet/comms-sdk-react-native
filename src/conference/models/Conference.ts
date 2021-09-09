import type { ConferenceStatus } from './ConferenceStatus';
import type { Participant } from './Participant';

export type Conference = {
  conferenceId?: string;
  conferenceAlias?: string;
  isNew?: boolean;
  participants: Participant[];
  status: ConferenceStatus;
};
