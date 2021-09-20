/**
 * @category ConferenceService
 * @module ConferenceService
 */

import { Alert, NativeModules } from 'react-native';
const { DolbyioIAPISdk } = NativeModules;
import type {
  Conference,
  ConferenceCreateOptions,
  ConferenceReplayOptions,
  ConferenceMixingOptions,
  Participant,
  AudioProcessing,
  ConferenceStatus,
  AudioProcessingOptions,
  ParticipantPermissions,
} from './types';

export class ConferenceService {
  public join(): void {
    Alert.alert('Conference Joined');
  }

  /**
   * Create a conference with ConferenceOptions
   * @param options<CreateOptions> The conference options
   * @returns {Promise<Conference>} Promise with a Conference
   */

  public async create(options: ConferenceCreateOptions): Promise<Conference> {
    return DolbyioIAPISdk.create(options);
  }

  /**
   * Provides a Conference object that allows joining a conference. Without a param returns current Conference object.
   * @param conferenceId?<string> The conference ID.
   * @returns {Promise<Conference>} Promise with a Conference
   */

  public async fetch(conferenceId?: string): Promise<Conference> {
    return DolbyioIAPISdk.fetch(conferenceId);
  }

  /**
   * Returns information about the current conference.
   * @returns {Promise<Conference>} Promise with a Conference
   */

  public async current(): Promise<Conference> {
    return DolbyioIAPISdk.current();
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
    return DolbyioIAPISdk.replay(conference, replayOptions, mixingOptions);
  }

  /**
   * Gets the participant's audio level
   * @param participant<Participant> The Participant object.
   * @returns {Promise<number>} Promise with number
   */
  // TODO - AudioLevel type for Promise

  public async getAudioLevel(participant?: Participant): Promise<number> {
    return DolbyioIAPISdk.getAudioLevel(participant);
  }

  /**
   * Gets the current audio processing state for a conference.
   * @param participant<Participant> The Participant object.
   * @returns {Promise<AudioProcessing>} Promise with AudioProcessing
   */

  public async getAudioProcessing(
    participant?: Participant
  ): Promise<AudioProcessing> {
    return DolbyioIAPISdk.getAudioProcessing(participant);
  }

  /**
   * Provides standard WebRTC statistics for the application.
   * @returns {Promise<any>} Promise with LocalStats
   */
  // TODO - LocalStats type for Promise

  public async getLocalStats(): Promise<any> {
    return DolbyioIAPISdk.getLocalStats();
  }

  /**
   * Provides the number of video streams that are transmitted to the local user.
   * @returns {Promise<number>} Promise with Number
   */

  public async getMaxVideoForwarding(): Promise<number> {
    return DolbyioIAPISdk.getMaxVideoForwarding();
  }

  /**
   * The participant's information.
   * @param participantId<string> ID of Participant
   * @returns {Promise<Participant>} Promise with Participant
   */

  public async getParticipant(participantId?: String): Promise<Participant> {
    return DolbyioIAPISdk.getParticipant(participantId);
  }

  /**
   * Gets a list of Conference participants
   * @param conference<Conference> The conference object.
   * @returns {Promise<Array<Participant>>} Promise with array of Participants
   */

  public async getParticipants(
    conference?: Conference
  ): Promise<Array<Participant>> {
    return DolbyioIAPISdk.getParticipants(conference);
  }

  /**
   * Provides the conference status.
   * @param conference<Conference> The conference object.
   * @returns {Promise<ConferenceStatus>} Promise with a ConferenceStatus
   */

  public async getStatus(conference?: Conference): Promise<ConferenceStatus> {
    return DolbyioIAPISdk.getStatus(conference);
  }

  /**
   * Informs whether the application plays the remote participants' audio to the local participant.
   * @returns {Promise<boolean>} A boolean indicating whether the application plays the remote participants' audio to the local participant.
   */

  public async isOutputMuted(): Promise<boolean> {
    return DolbyioIAPISdk.inOutputMuted();
  }

  /**
   * Gets the current mute state of the participant.
   * @param participant<Participant> The Participant object.
   * @returns {Promise<boolean>} Information if the local participant is muted.
   */

  public async isMuted(participant?: Participant): Promise<boolean> {
    return DolbyioIAPISdk.isMuted(participant);
  }

  /**
   * Gets the participant's current speaking status for an active talker indicator.
   * @param participant<Participant> The Participant object.
   * @returns {Promise<boolean>} A boolean indicating whether the current participant is speaking.
   */

  public async isSpeaking(participant?: Participant): Promise<boolean> {
    return DolbyioIAPISdk.isSpeaking(participant);
  }

  /**
   * Enables and disables audio processing for the conference participant.
   * @param options<AudioProcessingOptions> The AudioProcessingOptions model includes the AudioProcessingSenderOptions model responsible for enabling and disabling audio processing.
   * @returns {Promise<any>}
   */

  public async setAudioProcessing(
    options: AudioProcessingOptions
  ): Promise<any> {
    return DolbyioIAPISdk.setAudioProcessing(options);
  }

  /**
   * Sets the maximum number of video streams that may be transmitted to the local participant.
   * @returns {Promise<any>}
   */

  public async setMaxVideoForwarding(): Promise<any> {
    return DolbyioIAPISdk.setMaxVideoForwarding();
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
    return DolbyioIAPISdk.mute(participant, isMuted);
  }

  /**
   * Updates the participant's conference permissions.
   * @param participantPermissions<ParticipantPermissions[]> The set of participant's conference permissions.
   * @returns {Promise<any>}
   */

  public async updatePermissions(
    participantPermissions: Array<ParticipantPermissions>
  ): Promise<any> {
    return DolbyioIAPISdk.updatePermissions(participantPermissions);
  }
}

export default new ConferenceService();
