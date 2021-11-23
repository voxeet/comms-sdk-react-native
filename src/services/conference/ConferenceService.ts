import { NativeModules } from 'react-native';

import NativeEvents from '../../utils/NativeEvents';
import SessionService from '../session/SessionService';
import { ConferenceServiceEventNames } from './events';
import type {
  PermissionsUpdatedEventType,
  ParticipantChangedEventType,
  StreamChangedEventType,
  ConferenceStatusUpdatedEventType,
} from './events';
import type {
  Conference,
  ConferenceCreateOptions,
  ConferenceReplayOptions,
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
  SpatialDirection,
  SpatialScale,
  SpatialPosition,
} from './models';
import { transformToConference, transformToParticipant } from './transformers';

const { DolbyIoIAPIConferenceService } = NativeModules;

/**
 * The ConferenceService allows the application to manage the conference
 * life-cycle and interact with the conference.
 */
export class ConferenceService {
  /** @internal */
  _nativeModule = DolbyIoIAPIConferenceService;
  /** @internal */
  _nativeEvents = new NativeEvents(DolbyIoIAPIConferenceService);

  /**
   * Create a conference with options
   * @param options The conference options
   */
  public async create(
    options: ConferenceCreateOptions = {}
  ): Promise<Conference> {
    return transformToConference(await this._nativeModule.create(options));
  }

  /**
   * Provides a Conference object that allows joining a conference. Without a param it returns current Conference object.
   * @param conferenceId The conference ID.
   */
  public async fetch(conferenceId?: string): Promise<Conference> {
    return transformToConference(await this._nativeModule.fetch(conferenceId));
  }

  /**
   * Provides information about the current conference.
   */
  public async current(): Promise<Conference> {
    return transformToConference(await this._nativeModule.current());
  }

  /**
   * Replays a previously recorded conference.
   * @param conference Conference object.
   * @param replayOptions Replay options.
   */
  public async replay(
    conference: Conference,
    replayOptions?: ConferenceReplayOptions
  ): Promise<Conference> {
    return transformToConference(
      await this._nativeModule.replay(conference, {
        offset: 0,
        ...replayOptions,
      })
    );
  }

  /**
   * Gets the participant's audio level
   * @param participant The participant object.
   */
  public async getAudioLevel(participant: Participant): Promise<AudioLevel> {
    return this._nativeModule.getAudioLevel(participant);
  }

  /**
   * Provides standard WebRTC statistics for the application.
   */
  public async getLocalStats(): Promise<RTCStatsType[]> {
    return this._nativeModule.getLocalStats();
  }

  /**
   * Provides the number of video streams that are transmitted to the local user.
   */
  public async getMaxVideoForwarding(): Promise<MaxVideoForwarding> {
    return this._nativeModule.getMaxVideoForwarding();
  }

  /**
   * The participant's information.
   * @param participantId ID of Participant.
   */
  public async getParticipant(participantId: String): Promise<Participant> {
    return transformToParticipant(
      await this._nativeModule.getParticipant(participantId)
    );
  }

  /**
   * Gets a list of conference participants
   * @param conference<Conference> The Conference object.
   */
  public async getParticipants(
    conference: Conference
  ): Promise<Array<Participant>> {
    const participants = await this._nativeModule.getParticipants(conference);
    return participants.map(transformToParticipant);
  }

  /**
   * Provides the conference status.
   * @param conference The Conference object.
   */
  public async getStatus(conference: Conference): Promise<ConferenceStatus> {
    return this._nativeModule.getStatus(conference);
  }

  /**
   * Gets the current mute state of the participant.
   * @returns Information if the local participant is muted.
   */
  public async isMuted(): Promise<boolean> {
    return this._nativeModule.isMuted();
  }

  /**
   * Gets the participant's current speaking status for an active talker indicator.
   * @param participant The Participant object.
   */
  public async isSpeaking(participant: Participant): Promise<boolean> {
    return this._nativeModule.isSpeaking(participant);
  }

  /**
   * Enables and disables audio processing for the conference participant.
   * @param options The AudioProcessingOptions model includes the AudioProcessingSenderOptions model responsible for enabling and disabling audio processing.
   */
  public async setAudioProcessing(
    options: AudioProcessingOptions = {}
  ): Promise<void> {
    return this._nativeModule.setAudioProcessing(options);
  }

  /**
   * Sets the maximum number of video streams that may be transmitted to the local participant.
   * @param max The maximum number of video streams that may be transmitted to the local participant. The valid parameter's values are between 0 and 4 for mobile browsers with 4 as default value.
   * @param prioritizedParticipants The list of the prioritized participants. This parameter allows using a pin option to prioritize specific participant's video streams and display their videos even when these participants do not talk.
   */
  public async setMaxVideoForwarding(
    max: MaxVideoForwarding = 4,
    prioritizedParticipants: Participant[] = []
  ): Promise<any> {
    return this._nativeModule.setMaxVideoForwarding(
      max,
      prioritizedParticipants
    );
  }

  /**
   * Stops playing the specified remote participants' audio to the local participant or stops playing the local participant's audio to the conference.
   * @param isMuted A boolean, true indicates that the local participant is muted, false indicates that a participant is not muted
   * @param participant A remote participant
   * @returns Informs if the mute state has changed.
   */
  public async mute(
    participant: Participant,
    isMuted: boolean
  ): Promise<boolean> {
    return this._nativeModule.mute(participant, isMuted);
  }

  /**
   * Updates the participant's conference permissions.
   * @param participantPermissions The set of participant's conference permissions.
   */
  public async updatePermissions(
    participantPermissions: Array<ParticipantPermissions>
  ): Promise<void> {
    return this._nativeModule.updatePermissions(participantPermissions);
  }

  /**
   * Starts audio transmission between the local client and a conference.
   * @param participant The participant whose stream should be sent to the local participant.
   */

  public async startAudio(participant: Participant): Promise<void> {
    return this._nativeModule.startAudio(participant);
  }

  /**
   * Notifies the server to either start sending the local participant's video stream to the conference or start sending a remote participant's video stream to the local participant.
   * @param participant The Participant object.
   */
  public async startVideo(participant: Participant): Promise<void> {
    return this._nativeModule.startVideo(participant);
  }

  /**
   * Stops audio transmission between the local client and a conference.
   * @param participant The Participant object.
   */
  public async stopAudio(participant: Participant): Promise<void> {
    return this._nativeModule.stopAudio(participant);
  }

  /**
   * Notifies the server to either stop sending the local participant's video stream to the conference or stop sending a remote participant's video stream to the local participant.
   * @param participant The Participant object.
   */
  public async stopVideo(participant: Participant): Promise<void> {
    return this._nativeModule.stopVideo(participant);
  }

  /**
   * Joins the conference.
   * @param conference The Conference object.
   * @param options The additional options for the joining participant.
   */
  public async join(
    conference: Conference,
    options?: ConferenceJoinOptions
  ): Promise<Conference> {
    return transformToConference(
      await this._nativeModule.join(conference, options)
    );
  }

  /**
   * Allows the conference owner, or a participant with adequate permissions, to kick another participant from the conference by revoking the conference access token.
   * @param participant The participant who needs to be kicked from the conference.
   */
  public async kick(participant: Participant): Promise<void> {
    return this._nativeModule.kick(participant);
  }

  /**
   * Leaves the conference.
   * @param options The additional options for the leaving participant.
   */
  public async leave(options?: ConferenceLeaveOptions): Promise<void> {
    await this._nativeModule.leave();
    if (options && options.leaveRoom) {
      await SessionService.close();
      return;
    } else {
      return;
    }
  }

  /**
   * Adds a listener for conference status changed event
   * @param handler Event callback function
   * @returns Function that unsubscribes from listeners
   */
  public onStatusChange(
    handler: (data: ConferenceStatusUpdatedEventType) => void
  ): UnsubscribeFunction {
    return this._nativeEvents.addListener(
      ConferenceServiceEventNames.StatusUpdated,
      handler
    );
  }

  /**
   * Adds a listener for permissions changed event
   * @param handler Event callback function
   * @returns Function that unsubscribes from listeners
   */
  public onPermissionsChange(
    handler: (data: PermissionsUpdatedEventType) => void
  ): UnsubscribeFunction {
    return this._nativeEvents.addListener(
      ConferenceServiceEventNames.PermissionsUpdated,
      handler
    );
  }

  /**
   * Adds a listener for participants changed event
   * @param handler Event callback function
   * @returns Function that unsubscribes from listeners
   */
  public onParticipantsChange(
    handler: (
      data: ParticipantChangedEventType,
      type?:
        | ConferenceServiceEventNames.ParticipantAdded
        | ConferenceServiceEventNames.ParticipantUpdated
    ) => void
  ): UnsubscribeFunction {
    const participantAddedEventUnsubscribe = this._nativeEvents.addListener(
      ConferenceServiceEventNames.ParticipantAdded,
      handler
    );
    const participantUpdatedEventUnsubscribe = this._nativeEvents.addListener(
      ConferenceServiceEventNames.ParticipantUpdated,
      handler
    );

    return () => {
      participantAddedEventUnsubscribe();
      participantUpdatedEventUnsubscribe();
    };
  }

  /**
   * Adds a listener for streams changed event
   * @param handler Event callback function
   * @returns Function that unsubscribes from listeners
   */
  public onStreamsChange(
    handler: (
      data: StreamChangedEventType,
      type?:
        | ConferenceServiceEventNames.StreamAdded
        | ConferenceServiceEventNames.StreamUpdated
        | ConferenceServiceEventNames.StreamRemoved
    ) => void
  ): UnsubscribeFunction {
    const streamAddedEventUnsubscribe = this._nativeEvents.addListener(
      ConferenceServiceEventNames.StreamAdded,
      handler
    );
    const streamUpdatedEventUnsubscribe = this._nativeEvents.addListener(
      ConferenceServiceEventNames.StreamUpdated,
      handler
    );
    const streamRemovedEventUnsubscribe = this._nativeEvents.addListener(
      ConferenceServiceEventNames.StreamRemoved,
      handler
    );

    return () => {
      streamAddedEventUnsubscribe();
      streamUpdatedEventUnsubscribe();
      streamRemovedEventUnsubscribe();
    };
  }

  /**
   * 	Starts a screen sharing session.
   * 	The ScreenShare with iOS document (https://docs.dolby.io/communications-apis/docs/screenshare-with-ios) describes how to set up screen-share outside the application.
   *
   Instead of setting properties:
   VoxeetSDK.shared.appGroup = "YOUR_APP_GROUP"
   VoxeetSDK.shared.preferredExtension = "YOUR_BROADCAST_EXTENSION_BUNDLE_ID"
   Setup keys in your Info.plist file:

   Open your Info.plist file then:
   - add a new DolbyioSdkAppGroupKey as a String type and enter the group name ("YOUR_APP_GROUP")
   - add a new DolbyioSdkPreferredExtensionKey as a String type and enter the broadcast extension bundle id ("YOUR_BROADCAST_EXTENSION_BUNDLE_ID")
   */
  public async startScreenShare(): Promise<void> {
    return this._nativeModule.startScreenShare();
  }

  /**
   * Stops a screen sharing session.
   */
  public async stopScreenShare(): Promise<void> {
    return this._nativeModule.stopScreenShare();
  }

  /**
   * Sets the direction a participant is facing in space.
   * @param participant The selected remote participant.
   * @param direction The direction the local participant is facing in space.
   */
  public async setSpatialDirection(
    participant: Participant,
    direction: SpatialDirection
  ): Promise<void> {
    return this._nativeModule.setSpatialDirection(participant, direction);
  }

  /**
   * Configures a spatial environment of an application, so the audio renderer understands which directions the application considers forward, up, and right and which units it uses for distance.
   * @param scale The application's distance units or scale in application units per one meter. The value must be greater than 0.
   * @param forward A vector describing the direction the application considers as forward. The value must be orthogonal to up and right.
   * @param up A vector describing the direction the application considers as up. The value must be orthogonal to forward and right.
   * @param right A vector describing the direction the application considers as right. The value must be orthogonal to forward and up.
   */
  public async setSpatialEnvironment(
    scale: SpatialScale,
    forward: SpatialPosition,
    up: SpatialPosition,
    right: SpatialPosition
  ): Promise<void> {
    return this._nativeModule.setSpatialEnvironment(scale, forward, up, right);
  }

  /**
   * Sets a participant's position in space to enable the spatial audio experience during a Dolby Voice conference.
   * @param participant The selected remote participant.
   * @param position The participant's audio location from which their audio will be rendered.
   */
  public async setSpatialPosition(
    participant: Participant,
    position: SpatialPosition
  ): Promise<void> {
    return this._nativeModule.setSpatialPosition(participant, position);
  }
}

export default new ConferenceService();
