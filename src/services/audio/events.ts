import type { AudioPreviewStatus } from './models';

/** The AudioPreviewStatusChangedEventType model gathers information about changes of audio preview status.
 * The model is supported in SDK 3.10 and later.
 */
export interface AudioPreviewStatusChangedEventType {
  /** The recording status.  */
  status: AudioPreviewStatus;
}

/** The AudioPreviewEventNames enum gathers the AudioPreview events.  */
export enum AudioPreviewEventNames {
  OnStatusChange = 'EVENT_AUDIO_PREVIEW_STATUS_CHANGED',
}

export interface AudioPreviewStatusChangedEventMap {
  [AudioPreviewEventNames.OnStatusChange]: AudioPreviewStatusChangedEventType;
}
