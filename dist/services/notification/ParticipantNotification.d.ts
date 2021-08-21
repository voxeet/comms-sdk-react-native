import { ConferenceParticipantStatus, ParticipantInfo } from "../conference";
export interface ParticipantNotification {
    id: string;
    participantInfo: ParticipantInfo;
    status: ConferenceParticipantStatus;
}
