var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NativeModules } from "react-native";
import { stringToPresentationState } from "./presentation/PresentationState";
const { RNFilePresentationService } = NativeModules;
function toPresentationState(presentation) {
    return Object.assign(Object.assign({}, presentation), { state: stringToPresentationState(presentation.state) });
}
export default class FilePresentationService {
    getImage(fileId, pageNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return RNFilePresentationService.getImage(fileId, pageNumber);
        });
    }
    getThumbnail(fileId, pageNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return RNFilePresentationService.getThumbnail(fileId, pageNumber);
        });
    }
    convertFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const presentation = yield RNFilePresentationService.convertFile(filePath);
            return toPresentationState(presentation);
        });
    }
    start(body, position = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            const presentation = yield RNFilePresentationService.start(body, position);
            return toPresentationState(presentation);
        });
    }
    stop(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const presentation = yield RNFilePresentationService.stop(body);
            return toPresentationState(presentation);
        });
    }
    update(filePresentation, position) {
        return __awaiter(this, void 0, void 0, function* () {
            const presentation = yield RNFilePresentationService.update(filePresentation, position);
            return toPresentationState(presentation);
        });
    }
}
//# sourceMappingURL=FilePresentationService.js.map