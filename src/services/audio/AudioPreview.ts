import { NativeModules } from 'react-native';

import NativeEvents from '../../utils/NativeEvents';
import type { UnsubscribeFunction } from '../conference/models';
import { AudioPreviewEventNames } from './events';
import type { AudioPreviewStatusChangedEventType } from './events';
import type { RecorderStatus, AudioCaptureModeOptions } from './models';

const { CommsAPIAudioPreviewModule } = NativeModules;

export class AudioPreview {
  /** @internal */
  _audioPreview = CommsAPIAudioPreviewModule;
  _nativeEvents = new NativeEvents(this._audioPreview);

  public async status(): Promise<RecorderStatus> {
    return this._audioPreview.status();
  }

  public async getCaptureMode(): Promise<AudioCaptureModeOptions> {
    return this._audioPreview.getCaptureMode();
  }

  public async setCaptureMode(
    captureMode: AudioCaptureModeOptions
  ): Promise<void> {
    return this._audioPreview.setCaptureMode(captureMode);
  }

  public async play(loop: boolean): Promise<void> {
    return this._audioPreview.play(loop);
  }

  public async record(duration: number): Promise<void> {
    return this._audioPreview.record(duration);
  }

  public async cancel(): Promise<boolean> {
    return this._audioPreview.cancel();
  }

  public async release(): Promise<boolean> {
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
