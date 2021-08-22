import { ConferenceStatus } from "./ConferenceStatus";
import Participant from "./Participant";
export interface Conference {
    conferenceId?: string;
    conferenceAlias?: string;
    isNew?: boolean;
    participants: Participant[];
    status: ConferenceStatus;
}
