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
