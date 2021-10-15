import NativeEvents from '../../utils/NativeEvents';
import { ConferenceServiceEventNames } from './events';
import type {
  PermissionsUpdatedEventType,
  ParticipantAddedEventType,
  ParticipantUpdatedEventType,
  ParticipantRemovedEventType,
  StreamAddedEventType,
  StreamUpdatedEventType,
  StreamRemovedEventType,
  ConferenceStatusUpdatedEventType,
} from './events';
import type {
  Conference,
  ConferenceCreateOptions,
  ConferenceReplayOptions,
  ConferenceMixingOptions,
  ConferenceJoinOptions,
  ConferenceLeaveOptions,
  AudioLevel,
  MaxVideoForwarding,
  Participant,
  ConferenceStatus,
  AudioProcessingOptions,
  ParticipantPermissions,
  UnsubscribeFunction,
  RTCStatsType,
} from './models';
import { transformToConference, transformToParticipant } from './transformers';
import { NativeModules } from 'react-native';

const { DolbyIoIAPIConferenceService } = NativeModules;

export class ConferenceService {
  /**
   * Create a conference with options
   * @param options<CreateOptions> The conference options
   * @returns {Promise<Conference>} Promise with a Conference object
   */

  public async create(
    options: ConferenceCreateOptions = {}
  ): Promise<Conference> {
    return transformToConference(
      await DolbyIoIAPIConferenceService.create(options)
    );
  }

  /**
   * Provides a Conference object that allows joining a conference. Without a param it returns current Conference object.
   * @param conferenceId?<string> The conference ID.
   * @returns {Promise<Conference>} Promise with a Conference object
   */

  public async fetch(conferenceId?: string): Promise<Conference> {
    return transformToConference(
      await DolbyIoIAPIConferenceService.fetch(conferenceId)
    );
  }

  /**
   * Provides information about the current conference.
   * @returns {Promise<Conference>} Promise with a Conference object
   */

  public async current(): Promise<Conference> {
    return transformToConference(await DolbyIoIAPIConferenceService.current());
  }

  /**
   * Replays a previously recorded conference.
   * @param conference<Conference> The Conference.
   * @param replayOptions<ConferenceReplayOptions> The replay options.
   * @param mixingOptions<ConferenceMixingOptions> The object that notifies the server that a participant who replays the conference is a special participant called Mixer.
   * @returns {Promise<Conference>} Promise with a Conference object
   */

  public async replay(
    conference: Conference,
    replayOptions?: ConferenceReplayOptions,
    mixingOptions?: ConferenceMixingOptions
  ): Promise<Conference> {
    return transformToConference(
      await DolbyIoIAPIConferenceService.replay(
        conference,
        {
          offset: 0,
          ...replayOptions,
        },
        mixingOptions
      )
    );
  }

  /**
   * Gets the participant's audio level
   * @param participant<Participant> The participant object.
   * @returns {Promise<AudioLevel>} Promise with AudioLevel
   */

  public async getAudioLevel(participant: Participant): Promise<AudioLevel> {
    return DolbyIoIAPIConferenceService.getAudioLevel(participant);
  }

  /**
   * Provides standard WebRTC statistics for the application.
   * @returns {Promise<RTCStatsType>} Promise with LocalStats
   */

  public async getLocalStats(): Promise<RTCStatsType[]> {
    return DolbyIoIAPIConferenceService.getLocalStats();
  }

  /**
   * Provides the number of video streams that are transmitted to the local user.
   * @returns {Promise<MaxVideoForwarding>} Promise with MaxVideoForwarding
   */

  public async getMaxVideoForwarding(): Promise<MaxVideoForwarding> {
    return DolbyIoIAPIConferenceService.getMaxVideoForwarding();
  }

  /**
   * The participant's information.
   * @param participantId<string> ID of Participant
   * @returns {Promise<Participant>} Promise with Participant
   */

  public async getParticipant(participantId: String): Promise<Participant> {
    return transformToParticipant(
      await DolbyIoIAPIConferenceService.getParticipant(participantId)
    );
  }

  /**
   * Gets a list of conference participants
   * @param conference<Conference> The Conference object.
   * @returns {Promise<Array<Participant>>} Promise with array of Participants
   */

  public async getParticipants(
    conference: Conference
  ): Promise<Array<Participant>> {
    const participants = await DolbyIoIAPIConferenceService.getParticipants(
      conference
    );
    return participants.map(transformToParticipant);
  }

  /**
   * Provides the conference status.
   * @param conference<Conference> The Conference object.
   * @returns {Promise<ConferenceStatus>} Promise with a ConferenceStatus string
   */

  public async getStatus(conference: Conference): Promise<ConferenceStatus> {
    return DolbyIoIAPIConferenceService.getStatus(conference);
  }

  /**
   * Informs whether the application plays the remote participants' audio to the local participant.
   * @returns {Promise<boolean>} A boolean indicating whether the application plays the remote participants' audio to the local participant.
   */

  public async isOutputMuted(): Promise<boolean> {
    return !!(await DolbyIoIAPIConferenceService.isOutputMuted());
  }

  /**
   * Gets the current mute state of the participant.
   * @returns {Promise<boolean>} Information if the local participant is muted.
   */

  public async isMuted(): Promise<boolean> {
    return DolbyIoIAPIConferenceService.isMuted();
  }

  /**
   * Gets the participant's current speaking status for an active talker indicator.
   * @param participant<Participant> The Participant object.
   * @returns {Promise<boolean>} A boolean indicating whether the current participant is speaking.
   */

  public async isSpeaking(participant: Participant): Promise<boolean> {
    return DolbyIoIAPIConferenceService.isSpeaking(participant);
  }

  /**
   * Enables and disables audio processing for the conference participant.
   * @param options<AudioProcessingOptions> The AudioProcessingOptions model includes the AudioProcessingSenderOptions model responsible for enabling and disabling audio processing.
   * @returns {Promise<void>}
   */

  public async setAudioProcessing(
    options: AudioProcessingOptions = {}
  ): Promise<void> {
    return DolbyIoIAPIConferenceService.setAudioProcessing(options);
  }

  /**
   * Sets the maximum number of video streams that may be transmitted to the local participant.
   * @param max<MaxVideoForwarding> The maximum number of video streams that may be transmitted to the local participant. The valid parameter's values are between 0 and 4 for mobile browsers with 4 as default value.
   * @param prioritizedParticipants<Participant[]> The list of the prioritized participants. This parameter allows using a pin option to prioritize specific participant's video streams and display their videos even when these participants do not talk.
   * @returns {Promise<any>}
   */

  public async setMaxVideoForwarding(
    max: MaxVideoForwarding = 4,
    prioritizedParticipants: Participant[] = []
  ): Promise<any> {
    return DolbyIoIAPIConferenceService.setMaxVideoForwarding(
      max,
      prioritizedParticipants
    );
  }

  /**
   * Stops playing the specified remote participants' audio to the local participant or stops playing the local participant's audio to the conference.
   * @param isMuted<boolean> A boolean, true indicates that the local participant is muted, false indicates that a participant is not muted
   * @param participant<Participant> A remote participant
   * @returns {Promise<boolean>} Informs if the mute state has changed.
   */

  public async mute(
    participant: Participant,
    isMuted: boolean
  ): Promise<boolean> {
    return DolbyIoIAPIConferenceService.mute(isMuted, participant);
  }

  /**
   * Updates the participant's conference permissions.
   * @param participantPermissions<ParticipantPermissions[]> The set of participant's conference permissions.
   * @returns {Promise<void>}
   */

  public async updatePermissions(
    participantPermissions: Array<ParticipantPermissions>
  ): Promise<void> {
    return DolbyIoIAPIConferenceService.updatePermissions(
      participantPermissions
    );
  }

  /**
   * Starts audio transmission between the local client and a conference.
   * @param participant<Participant> The participant whose stream should be sent to the local participant.
   * @returns {Promise<void>}
   */

  public async startAudio(participant: Participant): Promise<void> {
    return DolbyIoIAPIConferenceService.startAudio(participant);
  }

  /**
   * Notifies the server to either start sending the local participant's video stream to the conference or start sending a remote participant's video stream to the local participant.
   * @param participant<Participant> The Participant object.
   * @returns {Promise<void>}
   */

  public async startVideo(participant: Participant): Promise<void> {
    return DolbyIoIAPIConferenceService.startVideo(participant);
  }

  /**
   * Stops audio transmission between the local client and a conference.
   * @param participant<Participant> The Participant object.
   * @returns {Promise<void>}
   */

  public async stopAudio(participant: Participant): Promise<void> {
    return DolbyIoIAPIConferenceService.stopAudio(participant);
  }

  /**
   * Notifies the server to either stop sending the local participant's video stream to the conference or stop sending a remote participant's video stream to the local participant.
   * @param participant<Participant> The Participant object.
   * @returns {Promise<void>}
   */

  public async stopVideo(participant: Participant): Promise<void> {
    return DolbyIoIAPIConferenceService.stopVideo(participant);
  }

  /**
   * Joins the conference.
   * @param conference<Conference> The Conference object.
   * @param options<ConferenceJoinOptions> The additional options for the joining participant.
   * @returns {Promise<Conference>} Promise with the Conference
   */

  public async join(
    conference: Conference,
    options?: ConferenceJoinOptions
  ): Promise<Conference> {
    return transformToConference(
      await DolbyIoIAPIConferenceService.join(conference, options)
    );
  }

  /**
   * Allows the conference owner, or a participant with adequate permissions, to kick another participant from the conference by revoking the conference access token.
   * @param participant<Participant> The participant who needs to be kicked from the conference.
   * @returns {Promise<void>}
   */

  public async kick(participant: Participant): Promise<void> {
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
   * @param handler<(data: ConferenceStatusUpdatedEventType) => void> Handling function
   * @returns {UnsubscribeFunction} Function that removes handler
   */
  public onStatusChange(
    handler: (data: ConferenceStatusUpdatedEventType) => void
  ): UnsubscribeFunction {
    return NativeEvents.addListener(
      ConferenceServiceEventNames.ConferenceStatusUpdated,
      (data) => {
        handler(data);
      }
    );
  }

  /**
   * Add a handler for permissions changes
   * @param handler<(data: PermissionsUpdatedEventType) => void> Handling function
   * @returns {UnsubscribeFunction} Function that removes handler
   */

  public onPermissionsChange(
    handler: (data: PermissionsUpdatedEventType) => void
  ): UnsubscribeFunction {
    return NativeEvents.addListener(
      ConferenceServiceEventNames.PermissionsUpdated,
      (data) => {
        handler(data);
      }
    );
  }

  /**
   * Add a handler for participants changes
   * @param handler<(data: ParticipantAddedEventType | ParticipantUpdatedEventType | ParticipantRemovedEventType) => void> Handling function
   * @returns {UnsubscribeFunction} Function that removes handler
   */

  public onParticipantsChange(
    handler: (
      data:
        | ParticipantAddedEventType
        | ParticipantUpdatedEventType
        | ParticipantRemovedEventType
    ) => void
  ): UnsubscribeFunction {
    const participantAddedEventUnsubscribe = NativeEvents.addListener(
      ConferenceServiceEventNames.ParticipantAdded,
      (data) => {
        handler(data);
      }
    );
    const participantUpdatedEventUnsubscribe = NativeEvents.addListener(
      ConferenceServiceEventNames.ParticipantUpdated,
      (data) => {
        handler(data);
      }
    );
    const participantRemovedEventUnsubscribe = NativeEvents.addListener(
      ConferenceServiceEventNames.ParticipantRemoved,
      (data) => {
        handler(data);
      }
    );

    return () => {
      participantAddedEventUnsubscribe();
      participantUpdatedEventUnsubscribe();
      participantRemovedEventUnsubscribe();
    };
  }

  /**
   * Add a handler for streams changes
   * @param handler<(data: StreamAddedEventType | StreamUpdatedEventType | StreamRemovedEventType) => void> Handling function
   * @returns {UnsubscribeFunction} Function that removes handler
   */

  public onStreamsChange(
    handler: (
      data:
        | StreamAddedEventType
        | StreamUpdatedEventType
        | StreamRemovedEventType
    ) => void
  ): UnsubscribeFunction {
    const streamAddedEventUnsubscribe = NativeEvents.addListener(
      ConferenceServiceEventNames.StreamAdded,
      (data) => {
        handler(data);
      }
    );
    const streamUpdatedEventUnsubscribe = NativeEvents.addListener(
      ConferenceServiceEventNames.StreamUpdated,
      (data) => {
        handler(data);
      }
    );
    const streamRemovedEventUnsubscribe = NativeEvents.addListener(
      ConferenceServiceEventNames.StreamRemoved,
      (data) => {
        handler(data);
      }
    );

    return () => {
      streamAddedEventUnsubscribe();
      streamUpdatedEventUnsubscribe();
      streamRemovedEventUnsubscribe();
    };
  }
}

export default new ConferenceService();
