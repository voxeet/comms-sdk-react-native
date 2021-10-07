import DolbyIoIAPI from '../DolbyIoIAPI';
import type { RefreshAccessTokenType } from '../models';
import { NativeModules } from 'react-native';

const { DolbyIoIAPIModule } = NativeModules;

const mockAPP_ID = 'MOCKED_APP_ID';
const mockAPP_SECRET = 'MOCKED_APP_SECRET';

describe('Main module', () => {
  test('"initialize" method', () => {
    DolbyIoIAPI.initialize(mockAPP_ID, mockAPP_SECRET);
    expect(DolbyIoIAPIModule.initialize).toHaveBeenCalledWith(
      mockAPP_ID,
      mockAPP_SECRET
    );
  });

  // TODO - toHaveBeenCalledWith(null, mockFunctions) - doesn't work

  const mockFunction: RefreshAccessTokenType = async () => {
    return 'string';
  };

  test('"initializeToken" method', () => {
    DolbyIoIAPI.initializeToken(null, mockFunction);
    expect(DolbyIoIAPIModule.initializeToken).toHaveBeenCalled();
  });
});
