import type { Participant } from '../conference/models';

export interface VideoPresentation {
  /** The participant who started the presentation. */
  owner: Participant;
  /** The current video presentation timestamp used for seeking and pausing the video. */
  timestamp: number;
  /** The URL of the presented video file. */
  url: string;
}

export enum VideoPresentationState {
  /** The video presentation is paused. */
  PAUSED = 'paused',
  /** The video presentation is played. */
  PLAYING = 'playing',
  /** The video presentation is stopped. */
  STOPPED = 'stopped',
}
