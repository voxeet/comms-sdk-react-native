export enum Quality {
  SD,
  MD,
  HD
}

export interface ParticipantQuality {
  participantId: string,
  quality: Quality
}