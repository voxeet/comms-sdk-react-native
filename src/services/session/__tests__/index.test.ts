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

/** SessionService - "open" method test */

test('SessionService - "open" method test', () => {
  SessionService.open({});
  expect(DolbyIoIAPISessionServiceModule.open).toHaveBeenCalledWith({});
});

/** SessionService - "close" method test */

test('SessionService - "close" method test', () => {
  SessionService.close();
  expect(DolbyIoIAPISessionServiceModule.open).toHaveBeenCalled();
});
