/** @ignore */

export type RefreshAccessTokenType = () => string;
export type RefreshAccessTokenInBackgroundType = () => void;

export enum SDKEventNames {
  TokenRefresh = 'TokenRefresh',
}

export type TokenRefresh = {};

export interface SDKEventMap {
  [SDKEventNames.TokenRefresh]: TokenRefresh;
}
