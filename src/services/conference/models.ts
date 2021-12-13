/** The Conference interface gathers information about a conference. */
export interface Conference {
  /** The conference ID. */
  id?: string;
  /** The conference alias. */
  alias?: string;
  /** A boolean indicating if a created conference is new. */
  isNew?: boolean;
  /** An array of conference participants. */
  participants: Participant[];
  /** The current conference status. */
  status: ConferenceStatus;
}

/** The ConferenceCreateParameters interface gathers parameters settings for a requested conference. */
export interface ConferenceCreateParameters {
  /** The time to live that allows customizing time after which the SDK terminates empty conferences (is seconds). The default ttl value is 0 seconds. */
  ttl?: number;
  /** The bitrate adaptation mode for video transmission. The parameter triggers a server to monitor the receivers’ available bandwidth. Based on the analyzed value, the server informs the video sender to automatically adjust the quality of the transmitted video streams. */
  rtcpMode?: RTCPMode;
  /** The preferred video codec that is used during a conference, either H264 or VP8. By default, the SDK uses the H264 codec. */
  videoCodec?: Codec;
  /** A boolean that enables and disables live recording. Specify this parameter during the conference creation:
   * - When set to `true`, the recorded file is available at the end of the call and can be downloaded immediately.
   * - When set to `false`, the [remix API](ref:remix) must be called after the conference to generate and retrieve the recorded file.
   *
   * This parameter does not start the recording; use the [start](doc:js-client-sdk-recordingservice#start) method to turn it on. For more information, see the [Recording Mechanisms](doc:guides-recording-mechanisms#recording-types) article. */
  liveRecording?: boolean;
  /** A boolean that indicates whether an application wishes to create a conference with Dolby Voice enabled. For more information about Dolby Voice, see the [Dolby Voice](doc:guides-dolby-voice) article. By default, the parameter is set to `true`. */
  dolbyVoice?: boolean;
}

/** The ConferenceCreateOptions interface gathers information about a new conference. */
export interface ConferenceCreateOptions {
  /** The conference alias. */
  alias?: string;
  /** The conference parameters. */
  params?: ConferenceCreateParameters;
  /** The PIN code of a conference. */
  pinCode?: number;
}

/** The ConferenceLeaveOptions interface gathers information about preferences for leaving a conference. */
export interface ConferenceLeaveOptions {
  /** A boolean indicating whether the SDK should close a session after leaving a conference or leave a session open. */
  leaveRoom: boolean;
}

/** The ConferenceStatus enum gathers the possible conference statuses. */
export enum ConferenceStatus {
  /** The default conference status. */
  DEFAULT = 'DEFAULT',
  /** The SDK is creating a conference. */
  CREATING = 'CREATING',
  /** A new conference is created. */
  CREATED = 'CREATED',
  /** The local participant is joining a conference. */
  JOINING = 'JOINING',
  /** The local participant successfully joined a conference. */
  JOINED = 'JOINED',
  /** @deprecated @internal  */
  FIRST_PARTICIPANT = 'FIRST_PARTICIPANT',
  /** @deprecated @internal*/
  NO_MORE_PARTICIPANT = 'NO_MORE_PARTICIPANT',
  /** The local participant is leaving a conference. */
  LEAVING = 'LEAVING',
  /** The local participant successfully left a conference. */
  LEFT = 'LEFT',
  /** An error occurred during a conference. */
  ERROR = 'ERROR',
  /** Informs that the conference is destroyed. This status may be triggered by the following situations:
   * - All conference participants left a conference
   * - The time to live or the conference time limit elapsed
   * - A conference creator used the Terminate REST API to terminate an ongoing conference */
  DESTROYED = 'DESTROYED',
  /** A conference is ended. */
  ENDED = 'ENDED',
}

/** The ConferenceConstraints interface gathers information about the preferred conference constraints. */
export interface ConferenceConstraints {
  /** A boolean that indicates whether audio should be enabled for the local participant. */
  audio: boolean;
  /** A boolean that indicates whether video should be enabled for the local participant. */
  video: boolean;
}

/** The ConferenceJoinOptions interface defines how an application expects to join a conference in terms of media preference. */
export interface ConferenceJoinOptions {
  /** The conference access token that is required to join a protected conference if the conference is created using the [create](ref:conference#operation-postConferenceCreate) REST API. If the conference is created using the create method, the token is managed by the SDK and is not visible to the application users. For more information, see the [Enhanced Conference Access Control](doc:guides-enhanced-conference-access-control) document. */
  conferenceAccessToken?: string;
  /** Sets the conference [WebRTC constraints](https://webrtc.org/getting-started/media-capture-and-constraints#constraints). By default, only audio is enabled: `{audio: true, video: false}`. */
  constraints?: ConferenceConstraints;
  /** Sets the maximum number of video streams that may be transmitted to the joining participant. The valid parameter values are between 0 and 4 for mobile browsers, with 4 set as the default value. */
  maxVideoForwarding?: number;
  /** Allows joining conferences as a special participant called Mixer. For more information, see the [Recording Mechanisms](doc:guides-recording-mechanisms) article. */
  mixing?: ConferenceMixingOptions;
  /** Indicates whether a participant wants to receive mono sound. By default, participants receive stereo audio. This configuration is only applicable when using the Opus codec and is available in non-Dolby Voice and Dolby Voice conferences. */
  preferRecvMono?: boolean;
  /** Indicates whether a participant wants to send mono sound to a conference. By default, when using the Opus codec, participants' audio is sent as stereo. This configuration is only applicable when using the Opus codec and is available in non-Dolby Voice and Dolby Voice conferences. */
  preferSendMono?: boolean;
  /** Enables sending the Simulcast video streams to other conference participants. */
  simulcast?: boolean;
  /** Allows the local participant to change remote participants' locations and experience spatial audio. By default, this parameter is set to false. When set to true, the application must place remote participants in a 3D space using the [setSpatialPosition](doc:js-client-sdk-conferenceservice#setspatialposition) method. */
  spatialAudio?: boolean;
}

/** The ConferenceReplayOptions interface gathers properties responsible for replaying conferences. */
export interface ConferenceReplayOptions {
  /** The conference access token. */
  conferenceAccessToken?: string;
  /** Allows application users to start replaying a recorded conference at a specific timestamp. The offset parameter is the number of milliseconds between the beginning of the recording and the required starting point. */
  offset: number;
}

/** The ConferenceMixingOptions interface notifies a server that a participant who joins or replays a conference is a special participant called Mixer. Mixer can use the SDK in a mixer mode to record or replay a conference. For more information, see the [Recording mechanisms](doc:guides-recording-mechanisms) article. */
export interface ConferenceMixingOptions {
  /** A boolean that notifies the server whether a participant is a Mixer (true) or not (false). */
  enabled: boolean;
}

/** The Participant interface gathers information about a conference participant. */
export interface Participant {
  /**  The participant's ID. */
  id: string;
  /**  Information about a conference participant. */
  info: ParticipantInfo;
  /** The participant's status. */
  status?: ParticipantStatus;
  /** The participant's type. */
  type?: ParticipantType;
  /** The participant's streams. */
  streams?: MediaStream[];
}

/** The ParticipantInfo interface gathers information about a conference participant. */
export interface ParticipantInfo {
  /** The participant's name. */
  name?: string;
  /** The URL of the participant's avatar. */
  avatarUrl?: string;
  /** The external unique identifier that the customer's application can add to
   * the participant while opening a session. If a participant uses the same
   * external ID in conferences, the participant's ID also remains the same
   * across all sessions. When a second participant joins a conference using
   * the same external ID as another participant who has already joined the
   * conference, the SDK removes the first participant who uses this external
   * ID and emits the switched event (SDK 2.2.3+).
   * Note: This property is required to invite participants to a conference.
   */
  externalId?: string;
}

/** The ParticipantInvited interface gathers information about the invited participant. */
export interface ParticipantInvited {
  /**  Information about the invited participant. */
  info: ParticipantInfo;
  /**  The participant's permissions. */
  permissions?: Array<ConferencePermission>;
}

/** The ParticipantStatus enum gathers the possible statuses of conference participants. */
export enum ParticipantStatus {
  /** A participant successfully connected to a conference. */
  CONNECTED = 'CONNECTED',
  /** A participant received a conference invitation and is connecting to a conference. */
  CONNECTING = 'CONNECTING',
  /** An invited participant declined a conference invitation.  */
  DECLINE = 'DECLINE',
  /** A peer connection failed and a participant cannot connect to a conference. */
  ERROR = 'ERROR',
  /** A participant did not enable audio, video, or screen-share and is not connected to any stream. */
  INACTIVE = 'INACTIVE',
  /** A participant was kicked from a conference. */
  KICKED = 'KICKED',
  /** A participant left a conference. */
  LEFT = 'LEFT',
  /** A participant is invited to a conference and waits for an invitation. */
  RESERVED = 'RESERVED',
  /** A participant experiences a peer connection problem which may result in the Error or Connected status. */
  WARNING = 'WARNING',
}

/** The ParticipantTypes enum gathers the possible types of conference participants. */
export enum ParticipantType {
  /** A participant who cannot send any audio or video stream during a conference. */
  LISTENER = 'listener',
  /** A participant who can send and receive audio and video during the conference. */
  USER = 'user',
}

/** The RTCPMode enum gathers the possible bitrate adaptation modes for video transmission. */
export enum RTCPMode {
  /** Adjusts the transmission bitrate to the receiver who has the worst network conditions. */
  WORST = 'worst',
  /** Averages the available bandwidth of all receivers and adjusts the transmission bitrate to this value. */
  AVERAGE = 'average',
  /** Does not adjust the transmission bitrate to the receiver’s bandwidth. */
  BEST = 'best',
}

/** The Codec enum gathers the available video codecs. */
export enum Codec {
  /** The VP8 video codec. */
  VP8 = 'VP8',
  /** The default H264 video codec. */
  H264 = 'H264',
}

/** The UserType enum gathers the possible statuses of a conference participant. */
export enum UserType {
  /** A participant who can send and receive audio and video during the conference. */
  USER = 'user',
  /** A participant who cannot send any audio or video stream during a conference. */
  LISTENER = 'listener',
}

/** The ParticipantPermissions interface gathers information about the invited participants and their conference permissions. */
export interface ParticipantPermissions {
  /** The invited participant. */
  participant: Participant;
  /** The participant's permissions. */
  permissions: Array<ConferencePermission>;
}

/** The ConferencePermission enum gathers the possible permissions a participant may have in a conference. */
export enum ConferencePermission {
  /** Allows a participant to invite other participants to a conference. */
  INVITE = 'INVITE',
  /** Allows a participant to kick other participants from a conference */
  KICK = 'KICK',
  /** Allows a participant to update other participants' permissions. */
  UPDATE_PERMISSIONS = 'UPDATE_PERMISSIONS',
  /** Allows a participant to join a conference. */
  JOIN = 'JOIN',
  /** Allows a participant to send an audio stream during a conference. */
  SEND_AUDIO = 'SEND_AUDIO',
  /** Allows a participant to send a video stream during a conference. */
  SEND_VIDEO = 'SEND_VIDEO',
  /** Allows a participant to share a screen during a conference. */
  SHARE_SCREEN = 'SHARE_SCREEN',
  /** Allows a participant to share a video during a conference. */
  SHARE_VIDEO = 'SHARE_VIDEO',
  /** Allows a participant to share a file during a conference. */
  SHARE_FILE = 'SHARE_FILE',
  /** Allows a participant to send a message to other participants during a conference. */
  SEND_MESSAGE = 'SEND_MESSAGE',
  /** Allows a participant to record a conference. */
  RECORD = 'RECORD',
  /** Allows a participant to stream a conference. */
  STREAM = 'STREAM',
}

/** The AudioProcessingOptions interface gathers parameters The AudioProcessingOptions model includes the AudioProcessingSenderOptions model responsible for enabling and disabling audio processing. */
export interface AudioProcessingOptions {
  /** The AudioProcessingSenderOptions parameter allows enabling and disabling audio processing for the local participant who transmits an audio stream. */
  send?: AudioProcessingSenderOptions;
}

/** The AudioProcessingSenderOptions interface allows enabling and disabling audio processing for the local participant who transmits an audio stream. */
export interface AudioProcessingSenderOptions {
  /** A boolean value that indicates whether audio processing is enabled or disabled. */
  audioProcessing?: boolean;
}

/** The AudioProcessing enum gathers the possible audio processing options. */
export enum AudioProcessing {
  /** Enables audio processing to offer a high-quality voice communication. */
  VOCAL,
  /** Disables audio processing to transmit background sounds, such as music. */
  ENVIRONMENT,
}

export type AudioLevel = number;
export type MaxVideoForwarding = number;

/** The AudioTrack type gathers audio tracks available in a stream. */
export type AudioTrack = any;
/** The VideoTrack type gathers video tracks available in a stream. */
export type VideoTrack = any;

/** The MediaStreamType enum gathers the possible types of media streams. */
export enum MediaStreamType {
  /** The camera media stream, either audio, video, or audio and video. This stream type is enabled by default. */
  Camera = 'CAMERA',
  /** The screen-share media stream. */
  ScreenShare = 'SCREEN_SHARE',
  /** A media stream produced by an external device. */
  Custom = 'CUSTOM',
}

/** The MediaStream type gathers information about media streams. */
export type MediaStream = {
  /** The media stream identifier. */
  id: String;
  /** The media stream type. */
  type: MediaStreamType;
  /** The audio tracks available in the stream. */
  audioTracks: AudioTrack[];
  /** The video tracks available in the stream. */
  videoTracks: VideoTrack[];
  /** The media stream label. */
  label: String;
};

/** The UnsubscribeFunction unsubscribes from event listeners. */
export type UnsubscribeFunction = () => void;

/** @internal */
export enum RTCStatsType {
  /** Statistics for a codec that is currently being used by RTP streams being sent or received by this RTCPeerConnection object. It is accessed by the RTCCodecStats. */
  'codec',
  /** Statistics for an inbound RTP stream that is currently received with this RTCPeerConnection object. It is accessed by the RTCInboundRtpStreamStats. */
  'inbound-rtp',
  /** Statistics for an outbound RTP stream that is currently sent with this RTCPeerConnection object. It is accessed by the RTCOutboundRtpStreamStats. */
  'outbound-rtp',
  /** Statistics for the remote endpoint's inbound RTP stream corresponding to an outbound stream that is currently sent with this RTCPeerConnection object. */
  'remote-inbound-rtp',
  /** Statistics for the remote endpoint's outbound RTP stream corresponding to an inbound stream that is currently received with this RTCPeerConnection object. */
  'remote-outbound-rtp',
  /** Statistics for the media produced by a MediaStreamTrack that is currently attached to an RTCRtpSender. */
  'media-source',
  /** Statistics for a contributing source (CSRC) that contributed to an inbound RTP stream. */
  'csrc',
  /** Statistics related to the RTCPeerConnection object. */
  'peer-connection',
  /** Statistics related to each RTCDataChannel id. */
  'data-channel',
  /** Contains statistics related to a specific MediaStream.  */
  'stream',
  /** Statistics related to a specific MediaStreamTrack's attachment to an RTCRtpSender and the corresponding media-level metrics.  */
  'track',
  /** Statistics related to a specific RTCRtpTransceiver. */
  'transceiver',
  /** Statistics related to a specific RTCRtpSender and the corresponding media-level metrics.  */
  'sender',
  /** Statistics related to a specific receiver and the corresponding media-level metrics. */
  'receiver',
  /** Transport statistics related to the RTCPeerConnection object. */
  'transport',
  /** SCTP transport statistics related to an RTCSctpTransport object.  */
  'sctp-transport',
  /** ICE candidate pair statistics related to the RTCIceTransport objects.  */
  'candidate-pair',
  /** ICE local candidate statistics related to the RTCIceTransport objects.  */
  'local-candidate',
  /** ICE remote candidate statistics related to the RTCIceTransport objects.  */
  'remote-candidate',
  /** Information about a certificate used by an RTCIceTransport. */
  'certificate',
  /** Information about the connection to an ICE server (e.g. STUN or TURN). */
  'ice-server',
}
