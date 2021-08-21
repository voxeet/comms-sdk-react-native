export var ConferenceParticipantStatus;
(function (ConferenceParticipantStatus) {
    ConferenceParticipantStatus["IN_PROGRESS"] = "IN_PROGRESS";
    ConferenceParticipantStatus["ON_AIR"] = "ON_AIR";
    ConferenceParticipantStatus["LATER"] = "LATER";
    ConferenceParticipantStatus["DECLINE"] = "DECLINE";
    ConferenceParticipantStatus["LEFT"] = "LEFT";
    ConferenceParticipantStatus["MISSED"] = "MISSED";
    ConferenceParticipantStatus["RESERVED"] = "RESERVED";
    ConferenceParticipantStatus["CONNECTING"] = "CONNECTING";
    ConferenceParticipantStatus["INACTIVE"] = "INACTIVE";
    ConferenceParticipantStatus["WARNING"] = "WARNING";
    ConferenceParticipantStatus["ERROR"] = "ERROR";
    ConferenceParticipantStatus["UNKNOWN"] = "UNKNOWN";
    ConferenceParticipantStatus["KICKED"] = "KICKED";
})(ConferenceParticipantStatus || (ConferenceParticipantStatus = {}));
export function toConferenceParticipantStatus(value) {
    if (typeof value === "string")
        return ConferenceParticipantStatus[value];
    return value;
}
//# sourceMappingURL=ConferenceParticipantStatus.js.map