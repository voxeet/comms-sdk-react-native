export enum CommsAPIEventNames {
  TokenRefresh = 'EVENT_SDK_TOKEN_REFRESH',
}

export interface TokenRefresh {}

export interface CommsAPIEventMap {
  [CommsAPIEventNames.TokenRefresh]: TokenRefresh;
}
