import { NativeModules } from 'react-native';

import VideoPresentationService from '../VideoPresentation';
import { VideoPresentationEventNames } from '../events';

const { DolbyIoIAPIVideoPresentationService } = NativeModules;

describe('VideoPresentationService', () => {
  VideoPresentationService._nativeEvents.addListener = jest.fn();

  describe('current()', () => {
    it('should invoke exported current method', () => {
      VideoPresentationService.current();
      expect(DolbyIoIAPIVideoPresentationService.current).toHaveBeenCalled();
    });
  });
  describe('state()', () => {
    it('should invoke exported state method', () => {
      VideoPresentationService.state();
      expect(DolbyIoIAPIVideoPresentationService.state).toHaveBeenCalled();
    });
  });
  describe('start()', () => {
    it('should invoke exported start method', () => {
      VideoPresentationService.start('some url');
      expect(DolbyIoIAPIVideoPresentationService.start).toHaveBeenCalledWith(
        'some url'
      );
    });
  });
  describe('stop()', () => {
    it('should invoke exported stop method', () => {
      VideoPresentationService.stop();
      expect(DolbyIoIAPIVideoPresentationService.stop).toHaveBeenCalled();
    });
  });
  describe('seek()', () => {
    it('should invoke exported seek method', () => {
      VideoPresentationService.seek(1634290080);
      expect(DolbyIoIAPIVideoPresentationService.seek).toHaveBeenCalled();
    });
  });
  describe('play()', () => {
    it('should invoke exported play method', () => {
      VideoPresentationService.play();
      expect(DolbyIoIAPIVideoPresentationService.play).toHaveBeenCalled();
    });
  });
  describe('pause()', () => {
    it('should invoke exported pause method', () => {
      VideoPresentationService.pause(1634290080);
      expect(DolbyIoIAPIVideoPresentationService.pause).toHaveBeenCalled();
    });
  });

  describe('onVideoPresentationChange()', () => {
    it('should invoke NativeEvents.addListener with started event', () => {
      VideoPresentationService.onVideoPresentationChange(() => {});
      expect(
        VideoPresentationService._nativeEvents.addListener
      ).toHaveBeenCalledWith(
        VideoPresentationEventNames.started,
        expect.any(Function)
      );
    });
    it('should invoke NativeEvents.addListener with played event', () => {
      VideoPresentationService.onVideoPresentationChange(() => {});
      expect(
        VideoPresentationService._nativeEvents.addListener
      ).toHaveBeenCalledWith(
        VideoPresentationEventNames.played,
        expect.any(Function)
      );
    });
    it('should invoke NativeEvents.addListener with paused event', () => {
      VideoPresentationService.onVideoPresentationChange(() => {});
      expect(
        VideoPresentationService._nativeEvents.addListener
      ).toHaveBeenCalledWith(
        VideoPresentationEventNames.paused,
        expect.any(Function)
      );
    });
    it('should invoke NativeEvents.addListener with sought event', () => {
      VideoPresentationService.onVideoPresentationChange(() => {});
      expect(
        VideoPresentationService._nativeEvents.addListener
      ).toHaveBeenCalledWith(
        VideoPresentationEventNames.sought,
        expect.any(Function)
      );
    });
  });

  describe('onVideoPresentationStopped', () => {
    it('should invoke NativeEvents.addListener with stopped event', () => {
      VideoPresentationService.onVideoPresentationStopped(() => {});
      expect(
        VideoPresentationService._nativeEvents.addListener
      ).toHaveBeenCalledWith(
        VideoPresentationEventNames.stopped,
        expect.any(Function)
      );
    });
  });
});
