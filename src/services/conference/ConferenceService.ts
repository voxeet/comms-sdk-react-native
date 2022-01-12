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
} from './models';
import { transformToConference, transformToParticipant } from './transformers';

const { CommsAPIConferenceServiceModule } = NativeModules;

/**
 * The ConferenceService allows an application to manage the conference life-cycle and interact with a conference. The service allows creating, joining, and leaving conferences and managing the audio, video, and screen-share streams.
 */
export class ConferenceService {
  /** @internal */
  _nativeModule = CommsAPIConferenceServiceModule;
  /** @internal */
  _nativeEvents = new NativeEvents(CommsAPIConferenceServiceModule);

  /**
   * Creates a conference and returns the Conference object.
   * @param options The options for the conference creation.
   */
  public async create(
    options: ConferenceCreateOptions = {}
  ): Promise<Conference> {
    return transformToConference(await this._nativeModule.create(options));
  }

  /**
   * Returns the Conference object for the current conference.
   */
  public async current(): Promise<Conference> {
    return transformToConference(await this._nativeModule.current());
  }

  /**
   * Returns a Conference object that can be used to join the conference. If the conference ID is not provided, the method returns the current Conference object.
   * @param conferenceId The conference ID.
   */
  public async fetch(conferenceId?: string): Promise<Conference> {
    return transformToConference(await this._nativeModule.fetch(conferenceId));
  }

  /**
   * Returns the participant's audio level, in the range from 0.0 to 1.0.
   * @param participant The Participant object.
   */
  public async getAudioLevel(participant: Participant): Promise<AudioLevel> {
    return this._nativeModule.getAudioLevel(participant);
  }

  /**
   * Gets the [standard WebRTC statistics](https://www.w3.org/TR/webrtc-stats/#dom-rtcstatstype).
   */
  public async getLocalStats(): Promise<RTCStatsType[]> {
    return this._nativeModule.getLocalStats();
  }

  /**
   * Returns the maximum number of video streams that can be transmitted to the local user.
   */
  public async getMaxVideoForwarding(): Promise<MaxVideoForwarding> {
    return this._nativeModule.getMaxVideoForwarding();
  }

  /**
   * Gets the Participant object for the specified ID.
   * @param participantId The participant ID.
   */
  public async getParticipant(participantId: String): Promise<Participant> {
    return transformToParticipant(
      await this._nativeModule.getParticipant(participantId)
    );
  }

  /**
   * Gets the list of conference participant objects.
   * @param conference<Conference> The Conference object.
   */
  public async getParticipants(
    conference: Conference
  ): Promise<Array<Participant>> {
    const participants = await this._nativeModule.getParticipants(conference);
    return participants.map(transformToParticipant);
  }

  /**
   * Gets the conference status.
   * @param conference The Conference object.
   */
  public async getStatus(conference: Conference): Promise<ConferenceStatus> {
    return this._nativeModule.getStatus(conference);
  }

  /**
   * Returns the current mute state of the local participant.
   */
  public async isMuted(): Promise<boolean> {
    return this._nativeModule.isMuted();
  }

  /**
   * Returns the participant's current speaking status for an active talker indicator.
   * @param participant The Participant object.
   */
  public async isSpeaking(participant: Participant): Promise<boolean> {
    return this._nativeModule.isSpeaking(participant);
  }

  /**
   * Joins a conference and returns the Conference object.
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
   * Kicks a participant out of the current conference. This actions requires you to be conference owner or to have the adequate permissions to kick a participant.
   * @param participant The participant who needs to be kicked from a conference.
   */
  public async kick(participant: Participant): Promise<void> {
    return this._nativeModule.kick(participant);
  }

  /**
   * Leaves the current conference.
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
   * Stops playing the specified remote participants' audio to the local participant or stops playing the local participant's audio to the conference.
   * @param isMuted The mute state, `true` indicates that a participant is muted, `false` indicates that a participant is not muted.
   * @param participant A remote participant.
   */
  public async mute(
    participant: Participant,
    isMuted: boolean
  ): Promise<boolean> {
    return this._nativeModule.mute(participant, isMuted);
  }

  /**
   * Replays a previously recorded conference. For more information, see the [Recording mechanisms](doc:guides-recording-mechanisms) article.
   * @param conference The Conference object.
   * @param replayOptions The replay options.
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
   * Enables and disables audio processing for a conference participant.
   * @param options The AudioProcessingOptions model includes the AudioProcessingSenderOptions model responsible for enabling and disabling audio processing.
   */
  public async setAudioProcessing(
    options: AudioProcessingOptions = {}
  ): Promise<void> {
    return this._nativeModule.setAudioProcessing(options);
  }

  /**
   * Sets the maximum number of video streams that may be transmitted to the local participant.
   * @param max The maximum number of video streams that may be transmitted to the local participant. The valid parameter values are between 0 and 4. By default, the parameter is set to 4.
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
   * Starts audio transmission between the local client and a conference. The startAudio method impacts only the audio streams that the local participant sends and receives; the method does not impact the audio transmission between remote participants and a conference and does not allow the local participant to force sending remote participants’ streams to the conference or to the local participant. Depending on the specified participant in the `participant` parameter, the startAudio method starts the proper audio transmission:
   * - When the specified participant is the local participant, startAudio ensures sending local participant’s audio from the local client to the conference.
   * - When the specified participant is a remote participant, startAudio ensures sending remote participant’s audio from the conference to the local client. This allows the local participant to unmute remote participants who are locally muted through the [stopAudio](#stopaudio) method.
   * @param participant The selected participant. If you wish to transmit the local participant's audio stream to the conference, provide the local participant's object. If you wish to receive the specific remote participants' audio streams, provide these remote participants' objects.
   */
  public async startAudio(participant: Participant): Promise<void> {
    return this._nativeModule.startAudio(participant);
  }

  /**
   * Starts a screen sharing session.
   * The ScreenShare with iOS document (https://docs.dolby.io/communications-apis/docs/screenshare-with-ios) describes how to set up screen-share outside the application.
   * Instead of setting the following properties:
   * - CommsSDK.shared.appGroup = "YOUR_APP_GROUP"
   * - CommsSDK.shared.preferredExtension = "YOUR_BROADCAST_EXTENSION_BUNDLE_ID"
   *  Set up keys in your `Info.plist` file:
   * - Add a new `DolbyioSdkAppGroupKey` as a string type and enter the group name ("YOUR_APP_GROUP").
   * - Add a new `DolbyioSdkPreferredExtensionKey` as a string type and enter the broadcast extension bundle ID ("YOUR_BROADCAST_EXTENSION_BUNDLE_ID").
   */
  public async startScreenShare(): Promise<void> {
    return this._nativeModule.startScreenShare();
  }

  /**
   * Notifies the server to either start sending the local participant's video stream to the conference or start sending a remote participant's video stream to the local participant. The startVideo method does not control the remote participant's video stream; if a remote participant does not transmit any video stream, the local participant cannot change it using the startVideo method.
   * @param participant The participant who will receive the video stream, either remote or local.
   */
  public async startVideo(participant: Participant): Promise<void> {
    return this._nativeModule.startVideo(participant);
  }

  /**
   * Stops audio transmission between the local client and a conference. The stopAudio method impacts only the audio streams that the local participant sends and receives; the method does not impact the audio transmission between remote participants and a conference and does not allow the local participant to stop sending remote participants’ streams to the conference. Depending on the specified participant in the `participant` parameter, the stopAudio method stops the proper audio transmission:
   * - When the specified participant is the local participant, stopAudio stops sending local participant’s audio from the local client to the conference.
   * - When the specified participant is a remote participant, stopAudio stops sending remote participant’s audio from the conference to the local client. This allows the local participant to locally mute remote participants.
   * @param participant The selected participant. If you wish to not transmit the local participant's audio stream to the conference, provide the local participant's object. If you wish to not receive the specific remote participants' audio streams, provide these remote participants' objects.
   */
  public async stopAudio(participant: Participant): Promise<void> {
    return this._nativeModule.stopAudio(participant);
  }

  /**
   * Stops a screen sharing session.
   */
  public async stopScreenShare(): Promise<void> {
    return this._nativeModule.stopScreenShare();
  }

  /**
   * Notifies the server to either stop sending the local participant's video stream to the conference or stop sending a remote participant's video stream to the local participant.
   * @param participant The participant who wants to stop receiving a video stream.
   */
  public async stopVideo(participant: Participant): Promise<void> {
    return this._nativeModule.stopVideo(participant);
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
   * Adds a listener to the conference status changed event.
   * @param handler An event callback function.
   * @returns A function that unsubscribes from event listeners.
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
   * Adds a listener to the permissions changed event.
   * @param handler An event callback function.
   * @returns A function that unsubscribes from event listeners.
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
   * Adds a listener to the participants changed event.
   * @param handler An event callback function.
   * @returns A function that unsubscribes from event listeners.
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
   * Adds a listener to the streams changed event.
   * @param handler An event callback function.
   * @returns A function that unsubscribes from event listeners.
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
}

export default new ConferenceService();
