import { ConferenceStatus } from "./ConferenceStatus";
import Participant from "./Participant";

export interface Conference {
  conferenceId?: string;
  conferenceAlias?: string;
  isNew?: boolean,
  participants: Participant[],
  status: ConferenceStatus
}

export function conferenceToMap(conference: Conference) {
  return {
    ...conference,
    //no need to map the Participant since the fields are public -> stringify of strings
    status: ConferenceStatus[conference.status],
  }
}