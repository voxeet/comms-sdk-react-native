import { NativeModules } from 'react-native';

import DolbyIoIAPI from '../DolbyIoIAPI';

const { DolbyIoIAPIModule } = NativeModules;

describe('Main DolbyIoIAPI module', () => {
  describe('initialize()', () => {
    it('should invoke exported method', () => {
      const APP_ID = 'IDIDID';
      const APP_SECRET = 'SECRETSECRETSECRET';

      DolbyIoIAPI.initialize(APP_ID, APP_SECRET);
      expect(DolbyIoIAPIModule.initialize).toHaveBeenCalledWith(
        APP_ID,
        APP_SECRET
      );
    });

    it('should throw Error when no secret or id passed ', () => {
      expect(() => DolbyIoIAPI.initialize('', '')).rejects.toThrow(Error);
    });
  });

  describe('initializeToken()', () => {
    it('should invoke exported method', () => {
      DolbyIoIAPI.initializeToken(null, () => Promise.resolve('token'));
      expect(DolbyIoIAPIModule.initializeToken).toHaveBeenCalled();
    });

    it('should invoke onAccessTokenOk when token refreshed', async () => {
      const accessToken = 'dsfmkls78as';
      const refreshAccessToken = () => Promise.resolve('newToken');
      await DolbyIoIAPI.initializeToken(accessToken, refreshAccessToken);
      // @ts-ignore
      await DolbyIoIAPI.refreshAccessTokenInBackground();
      expect(DolbyIoIAPIModule.onAccessTokenOk).toHaveBeenCalled();
    });

    it('should invoke onAccessTokenKo when token refresh fails', async () => {
      // @ts-ignore
      DolbyIoIAPI.refreshAccessTokenInBackground = undefined;
      const accessToken = 'dsfmkls78as';
      const refreshAccessToken = () => Promise.reject();
      await DolbyIoIAPI.initializeToken(accessToken, refreshAccessToken);

      // @ts-ignore
      await DolbyIoIAPI.refreshAccessTokenInBackground();
      expect(DolbyIoIAPIModule.onAccessTokenKo).toHaveBeenCalled();
    });
  });
});
