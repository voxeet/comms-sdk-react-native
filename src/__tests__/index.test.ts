import { NativeModules } from 'react-native';

import CommsAPI from '../CommsAPI';

const { CommsAPIModule } = NativeModules;

describe('Main CommsAPI module', () => {
  describe('initialize()', () => {
    it('should invoke exported method', () => {
      const APP_ID = 'IDIDID';
      const APP_SECRET = 'SECRETSECRETSECRET';

      CommsAPI.initialize(APP_ID, APP_SECRET);
      expect(CommsAPIModule.initialize).toHaveBeenCalledWith(
        APP_ID,
        APP_SECRET
      );
    });

    it('should throw Error when no secret or id passed ', () => {
      expect(() => CommsAPI.initialize('', '')).rejects.toThrow(Error);
    });
  });

  describe('initializeToken()', () => {
    it('should invoke exported method', () => {
      CommsAPI.initializeToken(null, () => Promise.resolve('token'));
      expect(CommsAPIModule.initializeToken).toHaveBeenCalled();
    });

    it('should invoke onAccessTokenOk when token refreshed', async () => {
      const accessToken = 'dsfmkls78as';
      const refreshAccessToken = () => Promise.resolve('newToken');
      await CommsAPI.initializeToken(accessToken, refreshAccessToken);
      // @ts-ignore
      await CommsAPI.refreshAccessTokenInBackground();
      expect(CommsAPIModule.onAccessTokenOk).toHaveBeenCalled();
    });

    it('should invoke onAccessTokenKo when token refresh fails', async () => {
      // @ts-ignore
      CommsAPI.refreshAccessTokenInBackground = undefined;
      const accessToken = 'dsfmkls78as';
      const refreshAccessToken = () => Promise.reject();
      await CommsAPI.initializeToken(accessToken, refreshAccessToken);

      // @ts-ignore
      await CommsAPI.refreshAccessTokenInBackground();
      expect(CommsAPIModule.onAccessTokenKo).toHaveBeenCalled();
    });
  });
});
