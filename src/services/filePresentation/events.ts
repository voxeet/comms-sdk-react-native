import type {
  FileConverted as FileConvertedType,
  FilePresentation,
} from './models';

export enum FilePresentationServiceEventNames {
  /** Emitted when the file is converted. */
  EVENT_FILE_PRESENTATION_FILE_CONVERTED = 'EVENT_FILE_PRESENTATION_FILE_CONVERTED',
  /** Emitted when the presenter started the file presentation. */
  EVENT_FILE_PRESENTATION_FILE_PRESENTATION_STARTED = 'EVENT_FILE_PRESENTATION_FILE_PRESENTATION_STARTED',
  /** Emitted when the presenter ended the file presentation. */
  EVENT_FILE_PRESENTATION_FILE_PRESENTATION_STOPPED = 'EVENT_FILE_PRESENTATION_FILE_PRESENTATION_STOPPED',
  /** Emitted when the presenter changed the displayed page of the shared file.  */
  EVENT_FILE_PRESENTATION_FILE_PRESENTATION_UPDATED = 'EVENT_FILE_PRESENTATION_FILE_PRESENTATION_UPDATED',
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
  [FilePresentationServiceEventNames.EVENT_FILE_PRESENTATION_FILE_CONVERTED]: FileConvertedEventType;
  [FilePresentationServiceEventNames.EVENT_FILE_PRESENTATION_FILE_PRESENTATION_STARTED]: FilePresentationChangedEventType;
  [FilePresentationServiceEventNames.EVENT_FILE_PRESENTATION_FILE_PRESENTATION_STOPPED]: FilePresentationChangedEventType;
  [FilePresentationServiceEventNames.EVENT_FILE_PRESENTATION_FILE_PRESENTATION_UPDATED]: FilePresentationChangedEventType;
}
