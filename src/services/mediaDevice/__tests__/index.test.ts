import { NativeModules } from 'react-native';

import MediaDeviceService from '../MediaDeviceService';
import { ComfortNoiseLevel } from '../models';

const { DolbyIoIAPIMediaDeviceService } = NativeModules;

describe('MediaDeviceService', () => {
  describe('isFrontCamera()', () => {
    it('should invoke exported method', () => {
      MediaDeviceService.isFrontCamera();
      expect(DolbyIoIAPIMediaDeviceService.isFrontCamera).toHaveBeenCalled();
    });
  });

  describe('getComfortNoiseLevel()', () => {
    it('should invoke exported method', () => {
      MediaDeviceService.getComfortNoiseLevel();
      expect(
        DolbyIoIAPIMediaDeviceService.getComfortNoiseLevel
      ).toHaveBeenCalled();
    });
  });

  describe('setComfortNoiseLevel()', () => {
    it('should invoke exported method with correct arguments', () => {
      MediaDeviceService.setComfortNoiseLevel(ComfortNoiseLevel.Default);
      expect(
        DolbyIoIAPIMediaDeviceService.setComfortNoiseLevel
      ).toHaveBeenCalledWith(ComfortNoiseLevel.Default);
    });
  });

  describe('switchCamera()', () => {
    it('should invoke exported method', () => {
      MediaDeviceService.switchCamera();
      expect(DolbyIoIAPIMediaDeviceService.switchCamera).toHaveBeenCalled();
    });
  });

  describe('switchSpeaker()', () => {
    it('should invoke exported method', () => {
      MediaDeviceService.switchSpeaker();
      expect(DolbyIoIAPIMediaDeviceService.switchSpeaker).toHaveBeenCalled();
    });
  });
});
