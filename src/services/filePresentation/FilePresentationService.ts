import { NativeModules } from 'react-native';

import NativeEvents from '../../utils/NativeEvents';
import type { UnsubscribeFunction } from '../conference/models';
import {
  FileConvertedEventType,
  FilePresentationChangedEventType,
  FilePresentationServiceEventNames,
} from './events';
import type { FileConverted, File, FilePresentation } from './models';

const { CommsAPIFilePresentationServiceModule } = NativeModules;

/**
 * The FilePresentationService allows presenting files during a conference. The Dolby.io Communications APIs service converts provided files into multiple images that are accessible through the [getImage](#getimage) method.
 *
 * **The file presentation workflow:**
 *
 * **1.** The presenter calls the [convert](#convert) method to upload and convert a file.
 *
 * **2.** The presenter receives [information](doc:rn-client-sdk-interfaces-fileconverted) about the converted file via the [onFileConverted](#onfileconverted) listener.
 *
 * **3.** The presenter calls the [start](#start) method to start presenting the file.
 *
 * **4.** The presenter and the viewers receive [information](doc:rn-client-sdk-interfaces-filepresentation) about the shared file via the [onFilePresentationChange](#onfilepresentationchange) listener. This information should trigger calling the [getImage](#getimage) method to download the converted file and display the proper page of the file by retrieving the individual images.
 *
 * **5.** The application is responsible for coordinating the page flip between the local and the presented files. The presenter calls the [update](#update) method to inform the service to send the updated page number to participants.
 *
 * **7.** The presenter and viewers receive [information](doc:rn-client-sdk-interfaces-filepresentation) about the updated file via the [onFilePresentationChange](#onfilepresentationchange) listener with the current page number. This information should trigger calling the [image](#image) method to display the proper page of the file.
 *
 * **8.** The presenter may call the [getThumbnail](#getthumbnail) method to obtain thumbnail images of the file and implement a carousel control for the presenting user to flip pages locally.
 *
 * **9.** The presenter calls the [stop](#stop) method to end the file presentation.
 *
 * **10.** The presenter and the viewers receive [information](doc:rn-client-sdk-interfaces-filepresentation) about the end of the file presentation via the [onFilePresentationChange](#onfilepresentationchange) listener.
 *
 */
export class FilePresentationService {
  /** @internal */
  _nativeModule = CommsAPIFilePresentationServiceModule;

  /** @internal */
  _nativeEvents = new NativeEvents(CommsAPIFilePresentationServiceModule || {});

  /**
   * Converts a provided file into multiple images. The file is uploaded as FormData.
   *
   * The supported file formats are:
   * - doc/docx (Microsoft Word)
   * - ppt/pptx
   * - pdf
   *
   * After the conversion, the files are broken into individual images with a maximum resolution of 2560x1600.
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
   * Starts a file presentation.
   * @param file The converted file that the presenter wants to share during the conference.
   */
  public async start(file: FileConverted): Promise<void> {
    return this._nativeModule.start(file);
  }

  /**
   * Stops a file presentation.
   */
  public async stop(): Promise<void> {
    return this._nativeModule.stop();
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
