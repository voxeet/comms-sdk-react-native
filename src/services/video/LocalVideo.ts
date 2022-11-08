import { NativeModules } from 'react-native';

const { CommsAPILocalVideoModule } = NativeModules;

/**
 * The LocalVideo model allows enabling and disabling the local participant's video.
 *
 * This model is supported only in SDK 3.7 and later.
 */
export class LocalVideo {
  /** @internal */
  _localVideo = CommsAPILocalVideoModule;

  /**
   * Enables the local participant's video and sends the video to a conference.
   *
   */
  public async start(): Promise<void> {
    return this._localVideo.start();
  }

  /**
   * Disables the local participant's video and stops sending the video to a conference.
   * Use this method only when the current participant is at the conference.
   */
  public async stop(): Promise<void> {
    return this._localVideo.stop();
  }
}

export default new LocalVideo();
