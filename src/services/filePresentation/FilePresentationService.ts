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
 * The FilePresentationService allows presenting files during a conference.
 * The Dolby.io Communications APIs service converts the user-provided file into
 * multiple pages, as images, accessible through the image method.
 */
export class FilePresentationService {
  /** @internal */
  _nativeModule = DolbyIoIAPIFilePresentationService;

  /** @internal */
  _nativeEvents = new NativeEvents(DolbyIoIAPIFilePresentationService || {});

  /**
   * Stops the file presentation.
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
   * Provides the thumbnail's URL that refers to a specific page of the presented file.
   * @param page The number of the presented page. Files that do not include any pages, for example jpg images, require setting the value of this parameter to 0.
   */
  public async getThumbnail(page: number): Promise<string> {
    return this._nativeModule.getThumbnail(page);
  }

  /**
   * Informs the service to send the updated page number to the conference participants.
   * @param page The page number that corresponds to the page that should be presented.
   */
  public async setPage(page: number): Promise<void> {
    return this._nativeModule.setPage(page);
  }

  /**
   * Returns information about the current recording. Use this accessor if you wish to receive information that is available in the Recording object, such as the ID of the participant who started the recording or the timestamp that informs when the recording was started.
   * @param file The file that the presenter wants to share during the conference.
   */
  public async convert(file: File): Promise<FileConverted> {
    return this._nativeModule.convert(file);
  }

  /**
   * Gets current file presentation.
   */
  public async getCurrent(): Promise<FilePresentation> {
    return this._nativeModule.getCurrent();
  }

  /**
   * Downloads and displays locally the presented file by retrieving URLs of the individual images.
   * @param page The number of the presented page. Files that do not have any pages, for example jpg images, require setting the value of the page parameter to 0.
   */
  public async getImage(page: number): Promise<string> {
    return this._nativeModule.getImage(page);
  }

  /**
   * Adds a listener for file converted event
   * @param handler Event callback function
   * @returns Function that unsubscribes from listeners
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
   * Adds a listener for file presentation changed event
   * @param handler Event callback function
   * @returns Function that unsubscribes from listeners
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
