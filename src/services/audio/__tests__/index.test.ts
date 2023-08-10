import { NativeModules } from 'react-native';

import AudioPreview from '../AudioPreview';
import {
  AudioCaptureMode,
  AudioCaptureModeOptions,
  NoiseReductionLevel,
  AudioPreviewStatus,
  VoiceFont,
} from '../models';

const { CommsAPIAudioPreviewModule } = NativeModules;

const testCaptureMode: AudioCaptureModeOptions = {
  mode: AudioCaptureMode.Standard,
  noiseReduction: NoiseReductionLevel.High,
  voiceFont: VoiceFont.BrokenRobot,
};

describe('AudioPreview', () => {
  const removeListenerMock = jest.fn();
  AudioPreview._nativeEvents.addListener = jest
    .fn()
    .mockReturnValue(removeListenerMock);

  describe('status()', () => {
    it('should invoke exported status method', async () => {
      const mockStatus = AudioPreviewStatus.NoRecordingAvailable;
      CommsAPIAudioPreviewModule.status.mockImplementation(() =>
        Promise.resolve(mockStatus)
      );
      AudioPreview.status();
      expect(CommsAPIAudioPreviewModule.status).toHaveBeenCalled();
    });
  });

  describe('getCaptureMode()', () => {
    it('should invoke exported getCaptureMode method and return current capture mode', () => {
      CommsAPIAudioPreviewModule.getCaptureMode.mockImplementation(() =>
        Promise.resolve(testCaptureMode)
      );
      AudioPreview.getCaptureMode();
      expect(CommsAPIAudioPreviewModule.status).toHaveBeenCalled();
    });
  });
  describe('setCaptureMode()', () => {
    it('should invoke exported setCaptureMode method with correct arguments', () => {
      CommsAPIAudioPreviewModule.setCaptureMode.mockImplementation(() =>
        Promise.resolve()
      );
      AudioPreview.setCaptureMode(testCaptureMode);
      expect(CommsAPIAudioPreviewModule.setCaptureMode).toHaveBeenCalledWith(
        testCaptureMode
      );
    });
  });
  describe('record()', () => {
    CommsAPIAudioPreviewModule.record.mockImplementation(() =>
      Promise.resolve()
    );
    it('should invoke exported record method with correct arguments', () => {
      var duration = 5;
      AudioPreview.record(duration);
      expect(CommsAPIAudioPreviewModule.record).toHaveBeenCalledWith(duration);
    });
  });

  describe('play()', () => {
    CommsAPIAudioPreviewModule.play.mockImplementationOnce(() =>
      Promise.resolve()
    );
    it('should invoke exported play method with correct arguments', () => {
      var loop = false;
      AudioPreview.play(loop);
      expect(CommsAPIAudioPreviewModule.play).toHaveBeenCalledWith(loop);
    });
  });

  describe('release()', () => {
    CommsAPIAudioPreviewModule.release.mockImplementation(() =>
      Promise.resolve()
    );
    it('should invoke exported release method', () => {
      AudioPreview.release();
      expect(CommsAPIAudioPreviewModule.release).toHaveBeenCalled();
    });
  });

  describe('stop()', () => {
    it('should invoke exported stop method', () => {
      CommsAPIAudioPreviewModule.stop.mockImplementation(() =>
        Promise.resolve()
      );
      AudioPreview.stop();
      expect(CommsAPIAudioPreviewModule.stop).toHaveBeenCalled();
    });
  });
});
