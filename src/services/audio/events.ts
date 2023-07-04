import type { RecorderStatus } from './models';

export interface AudioPreviewStatusChangedEventType {
  status: RecorderStatus;
}

export enum AudioPreviewEventNames {
  OnStatusChange = 'EVENT_AUDIO_PREVIEW_STATUS_CHANGED',
}

export interface AudioPreviewStatusChangedEventMap {
  [AudioPreviewEventNames.OnStatusChange]: AudioPreviewStatusChangedEventType;
}
