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
const { RNFilePresentationService } = NativeModules;
//TODO export its events
export default class VideoPresentationService {
    start(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return RNFilePresentationService.start(url);
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            return RNFilePresentationService.stop();
        });
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            return RNFilePresentationService.play();
        });
    }
    pause(timestamp) {
        return __awaiter(this, void 0, void 0, function* () {
            return RNFilePresentationService.pause(timestamp);
        });
    }
    seek(timestamp) {
        return __awaiter(this, void 0, void 0, function* () {
            return RNFilePresentationService.seek(timestamp);
        });
    }
    getCurrentPresentation() {
        return __awaiter(this, void 0, void 0, function* () {
            return RNFilePresentationService.getCurrentPresentation();
        });
    }
}
//# sourceMappingURL=VideoPresentationService.js.map