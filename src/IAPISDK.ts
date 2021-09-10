import { NativeModules } from 'react-native';
const { DolbyioIAPISdk } = NativeModules;
import type {
  RefreshAccessTokenType,
  RefreshAccessTokenInBackgroundType,
} from './types';
import Logger from './utils/Logger';
import NativeEvents from './utils/NativeEvents';
import { SDKEventNames } from './types';

/**
 * @category IAPISDK
 * @module IAPISDK
 */

export class IAPISDK {
  #refreshAccessTokenInBackground?: RefreshAccessTokenInBackgroundType | null =
    null;

  // TODO: TO BE DEPRECATED
  /**
   * Initializes the SDK using the customer key and secret.
   * @param consumerKey  The customer key.
   * @param consumerSecret  The customer secret.
   */
  public async initialize(
    consumerKey: string,
    consumerSecret: string
  ): Promise<boolean> {
    Logger.warning(
      'Initialize method is deprecated. For security reasons Dolby recommends the initializeToken method in production. Use initialize method for prototyping of the app only.'
    );
    return DolbyioIAPISdk.initialize(consumerKey, consumerSecret);
  }

  /**
   * Initialize the SDK with an access token that is provided by the customer backend communicating with Dolby.io servers. The token allows securing the customer key and secret.
   * The following diagram presents the authentication flow:
   * ```
   * Client          Customer Server       Dolby Server
   * |                    |                    |
   * |  Get Access Token  |  /oauth2/token (1) |
   * |------------------->|------------------->|
   * |    Access Token    |    Access Token    |
   * |<-------------------|<-------------------|
   * |  initializeToken(accessToken, callback) |
   * |---------------------------------------->|
   * ```
   * The access token has a limited period of validity and needs to be refreshed for security reasons. In such case,
   * The IAPI SDK will call the callback provided to initializeToken. The callback must return a Promise
   * containing the refreshed access token by calling the customer backend, as presented in the following diagram:
   *
   * ```
   * Client          Customer Server       Dolby Server
   * |      callback      |  /oauth2/token (2) |
   * |------------------->|------------------->|
   * |    Access Token    |    Access Token    |
   * |<-------------------|<-------------------|
   * ```
   * Where (1) and (2) are two REST API endpoints available on Dolby.io servers and documented on the developer portal.
   * @param accessToken  The access token provided by the customer's backend..
   * @param refreshAccessToken  A callback that returns a promise when the access token needs to be refreshed. The callback parameter takes the isExpired boolean parameter to check if the previous token has expired.
   */
  public async initializeToken(
    accessToken: string | null,
    refreshAccessToken: RefreshAccessTokenType
  ): Promise<boolean> {
    if (!this.#refreshAccessTokenInBackground) {
      this.#refreshAccessTokenInBackground = async () => {
        try {
          const token = await refreshAccessToken();
          if (token) {
            DolbyioIAPISdk.onAccessTokenOk(token);
          }
        } catch (e) {
          Logger.error(`Refreshing token failed ${e}`);
          DolbyioIAPISdk.onAccessTokenKo('Refreshing token failed');
        }
      };
      NativeEvents.addListener(SDKEventNames.TokenRefresh, () => {
        this.#refreshAccessTokenInBackground &&
          this.#refreshAccessTokenInBackground();
      });
    }
    return DolbyioIAPISdk.initializeToken(accessToken);
  }
}

export default new IAPISDK();

// TO BE EXPORTED
// DolbyioIAPISdk.initialize
// DolbyioIAPISdk.initializeToken
// DolbyioIAPISdk.onAccessTokenOk
// DolbyioIAPISdk.onAccessTokenKo
