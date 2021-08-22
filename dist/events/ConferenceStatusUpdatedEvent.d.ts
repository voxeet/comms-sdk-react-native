import { ConferenceStatus, PermissionRefusedType } from "../services/conference";
/**
 * conferenceId and conferenceAlias can be empty on iOS if the status is LEFT (null or length = 0)
 * This is because the SDK is not currently handling sending conference information in the event
 */
export interface ConferenceStatusUpdatedEvent {
    conferenceId?: string;
    conferenceAlias?: string;
    status: ConferenceStatus;
}
export interface PermissionRefusedEvent {
    permission: PermissionRefusedType;
}
export interface CameraSwitchSuccessEvent {
    isFront: boolean;
}
export interface CameraSwitchErrorEvent {
    message: string;
}
export interface QualityIndicators {
    mos: number;
}
export interface RecordingStatusUpdatedEvent {
    conferenceId: string;
    participantId: string;
    recordingStatus: string;
}
export interface ConferenceDestroyedPush {
    conferenceId: string;
}
export interface ConferenceEnded {
    conferenceId: string;
}
