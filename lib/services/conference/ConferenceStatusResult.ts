import Participant from "./Participant";

export interface ConferenceStatusResult {
  conferenceId: string,
  conferenceAlias?: string,
  isLive: boolean,
  startTimestamp: number,
  participants: Participant[]
}