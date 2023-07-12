import { NativeModules } from 'react-native';

import NativeEvents from '../../utils/NativeEvents';
import type { UnsubscribeFunction } from '../conference/models';
import { AudioPreviewEventNames } from './events';
import type { AudioPreviewStatusChangedEventType } from './events';
import type { RecorderStatus, AudioCaptureModeOptions } from './models';

const { CommsAPIAudioPreviewModule } = NativeModules;

/**
 * The AudioPreview model allows the local participant to test different capture modes and voice fonts before a conference. The model is supported only in SDK 3.10 and later.
 */
export class AudioPreview {
  /** @internal */
  _audioPreview = CommsAPIAudioPreviewModule;
  /** @internal */
  _nativeEvents = new NativeEvents(this._audioPreview);

  /**
   * Gets the recording status.
   */
  public async status(): Promise<RecorderStatus> {
    return this._audioPreview.status();
  }

  /**
   * Gets an audio capture mode for the audio preview.
   */
  public async getCaptureMode(): Promise<AudioCaptureModeOptions> {
    return this._audioPreview.getCaptureMode();
  }

  /**
   * Sets an audio capture mode for the audio preview.
   * @param captureMode
   */
  public async setCaptureMode(
    captureMode: AudioCaptureModeOptions
  ): Promise<void> {
    return this._audioPreview.setCaptureMode(captureMode);
  }

  /**
   * Plays back the recorded audio sample. To test how your audio sounds while using different capture modes and voice fonts, set the captureMode to a preferred setting before using the method.
   * @param loop A boolean that indicates wether the SDK should play the recorded audio in a loop.
   */
  public async play(loop: boolean): Promise<void> {
    return this._audioPreview.play(loop);
  }

  /**
   * Starts recording an audio sample if no recording is in progress.
   * @param duration - The preferred recording duration, in seconds.
   */
  public async record(duration: number): Promise<void> {
    return this._audioPreview.record(duration);
  }

  /**
   * Cancels recording or playing an audio sample.
   */
  public async cancel(): Promise<boolean> {
    return this._audioPreview.cancel();
  }

  /**
   * Releases the internal memory and restarts the audio session configuration.
   */
  public async release(): Promise<void> {
    return this._audioPreview.release();
  }

  public onStatusChanged(
    handler: (data: AudioPreviewStatusChangedEventType) => void
  ): UnsubscribeFunction {
    return this._nativeEvents.addListener(
      AudioPreviewEventNames.OnStatusChange,
      handler
    );
  }
}

export default new AudioPreview();
