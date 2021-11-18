import { NativeModules } from 'react-native';

import FilePresentationService from '../FilePresentationService';
import { FilePresentationServiceEventNames } from '../events';

const { DolbyIoIAPIFilePresentationService } = NativeModules;

const testFileConverted = {
  id: '102030',
  imageCount: 3,
};

const testFile = {
  url: '../../../../example/src/assets/dolbyIo.jpg',
};

describe('FilePresentationService', () => {
  const removeListenerMock = jest.fn();
  FilePresentationService._nativeEvents.addListener = jest
    .fn()
    .mockReturnValue(removeListenerMock);

  describe('stop()', () => {
    it('should invoke exported method', () => {
      FilePresentationService.stop();
      expect(DolbyIoIAPIFilePresentationService.stop).toHaveBeenCalled();
    });
  });

  describe('start()', () => {
    it('should invoke exported method with correct arguments', () => {
      FilePresentationService.start(testFileConverted);
      expect(DolbyIoIAPIFilePresentationService.start).toHaveBeenCalledWith(
        testFileConverted
      );
    });
  });

  describe('getThumbnail()', () => {
    it('should invoke exported method with correct arguments', () => {
      FilePresentationService.getThumbnail(1);
      expect(
        DolbyIoIAPIFilePresentationService.getThumbnail
      ).toHaveBeenCalledWith(1);
    });
  });

  describe('setPage()', () => {
    it('should invoke exported method with correct arguments', () => {
      FilePresentationService.setPage(2);
      expect(DolbyIoIAPIFilePresentationService.setPage).toHaveBeenCalledWith(
        2
      );
    });
  });

  describe('convert()', () => {
    it('should invoke exported method with correct arguments', () => {
      FilePresentationService.convert(testFile);
      expect(DolbyIoIAPIFilePresentationService.convert).toHaveBeenCalledWith(
        testFile
      );
    });
  });

  describe('getCurrent()', () => {
    it('should invoke exported method', () => {
      FilePresentationService.getCurrent();
      expect(DolbyIoIAPIFilePresentationService.getCurrent).toHaveBeenCalled();
    });
  });

  describe('getImage()', () => {
    it('should invoke exported method with correct arguments', () => {
      FilePresentationService.getImage(2);
      expect(DolbyIoIAPIFilePresentationService.getImage).toHaveBeenCalledWith(
        2
      );
    });
  });

  describe('onFileConverted()', () => {
    it('should invoke NativeEvents.addListener with FileConverted event', () => {
      const handlerFn = () => {};
      const unsubscribeFn = FilePresentationService.onFileConverted(handlerFn);
      expect(
        FilePresentationService._nativeEvents.addListener
      ).toHaveBeenCalledWith(
        FilePresentationServiceEventNames.FileConverted,
        handlerFn
      );
      unsubscribeFn();
      expect(removeListenerMock).toHaveBeenCalled();
    });
  });

  describe('onFilePresentationChange()', () => {
    it('should invoke NativeEvents.addListener with FilePresentationStarted event', () => {
      const handlerFn = () => {};
      const unsubscribeFn =
        FilePresentationService.onFilePresentationChange(handlerFn);
      expect(
        FilePresentationService._nativeEvents.addListener
      ).toHaveBeenCalledWith(
        FilePresentationServiceEventNames.FilePresentationStarted,
        handlerFn
      );
      unsubscribeFn();
      expect(removeListenerMock).toHaveBeenCalled();
    });

    it('should invoke NativeEvents.addListener with FilePresentationStopped event', () => {
      const handlerFn = () => {};
      const unsubscribeFn =
        FilePresentationService.onFilePresentationChange(handlerFn);
      expect(
        FilePresentationService._nativeEvents.addListener
      ).toHaveBeenCalledWith(
        FilePresentationServiceEventNames.FilePresentationStopped,
        handlerFn
      );
      unsubscribeFn();
      expect(removeListenerMock).toHaveBeenCalled();
    });

    it('should invoke NativeEvents.addListener with FilePresentationUpdated event', () => {
      const handlerFn = () => {};
      const unsubscribeFn =
        FilePresentationService.onFilePresentationChange(handlerFn);
      expect(
        FilePresentationService._nativeEvents.addListener
      ).toHaveBeenCalledWith(
        FilePresentationServiceEventNames.FilePresentationUpdated,
        handlerFn
      );
      unsubscribeFn();
      expect(removeListenerMock).toHaveBeenCalled();
    });
  });
});
