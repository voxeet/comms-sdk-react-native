import { NativeModules } from 'react-native';

import type { Participant } from '../conference/models';

const { CommsAPIRemoteAudioModule } = NativeModules;

/**
 * The RemoteAudio model allows the local participant to locally mute and unmute remote participants.
 *
 * This model is supported only in SDK 3.7 and later.
 */
export class RemoteAudio {
  /** @internal */
  _remoteAudio = CommsAPIRemoteAudioModule;

  /**
   * Allows the local participant to unmute a specific remote participant who is locally muted through the stop method. The start method does not impact audio transmission between remote participants and a conference and does not allow the local participant to force sending remote participants’ streams to the conference or to the local participant. This method is not available for listeners in Dolby Voice conferences.
   *
   * The start method requires up to a few seconds to become effective.
   *
   * @param participant The selected remote participant who is locally muted through the stop method.
   *
   */
  public async start(participant: Participant): Promise<void> {
    return this._remoteAudio.start(participant);
  }

  /**
   * Allows the local participant to locally mute specific remote participants. This method does not impact audio transmission between remote participants and a conference and does not allow the local participant to stop sending remote participants’ streams to the conference. This method is not available for listeners in Dolby Voice conferences.
   *
   * The stop method requires up to a few seconds to become effective.
   *
   * @param participant The selected remote participant who should be locally muted.
   */
  public async stop(participant: Participant): Promise<void> {
    return this._remoteAudio.stop(participant);
  }
}

export default new RemoteAudio();
