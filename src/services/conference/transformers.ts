import type { Conference, Participant } from './models';

export const transformToConference = (c: Conference) => {
  const { id, alias, isNew, participants, status } = c;
  return {
    id,
    alias,
    isNew,
    participants: participants.map(transformToParticipant),
    status,
  };
};

export const transformToParticipant = (p: Participant) => {
  const { id, info, status, type } = p;
  return {
    id,
    info,
    status,
    type,
  };
};
