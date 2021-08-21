import { FilePresentationConverted } from "../events/FilePresentationEvents";
import { FilePresentation } from "./presentation";

export default class FilePresentationService {
  public async getImage(fileId: string, pageNumber: number): Promise<string> {
    throw "not implemented";
  }

  public async getThumbnail(fileId: string, pageNumber: number): Promise<string> {
    throw "not implemented";
  }

  public async convertFile(filePath: string): Promise<FilePresentation> {
    throw "not implemented";
  }

  public async start(body: FilePresentationConverted, position: number = 0): Promise<FilePresentation> {
    throw "not implemented";
  }

  public async stop(body: FilePresentationConverted): Promise<FilePresentation> {
    throw "not implemented";
  }

  public async update(filePresentation: FilePresentation, position: number): Promise<FilePresentation> {
    throw "not implemented";
  }
}