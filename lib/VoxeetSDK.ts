import { DeviceEventEmitter, NativeEventEmitter, NativeModules, Platform } from 'react-native';
import SessionService from "./services/SessionService";
const { RNVoxeetSDK } = NativeModules;

export interface RefreshCallback {
  (): void;
};

export interface TokenRefreshCallback {
  (): Promise<string>
};

class _VoxeetSDK {
  refreshAccessTokenCallback: RefreshCallback|null = null;
  public session = new SessionService();
  public events = new NativeEventEmitter(RNVoxeetSDK);

  initialize(consumerKey: string, consumerSecret: string): Promise<any> {
      return RNVoxeetSDK.initialize(consumerKey, consumerSecret);
  }

  initializeToken(accessToken: string|undefined, refreshToken: TokenRefreshCallback) {
    if(!this.refreshAccessTokenCallback) {
      this.refreshAccessTokenCallback = () => {
        refreshToken()
        .then(token => RNVoxeetSDK.onAccessTokenOk(token))
        .catch(err => {
          RNVoxeetSDK.onAccessTokenKo("Token retrieval error");
        });
      }
      const eventEmitter = Platform.OS == "android" ? DeviceEventEmitter : new NativeEventEmitter(RNVoxeetSDK);
      eventEmitter.addListener("refreshToken", (e: Event) => {
        this.refreshAccessTokenCallback && this.refreshAccessTokenCallback();
      });
    }

    return RNVoxeetSDK.initializeToken(accessToken);
  }
}

export default new _VoxeetSDK();