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
   * Enables the local participant's video and sends the video to a conference. The method is available only to participants who joined a conference using the [join](doc:rn-client-sdk-conferenceservice#join) method; it is not available for listeners.
   *
   */
  public async start(): Promise<void> {
    return this._localVideo.start();
  }

  /**
   * Disables the local participant's video and stops sending the video to a conference. The method is available only to participants who joined a conference using the [join](doc:rn-client-sdk-conferenceservice#join) method; it is not available for listeners.
   *
   * Use this method only when the current participant is at the conference.
   */
  public async stop(): Promise<void> {
    return this._localVideo.stop();
  }
}

export default new LocalVideo();
