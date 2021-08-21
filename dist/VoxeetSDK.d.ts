import { NativeEventEmitter } from 'react-native';
import { AudioService, CommandService, ConferenceService, FilePresentationService, MediaDeviceService, NotificationService, RecordingService, ScreenShareService, SessionService, VideoPresentationService } from "./services";
export interface RefreshCallback {
    (): void;
}
export interface TokenRefreshCallback {
    (): Promise<string>;
}
declare class _VoxeetSDK {
    refreshAccessTokenCallback: RefreshCallback | null;
    get events(): NativeEventEmitter;
    get audio(): AudioService;
    get command(): CommandService;
    get conference(): ConferenceService;
    get filePresentation(): FilePresentationService;
    get mediaDevice(): MediaDeviceService;
    get notification(): NotificationService;
    get recording(): RecordingService;
    get screenShare(): ScreenShareService;
    get session(): SessionService;
    get videoPresentation(): VideoPresentationService;
    initialize(consumerKey: string, consumerSecret: string): Promise<any>;
    initializeToken(accessToken: string | undefined, refreshToken: TokenRefreshCallback): any;
}
declare const _default: _VoxeetSDK;
export default _default;
