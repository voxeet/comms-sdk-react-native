export type RefreshAccessTokenType = () => string;
export type RefreshAccessTokenInBackgroundType = () => void;

export enum SDKEventNames {
  TokenRefresh = 'TokenRefresh',
}

export interface TokenRefresh {}

export interface SDKEventMap {
  [SDKEventNames.TokenRefresh]: TokenRefresh;
}
