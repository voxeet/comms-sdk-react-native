import type { Participant } from '../conference/models';

/** The File interface gathers information about a file that a presenter wants to share during a conference. */
export interface File {
  /** The URL of a file. */
  url: string;
}

/** The FileConverted interface gathers information about the converted file. */
export interface FileConverted {
  /** The file ID. */
  id: string;
  /** The number of images within the converted file. */
  imageCount: number;
  /** The file name. */
  name?: string;
  /** The ID of the participant who converted the file. */
  ownerId?: string;
  /** The size of the converted file. */
  size?: number;
}

/** The FilePresentation interface gathers information about a file presentation. */
export interface FilePresentation {
  /** The file ID. */
  id: string;
  /** The number of images within a file presentation. */
  imageCount?: number;
  /** The file owner. */
  owner: Participant;
  /** The number of the currently displayed image. */
  position?: number;
}
