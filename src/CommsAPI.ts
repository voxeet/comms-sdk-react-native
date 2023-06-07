import { NativeModules } from 'react-native';

import { CommsAPIEventNames } from './events';
import type {
  RefreshAccessTokenType,
  RefreshAccessTokenInBackgroundType,
} from './models';
import AudioService from './services/audio/AudioService';
import CommandService from './services/command/CommandService';
import ConferenceService from './services/conference/ConferenceService';
import FilePresentationService from './services/filePresentation/FilePresentationService';
import MediaDeviceService from './services/mediaDevice/MediaDeviceService';
import NotificationService from './services/notification/NotificationService';
import RecordingService from './services/recording/RecordingService';
import SessionService from './services/session/SessionService';
import VideoService from './services/video/VideoService';
import VideoPresentationService from './services/videoPresentation/VideoPresentationService';
import Logger from './utils/Logger';
import NativeEvents from './utils/NativeEvents';

const { CommsAPIModule } = NativeModules;

/**
 * CommsAPI is a main object that allows an application to interact with Dolby.io services.
 */
export class CommsAPI {
  /** @internal */
  private _nativeEvents = new NativeEvents(CommsAPIModule);
  /** @internal */
  private refreshAccessTokenInBackground?: RefreshAccessTokenInBackgroundType | null =
    null;

  /**
   * Retrieves the AudioService instance that allows changing audio settings for the local and remote participants.
   */
  audio = AudioService;

  /**
   * Retrieves the CommandService instance that allows sending messages to conferences.
   */
  command = CommandService;

  /**
   * Retrieves the ConferenceService instance that allows interacting with conferences.
   */
  conference = ConferenceService;

  /**
   * Retrieves the FilePresentationService instance that allows presenting files during conferences.
   */
  filePresentation = FilePresentationService;
  /**
   * Retrieves the MediaDeviceService instance that allows interacting with devices through the system.
   */
  mediaDevice = MediaDeviceService;

  /**
   * Retrieves the NotificationService instance that allows inviting participants to a conference.
   */
  notification = NotificationService;

  /**
   * Retrieves the RecordingService instance that allows recording conferences.
   */
  recording = RecordingService;

  /**
   * Retrieves the SessionService instance that allows using sessions.
   */
  session = SessionService;

  /**
   * Retrieves the VideoPresentationService instance that allows presenting videos during conferences.
   */
  videoPresentation = VideoPresentationService;

  /**
   * Retrieves the VideoService instance that allows enabling and disabling video for the local and remote participants.
   */
  video = VideoService;

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
    return CommsAPIModule.initialize(consumerKey, consumerSecret);
  }

  /**
   * Initializes the SDK with the client access token provided by the Dolby.io platform. The client access token protects customer's conferences from unauthorized access and can be generated only by the Dolby.io platform via an application's authentication server and the [client access token](ref:get-client-access-token) request.
   * The method requires providing two parameters - the **client access token** received from the Dolby.io platform and the **refresh access token** callback. The callback must be a function that requests a new token and returns a promise containing the refreshed client access token when the token is incorrect or needs to be refreshed. The refresh token callback uses an **isExpired** boolean parameter to inform whether the currently used client access token is expired.
   * For more information, see the [Accessing Dolby.io Platform](doc:guides-accessing-dolbyio-platform) guide.
   * @param accessToken  The access token provided by the customer's backend.
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
            CommsAPIModule.onAccessTokenOk(token);
          }
        } catch (e) {
          Logger.error(`Refreshing token failed ${e}`);
          CommsAPIModule.onAccessTokenKo('Refreshing token failed');
        }
      };
      this._nativeEvents.addListener(CommsAPIEventNames.TokenRefresh, () => {
        this.refreshAccessTokenInBackground &&
          this.refreshAccessTokenInBackground();
      });
    }
    return CommsAPIModule.initializeToken(accessToken);
  }
}

export default new CommsAPI();
