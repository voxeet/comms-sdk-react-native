import { ParticipantInfo } from "./ConferenceParticipant";

export default class Participant implements ParticipantInfo {
  
  constructor(
    public participantId: string,
    public conferenceStatus?: string,
    public externalId?: string,
    public name?: string,
    public avatarUrl?: string) {
  }

}
