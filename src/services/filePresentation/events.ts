import type {
  FileConverted as FileConvertedType,
  FilePresentation,
} from './models';

export enum FilePresentationServiceEventNames {
  /** Emitted when the file is converted. */
  FileConverted = 'EVENT_FILE_PRESENTATION_FILE_CONVERTED',
  /** Emitted when the presenter started the file presentation. */
  FilePresentationStarted = 'EVENT_FILE_PRESENTATION_FILE_PRESENTATION_STARTED',
  /** Emitted when the presenter ended the file presentation. */
  FilePresentationStopped = 'EVENT_FILE_PRESENTATION_FILE_PRESENTATION_STOPPED',
  /** Emitted when the presenter changed the displayed page of the shared file.  */
  FilePresentationUpdated = 'EVENT_FILE_PRESENTATION_FILE_PRESENTATION_UPDATED',
}

export interface FileConvertedEventType {
  /** The object containing properties specific to the event. */
  fileConverted: FileConvertedType;
}

export interface FilePresentationChangedEventType {
  /** The object containing properties specific to the event. */
  filePresentation: FilePresentation;
}

export interface FilePresentationServiceEventMap {
  [FilePresentationServiceEventNames.FileConverted]: FileConvertedEventType;
  [FilePresentationServiceEventNames.FilePresentationStarted]: FilePresentationChangedEventType;
  [FilePresentationServiceEventNames.FilePresentationStopped]: FilePresentationChangedEventType;
  [FilePresentationServiceEventNames.FilePresentationUpdated]: FilePresentationChangedEventType;
}
