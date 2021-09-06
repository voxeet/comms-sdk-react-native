import { NativeModules } from 'react-native';
import type { FilePresentationConverted } from '../events/FilePresentationEvents';
import type { FilePresentation } from './presentation';
import { stringToPresentationState } from './presentation/PresentationState';

const { RNFilePresentationService } = NativeModules;

function toPresentationState(presentation: any) {
  return {
    ...presentation,
    state: stringToPresentationState(presentation.state),
  };
}

export default class FilePresentationService {
  public async getImage(fileId: string, pageNumber: number): Promise<string> {
    return RNFilePresentationService.getImage(fileId, pageNumber);
  }

  public async getThumbnail(
    fileId: string,
    pageNumber: number
  ): Promise<string> {
    return RNFilePresentationService.getThumbnail(fileId, pageNumber);
  }

  public async convertFile(filePath: string): Promise<FilePresentation> {
    const presentation = await RNFilePresentationService.convertFile(filePath);
    return toPresentationState(presentation);
  }

  public async start(
    body: FilePresentationConverted,
    position: number = 0
  ): Promise<FilePresentation> {
    const presentation = await RNFilePresentationService.start(body, position);
    return toPresentationState(presentation);
  }

  public async stop(
    body: FilePresentationConverted
  ): Promise<FilePresentation> {
    const presentation = await RNFilePresentationService.stop(body);
    return toPresentationState(presentation);
  }

  public async update(
    filePresentation: FilePresentation,
    position: number
  ): Promise<FilePresentation> {
    const presentation = await RNFilePresentationService.update(
      filePresentation,
      position
    );
    return toPresentationState(presentation);
  }
}
