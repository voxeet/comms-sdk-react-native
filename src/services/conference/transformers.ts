import type { Conference, Participant } from './models';

export const transformToConference = (c: Conference) => {
  const { id, alias, isNew, participants, status, spatialAudioStyle } = c;
  return {
    id,
    alias,
    isNew,
    participants: participants.map(transformToParticipant),
    status,
    spatialAudioStyle,
  };
};

export const transformToParticipant = (p: Participant) => {
  const { id, info, status, type, streams } = p;
  return {
    id,
    info,
    status,
    type,
    streams: streams,
  };
};
