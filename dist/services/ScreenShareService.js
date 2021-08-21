var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class ScreenShareService {
    //start screenshare is not defined as it will be implemented in the native side only
    sendRequestStartScreenShare() {
        return __awaiter(this, void 0, void 0, function* () {
            throw "not implemented";
        });
    }
    stopScreenShare() {
        return __awaiter(this, void 0, void 0, function* () {
            throw "not implemented";
        });
    }
    setScreenSizeInformation(screenInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const point = { x: screenInfo.width, y: screenInfo.height };
            throw "not implemented";
        });
    }
}
//# sourceMappingURL=ScreenShareService.js.map