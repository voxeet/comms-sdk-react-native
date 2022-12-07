/** The Recording interface gathers information about a conference recording. */
export interface Recording {
  /** The ID of the participant who started the recording. */
  participantId: string;
  /** The timestamp that informs when the recording was started. */
  startTimestamp: number;
}

/** The recording status. */
export enum RecordingStatus {
  /** The recording is started. */
  RECORDING = 'RECORDING',
  /** The recording is stopped. */
  NOT_RECORDING = 'NOT_RECORDING',
}
