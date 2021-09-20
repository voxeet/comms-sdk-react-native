export enum DolbyIoIAPIEventNames {
  TokenRefresh = 'TokenRefresh',
}

export interface TokenRefresh {}

export interface DolbyIoIAPIEventMap {
  [DolbyIoIAPIEventNames.TokenRefresh]: TokenRefresh;
}
