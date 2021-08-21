import { FilePresentationConverted } from "../events/FilePresentationEvents";
import { FilePresentation } from "./presentation";
export default class FilePresentationService {
    getImage(fileId: string, pageNumber: number): Promise<string>;
    getThumbnail(fileId: string, pageNumber: number): Promise<string>;
    convertFile(filePath: string): Promise<FilePresentation>;
    start(body: FilePresentationConverted, position?: number): Promise<FilePresentation>;
    stop(body: FilePresentationConverted): Promise<FilePresentation>;
    update(filePresentation: FilePresentation, position: number): Promise<FilePresentation>;
}
