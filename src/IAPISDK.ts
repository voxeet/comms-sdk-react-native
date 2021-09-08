import { NativeModules } from 'react-native';
const { DolbyioIAPISdk } = NativeModules;
import type {
  RefreshAccessTokenType,
  RefreshAccessTokenInBackgroundType,
} from './types';
import NativeEvents from './utils/NativeEvents';

class DolbyIoSDK {
  refreshAccessTokenInBackground?: RefreshAccessTokenInBackgroundType | null =
    null;

  public async initialize(
    consumerKey: string,
    consumerSecret: string
  ): Promise<boolean> {
    return DolbyioIAPISdk.initialize(consumerKey, consumerSecret);
  }

  public async initializeToken(
    accessToken: string | null,
    refreshAccessToken: RefreshAccessTokenType
  ): Promise<boolean> {
    if (!this.refreshAccessTokenInBackground) {
      this.refreshAccessTokenInBackground = async () => {
        try {
          const token = await refreshAccessToken();
          if (token) {
            DolbyioIAPISdk.onAccessTokenOk(token);
          }
        } catch (e) {
          console.error('Error while refreshing token', e);
          DolbyioIAPISdk.onAccessTokenKo('Token retrieval error');
          throw new Error('Token retrieval error');
        }
      };
      NativeEvents.addListener('refreshToken', () => {
        this.refreshAccessTokenInBackground &&
          this.refreshAccessTokenInBackground();
      });
    }
    return DolbyioIAPISdk.initializeToken(accessToken);
  }
}

export default new DolbyIoSDK();

// TO BE EXPORTED
// DolbyioIAPISdk.initialize
// DolbyioIAPISdk.initializeToken
// DolbyioIAPISdk.onAccessTokenOk
// DolbyioIAPISdk.onAccessTokenKo
