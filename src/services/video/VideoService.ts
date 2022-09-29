import { LocalVideo } from './LocalVideo';
import { RemoteVideo } from './RemoteVideo';

/**
 * The AudioService allows changing audio settings for the local and remote participants.
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
