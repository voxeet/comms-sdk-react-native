import { NativeEventEmitter } from 'react-native';
export interface RefreshCallback {
    (): void;
}
export interface TokenRefreshCallback {
    (): Promise<string>;
}
export default class VoxeetSDKImpl {
    refreshAccessTokenCallback: RefreshCallback | null;
    get events(): NativeEventEmitter;
    initialize(consumerKey: string, consumerSecret: string): Promise<any>;
    initializeToken(accessToken: string | undefined, refreshToken: TokenRefreshCallback): any;
}
