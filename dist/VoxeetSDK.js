import { DeviceEventEmitter, NativeEventEmitter, NativeModules, Platform } from 'react-native';
var RNVoxeetSDK = NativeModules.RNVoxeetSDK;
;
;
var _VoxeetSDK = /** @class */ (function () {
    function _VoxeetSDK() {
        this.refreshAccessTokenCallback = null;
    }
    _VoxeetSDK.prototype.initialize = function (consumerKey, consumerSecret) {
        return RNVoxeetSDK.initialize(consumerKey, consumerSecret);
    };
    _VoxeetSDK.prototype.initializeToken = function (accessToken, refreshToken) {
        var _this = this;
        if (!this.refreshAccessTokenCallback) {
            this.refreshAccessTokenCallback = function () {
                refreshToken()
                    .then(function (token) { return RNVoxeetSDK.onAccessTokenOk(token); })
                    .catch(function (err) {
                    RNVoxeetSDK.onAccessTokenKo("Token retrieval error");
                });
            };
            var eventEmitter = Platform.OS == "android" ? DeviceEventEmitter : new NativeEventEmitter(RNVoxeetSDK);
            eventEmitter.addListener("refreshToken", function (e) {
                _this.refreshAccessTokenCallback && _this.refreshAccessTokenCallback();
            });
        }
        return RNVoxeetSDK.initializeToken(accessToken);
    };
    return _VoxeetSDK;
}());
export default new _VoxeetSDK();
//# sourceMappingURL=VoxeetSDK.js.map