import { NativeModules } from 'react-native';

import VideoPresentationService from '../VideoPresentationService';
import { VideoPresentationEventNames } from '../events';

const { CommsAPIVideoPresentationServiceModule } = NativeModules;

describe('VideoPresentationService', () => {
  const removeListenerMock = jest.fn();
  VideoPresentationService._nativeEvents.addListener = jest
    .fn()
    .mockReturnValue(removeListenerMock);

  describe('current()', () => {
    it('should invoke exported current method', () => {
      VideoPresentationService.current();
      expect(CommsAPIVideoPresentationServiceModule.current).toHaveBeenCalled();
    });
  });
  describe('state()', () => {
    it('should invoke exported state method', () => {
      VideoPresentationService.state();
      expect(CommsAPIVideoPresentationServiceModule.state).toHaveBeenCalled();
    });
  });
  describe('start()', () => {
    it('should invoke exported start method', () => {
      VideoPresentationService.start('some url');
      expect(CommsAPIVideoPresentationServiceModule.start).toHaveBeenCalledWith(
        'some url'
      );
    });
  });
  describe('stop()', () => {
    it('should invoke exported stop method', () => {
      VideoPresentationService.stop();
      expect(CommsAPIVideoPresentationServiceModule.stop).toHaveBeenCalled();
    });
  });
  describe('seek()', () => {
    it('should invoke exported seek method', () => {
      VideoPresentationService.seek(1634290080);
      expect(CommsAPIVideoPresentationServiceModule.seek).toHaveBeenCalled();
    });
  });
  describe('play()', () => {
    it('should invoke exported play method', () => {
      VideoPresentationService.play();
      expect(CommsAPIVideoPresentationServiceModule.play).toHaveBeenCalled();
    });
  });
  describe('pause()', () => {
    it('should invoke exported pause method', () => {
      VideoPresentationService.pause(1634290080);
      expect(CommsAPIVideoPresentationServiceModule.pause).toHaveBeenCalled();
    });
  });

  describe('onVideoPresentationChange()', () => {
    const handlerFn = () => {};
    it('should invoke NativeEvents.addListener with started event', () => {
      const unsubscribeFn =
        VideoPresentationService.onVideoPresentationChange(handlerFn);
      expect(
        VideoPresentationService._nativeEvents.addListener
      ).toHaveBeenCalledWith(VideoPresentationEventNames.started, handlerFn);
      unsubscribeFn();
      expect(removeListenerMock).toHaveBeenCalled();
    });
    it('should invoke NativeEvents.addListener with played event', () => {
      const unsubscribeFn =
        VideoPresentationService.onVideoPresentationChange(handlerFn);
      expect(
        VideoPresentationService._nativeEvents.addListener
      ).toHaveBeenCalledWith(VideoPresentationEventNames.played, handlerFn);
      unsubscribeFn();
      expect(removeListenerMock).toHaveBeenCalled();
    });
    it('should invoke NativeEvents.addListener with paused event', () => {
      const unsubscribeFn =
        VideoPresentationService.onVideoPresentationChange(handlerFn);
      expect(
        VideoPresentationService._nativeEvents.addListener
      ).toHaveBeenCalledWith(VideoPresentationEventNames.paused, handlerFn);
      unsubscribeFn();
      expect(removeListenerMock).toHaveBeenCalled();
    });
    it('should invoke NativeEvents.addListener with sought event', () => {
      const unsubscribeFn =
        VideoPresentationService.onVideoPresentationChange(handlerFn);
      expect(
        VideoPresentationService._nativeEvents.addListener
      ).toHaveBeenCalledWith(VideoPresentationEventNames.sought, handlerFn);
      unsubscribeFn();
      expect(removeListenerMock).toHaveBeenCalled();
    });
  });

  describe('onVideoPresentationStopped', () => {
    const handlerFn = () => {};
    it('should invoke NativeEvents.addListener with stopped event', () => {
      const unsubscribeFn =
        VideoPresentationService.onVideoPresentationStopped(handlerFn);
      expect(
        VideoPresentationService._nativeEvents.addListener
      ).toHaveBeenCalledWith(VideoPresentationEventNames.stopped, handlerFn);
      unsubscribeFn();
      expect(removeListenerMock).toHaveBeenCalled();
    });
  });
});
