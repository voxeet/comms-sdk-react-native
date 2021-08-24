import { ConferenceStatus } from "./ConferenceStatus";
import { toParticipant } from "./Participant";
export function conferenceToMap(conference) {
    return Object.assign(Object.assign({}, conference), { 
        //no need to map the Participant since the fields are public -> stringify of strings
        status: ConferenceStatus[conference.status] });
}
export function mapToConference(conference) {
    return Object.assign(Object.assign({}, conference), { participants: conference.participants.map(toParticipant), status: ConferenceStatus[status] });
}
//# sourceMappingURL=Conference.js.map