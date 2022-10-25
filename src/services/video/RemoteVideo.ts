import { NativeModules } from 'react-native';

import type { Participant } from '../conference/models';

const { CommsAPIRemoteVideoModule } = NativeModules;

/**
 * The RemoteVideo model allows the local participant to locally mute and unmute remote participants.
 *
 * This model is supported only in SDK 3.7 and later.
 */
export class RemoteVideo {
  /** @internal */
  _remoteVideo = CommsAPIRemoteVideoModule;

  /**
   * If the local participant used the stop method to stop receiving video streams from selected remote participants, the start method allows the participant to start receiving video streams from these participants. The start method does not impact the video transmission between remote participants and a conference and does not allow the local participant to force sending remote participants’ streams to the conference or to the local participant.
   *
   * The start method requires a few seconds to become effective.
   *
   * @param participant The selected remote participant who is locally muted through the stop method.
   *
   */
  public async start(participant: Participant): Promise<void> {
    return this._remoteVideo.start(participant);
  }

  /**
   * Allows the local participant to stop receiving video from specific remote participants. This method does not impact audio transmission between remote participants and a conference and does not allow the local participant to stop sending remote participants’ streams to the conference.
   *
   * The stop method requires a few seconds to become effective.
   *
   * @param participant The selected remote participant who should be locally muted.
   */
  public async stop(participant: Participant): Promise<void> {
    return this._remoteVideo.stop(participant);
  }
}

export default new RemoteVideo();
