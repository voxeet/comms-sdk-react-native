import type {
  FileConverted as FileConvertedType,
  FilePresentation,
} from './models';

export enum FilePresentationServiceEventNames {
  /** Emitted when the file is converted. */
  FileConverted = 'FileConverted',
  /** Emitted when the presenter started the file presentation. */
  FilePresentationStarted = 'FilePresentationStarted',
  /** Emitted when the presenter ended the file presentation. */
  FilePresentationStopped = 'FilePresentationStopped',
  /** Emitted when the presenter changed the displayed page of the shared file.  */
  FilePresentationUpdated = 'FilePresentationUpdated',
}

export interface FileConvertedEventType {
  /** The object containing properties specific to the event. */
  e: FileConvertedType;
}
export interface FilePresentationStartedEventType {
  /** The object containing properties specific to the event. */
  e: FilePresentation;
}
export interface FilePresentationStoppedEventType {
  /** The object containing properties specific to the event. */
  e: FilePresentation;
}
export interface FilePresentationUpdatedEventType {
  /** The object containing properties specific to the event. */
  e: FilePresentation;
}

export interface FilePresentationServiceEventMap {
  [FilePresentationServiceEventNames.FileConverted]: FileConvertedEventType;
  [FilePresentationServiceEventNames.FilePresentationStarted]: FilePresentationStartedEventType;
  [FilePresentationServiceEventNames.FilePresentationStopped]: FilePresentationStoppedEventType;
  [FilePresentationServiceEventNames.FilePresentationUpdated]: FilePresentationUpdatedEventType;
}
