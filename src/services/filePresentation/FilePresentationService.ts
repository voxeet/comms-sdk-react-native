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

/**
 * The FilePresentationService allows presenting files during a conference. The Dolby.io Communications APIs service converts provided files into multiple images that are accessible through the image method.
 *
 */
export class FilePresentationService {
  /** @internal */
  _nativeModule = DolbyIoIAPIFilePresentationService;

  /** @internal */
  _nativeEvents = new NativeEvents(DolbyIoIAPIFilePresentationService || {});

  /**
   * Stops a file presentation.
   */
  public async stop(): Promise<void> {
    return this._nativeModule.stop();
  }

  /**
   * Starts a file presentation.
   * @param file The converted file that the presenter wants to share during the conference.
   */
  public async start(file: FileConverted): Promise<void> {
    return this._nativeModule.start(file);
  }

  /**
   * Provides the URL of a thumbnail that refers to a specific page of the presented file.
   * @param page The number of the presented page. Files that do not contain any pages, for example, jpg images, require setting the value of this parameter to 0.
   */
  public async getThumbnail(page: number): Promise<string> {
    return this._nativeModule.getThumbnail(page);
  }

  /**
   * Informs the service to send the updated page number to conference participants.
   * @param page The page number that corresponds to the required page.
   */
  public async setPage(page: number): Promise<void> {
    return this._nativeModule.setPage(page);
  }

  /**
   * Converts a provided file into multiple images. The file is uploaded as FormData.
   *
   * The supported file formats are:
   * - doc/docx (Microsoft Word)
   * - ppt/pptx
   * - pdf
   *
   * After the conversion, the files are broken into individual images with maximum 2560x1600 resolution.
   *
   * When a file is converted and ready to be presented, the application receives the [converted](#converted) event.
   * @param file The file that a presenter wants to share during a conference.
   */
  public async convert(file: File): Promise<FileConverted> {
    return this._nativeModule.convert(file);
  }

  /**
   * Returns information about the current state of the file presentation.
   */
  public async getCurrent(): Promise<FilePresentation> {
    return this._nativeModule.getCurrent();
  }

  /**
   * Downloads and displays locally the presented file by retrieving URLs of the individual images.
   * @param page The number of the presented page. Files that do not have any pages, for example, jpg images, require setting the page value to 0.
   */
  public async getImage(page: number): Promise<string> {
    return this._nativeModule.getImage(page);
  }

  /**
   * Adds a listener to the file converted event.
   * @param handler An event callback function.
   * @returns A function that unsubscribes from event listeners.
   */
  public onFileConverted(
    handler: (data: FileConvertedEventType) => void
  ): UnsubscribeFunction {
    return this._nativeEvents.addListener(
      FilePresentationServiceEventNames.FileConverted,
      handler
    );
  }

  /**
   * Adds a listener to the file presentation changed event.
   * @param handler An event callback function.
   * @returns A function that unsubscribes from event listeners.
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
