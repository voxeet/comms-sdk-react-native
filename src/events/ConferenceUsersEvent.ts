import type { Participant, MediaStream } from '../services/conference';

export interface ParticipantAddedEvent {
  participant: Participant;
}

export interface ParticipantUpdatedEvent {
  participant: Participant;
}

export interface StreamAddedEvent {
  participant: Participant;
  mediaStream: MediaStream;
}

export interface StreamRemovedEvent {
  participant: Participant;
  mediaStream: MediaStream;
}

export interface StreamUpdatedEvent {
  participant: Participant;
  mediaStream: MediaStream;
}

export interface ConferenceParticipantQualityUpdatedEvent {
  participant: Participant;
}
