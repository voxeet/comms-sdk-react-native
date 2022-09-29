import { NativeModules } from 'react-native';

import MediaDeviceService from '../MediaDeviceService';

const { CommsAPIMediaDeviceServiceModule } = NativeModules;

describe('MediaDeviceService', () => {
  describe('isFrontCamera()', () => {
    it('should invoke exported method', () => {
      MediaDeviceService.isFrontCamera();
      expect(CommsAPIMediaDeviceServiceModule.isFrontCamera).toHaveBeenCalled();
    });
  });

  describe('switchCamera()', () => {
    it('should invoke exported method', () => {
      MediaDeviceService.switchCamera();
      expect(CommsAPIMediaDeviceServiceModule.switchCamera).toHaveBeenCalled();
    });
  });

  describe('switchSpeaker()', () => {
    it('should invoke exported method', () => {
      MediaDeviceService.switchSpeaker();
      expect(CommsAPIMediaDeviceServiceModule.switchSpeaker).toHaveBeenCalled();
    });
  });
});
