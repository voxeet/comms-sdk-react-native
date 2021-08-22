import { Platform, DeviceEventEmitter, NativeEventEmitter } from "react-native";
export default class AbstractService {
    constructor(nativeModule) {
        this.events = Platform.OS == "android" ? DeviceEventEmitter : new NativeEventEmitter(nativeModule);
    }
}
//# sourceMappingURL=AbstractService.js.map