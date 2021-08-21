import { Participant, ParticipantInfo } from "./conference";
export default class SessionService {
    open(participant: ParticipantInfo): Promise<boolean>;
    close(): Promise<boolean>;
    isLocalParticipant(participant: Participant): Promise<boolean>;
    isSocketOpen(): Promise<boolean>;
}
