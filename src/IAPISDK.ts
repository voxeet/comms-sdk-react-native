import {
  AudioService,
  CommandService,
  ConferenceService,
  FilePresentationService,
  MediaDeviceService,
  NotificationService,
  RecordingService,
  ScreenShareService,
  SessionService,
  VideoPresentationService,
} from './services';

import IAPISDKImpl, { TokenRefreshCallback } from './sdk/Implementation';
export { RefreshCallback, TokenRefreshCallback } from './sdk/Implementation';

const implementation = new IAPISDKImpl();

const IAPISdk = {
  //services
  audio: AudioService,
  command: CommandService,
  conference: ConferenceService,
  filePresentation: FilePresentationService,
  mediaDevice: MediaDeviceService,
  notification: NotificationService,
  recording: RecordingService,
  screenShare: ScreenShareService,
  session: SessionService,
  videoPresentation: VideoPresentationService,

  // specific implementation
  events: implementation.events,
  initialize: (consumerKey: string, consumerSecret: string): Promise<any> =>
    implementation.initialize(consumerKey, consumerSecret),
  initializeToken: (
    accessToken: string | undefined,
    refreshToken: TokenRefreshCallback
  ) => implementation.initializeToken(accessToken, refreshToken),
};

export default Object.freeze(IAPISdk);
