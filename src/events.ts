export enum DolbyIoIAPIEventNames {
  TokenRefresh = 'EVENT_SDK_TOKEN_REFRESH',
}

export interface TokenRefresh {}

export interface DolbyIoIAPIEventMap {
  [DolbyIoIAPIEventNames.TokenRefresh]: TokenRefresh;
}
