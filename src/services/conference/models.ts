/** The Conference interface gathers information about a conference. */
export interface Conference {
  /** The conference alias. The alias is case insensitive, which means that using "foobar" and "FOObar" aliases results in joining the same conference. */
  alias?: string;
  /** The conference ID. */
  id?: string;
  /** A boolean indicating if a created conference is new. */
  isNew?: boolean;
  /** An array of conference participants. */
  participants: Participant[];
  /** The current conference status. */
  status: ConferenceStatus;
  /** The [spatial audio style](doc:rn-client-sdk-enums-spatialaudiostyle) that is used in the current conference. */
  spatialAudioStyle?: SpatialAudioStyle;
}

/** The ConferenceCreateParameters interface gathers parameters settings for a requested conference. */
export interface ConferenceCreateParameters {
  /** A boolean that indicates whether an application wishes to create a conference with Dolby Voice enabled. For more information about Dolby Voice, see the [Dolby Voice](doc:guides-dolby-voice) article. By default, the parameter is set to `true`. */
  dolbyVoice?: boolean;
  /** A boolean that enables and disables live recording. Specify this parameter during the conference creation:
   * - When set to `true`, the recorded file is available at the end of the call and can be downloaded immediately.
   * - When set to `false`, the [remix API](ref:introduction-to-remix-api) must be called after the conference to generate and retrieve the recorded file.
   *
   * This parameter does not start the recording; use the [start](doc:rn-client-sdk-references-recordingservice#start) method to turn it on. For more information, see the [Recording Conferences](doc:guides-recording-conferences) article. */
  liveRecording?: boolean;
  /** The bitrate adaptation mode for video transmission. The parameter triggers a server to monitor the receivers’ available bandwidth. Based on the analyzed value, the server informs the video sender to automatically adjust the quality of the transmitted video streams. */
  rtcpMode?: RTCPMode;
  /** The time to live defines the number of seconds a conference is kept running when empty. A minimum of 30 seconds is given when creating the conference to allow time for participants to join. The default value is 0. */
  ttl?: number;
  /** The preferred video codec that is used during a conference, either H264 or VP8. By default, the SDK uses the H264 codec. */
  videoCodec?: Codec;
  /** Defines how the spatial location should be communicated between the SDK and the Dolby.io server.
   *
   * Setting the spatial audio style is supported only on SDK 3.6 and later. The earlier SDK versions support only the individual mode. */
  spatialAudioStyle?: SpatialAudioStyle;
}

/** The ConferenceCreateOptions interface gathers information about a new conference. */
export interface ConferenceCreateOptions {
  /** The conference alias. The alias needs to be a logical and unique string that consists of up to 250 characters, such as letters, digits, and symbols other than #. The alias is case insensitive, which means that using "foobar" and "FOObar" aliases refers to the same conference. */
  alias?: string;
  /** The conference parameters. */
  params?: ConferenceCreateParameters;
  /** The PIN code of a conference. */
  pinCode?: number;
  /** Defines how the spatial location should be communicated between the SDK and the Dolby.io server.
   *
   * Setting the spatial audio style is supported only on SDK 3.6 and later. The earlier SDK versions support only the individual mode. */
  spatialAudioStyle?: SpatialAudioStyle;
}

/** The ConferenceLeaveOptions interface gathers information about preferences for leaving a conference. */
export interface ConferenceLeaveOptions {
  /** A boolean indicating whether the SDK should close a session after leaving a conference or leave a session open. */
  leaveRoom: boolean;
}

/** The ConferenceStatus enum gathers the possible conference statuses. */
export enum ConferenceStatus {
  /** A new conference is created. */
  CREATED = 'CREATED',
  /** The SDK is creating a conference. */
  CREATING = 'CREATING',
  /** The default conference status. */
  DEFAULT = 'DEFAULT',
  /** Informs that the conference is destroyed. This status may be triggered by the following situations:
   * - All conference participants left a conference
   * - The time to live or the conference time limit elapsed
   * - A conference creator used the Terminate REST API to terminate an ongoing conference */
  DESTROYED = 'DESTROYED',
  /** A conference is ended. */
  ENDED = 'ENDED',
  /** An error occurred during a conference. */
  ERROR = 'ERROR',
  /** @internal  */
  FIRST_PARTICIPANT = 'FIRST_PARTICIPANT',
  /** The local participant successfully joined a conference. */
  JOINED = 'JOINED',
  /** The local participant is joining a conference. */
  JOINING = 'JOINING',
  /** The local participant is leaving a conference. */
  LEAVING = 'LEAVING',
  /** The local participant successfully left a conference. */
  LEFT = 'LEFT',
  /** @internal*/
  NO_MORE_PARTICIPANT = 'NO_MORE_PARTICIPANT',
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
  /** The conference access token that is required to join a protected conference if the conference is created using the [create](ref:create-conference) REST API. If the conference is created using the create method, the token is managed by the SDK and is not visible to the application users. For more information, see the [Enhanced Conference Access Control](doc:guides-enhanced-conference-access-control) document. */
  conferenceAccessToken?: string;
  /** Sets the conference [WebRTC constraints](https://webrtc.org/getting-started/media-capture-and-constraints#constraints). By default, only audio is enabled: `{audio: true, video: false}`. */
  constraints?: ConferenceConstraints;
  /** Sets the maximum number of video streams that may be transmitted to the joining participant. The valid parameter values are between 0 and 4 for mobile browsers, with 4 set as the default value. */
  maxVideoForwarding?: number;
  /** Allows joining conferences as a special participant called Mixer. For more information, see the [Recording Conferences](doc:guides-recording-conferences) article. */
  mixing?: ConferenceMixingOptions;
  /** Indicates whether a participant wants to receive mono sound. By default, participants receive stereo audio. This configuration is only applicable when using the Opus codec and is available in non-Dolby Voice and Dolby Voice conferences. */
  preferRecvMono?: boolean;
  /** Indicates whether a participant wants to send mono sound to a conference. By default, when using the Opus codec, participants' audio is sent as stereo. This configuration is only applicable when using the Opus codec and is available in non-Dolby Voice and Dolby Voice conferences. */
  preferSendMono?: boolean;
  /** Enables sending the Simulcast video streams to other conference participants. */
  simulcast?: boolean;
  /** Enables spatial audio for the local participant who joins a Dolby Voice conference. By default, this parameter is set to false. When set to true in a conference that uses the individual [spatial audio style](doc:rn-client-sdk-enums-spatialaudiostyle), the application must place remote participants in a 3D space using the [setSpatialPosition](doc:rn-client-sdk-references-conferenceservice#setspatialposition) method.
   * [block:callout]
   * {
   * "type": "danger",
   * "title": "Warning",
   * "body": "In the individual spatial audio style, remote participants' audio is disabled until the participants are assigned to specific locations. We recommend calling [setSpatialPosition](doc:rn-client-sdk-references-conferenceservice#setspatialposition) from the [participantAdded](doc:rn-client-sdk-modules#participantadded) event to ensure that all participants are assigned to specific positions."
   * }
   * [/block] */
  spatialAudio?: boolean;
  /** Changes the video forwarding strategy for the local participant. This option is available only in SDK 3.6 and later. */
  videoForwardingStrategy?: VideoForwardingStrategy;
}

/** The ConferenceListenOptions interface defines how the application expects to join a conference using the listen method. */
export interface ConferenceListenOptions {
  /** The conference access token that is required to join a protected conference if the conference is created using the [create](ref:create-conference) REST API. If the conference is created using the create method, the token is managed by the SDK and is not visible to the application users. For more information, see the [Enhanced Conference Access Control](doc:guides-enhanced-conference-access-control) document. */
  conferenceAccessToken?: string;
  /** Sets the maximum number of video streams that may be transmitted to the joining participant. The valid parameter values are between 0 and 4 for mobile browsers, with 4 set as the default value. */
  maxVideoForwarding?: number;
  /** Enables spatial audio for the local participant who joins a Dolby Voice conference. By default, this parameter is set to false. When set to true in a conference that uses the individual [spatial audio style](doc:rn-client-sdk-enums-spatialaudiostyle), the application must place remote participants in a 3D space using the [setSpatialPosition](doc:rn-client-sdk-references-conferenceservice#setspatialposition) method.
   * [block:callout]
   * {
   * "type": "danger",
   * "title": "Warning",
   * "body": "In the individual spatial audio style, remote participants' audio is disabled until the participants are assigned to specific locations. We recommend calling [setSpatialPosition](doc:rn-client-sdk-references-conferenceservice#setspatialposition) from the [participantAdded](doc:rn-client-sdk-modules#participantadded) event to ensure that all participants are assigned to specific positions."
   * }
   * [/block] */
  spatialAudio?: boolean;
  /** Changes the video forwarding strategy for the local participant. This option is available only in SDK 3.6 and later. */
  videoForwardingStrategy?: VideoForwardingStrategy;
}

/** The ConferenceReplayOptions interface gathers properties responsible for replaying conferences. */
export interface ConferenceReplayOptions {
  /** The conference access token. */
  conferenceAccessToken?: string;
  /** Allows application users to start replaying a recorded conference at a specific timestamp. The offset parameter is the number of milliseconds between the beginning of the recording and the required starting point. */
  offset: number;
}

/** The ConferenceMixingOptions interface notifies a server that a participant who joins or replays a conference is a special participant called Mixer. Mixer can use the SDK in a mixer mode to record or replay a conference. For more information, see the [Recording Conferences](doc:guides-recording-conferences) article. */
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
  /** The participant's streams. */
  streams?: MediaStream[];
  /** The participant's type. */
  type?: ParticipantType;
}

/** The ParticipantInfo interface gathers information about a conference participant. */
export interface ParticipantInfo {
  /** The URL of the participant's avatar. */
  avatarUrl?: string;
  /** The external unique identifier that the customer's application can add to the participant while opening a session. If a participant uses the same external ID in conferences, the participant's ID also remains the same across all sessions. This property is required to invite participants to a conference.
   */
  externalId?: string;
  /** The participant's name. */
  name?: string;
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
  /** Averages the available bandwidth of all receivers and adjusts the transmission bitrate to this value. */
  AVERAGE = 'average',
  /** Does not adjust the transmission bitrate to the receiver’s bandwidth. */
  BEST = 'best',
  /** Adjusts the transmission bitrate to the receiver who has the worst network conditions. */
  WORST = 'worst',
}

/** The Codec enum gathers the available video codecs. */
export enum Codec {
  /** The default H264 video codec. */
  H264 = 'H264',
  /** The VP8 video codec. */
  VP8 = 'VP8',
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
  /** Allows a participant to join a conference. */
  JOIN = 'JOIN',
  /** Allows a participant to kick other participants from a conference */
  KICK = 'KICK',
  /** Allows a participant to record a conference. */
  RECORD = 'RECORD',
  /** Allows a participant to send an audio stream during a conference. */
  SEND_AUDIO = 'SEND_AUDIO',
  /** Allows a participant to send a message to other participants during a conference. */
  SEND_MESSAGE = 'SEND_MESSAGE',
  /** Allows a participant to send a video stream during a conference. */
  SEND_VIDEO = 'SEND_VIDEO',
  /** Allows a participant to share a file during a conference. */
  SHARE_FILE = 'SHARE_FILE',
  /** Allows a participant to share a screen during a conference. */
  SHARE_SCREEN = 'SHARE_SCREEN',
  /** Allows a participant to share a video during a conference. */
  SHARE_VIDEO = 'SHARE_VIDEO',
  /** Allows a participant to stream a conference. */
  STREAM = 'STREAM',
  /** Allows a participant to update other participants' permissions. */
  UPDATE_PERMISSIONS = 'UPDATE_PERMISSIONS',
}

/** The AudioProcessingOptions interface is responsible for enabling and disabling audio processing. */
export interface AudioProcessingOptions {
  /** Allows enabling and disabling audio processing for the local participant who transmits an audio stream. */
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
  /** A media stream produced by an external device. */
  Custom = 'CUSTOM',
  /** The screen-share media stream. */
  ScreenShare = 'SCREEN_SHARE',
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

/** The SpatialDirection model defines the direction a participant is facing. The model is specified as a set of three Euler rotations about the corresponding axis. The following properties define a rotation about the specified positive axis:
 *
 * - `x`: A rotation about the x-axis
 * - `y`: A rotation about the y-axis
 * - `z`: A rotation about the z-axis
 *
 * [block:html]
 * {
 *   "html": "<div class=\"grid-container\">\n<div class=\"video-1\" >\n <p><b>Yaw:</b> A rotation about the up axis, where the default environment is the y rotation.</p>\n<video controls width=\"250\">\n\n <source src=\"https://s3.us-west-1.amazonaws.com/static.dolby.link/videos/readme/communications/spatial/08_SpatialDirectionYaw_v03_220131.mp4\"\n type=\"video/mp4\">\n\n Sorry, your browser doesn't support embedded videos.\n</video>\n</div>\n\n<div class=\"video-2\">\n <p><b>Pitch:</b> A rotation about the right axis, where the default environment is the x rotation.</p>\n<video controls width=\"250\">\n\n <source src=\"https://s3.us-west-1.amazonaws.com/static.dolby.link/videos/readme/communications/spatial/09_SpatialDirectionPitch_v03_220131.mp4\"\n type=\"video/mp4\">\n\n Sorry, your browser doesn't support embedded videos.\n</video>\n</div>\n\n<div class=\"video-3\">\n <p><b>Roll:</b> A rotation about the forward axis, where the default environment is the z rotation.</p>\n<video controls width=\"250\">\n\n <source src=\"https://s3.us-west-1.amazonaws.com/static.dolby.link/videos/readme/communications/spatial/10_SpatialDirectionRoll_v03_220131.mp4\"\n type=\"video/mp4\">\n\n Sorry, your browser doesn't support embedded videos.\n</video>\n \n</div>\n</div>\n\n<style>\n .grid-container {\n display: grid; \n \n }\n \n .grid-container {\ndisplay: grid;\ngrid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\ngrid-column-gap: 10px;\ngrid-row-gap: 50px;\n}\n \n \n</style>"
 * }
 * [/block]
 *
 * When using custom environment directions set in [setSpatialEnvironment](doc:rn-client-sdk-references-conferenceservice#setspatialenvironment), the rotation is defined to always rotate about the relevant axis according to the left handed curl rule. In the animations above you can see, for the y-axis rotation, if you curl your left hand up around with your thumb pointing down the +y axis, the direction the participant will rotate is in the direction the fingers are curling around the given axis. You can see the rotation arrows in those reference animations which correspond to positive rotation direction are pointing the same direction as the fingers of the curled left hand.
 *
 * When a direction contains rotations around more than one axis, the rotations are applied in a defined order: yaw, pitch, and then roll. With the standard environment, this corresponds to y, x, and then z. When using custom environment directions, the directions are always in the order of yaw/pitch/roll, but which (x,y,z) axis those correspond to is different. */
export interface SpatialDirection {
  /** The Euler rotation about the x-axis, in degrees. */
  x: number;
  /** The Euler rotation about the y-axis, in degrees. */
  y: number;
  /** The Euler rotation about the z-axis, in degrees. */
  z: number;
}

/** The SpatialScale model defines how to convert units from the application's coordinate system (pixels or centimeters) into meters used by the spatial audio coordinate system. For example, let's assume that SpatialScale is set to (100,100,100), which indicates that 100 of the applications units (cm) map to 1 meter for the audio coordinates. If the listener's location is (0,0,0)cm and a remote participant's location is (200,200,200)cm, the listener has an impression of hearing the remote participant from the (2,2,2)m location.
 *
 * **Note**: The scale must have a value greater than zero. The default is (1,1,1).
 */
export interface SpatialScale {
  /** The x component of the SpatialScale vector. */
  x: number;
  /** The y component of the SpatialScale vector. */
  y: number;
  /** The z component of the SpatialScale vector. */
  z: number;
}

/** The SpatialPosition model represents a participant's audio position. The position is defined using Cartesian coordinates.
 *
 * You can define the direction of each axis in the coordinate system using the [setSpatialEnvironment](doc:rn-client-sdk-references-conferenceservice#setspatialenvironment) method. By default, the environment consists of the following axes:
 *
 * - X-axis: Extends positive to the right
 * - Y-axis: Extends positive upwards
 * - Z-axis: Extends positive forwards
 *
 * The [setSpatialEnvironment](doc:rn-client-sdk-references-conferenceservice#setspatialenvironment) method allows the application to choose the meaning of each axis and match the usage of the application. */
export interface SpatialPosition {
  /** The x-coordinate of a new audio location. */
  x: number;
  /** The y-coordinate of a new audio location. */
  y: number;
  /** The z-coordinate of a new audio location. */
  z: number;
}

/** The SpatialAudioStyle enum defines how the spatial location is communicated between SDK and the Dolby.io server. The style can be defined during a conference creation, although its value for each participant depends on the participant's spatial audio setting. The shared spatial audio style is only available for participants who joined a conference with spatial audio enabled. Setting the spatial audio style is supported only on SDK 3.6 and later. The earlier SDK versions support only the individual mode and do not allow participants to join conferences created with the spatial audio style set to shared. The following table lists the possible spatial audio style settings for the local participant:
 *
 * | Create: SpatialAudioStyle | Join: SpatialAudio | Result                            |
 * |---------------------------|--------------------|-----------------------------------|
 * | Individual                | True               | Success                           |
 * | Individual                | False              | Success                           |
 * | Shared                    | True               | Success only on SDK 3.6 and later |
 * | Shared                    | False              | Rejected                          |
 * | Disabled                  | True               | Rejected                          |
 * | Disabled                  | False              | Success                           |
 */
export enum SpatialAudioStyle {
  /** Sets the spatial location that is based on the spatial scene, local participant's position, and remote participants'
   * positions. This allows a client to control the position using the local, self-contained logic. However, the client has to
   * communicate a large set of requests constantly to the server, which increases network traffic, log subsystem
   * pressure, and complexity of the client-side application. This option is selected by default. We recommend this mode
   * for A/V congruence scenarios in video conferencing and similar applications. */
  INDIVIDUAL = 'INDIVIDUAL',
  /** Sets the spatial location that is based on the spatial scene and the local participant's position, while the
   * relative positions among participants are calculated by the Dolby.io server. This way, the spatial scene is
   * shared by all participants, so that each client can set a position and participate in the shared scene. This
   * approach simplifies communication between the client and the server and decreases network traffic. We
   * recommend this mode for virtual space scenarios, such as 2D or 3D games, trade shows, virtual museums, water cooler scenarios, etc. */
  SHARED = 'SHARED',
  /** Disables spatial audio in a conference. */
  DISABLED = 'DISABLED',
}

/** The VideoForwardingStrategy enum defines how the SDK should select conference participants whose videos will be transmitted to the local participant.
 * There are two possible values; the selection can be either based on the participants' audio volume or the distance from the local participant.
 *
 * Selecting the video forwarding strategy is supported only on SDK 3.6 and later. On earlier SDK versions, the SDK supports only the LAST_SPEAKER.
 *
 * By default, the SDK uses the LAST_SPEAKER strategy. */
export enum VideoForwardingStrategy {
  /** Selects participants based on their audio volume. This allows the local participant to receive video streams only from active speakers. */
  LAST_SPEAKER = 'LAST_SPEAKER',
  /** Selects participants based on their distance from the local participant. This allows the local participant to receive video streams only from the nearest participants. This strategy is available only for participants who enabled spatial audio. */
  CLOSEST_USER = 'CLOSEST_USER',
}

/** The VideoForwardingOptions model allows configuring the Video Forwarding functionality that allows:
 *
 * - Setting the maximum number of video streams that may be transmitted to the local participant
 * - Prioritizing specific participants' video streams that need to be transmitted to the local participant
 * - Changing the video forwarding strategy that defines how the SDK should select conference participants whose videos will be received by the local participant */
export interface VideoForwardingOptions {
  /** The maximum number of video streams that may be transmitted to the local participant. The valid values are between 0 and 25. The default value is 4. In the case of providing a value smaller than 0 or greater than 25, SDK triggers an error. */
  max?: number;
  /** The list of participants whose video streams should be always transmitted to the local participant. */
  participants?: Participant[];
  /** The strategy that defines how the SDK should select conference participants whose videos will be transmitted to the local participant. The selection can be either based on the participants' audio volume or the distance from the local participant. */
  strategy?: VideoForwardingStrategy;
}
