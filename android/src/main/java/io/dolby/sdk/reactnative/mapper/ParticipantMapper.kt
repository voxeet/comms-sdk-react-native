package io.dolby.sdk.reactnative.mapper

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableNativeArray
import com.voxeet.android.media.MediaStream
import com.voxeet.android.media.stream.AudioTrack
import com.voxeet.android.media.stream.MediaStreamType
import com.voxeet.android.media.stream.VideoTrack
import com.voxeet.sdk.json.ParticipantInfo
import com.voxeet.sdk.models.Participant
import com.voxeet.sdk.models.v1.ConferenceParticipantStatus
import com.voxeet.sdk.models.v2.ParticipantType

/**
 * Provides methods that map [Participant] and [Participant]-related models to React Native models and vice versa
 */
class ParticipantMapper {

  fun participantIdFromRN(participantRN: ReadableMap): String? =
    participantRN.getString(PARTICIPANT_ID)

  fun infoFromRN(participantInfoRN: ReadableMap) = ParticipantInfo(
    participantInfoRN.getString(PARTICIPANT_INFO_NAME),
    participantInfoRN.getString(PARTICIPANT_INFO_EXTERNAL_ID),
    participantInfoRN.getString(PARTICIPANT_INFO_AVATAR_URL)
  )

  fun toRNInfo(participantInfo: ParticipantInfo): ReadableMap =
    Arguments.createMap().apply {
      participantInfo.name?.let { putString(PARTICIPANT_INFO_NAME, it) }
      participantInfo.externalId?.let { putString(PARTICIPANT_INFO_EXTERNAL_ID, it) }
      participantInfo.avatarUrl?.let { putString(PARTICIPANT_INFO_AVATAR_URL, it) }
    }

  fun toRN(participant: Participant): ReadableMap =
    Arguments.createMap().apply {
      participant.id?.let { putString(PARTICIPANT_ID, participant.id) }
      putBoolean(PARTICIPANT_AUDIO_TRANSMITTING, participant.audioTransmitting())
      putString(PARTICIPANT_STATUS, toRNParticipantStatus(participant.status))
      participant.info?.let { putMap(PARTICIPANT_INFO, toRNInfo(it)) }
      putArray(PARTICIPANT_STREAMS, toRNMediaStreams(participant.streams()))
      putString(PARTICIPANT_TYPE, toRNParticipantType(participant.participantType()))
    }

  fun toRN(participants: List<Participant?>): ReadableArray =
    Arguments.createArray().apply {
      participants
        .filterNotNull()
        .map(::toRN)
        .forEach(::pushMap)
    }

  private fun toRNParticipantType(participantType: ParticipantType) = when (participantType) {
    ParticipantType.USER -> "USER"
    ParticipantType.LISTENER -> "LISTENER"
    ParticipantType.SPEAKER,
    ParticipantType.PSTN,
    ParticipantType.MIXER,
    ParticipantType.NONE,
    ParticipantType.DVC,
    ParticipantType.ROBOT,
    ParticipantType.ROBOT_SPEAKER,
    ParticipantType.ROBOT_LISTENER,
    ParticipantType.ROBOT_PSTN,
    ParticipantType.ROBOT_MIXER,
    ParticipantType.ROBOT_NONE -> "UNKNOWN"
  }

  private fun toRNParticipantStatus(participantStatus: ConferenceParticipantStatus): String =
    when (participantStatus) {
      ConferenceParticipantStatus.CONNECTING -> "CONNECTING"
      ConferenceParticipantStatus.DECLINE -> "DECLINE"
      ConferenceParticipantStatus.ERROR -> "ERROR"
      ConferenceParticipantStatus.INACTIVE -> "INACTIVE"
      ConferenceParticipantStatus.KICKED -> "KICKED"
      ConferenceParticipantStatus.LEFT -> "LEFT"
      ConferenceParticipantStatus.RESERVED -> "RESERVED"
      ConferenceParticipantStatus.WARNING -> "WARNING"
      ConferenceParticipantStatus.IN_PROGRESS,
      ConferenceParticipantStatus.ON_AIR,
      ConferenceParticipantStatus.LATER,
      ConferenceParticipantStatus.MISSED,
      ConferenceParticipantStatus.UNKNOWN -> "UNKNOWN"
    }

  private fun toRNMedialStream(stream: MediaStream): ReadableMap =
    Arguments.createMap().apply {
      putString(PARTICIPANT_STREAMS_ID, stream.peerId())
      putString(PARTICIPANT_STREAMS_TYPE, toRNMediaStreamType(stream.type))
      putArray(PARTICIPANT_STREAMS_AUDIO_TRACKS, toRNAudioTracks(stream.audioTracks()))
      putArray(PARTICIPANT_STREAMS_VIDEO_TRACKS, toRNVideoTracks(stream.videoTracks()))
    }

  private fun toRNMediaStreams(streams: List<MediaStream>): ReadableArray =
    Arguments.createArray().apply {
      streams
        .map(::toRNMedialStream)
        .forEach(::pushMap)
    }

  private fun toRNMediaStreamType(mediaStreamType: MediaStreamType): String =
    when (mediaStreamType) {
      MediaStreamType.Camera -> "CAMERA"
      MediaStreamType.ScreenShare -> "SCREEN_SHARE"
      else -> "UNKNOWN"
    }

  private fun toRNAudioTracks(audioTracks: List<AudioTrack?>): ReadableArray =
    WritableNativeArray().apply {
      audioTracks
        .filterNotNull()
        .map(AudioTrack::id)
        .forEach(::pushString)
    }

  private fun toRNVideoTracks(videoTracks: List<VideoTrack?>): ReadableArray =
    Arguments.createArray().apply {
      videoTracks
        .filterNotNull()
        .map(VideoTrack::id)
        .forEach(::pushString)
    }

  companion object {
    private const val PARTICIPANT_ID = "id"
    private const val PARTICIPANT_AUDIO_TRANSMITTING = "audioTransmitting"
    private const val PARTICIPANT_INFO = "info"
    private const val PARTICIPANT_INFO_NAME = "name"
    private const val PARTICIPANT_INFO_EXTERNAL_ID = "externalId"
    private const val PARTICIPANT_INFO_AVATAR_URL = "avatarUrl"
    private const val PARTICIPANT_STATUS = "status"
    private const val PARTICIPANT_STREAMS = "streams"
    private const val PARTICIPANT_STREAMS_ID = "id"
    private const val PARTICIPANT_STREAMS_TYPE = "type"
    private const val PARTICIPANT_STREAMS_AUDIO_TRACKS = "audioTracks"
    private const val PARTICIPANT_STREAMS_VIDEO_TRACKS = "videoTracks"
    private const val PARTICIPANT_TYPE = "type"
  }
}
