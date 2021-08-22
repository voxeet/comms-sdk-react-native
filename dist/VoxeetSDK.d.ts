import { AudioService, CommandService, ConferenceService, FilePresentationService, MediaDeviceService, NotificationService, RecordingService, ScreenShareService, SessionService, VideoPresentationService } from "./services";
import { TokenRefreshCallback } from './sdk/Implementation';
export { RefreshCallback, TokenRefreshCallback } from "./sdk/Implementation";
declare const _default: Readonly<{
    audio: AudioService;
    command: CommandService;
    conference: ConferenceService;
    filePresentation: FilePresentationService;
    mediaDevice: MediaDeviceService;
    notification: NotificationService;
    recording: RecordingService;
    screenShare: ScreenShareService;
    session: SessionService;
    videoPresentation: VideoPresentationService;
    events: import("react-native").NativeEventEmitter;
    initialize: (consumerKey: string, consumerSecret: string) => Promise<any>;
    initializeToken: (accessToken: string | undefined, refreshToken: TokenRefreshCallback) => any;
}>;
export default _default;
