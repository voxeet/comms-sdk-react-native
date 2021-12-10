import type { Participant } from '../conference/models';

/** The VideoPresentation interface gathers information about a video presentation. */
export interface VideoPresentation {
  /** The participant who started the presentation. */
  owner: Participant;
  /** The current video presentation timestamp used for seeking and pausing the video. */
  timestamp: number;
  /** The URL of the presented video file. */
  url: string;
}

/** The VideoPresentationState enum gathers the possible statuses of a video presentation. */
export enum VideoPresentationState {
  /** The video presentation is paused. */
  PAUSED = 'paused',
  /** The video presentation is played. */
  PLAYING = 'playing',
  /** The video presentation is stopped. */
  STOPPED = 'stopped',
}
