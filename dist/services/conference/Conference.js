import { ConferenceStatus } from "./ConferenceStatus";
export function conferenceToMap(conference) {
    return Object.assign(Object.assign({}, conference), { 
        //no need to map the Participant since the fields are public -> stringify of strings
        status: ConferenceStatus[conference.status] });
}
//# sourceMappingURL=Conference.js.map