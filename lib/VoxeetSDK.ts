import {
  AudioService, CommandService, ConferenceService, FilePresentationService, MediaDeviceService,
  NotificationService, RecordingService, ScreenShareService, SessionService, VideoPresentationService
} from "./services";

import VoxeetSDKImpl, { TokenRefreshCallback } from './sdk/Implementation';
export { RefreshCallback, TokenRefreshCallback } from "./sdk/Implementation";

const implementation = new VoxeetSDKImpl();

const VoxeetSDK = {
  //services
  audio: new AudioService(),
  command: new CommandService(),
  conference: new ConferenceService(),
  filePresentation: new FilePresentationService(),
  mediaDevice: new MediaDeviceService(),
  notification: new NotificationService(),
  recording: new RecordingService(),
  screenShare: new ScreenShareService(),
  session: new SessionService(),
  videoPresentation: new VideoPresentationService(),

  // specific implementation
  events: implementation.events,
  initialize: (consumerKey: string, consumerSecret: string): Promise<any> =>
    implementation.initialize(consumerKey, consumerSecret),
  initializeToken: (accessToken: string|undefined, refreshToken: TokenRefreshCallback) =>
    implementation.initializeToken(accessToken, refreshToken)
}

export default Object.freeze(VoxeetSDK);