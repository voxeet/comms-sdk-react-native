import type {
  FileConverted as FileConvertedType,
  FilePresentation,
} from './models';

/** The FilePresentationServiceEventNames enum gathers events informing about the file presentation status. */
export enum FilePresentationServiceEventNames {
  /** Emitted when a file is converted. */
  FileConverted = 'EVENT_FILEPRESENTATION_FILE_CONVERTED',
  /** Emitted when a presenter starts a file presentation. */
  FilePresentationStarted = 'EVENT_FILEPRESENTATION_STARTED',
  /** Emitted when a presenter ends a file presentation. */
  FilePresentationStopped = 'EVENT_FILEPRESENTATION_STOPPED',
  /** Emitted when the presenter changes the displayed page of the shared file.  */
  FilePresentationUpdated = 'EVENT_FILEPRESENTATION_UPDATED',
}

/** The FileConvertedEventType interface gathers information about the converted file. */
export interface FileConvertedEventType {
  /** The object containing properties specific to the event. */
  fileConverted: FileConvertedType;
}

/** The FilePresentationChangedEventType interface gathers information about the presented file. */
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
