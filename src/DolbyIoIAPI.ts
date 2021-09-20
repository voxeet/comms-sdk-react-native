import { NativeModules } from 'react-native';
const { DolbyIoIAPIModule } = NativeModules;
import type {
  RefreshAccessTokenType,
  RefreshAccessTokenInBackgroundType,
} from './models';
import { DolbyIoIAPIEventNames } from './events';
import ConferenceService from './services/conference/ConferenceService';
import SessionService from './services/session/SessionService';
import Logger from './utils/Logger';
import NativeEvents from './utils/NativeEvents';

export class DolbyIoIAPI {
  #refreshAccessTokenInBackground?: RefreshAccessTokenInBackgroundType | null =
    null;

  conference = ConferenceService;
  session = SessionService;

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
    return DolbyIoIAPIModule.initialize(consumerKey, consumerSecret);
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
            DolbyIoIAPIModule.onAccessTokenOk(token);
          }
        } catch (e) {
          Logger.error(`Refreshing token failed ${e}`);
          DolbyIoIAPIModule.onAccessTokenKo('Refreshing token failed');
        }
      };
      NativeEvents.addListener(DolbyIoIAPIEventNames.TokenRefresh, () => {
        this.#refreshAccessTokenInBackground &&
          this.#refreshAccessTokenInBackground();
      });
    }
    return DolbyIoIAPIModule.initializeToken(accessToken);
  }
}

export default new DolbyIoIAPI();
