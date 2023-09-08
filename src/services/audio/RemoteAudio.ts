import { NativeModules } from 'react-native';

import type { MediaStream, Participant } from '../conference/models';

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

  /**
   * Sets the volume of a selected participant in non-Dolby Voice conferences to a preferred value between 0 and 1.
   * Providing an unsupported number results in constraining the volume to either 0 or 1.
   * Using the method for a selected participant after calling setOutputVolume overwrites the participant's volume.
   *
   * This method is supported in SDK 3.11 and later.
   *
   * @param participant The selected remote participant.
   * @param volume The preferred volume level between 0 (no audio) and 1 (full volume).
   */
  public async setParticipantVolume(
    participant: Participant,
    volume: number
  ): Promise<void> {
    return this._remoteAudio.setParticipantVolume(participant, volume);
  }

  /**
   * Sets the volume of a selected media stream in non-Dolby Voice conferences to a preferred value between 0 and 1.
   * Providing an unsupported number results in constraining volume to a either 0 or 1.
   * Using the method for a selected media stream after calling setOutputVolume or other setVolume methods overwrites the media stream's volume.
   *
   * This method is supported in SDK 3.11 and later.
   *
   * @param mediaStream The selected media stream.
   * @param volume The preferred volume level between 0 (no audio) and 1 (full volume).
   */
  public async setStreamVolume(
    mediaStream: MediaStream,
    volume: number
  ): Promise<void> {
    return this._remoteAudio.setStreamVolume(mediaStream, volume);
  }

  /**
   * Sets the conference volume for the local participant. The method sets the volume of all remote participants to a preferred value between 0 and 1.
   * Providing an unsupported volume results in constraining volume to a either 0 or 1.
   *
   * This method is supported in SDK 3.11 and later.
   *
   * @param volume The preferred volume level between 0 (no audio) and 1 (full volume).
   */
  public async setAllParticipantsVolume(volume: number): Promise<void> {
    return this._remoteAudio.setAllParticipantsVolume(volume);
  }
}

export default new RemoteAudio();
