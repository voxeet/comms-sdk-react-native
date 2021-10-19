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
  [FilePresentationServiceEventNames.EVENT_FILE_PRESENTATION_FILE_CONVERTED]: FileConvertedEventType;
  [FilePresentationServiceEventNames.EVENT_FILE_PRESENTATION_FILE_PRESENTATION_STARTED]: FilePresentationStartedEventType;
  [FilePresentationServiceEventNames.EVENT_FILE_PRESENTATION_FILE_PRESENTATION_STOPPED]: FilePresentationStoppedEventType;
  [FilePresentationServiceEventNames.EVENT_FILE_PRESENTATION_FILE_PRESENTATION_UPDATED]: FilePresentationUpdatedEventType;
}
