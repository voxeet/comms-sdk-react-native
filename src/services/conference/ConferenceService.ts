import { NativeModules } from 'react-native';
const { DolbyIoIAPIConferenceService } = NativeModules;

import type {
  Conference,
  ConferenceCreateOptions,
  ConferenceReplayOptions,
  ConferenceMixingOptions,
  ConferenceJoinOptions,
  ConferenceLeaveOptions,
  Participant,
  AudioProcessing,
  ConferenceStatus,
  AudioProcessingOptions,
  ParticipantPermissions,
} from './models';
import { ConferenceServiceEventNames } from './events';
import NativeEvents from '../../utils/NativeEvents';

export class ConferenceService {
  /**
   * Create a conference with ConferenceOptions
   * @param options<CreateOptions> The conference options
   * @returns {Promise<Conference>} Promise with a Conference
   */

  public async create(options: ConferenceCreateOptions): Promise<Conference> {
    return DolbyIoIAPIConferenceService.create(options);
  }

  /**
   * Provides a Conference object that allows joining a conference. Without a param returns current Conference object.
   * @param conferenceId?<string> The conference ID.
   * @returns {Promise<Conference>} Promise with a Conference
   */

  public async fetch(conferenceId?: string): Promise<Conference> {
    return DolbyIoIAPIConferenceService.fetch(conferenceId);
  }

  /**
   * Returns information about the current conference.
   * @returns {Promise<Conference>} Promise with a Conference
   */

  public async current(): Promise<Conference> {
    return DolbyIoIAPIConferenceService.current();
  }

  /**
   * Replays a previously recorded conference.
   * @param conference<Conference> The conference object.
   * @param replayOptions<ConferenceReplayOptions> The replay options.
   * @param mixingOptions<ConferenceMixingOptions> The model that notifies the server that a participant who replays the conference is a special participant called Mixer.
   * @returns {Promise<Conference>} Promise with a Conference
   */

  public async replay(
    conference: Conference,
    replayOptions?: ConferenceReplayOptions,
    mixingOptions?: ConferenceMixingOptions
  ): Promise<Conference> {
    return DolbyIoIAPIConferenceService.replay(
      conference,
      replayOptions,
      mixingOptions
    );
  }

  /**
   * Gets the participant's audio level
   * @param participant<Participant> The Participant object.
   * @returns {Promise<number>} Promise with number
   */
  // TODO - AudioLevel type for Promise

  public async getAudioLevel(participant?: Participant): Promise<number> {
    return DolbyIoIAPIConferenceService.getAudioLevel(participant);
  }

  /**
   * Gets the current audio processing state for a conference.
   * @param participant<Participant> The Participant object.
   * @returns {Promise<AudioProcessing>} Promise with AudioProcessing
   */

  public async getAudioProcessing(
    participant?: Participant
  ): Promise<AudioProcessing> {
    return DolbyIoIAPIConferenceService.getAudioProcessing(participant);
  }

  /**
   * Provides standard WebRTC statistics for the application.
   * @returns {Promise<any>} Promise with LocalStats
   */
  // TODO - LocalStats type for Promise

  public async getLocalStats(): Promise<any> {
    return DolbyIoIAPIConferenceService.getLocalStats();
  }

  /**
   * Provides the number of video streams that are transmitted to the local user.
   * @returns {Promise<number>} Promise with Number
   */

  public async getMaxVideoForwarding(): Promise<number> {
    return DolbyIoIAPIConferenceService.getMaxVideoForwarding();
  }

  /**
   * The participant's information.
   * @param participantId<string> ID of Participant
   * @returns {Promise<Participant>} Promise with Participant
   */

  public async getParticipant(participantId?: String): Promise<Participant> {
    return DolbyIoIAPIConferenceService.getParticipant(participantId);
  }

  /**
   * Gets a list of Conference participants
   * @param conference<Conference> The conference object.
   * @returns {Promise<Array<Participant>>} Promise with array of Participants
   */

  public async getParticipants(
    conference?: Conference
  ): Promise<Array<Participant>> {
    return DolbyIoIAPIConferenceService.getParticipants(conference);
  }

  /**
   * Provides the conference status.
   * @param conference<Conference> The conference object.
   * @returns {Promise<ConferenceStatus>} Promise with a ConferenceStatus
   */

  public async getStatus(conference?: Conference): Promise<ConferenceStatus> {
    return DolbyIoIAPIConferenceService.getStatus(conference);
  }

  /**
   * Informs whether the application plays the remote participants' audio to the local participant.
   * @returns {Promise<boolean>} A boolean indicating whether the application plays the remote participants' audio to the local participant.
   */

  public async isOutputMuted(): Promise<boolean> {
    return DolbyIoIAPIConferenceService.inOutputMuted();
  }

  /**
   * Gets the current mute state of the participant.
   * @param participant<Participant> The Participant object.
   * @returns {Promise<boolean>} Information if the local participant is muted.
   */

  public async isMuted(participant?: Participant): Promise<boolean> {
    return DolbyIoIAPIConferenceService.isMuted(participant);
  }

  /**
   * Gets the participant's current speaking status for an active talker indicator.
   * @param participant<Participant> The Participant object.
   * @returns {Promise<boolean>} A boolean indicating whether the current participant is speaking.
   */

  public async isSpeaking(participant?: Participant): Promise<boolean> {
    return DolbyIoIAPIConferenceService.isSpeaking(participant);
  }

  /**
   * Enables and disables audio processing for the conference participant.
   * @param options<AudioProcessingOptions> The AudioProcessingOptions model includes the AudioProcessingSenderOptions model responsible for enabling and disabling audio processing.
   * @returns {Promise<any>}
   */

  public async setAudioProcessing(
    options: AudioProcessingOptions
  ): Promise<any> {
    return DolbyIoIAPIConferenceService.setAudioProcessing(options);
  }

  /**
   * Sets the maximum number of video streams that may be transmitted to the local participant.
   * @returns {Promise<any>}
   */

  public async setMaxVideoForwarding(): Promise<any> {
    return DolbyIoIAPIConferenceService.setMaxVideoForwarding();
  }

  /**
   * Stops playing the specified remote participants' audio to the local participant or stops playing the local participant's audio to the conference.
   * @param isMuted<boolean> A boolean, true indicates that the local participant is muted, false indicates that a participant is not muted
   * @param participant<Participant> A remote participant
   * @returns {Promise<boolean>} Informs if the mute state has changed.
   */

  public async mute(
    isMuted: boolean,
    participant?: Participant
  ): Promise<boolean> {
    return DolbyIoIAPIConferenceService.mute(participant, isMuted);
  }

  /**
   * Updates the participant's conference permissions.
   * @param participantPermissions<ParticipantPermissions[]> The set of participant's conference permissions.
   * @returns {Promise<any>}
   */

  public async updatePermissions(
    participantPermissions: Array<ParticipantPermissions>
  ): Promise<any> {
    return DolbyIoIAPIConferenceService.updatePermissions(
      participantPermissions
    );
  }

  /**
   * Starts audio transmission between the local client and a conference.
   * @param participant<Participant> The participant whose stream should be sent to the local participant.
   * @returns {Promise<any>}
   */

  public async startAudio(participant?: Participant): Promise<any> {
    return DolbyIoIAPIConferenceService.startAudio(participant);
  }

  /**
   * Notifies the server to either start sending the local participant's video stream to the conference or start sending a remote participant's video stream to the local participant.
   * @param participant<Participant> The Participant object.
   * @returns {Promise<any>}
   */

  public async startVideo(participant?: Participant): Promise<any> {
    return DolbyIoIAPIConferenceService.startVideo(participant);
  }

  /**
   * Stops audio transmission between the local client and a conference.
   * @param participant<Participant> The Participant object.
   * @returns {Promise<any>}
   */

  public async stopAudio(participant?: Participant): Promise<any> {
    return DolbyIoIAPIConferenceService.stopAudio(participant);
  }

  /**
   * Notifies the server to either stop sending the local participant's video stream to the conference or stop sending a remote participant's video stream to the local participant.
   * @param participant<Participant> The Participant object.
   * @returns {Promise<any>}
   */

  public async stopVideo(participant?: Participant): Promise<any> {
    return DolbyIoIAPIConferenceService.stopVideo(participant);
  }

  /**
   * Joins the conference.
   * @param conference<Conference> The conference object.
   * @param options<ConferenceJoinOptions> The additional options for the joining participant.
   * @returns {Promise<Conference>} Promise with the Conference
   */

  public async join(
    conference: Conference,
    options?: ConferenceJoinOptions
  ): Promise<Conference> {
    return DolbyIoIAPIConferenceService.join(conference, options);
  }

  /**
   * Allows the conference owner, or a participant with adequate permissions, to kick another participant from the conference by revoking the conference access token.
   * @param participant<Participant> The participant who needs to be kicked from the conference.
   * @returns {Promise<any>}
   */

  public async kick(participant: Participant): Promise<any> {
    return DolbyIoIAPIConferenceService.kick(participant);
  }

  /**
   * Leaves the conference.
   * @param options<ConferenceJoinOptions> The additional options for the leaving participant.
   * @returns {Promise<boolean>}
   */

  public async leave(options?: ConferenceLeaveOptions): Promise<boolean> {
    return DolbyIoIAPIConferenceService.leave(options);
  }

  /**
   * Add a handler for conference status changes
   * @param handler<(data: any) => void> Handling function
   * @returns {() => void} Function that removes handler
   */
  public onStatusChange(handler: (data: any) => void): () => void {
    return NativeEvents.addListener(
      ConferenceServiceEventNames.ConferenceStatusUpdated,
      (data) => {
        handler(data);
      }
    );
  }
}

export default new ConferenceService();
