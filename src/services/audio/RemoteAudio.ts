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
   * Allows the local participant to start receiving audio from a specific remote participant. The start method does not impact audio transmission between remote participants and a conference and does not allow the local participant to force sending remote participants’ streams to the conference or to the local participant. The method requires a few seconds to become effective.
   *
   * In Dolby Voice conferences and in the case of [mixed](doc:rn-client-sdk-enums-listentype#mixed) listeners, the method works as [mute](doc:rn-client-sdk-conferenceservice#mute), so it locally starts playing audio from a remote participant.
   *
   * @param participant The selected remote participant who is locally muted through the stop method.
   *
   */
  public async start(participant: Participant): Promise<void> {
    return this._remoteAudio.start(participant);
  }

  /**
   * Allows the local participant to stop receiving audio from specific remote participants. This method does not impact audio transmission between remote participants and a conference and does not allow the local participant to stop sending remote participants’ streams to the conference. The method requires up to a few seconds to become effective.
   *
   * In Dolby Voice conferences and in the case of [mixed](doc:rn-client-sdk-enums-listentype#mixed) listeners, the method works as [mute](doc:rn-client-sdk-conferenceservice#mute), so it locally stops playing audio while the audio stream is still received.
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
