import RecordingService from '../RecordingService';
import { NativeModules } from 'react-native';

/** Mocking function */

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.NativeModules.DolbyIoIAPIRecordingServiceModule = {
    current: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
  };
  RN.NativeModules.DolbyIoIAPIModule = {};
  return RN;
});

const { DolbyIoIAPIRecordingServiceModule } = NativeModules;

describe('RecordingService', () => {
  describe('start()', () => {
    it('calls exported start method', () => {
      RecordingService.start();
      expect(DolbyIoIAPIRecordingServiceModule.start).toHaveBeenCalled();
    });
  });

  describe('stop()', () => {
    it('calls exported stop method', () => {
      RecordingService.stop();
      expect(DolbyIoIAPIRecordingServiceModule.stop).toHaveBeenCalled();
    });
  });

  describe('current()', () => {
    it('calls exported current method', () => {
      RecordingService.current();
      expect(DolbyIoIAPIRecordingServiceModule.current).toHaveBeenCalled();
    });
  });
});
