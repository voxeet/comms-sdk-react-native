import { LocalAudio } from './LocalAudio';
import { RemoteAudio } from './RemoteAudio';

/**
 * The AudioService allows changing audio settings for the local and remote participants.
 *
 * This service is available in SDK 3.7 and later.
 */
export class AudioService {
  /** @internal */
  _localAudio = new LocalAudio();
  /** @internal */
  _remoteAudio = new RemoteAudio();

  /**
   * Audio settings for the local participant.
   */
  public getLocal(): LocalAudio {
    return this._localAudio;
  }

  /**
   * Audio settings for the local participant.
   */
  public getRemote(): RemoteAudio {
    return this._remoteAudio;
  }
}

export default new AudioService();
