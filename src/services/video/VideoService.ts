import { LocalVideo } from './LocalVideo';
import { RemoteVideo } from './RemoteVideo';

/**
 * The VideoService allows managing the local participant's and remote participants' video.
 *
 * This service is available in SDK 3.7 and later.
 */
export class VideoService {
  /** @internal */
  _localVideo = new LocalVideo();
  /** @internal */
  _remoteVideo = new RemoteVideo();

  /**
   * Video settings for the local participant.
   */
  public getLocal(): LocalVideo {
    return this._localVideo;
  }

  /**
   * Video settings for remote participants.
   */
  public getRemote(): RemoteVideo {
    return this._remoteVideo;
  }
}

export default new VideoService();
