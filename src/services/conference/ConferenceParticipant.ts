export interface ParticipantInfo {
  externalId?: string,
  name?: string,
  avatarUrl?: string
}

export default class ConferenceParticipant implements ParticipantInfo {

  constructor(
    public externalId?: string,
    public name?: string,
    public avatarUrl?: string
  ) { }

}
