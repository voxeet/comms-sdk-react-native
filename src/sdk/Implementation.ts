import { DeviceEventEmitter, NativeEventEmitter, NativeModules, Platform } from 'react-native';
const { RNVoxeetSDK } = NativeModules;

export interface RefreshCallback {
  (): void;
};

export interface TokenRefreshCallback {
  (): Promise<string>
};

const events = new NativeEventEmitter(RNVoxeetSDK);

export default class VoxeetSDKImpl {
  refreshAccessTokenCallback: RefreshCallback|null = null;

  get events() { return events; }

  initialize(consumerKey: string, consumerSecret: string): Promise<any> {
      return RNVoxeetSDK.initialize(consumerKey, consumerSecret);
  }

  initializeToken(accessToken: string|undefined, refreshToken: TokenRefreshCallback) {
    if(!this.refreshAccessTokenCallback) {
      this.refreshAccessTokenCallback = () => {
        refreshToken()
        .then(token => RNVoxeetSDK.onAccessTokenOk(token))
        .catch(err => {
          console.error("Error while refreshing token", err);
          RNVoxeetSDK.onAccessTokenKo("Token retrieval error");
        });
      }
      const eventEmitter = Platform.OS == "android" ? DeviceEventEmitter : new NativeEventEmitter(RNVoxeetSDK);
      eventEmitter.addListener("refreshToken", () => {
        this.refreshAccessTokenCallback && this.refreshAccessTokenCallback();
      });
    }

    return RNVoxeetSDK.initializeToken(accessToken);
  }
}