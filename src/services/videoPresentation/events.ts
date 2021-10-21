import type { Participant } from '../conference/models';

export enum VideoPresentationEventNames {
  /** Emitted when a video presentation is paused. */
  paused = 'paused',
  /** Emitted when a video presentation is resumed. */
  played = 'played',
  /** Emitted when a video presentation is sought. */
  sought = 'sought',
  /** Emitted when a video presentation is started. */
  started = 'started',
  /** Emitted when a video presentation is stopped. */
  stopped = 'stopped',
}

export interface VideoPresentationEventType {
  /** The participant who started the presentation. */
  owner: Participant;
  /** The current video presentation timestamp used for seeking and pausing the video. */
  timestamp: number;
  /** The URL of the presented video file. */
  url: string;
}

export interface VideoPresentationEventMap {
  [VideoPresentationEventNames.played]: VideoPresentationEventType;
  [VideoPresentationEventNames.paused]: VideoPresentationEventType;
  [VideoPresentationEventNames.started]: VideoPresentationEventType;
  [VideoPresentationEventNames.sought]: VideoPresentationEventType;
  [VideoPresentationEventNames.stopped]: {};
}
