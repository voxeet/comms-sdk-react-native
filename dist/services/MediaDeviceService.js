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
import { ComfortNoiseLevel } from "./mediaDevice";
const { RNMediaDeviceServiceModule } = NativeModules;
export default class MediaDeviceService {
    switchCamera() {
        return __awaiter(this, void 0, void 0, function* () {
            return RNMediaDeviceServiceModule.switchCamera();
        });
    }
    setComfortNoiseLevel(comfortNoise) {
        return __awaiter(this, void 0, void 0, function* () {
            const str = ComfortNoiseLevel[comfortNoise];
            return RNMediaDeviceServiceModule.setComfortNoiseLevel(str);
        });
    }
    getComfortNoiseLevel() {
        return __awaiter(this, void 0, void 0, function* () {
            const output = RNMediaDeviceServiceModule.getComfortNoiseLevel();
            return ComfortNoiseLevel[output] || ComfortNoiseLevel.DEFAULT;
        });
    }
}
//# sourceMappingURL=MediaDeviceService.js.map