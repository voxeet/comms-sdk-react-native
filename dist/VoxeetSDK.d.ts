export interface RefreshCallback {
    (): void;
}
export interface TokenRefreshCallback {
    (): Promise<string>;
}
declare class _VoxeetSDK {
    refreshAccessTokenCallback: RefreshCallback | null;
    initialize(consumerKey: string, consumerSecret: string): Promise<any>;
    initializeToken(accessToken: string | undefined, refreshToken: TokenRefreshCallback): any;
}
declare const _default: _VoxeetSDK;
export default _default;
