import { ParticipantInfo } from "./ConferenceParticipant";
export default class Participant implements ParticipantInfo {
    participantId: string;
    conferenceStatus?: string | undefined;
    externalId?: string | undefined;
    name?: string | undefined;
    avatarUrl?: string | undefined;
    constructor(participantId: string, conferenceStatus?: string | undefined, externalId?: string | undefined, name?: string | undefined, avatarUrl?: string | undefined);
}
