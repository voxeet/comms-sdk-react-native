var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { toConnectionState, toDeviceType } from "./audio";
export default class AudioService {
    registerUpdateDevices(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const real_callback = (devices) => {
                const mapped = devices.map((d) => {
                    //map the various non enum to the JS's enum values
                    const deviceType = toDeviceType(d.deviceType);
                    const connectionState = toConnectionState(d.connectionState);
                    const platformConnectionState = toConnectionState(d.platformConnectionState);
                    return Object.assign(Object.assign({}, d), { deviceType, connectionState, platformConnectionState });
                });
                callback(mapped);
            };
            const unregister = () => {
                //will call unregistering the wrapper
            };
            throw "not implemented";
            //TODO return the 
        });
    }
    enumerateDevices() {
        return __awaiter(this, void 0, void 0, function* () {
            throw "not implemented";
        });
    }
    currentMediaDevice() {
        return __awaiter(this, void 0, void 0, function* () {
            throw "not implemented";
        });
    }
    connect(mediaDevice) {
        return __awaiter(this, void 0, void 0, function* () {
            throw "not implemented";
        });
    }
    disconnect(mediaDevice) {
        return __awaiter(this, void 0, void 0, function* () {
            throw "not implemented";
        });
    }
    checkOutputRoute() {
        return __awaiter(this, void 0, void 0, function* () {
            throw "not implemented";
        });
    }
    requestAudioFocus() {
        return __awaiter(this, void 0, void 0, function* () {
            throw "not implemented";
        });
    }
    abandonAudioFocusRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            throw "not implemented";
        });
    }
}
//# sourceMappingURL=AudioService.js.map