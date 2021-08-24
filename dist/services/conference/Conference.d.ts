import { ConferenceStatus } from "./ConferenceStatus";
import Participant from "./Participant";
export interface Conference {
    conferenceId?: string;
    conferenceAlias?: string;
    isNew?: boolean;
    participants: Participant[];
    status: ConferenceStatus;
}
export declare function conferenceToMap(conference: Conference): {
    status: ConferenceStatus;
    conferenceId?: string | undefined;
    conferenceAlias?: string | undefined;
    isNew?: boolean | undefined;
    participants: Participant[];
};
export declare function mapToConference(conference: any): Conference;
