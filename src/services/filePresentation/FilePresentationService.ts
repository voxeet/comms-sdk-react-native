import { NativeModules } from 'react-native';

import NativeEvents from '../../utils/NativeEvents';
import type { UnsubscribeFunction } from '../conference/models';
import {
  FileConvertedEventType,
  FilePresentationChangedEventType,
  FilePresentationServiceEventNames,
} from './events';
import type { FileConverted, File, FilePresentation } from './models';

const { DolbyIoIAPIFilePresentationService } = NativeModules;

export class FilePresentationService {
  /** @internal */
  _nativeModule = DolbyIoIAPIFilePresentationService;

  /** @internal */
  _nativeEvents = new NativeEvents(DolbyIoIAPIFilePresentationService || {});

  /**
   * Stops the file presentation.
   * @returns {Promise<void>}
   */

  public async stop(): Promise<void> {
    return this._nativeModule.stop();
  }

  /**
   * Starts a file presentation.
   * @param file<FileConverted> The converted file that the presenter wants to share during the conference.
   * @returns {Promise<void>}
   */

  public async start(file: FileConverted): Promise<void> {
    return this._nativeModule.start(file);
  }

  /**
   * Provides the thumbnail's URL that refers to a specific page of the presented file.
   * @param page<number> The number of the presented page. Files that do not include any pages, for example jpg images, require setting the value of this parameter to 0.
   * @returns {Promise<string>}
   */

  public async getThumbnail(page: number): Promise<string> {
    return this._nativeModule.getThumbnail(page);
  }

  /**
   * Informs the service to send the updated page number to the conference participants.
   * @param page<number> The page number that corresponds to the page that should be presented.
   * @returns {Promise<void>}
   */

  public async setPage(page: number): Promise<void> {
    return this._nativeModule.setPage(page);
  }

  /**
   * Returns information about the current recording. Use this accessor if you wish to receive information that is available in the Recording object, such as the ID of the participant who started the recording or the timestamp that informs when the recording was started.
   * @param file<File> 	The file that the presenter wants to share during the conference.
   * @returns {Promise<FileConverted>} Promise with the FileConverted object.
   */
  public async convert(file: File): Promise<FileConverted> {
    return this._nativeModule.convert(file);
  }

  /**
   * Gets current file presentation.
   * @returns {Promise<FilePresentation>} Promise with the FilePresentation object
   */
  public async getCurrent(): Promise<FilePresentation> {
    return this._nativeModule.getCurrent();
  }

  /**
   * Downloads and displays locally the presented file by retrieving URLs of the individual images.
   * @param page<number> The number of the presented page. Files that do not have any pages, for example jpg images, require setting the value of the page parameter to 0.
   * @returns {Promise<string>}
   */
  public async getImage(page: number): Promise<string> {
    return this._nativeModule.getImage(page);
  }

  /**
   * Add a handler for file converted
   * @param handler<(data: FileConvertedEventType) => void> Handling function
   * @returns {UnsubscribeFunction} Function that removes handler
   */
  public onFileConverted(
    handler: (data: FileConvertedEventType) => void
  ): UnsubscribeFunction {
    return this._nativeEvents.addListener(
      FilePresentationServiceEventNames.FileConverted,
      (data) => {
        handler(data);
      }
    );
  }

  /**
   * Add a handler for file presentation changes
   * @param handler<(data: FilePresentationChangedEventType, type?:
   *  | FilePresentationServiceEventNames.FilePresentationStarted
   *  | FilePresentationServiceEventNames.FilePresentationStopped
   *  | FilePresentationServiceEventNames.FilePresentationUpdated) => void> Handling function
   * @returns {UnsubscribeFunction} Function that removes handler
   */

  public onFilePresentationChange(
    handler: (
      data: FilePresentationChangedEventType,
      type?:
        | FilePresentationServiceEventNames.FilePresentationStarted
        | FilePresentationServiceEventNames.FilePresentationStopped
        | FilePresentationServiceEventNames.FilePresentationUpdated
    ) => void
  ): UnsubscribeFunction {
    const filePresentationStartedEventUnsubscribe =
      this._nativeEvents.addListener(
        FilePresentationServiceEventNames.FilePresentationStarted,
        handler
      );
    const filePresentationStoppedEventUnsubscribe =
      this._nativeEvents.addListener(
        FilePresentationServiceEventNames.FilePresentationStopped,
        handler
      );
    const filePresentationUpdatedEventUnsubscribe =
      this._nativeEvents.addListener(
        FilePresentationServiceEventNames.FilePresentationUpdated,
        handler
      );

    return () => {
      filePresentationStartedEventUnsubscribe();
      filePresentationStoppedEventUnsubscribe();
      filePresentationUpdatedEventUnsubscribe();
    };
  }
}

export default new FilePresentationService();
