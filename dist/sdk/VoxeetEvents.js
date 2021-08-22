import { NativeModules, NativeEventEmitter } from 'react-native';
const { RNVoxeetConferencekit } = NativeModules;
const events = new NativeEventEmitter(RNVoxeetConferencekit);
export default class VoxeetEvents {
    constructor() {
    }
    addListener(type, listener) {
        const callback = (event) => listener(event);
        events.addListener(type, callback);
        return () => {
            events.removeListener(type, callback);
        };
    }
}
//# sourceMappingURL=VoxeetEvents.js.map