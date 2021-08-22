var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AudioService_emitter;
import { NativeModules } from 'react-native';
const { RNAudioDeviceServiceModule } = NativeModules;
import { toConnectionState, toDeviceType, fromConnectionState, fromDeviceType } from "./audio";
import AbstractService from "./AbstractService";
import { EventEmitter2 } from 'eventemitter2';
function toMap(mediaDevice) {
    //map the various non enum to the JS's enum values
    const deviceType = fromDeviceType(mediaDevice.deviceType);
    const connectionState = fromConnectionState(mediaDevice.connectionState);
    const platformConnectionState = fromConnectionState(mediaDevice.platformConnectionState);
    return Object.assign(Object.assign({}, mediaDevice), { deviceType, connectionState, platformConnectionState });
}
const toMediaDevice = (map) => {
    //map the various non enum to the JS's enum values
    const deviceType = toDeviceType(map.deviceType);
    const connectionState = toConnectionState(map.connectionState);
    const platformConnectionState = toConnectionState(map.platformConnectionState);
    return Object.assign(Object.assign({}, map), { deviceType, connectionState, platformConnectionState });
};
export default class AudioService extends AbstractService {
    constructor() {
        super(RNAudioDeviceServiceModule);
        _AudioService_emitter.set(this, new EventEmitter2());
        this.events.addListener("MediaDevices", (devices) => {
            const mapped = devices.map(toMediaDevice);
            __classPrivateFieldGet(this, _AudioService_emitter, "f").emit("MediaDevices", mapped);
        });
    }
    registerUpdateDevices(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            this.emitter.addListener("MediaDevices", callback);
            return () => {
                //this will unregister the listener
                this.emitter.removeListener("MediaDevices", callback);
            };
        });
    }
    enumerateDevices() {
        return __awaiter(this, void 0, void 0, function* () {
            const devices = yield RNAudioDeviceServiceModule.enumerateDevices();
            return devices.map(toMediaDevice);
        });
    }
    currentMediaDevice() {
        return __awaiter(this, void 0, void 0, function* () {
            const mediaDevice = yield RNAudioDeviceServiceModule.currentMediaDevice();
            return toMediaDevice(mediaDevice);
        });
    }
    connect(mediaDevice) {
        return __awaiter(this, void 0, void 0, function* () {
            return RNAudioDeviceServiceModule.connect(toMap(mediaDevice));
        });
    }
    disconnect(mediaDevice) {
        return __awaiter(this, void 0, void 0, function* () {
            return RNAudioDeviceServiceModule.disconnect(toMap(mediaDevice));
        });
    }
    checkOutputRoute() {
        return __awaiter(this, void 0, void 0, function* () {
            return RNAudioDeviceServiceModule.checkOutputRoute();
        });
    }
    requestAudioFocus() {
        return __awaiter(this, void 0, void 0, function* () {
            return RNAudioDeviceServiceModule.requestAudioFocus();
        });
    }
    abandonAudioFocusRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            return RNAudioDeviceServiceModule.abandonAudioFocusRequest();
        });
    }
}
_AudioService_emitter = new WeakMap();
//# sourceMappingURL=AudioService.js.map