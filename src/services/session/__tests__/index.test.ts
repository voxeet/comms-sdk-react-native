import SessionService from '../SessionService';

/** Mocking function */

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.NativeModules.DolbyIoIAPISessionServiceModule = {
    open: jest.fn(),
    close: jest.fn(),
  };
  RN.NativeModules.DolbyIoIAPIModule = {};
  return RN;
});

import { NativeModules } from 'react-native';
const { DolbyIoIAPISessionServiceModule } = NativeModules;

/** SessionService tests */

describe('SessionService', () => {
  /** "open" method */

  test('"open" method', () => {
    SessionService.open({});
    expect(DolbyIoIAPISessionServiceModule.open).toHaveBeenCalledWith({});
  });

  /** "close" method */

  test('"close" method', () => {
    SessionService.close();
    expect(DolbyIoIAPISessionServiceModule.open).toHaveBeenCalled();
  });
});
