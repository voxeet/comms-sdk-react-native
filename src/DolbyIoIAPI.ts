import { NativeModules } from 'react-native';

import { DolbyIoIAPIEventNames } from './events';
import type {
  RefreshAccessTokenType,
  RefreshAccessTokenInBackgroundType,
} from './models';
import CommandService from './services/command/CommandService';
import ConferenceService from './services/conference/ConferenceService';
import FilePresentationService from './services/filePresentation/FilePresentationService';
import MediaDeviceService from './services/mediaDevice/MediaDeviceService';
import NotificationService from './services/notification/NotificationService';
import RecordingService from './services/recording/RecordingService';
import SessionService from './services/session/SessionService';
import VideoPresentationService from './services/videoPresentation/VideoPresentationService';
import Logger from './utils/Logger';
import NativeEvents from './utils/NativeEvents';

const { DolbyIoIAPIModule } = NativeModules;

export class DolbyIoIAPI {
  /** @internal */
  private _nativeEvents = new NativeEvents(DolbyIoIAPIModule);
  /** @internal */
  private refreshAccessTokenInBackground?: RefreshAccessTokenInBackgroundType | null =
    null;

  conference = ConferenceService;
  session = SessionService;
  recording = RecordingService;
  command = CommandService;
  notification = NotificationService;
  filePresentation = FilePresentationService;
  videoPresentation = VideoPresentationService;
  mediaDevice = MediaDeviceService;

  /**
   * Initializes the SDK using the customer key and secret.
   * @param consumerKey  The customer key.
   * @param consumerSecret  The customer secret.
   */
  public async initialize(
    consumerKey: string,
    consumerSecret: string
  ): Promise<null> {
    if (!consumerKey || !consumerSecret) {
      Logger.error(
        'The Consumer Key and/or Consumer Secret are missing during initialization.'
      );
      throw new Error(
        'The Consumer Key and/or Consumer Secret are missing during initialization.'
      );
    }
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
  ): Promise<null> {
    if (!this.refreshAccessTokenInBackground) {
      this.refreshAccessTokenInBackground = async () => {
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
      this._nativeEvents.addListener(DolbyIoIAPIEventNames.TokenRefresh, () => {
        this.refreshAccessTokenInBackground &&
          this.refreshAccessTokenInBackground();
      });
    }
    return DolbyIoIAPIModule.initializeToken(accessToken);
  }
}

export default new DolbyIoIAPI();
