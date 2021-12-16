import { NativeModules } from 'react-native';

import RecordingService from '../RecordingService';

const { CommsAPIRecordingServiceModule } = NativeModules;

describe('RecordingService', () => {
  describe('start()', () => {
    it('should invoke exported start method', () => {
      RecordingService.start();
      expect(CommsAPIRecordingServiceModule.start).toHaveBeenCalled();
    });
  });

  describe('stop()', () => {
    it('should invoke exported stop method', () => {
      RecordingService.stop();
      expect(CommsAPIRecordingServiceModule.stop).toHaveBeenCalled();
    });
  });

  describe('current()', () => {
    it('should invoke exported current method', () => {
      RecordingService.current();
      expect(CommsAPIRecordingServiceModule.current).toHaveBeenCalled();
    });
  });
});
