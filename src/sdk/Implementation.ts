import { NativeModules } from 'react-native';
import { IAPIEvents } from '..';
import IAPIRawEvent from './IAPIRawEvent';
const { RNDolbyioIAPISdk } = NativeModules;

export interface RefreshCallback {
  (): void;
}

export interface TokenRefreshCallback {
  (): Promise<string>;
}

const events = new IAPIEvents();

export default class IAPISDKImpl {
  refreshAccessTokenCallback: RefreshCallback | null = null;

  get events() {
    return events;
  }

  initialize(consumerKey: string, consumerSecret: string): Promise<any> {
    return RNDolbyioIAPISdk.initialize(consumerKey, consumerSecret);
  }

  initializeToken(
    accessToken: string | undefined,
    refreshToken: TokenRefreshCallback
  ) {
    if (!this.refreshAccessTokenCallback) {
      this.refreshAccessTokenCallback = () => {
        refreshToken()
          .then((token) => RNDolbyioIAPISdk.onAccessTokenOk(token))
          .catch((err) => {
            console.error('Error while refreshing token', err);
            RNDolbyioIAPISdk.onAccessTokenKo('Token retrieval error');
          });
      };
      IAPIRawEvent.addListener('refreshToken', () => {
        this.refreshAccessTokenCallback && this.refreshAccessTokenCallback();
      });
    }

    return RNDolbyioIAPISdk.initializeToken(accessToken);
  }
}
