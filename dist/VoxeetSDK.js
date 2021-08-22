import { AudioService, CommandService, ConferenceService, FilePresentationService, MediaDeviceService, NotificationService, RecordingService, ScreenShareService, SessionService, VideoPresentationService } from "./services";
import VoxeetSDKImpl from './sdk/Implementation';
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
    initialize: (consumerKey, consumerSecret) => implementation.initialize(consumerKey, consumerSecret),
    initializeToken: (accessToken, refreshToken) => implementation.initializeToken(accessToken, refreshToken)
};
export default Object.freeze(VoxeetSDK);
//# sourceMappingURL=VoxeetSDK.js.map