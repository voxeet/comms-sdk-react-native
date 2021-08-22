import { NativeModules, NativeEventEmitter, DeviceEventEmitter, Platform } from 'react-native';
import { ConferenceStatus, PermissionRefusedType } from '../services/conference';
const { RNVoxeetSDK } = NativeModules;
/**
 *
 * @param type  the expected type from which event is of type
 * @param event the event content which will be transformed to the expected interface (enum values are string => to transform)
 */
function transformNativeEvent(type, event) {
    switch (type) {
        case "ConferenceStatusUpdatedEvent": return Object.assign(Object.assign({}, event), { status: ConferenceStatus[event.status] });
        case "PermissionRefusedEvent": return Object.assign(Object.assign({}, event), { permission: PermissionRefusedType[event.permission] });
        default: return event; //no other transformation from native's string to JS's enum values
    }
}
const events = Platform.OS == "android" ? DeviceEventEmitter : new NativeEventEmitter(RNVoxeetSDK);
export default class VoxeetEvents {
    constructor() {
    }
    addListener(type, listener) {
        const callback = (event) => listener(transformNativeEvent(type, event));
        events.addListener(type, callback);
        return () => {
            events.removeListener(type, callback);
        };
    }
}
//# sourceMappingURL=VoxeetEvents.js.map