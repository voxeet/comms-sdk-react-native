import { DeviceEventEmitter, NativeEventEmitter, NativeModules, Platform } from 'react-native';
const { RNVoxeetSDK } = NativeModules;
;
;
const events = new NativeEventEmitter(RNVoxeetSDK);
export default class VoxeetSDKImpl {
    constructor() {
        this.refreshAccessTokenCallback = null;
    }
    get events() { return events; }
    initialize(consumerKey, consumerSecret) {
        return RNVoxeetSDK.initialize(consumerKey, consumerSecret);
    }
    initializeToken(accessToken, refreshToken) {
        if (!this.refreshAccessTokenCallback) {
            this.refreshAccessTokenCallback = () => {
                refreshToken()
                    .then(token => RNVoxeetSDK.onAccessTokenOk(token))
                    .catch(err => {
                    RNVoxeetSDK.onAccessTokenKo("Token retrieval error");
                });
            };
            const eventEmitter = Platform.OS == "android" ? DeviceEventEmitter : new NativeEventEmitter(RNVoxeetSDK);
            eventEmitter.addListener("refreshToken", (e) => {
                this.refreshAccessTokenCallback && this.refreshAccessTokenCallback();
            });
        }
        return RNVoxeetSDK.initializeToken(accessToken);
    }
}
//# sourceMappingURL=Implementation.js.map