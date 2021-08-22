import {
  AudioService, CommandService, ConferenceService, FilePresentationService, MediaDeviceService,
  NotificationService, RecordingService, ScreenShareService, SessionService, VideoPresentationService
} from "./services";

import VoxeetSDKImpl, { TokenRefreshCallback } from './sdk/Implementation';
export { RefreshCallback, TokenRefreshCallback } from "./sdk/Implementation";

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

const implementation = new VoxeetSDKImpl();

const VoxeetSDK = {
  //services
  audio,
  command,
  conference,
  filePresentation,
  mediaDevice,
  notification,
  recording,
  screenShare,
  session,
  videoPresentation,

  // specific implementation
  events: implementation.events,
  initialize: (consumerKey: string, consumerSecret: string): Promise<any> =>
    implementation.initialize(consumerKey, consumerSecret),
  initializeToken: (accessToken: string|undefined, refreshToken: TokenRefreshCallback) =>
    implementation.initializeToken(accessToken, refreshToken)
}

export default Object.freeze(VoxeetSDK);