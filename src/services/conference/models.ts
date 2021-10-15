export interface Conference {
  /** The conference ID. */
  id?: string;
  /** The conference alias. */
  alias?: string;
  /** Provides information if the created conference is new one. */
  isNew?: boolean;
  /** Provides array of conference participants. */
  participants: Participant[];
  /** Provides the current conference status. */
  status: ConferenceStatus;
}

export interface ConferenceCreateParameters {
  /** The time to live that enables customizing the waiting time (in seconds) and terminating empty conferences.
   The Voxeet service terminates conferences after the established time if no one has joined the new conference or the last participant has left it. The default value is 0 seconds. */
  ttl?: number;
  /** The bitrate adaptation mode for the video transmission. The rtcpMode triggers the server to monitor the receivers’ available bandwidth. Based on the analyzed value, the server informs the video sender to automatically adjust the quality of the transmitted video streams. */
  rtcpMode?: RTCPMode;
  /** The preferred video codec that is used during conferences, either H264 or VP8. By default, the value is set to H264. */
  videoCodec?: Codec;
  /** Turns the live recording on and off. */
  liveRecording?: boolean;
  /** Enable Dolby Voice */
  dolbyVoice?: boolean;
}

export interface ConferenceCreateOptions {
  /** The conference alias. */
  alias?: string;
  /** The conference parameters. */
  params?: ConferenceCreateParameters;
  /** The conference PIN code. */
  pinCode?: number;
}

export interface ConferenceLeaveOptions {
  /** A boolean indicating whether the SDK should close a session after leaving a conference or leave a session open. */
  leaveRoom: boolean;
}

export enum ConferenceStatus {
  /** Default status */
  DEFAULT = 'DEFAULT',
  /** Informs that the conference is creating */
  CREATING = 'CREATING',
  /** Informs that a new conference is created. */
  CREATED = 'CREATED',
  /** Informs that the local participant is joining a conference. */
  JOINING = 'JOINING',
  /** Informs that the local participant successfully joined a conference. */
  JOINED = 'JOINED',
  /** @deprecated */
  FIRST_PARTICIPANT = 'FIRST_PARTICIPANT',
  /** @deprecated */
  NO_MORE_PARTICIPANT = 'NO_MORE_PARTICIPANT',
  /** Informs that the local participant is leaving a conference. */
  LEAVING = 'LEAVING',
  /** Informs that the local participant successfully left a conference. */
  LEFT = 'LEFT',
  /** Informs that an error occurred during a conference. */
  ERROR = 'ERROR',
  /** Informs that the conference is destroyed. This status may be triggered by the following situations:

  All conference participants left the conference
  The time to live or the conference time limit elapsed
  The conference creator used the Terminate REST API to terminate an ongoing conference */
  DESTROYED = 'DESTROYED',
  /** Informs that a conference is ended. */
  ENDED = 'ENDED',
}

export interface ConferenceConstraints {
  audio: boolean;
  video: boolean;
}

export interface ConferenceJoinOptions {
  conferenceAccessToken?: string;
  constraints?: ConferenceConstraints;
  maxVideoForwarding?: number;
  mixing?: ConferenceMixingOptions;
  preferRecvMono?: boolean;
  preferSendMono?: boolean;
  simulcast?: boolean;
}

export interface ConferenceReplayOptions {
  /** The conference access token. */
  conferenceAccessToken?: string;
  /** Allows the application users to start replaying the recorded conference at a specific timestamp. The offset is the number of milliseconds between the beginning of the recording and the required starting point. */
  offset: number;
}

export interface ConferenceMixingOptions {
  /** A boolean value that notifies the server whether the participant is a Mixer (true) or not (false). */
  enabled: boolean;
}

export interface Participant {
  /**  The participant's ID. */
  id: string;
  /**  The participant's informations. */
  info: ParticipantInfo;
  /** The participant's status. */
  status?: ParticipantStatus;
  /** The participant's type. */
  type?: ParticipantType;
}

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

export interface ParticipantInvited {
  info: ParticipantInfo;
  permissions?: Array<ConferencePermission>;
}

export enum ParticipantStatus {
  /** A participant successfully connected to a conference. */
  CONNECTED = 'Connected',
  /** A participant received the conference invitation and is connecting to a conference. */
  CONNECTING = 'Connecting',
  /** An invited participant declined the conference invitation.  */
  DECLINE = 'Decline',
  /** A peer connection failed, and the participant cannot connect to a conference. */
  ERROR = 'Error',
  /** A participant did not enable audio, video, or screen-share and, therefore, is not connected to any stream. */
  INACTIVE = 'Inactive',
  /** A participant was kicked from the conference. */
  KICKED = 'Kicked',
  /** A participant left the conference. */
  LEFT = 'Left',
  /** A participant is invited to a conference and waits for an invitation. */
  RESERVED = 'Reserved',
  /** A participant experiences a peer connection problem, which may result in the Error or Connected status. */
  WARNING = 'Warning',
}

export enum ParticipantType {
  /** A participant who cannot send the audio and video stream during the conference. */
  LISTENER = 'listener',
  /** A participant who can send and receive the audio and video stream during the conference. */
  USER = 'user',
}

export enum RTCPMode {
  /** Adjusts the transmission bitrate to the receiver who has the worst network conditions */
  WORST = 'worst',
  /** Averages the available bandwidth of all the receivers and adjusts the transmission bitrate to this value */
  AVERAGE = 'average',
  /** Does not adjust the transmission bitrate to the receiver’s bandwidth */
  BEST = 'best',
}

export enum Mode {
  // TODO - doc
  STANDARD = 'standard',
  // TODO - doc
  PUSH = 'push',
}

export enum Codec {
  // TODO - doc
  VP8 = 'VP8',
  /** Default */
  H264 = 'H264',
}

export enum UserType {
  /** A participant who can send and receive the audio and video stream during the conference. */
  USER = 'user',
  /** A participant who cannot send the audio and video stream during the conference. */
  LISTENER = 'listener',
}

export interface ParticipantPermissions {
  /** The invited participant. */
  participant: Participant;
  /** The participant's permissions. */
  permissions: Array<ConferencePermission>;
}

export enum ConferencePermission {
  /** Allows a participant to invite participants to a conference. */
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

export interface AudioProcessingOptions {
  /** The AudioProcessingSenderOptions model allows enabling and disabling audio processing for the local participant who transmits an audio stream. */
  send?: AudioProcessingSenderOptions;
}

export interface AudioProcessingSenderOptions {
  /** A boolean value that indicates whether the audio processing is enabled or disabled. */
  audioProcessing?: boolean;
}

export enum AudioProcessing {
  /** Enables audio processing to offer a high-quality voice communication */
  VOCAL,
  /** Disables audio processing to transmit background sounds, such as music */
  ENVIRONMENT,
}

export type AudioLevel = number;
export type MaxVideoForwarding = number;

export enum MediaStreamType {
  /** The camera media stream. The stream can be audio and/or video. This stream type is set by default, even when a participant does not use a camera. */
  Camera = 'Camera',
  /** The screen-share media stream. */
  ScreenShare = 'ScreenShare',
}

export type UnsubscribeFunction = () => void;

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
