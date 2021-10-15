import type { Participant } from '../conference/models';

// TODO Temporary File type
export interface File {
  /** Path to test .jpg */
  url: string;
}

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

export interface FilePresentation {
  /** The file ID. */
  id: string;
  /** The file owner. */
  owner: Participant;
  /** The number of images in the presentation. */
  imageCount?: number;
  /** The number of the currently displayed image of the shared file. */
  position?: number;
}
