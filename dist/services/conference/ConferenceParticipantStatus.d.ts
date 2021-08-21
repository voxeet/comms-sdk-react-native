export declare enum ConferenceParticipantStatus {
    IN_PROGRESS = "IN_PROGRESS",
    ON_AIR = "ON_AIR",
    LATER = "LATER",
    DECLINE = "DECLINE",
    LEFT = "LEFT",
    MISSED = "MISSED",
    RESERVED = "RESERVED",
    CONNECTING = "CONNECTING",
    INACTIVE = "INACTIVE",
    WARNING = "WARNING",
    ERROR = "ERROR",
    UNKNOWN = "UNKNOWN",
    KICKED = "KICKED"
}
export declare function toConferenceParticipantStatus(value: ConferenceParticipantStatus | string): any;
