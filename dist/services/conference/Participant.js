export default class Participant {
    constructor(participantId, conferenceStatus, externalId, name, avatarUrl) {
        this.participantId = participantId;
        this.conferenceStatus = conferenceStatus;
        this.externalId = externalId;
        this.name = name;
        this.avatarUrl = avatarUrl;
    }
}
export const toParticipant = (raw) => new Participant(raw.participantId, raw.conferenceStatus, raw.externalId, raw.name, raw.avatarUrl);
//# sourceMappingURL=Participant.js.map