import { DeviceEventEmitter, NativeEventEmitter, NativeModules, Platform } from 'react-native';
import {
  AudioService, CommandService, ConferenceService, FilePresentationService, MediaDeviceService,
  NotificationService, RecordingService, ScreenShareService, SessionService, VideoPresentationService
} from "./services";

const { RNVoxeetSDK } = NativeModules;

export interface RefreshCallback {
  (): void;
};

export interface TokenRefreshCallback {
  (): Promise<string>
};

const audio = new AudioService();
const command = new CommandService();
const conference = new ConferenceService();
const filePresentation = new FilePresentationService();
const mediaDevice = new MediaDeviceService();
const notification = new NotificationService();
const recording = new RecordingService();
const screenShare = new ScreenShareService();
const session = new SessionService();
const videoPresentation = new VideoPresentationService();

const events = new NativeEventEmitter(RNVoxeetSDK);

//TODO convert to frozen object
class _VoxeetSDK {
  refreshAccessTokenCallback: RefreshCallback|null = null;

  get events() { return events; }

  get audio() { return audio; }

  get command() { return command; }

  get conference() { return conference; }

  get filePresentation() { return filePresentation; }

  get mediaDevice() { return mediaDevice; }

  get notification() { return notification; }

  get recording() { return recording; }

  get screenShare() { return screenShare; }

  get session() { return session; }

  get videoPresentation() { return videoPresentation; }

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