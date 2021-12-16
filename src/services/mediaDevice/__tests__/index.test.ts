import { NativeModules } from 'react-native';

import MediaDeviceService from '../MediaDeviceService';
import { ComfortNoiseLevel } from '../models';

const { CommsAPIMediaDeviceServiceModule } = NativeModules;

describe('MediaDeviceService', () => {
  describe('isFrontCamera()', () => {
    it('should invoke exported method', () => {
      MediaDeviceService.isFrontCamera();
      expect(CommsAPIMediaDeviceServiceModule.isFrontCamera).toHaveBeenCalled();
    });
  });

  describe('getComfortNoiseLevel()', () => {
    it('should invoke exported method', () => {
      MediaDeviceService.getComfortNoiseLevel();
      expect(
        CommsAPIMediaDeviceServiceModule.getComfortNoiseLevel
      ).toHaveBeenCalled();
    });
  });

  describe('setComfortNoiseLevel()', () => {
    it('should invoke exported method with correct arguments', () => {
      MediaDeviceService.setComfortNoiseLevel(ComfortNoiseLevel.Default);
      expect(
        CommsAPIMediaDeviceServiceModule.setComfortNoiseLevel
      ).toHaveBeenCalledWith(ComfortNoiseLevel.Default);
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
