export interface ParticipantInfo {
    externalId?: string;
    name?: string;
    avatarUrl?: string;
}
export default class ConferenceParticipant implements ParticipantInfo {
    externalId?: string | undefined;
    name?: string | undefined;
    avatarUrl?: string | undefined;
    constructor(externalId?: string | undefined, name?: string | undefined, avatarUrl?: string | undefined);
}
