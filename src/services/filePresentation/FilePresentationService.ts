import type { FileConverted } from './models';
import { NativeModules } from 'react-native';

const { DolbyIoIAPIFilePresentationService } = NativeModules;

export class FilePresentationService {
  /**
   * Stops the file presentation.
   * @returns {Promise<void>}
   */

  public async stop(): Promise<void> {
    return DolbyIoIAPIFilePresentationService.stop();
  }

  /**
   * Starts a file presentation.
   * @param file<FileConverted> The converted file that the presenter wants to share during the conference.
   * @returns {Promise<void>}
   */

  public async start(file: FileConverted): Promise<void> {
    return DolbyIoIAPIFilePresentationService.start(file);
  }

  /**
   * Provides the thumbnail's URL that refers to a specific page of the presented file.
   * @param page<number> The number of the presented page. Files that do not include any pages, for example jpg images, require setting the value of this parameter to 0.
   * @returns {Promise<string>}
   */

  public async getThumbnail(page: number): Promise<string> {
    return DolbyIoIAPIFilePresentationService.getThumbnail(page);
  }

  /**
   * Informs the service to send the updated page number to the conference participants.
   * @param page<number> The page number that corresponds to the page that should be presented.
   * @returns {Promise<void>}
   */

  public async setPage(page: number): Promise<void> {
    return DolbyIoIAPIFilePresentationService.setPage(page);
  }
}

export default new FilePresentationService();
