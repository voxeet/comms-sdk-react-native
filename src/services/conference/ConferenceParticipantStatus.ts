export enum ConferenceParticipantStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  ON_AIR = 'ON_AIR',
  LATER = 'LATER',
  DECLINE = 'DECLINE',
  LEFT = 'LEFT',
  MISSED = 'MISSED',
  RESERVED = 'RESERVED',
  CONNECTING = 'CONNECTING',
  INACTIVE = 'INACTIVE',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  UNKNOWN = 'UNKNOWN',
  KICKED = 'KICKED',
}

export function toConferenceParticipantStatus(
  value: ConferenceParticipantStatus | string
) {
  if (typeof value === 'string')
    return ConferenceParticipantStatus[value as 'IN_PROGRESS'];
  return value;
}
