import type { RecordingStatus } from './models';

/** The RecordingServiceEventNames enum gathers the RecordingService events.  */
export enum RecordingServiceEventNames {
  /** Emitted when a recording status changes.  */
  StatusUpdated = 'EVENT_RECORDING_STATUS_UPDATED',
}

/** The RecordingStatusUpdated interface gathers information about the received invitation. */
export interface RecordingStatusUpdatedEventType {
  /** The recording status. */
  recordingStatus: RecordingStatus;
  /** The unique identifier of the conference. */
  conferenceId: string;
  /** The unique identifier the participant who changed the recording status. */
  participantId: string;
  /** The timestamp of when the recording status changed. */
  timestamp: number;
}

export interface RecordingServiceEventMap {
  [RecordingServiceEventNames.StatusUpdated]: RecordingStatusUpdatedEventType;
}
