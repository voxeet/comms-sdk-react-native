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

  fun participantIdFromNative(participantMap: ReadableMap): String? {
    return participantMap.getString(PARTICIPANT_ID)
  }

  fun infoFromNative(participantInfoMap: ReadableMap): ParticipantInfo {
    return ParticipantInfo(
      participantInfoMap.getString(PARTICIPANT_INFO_NAME),
      participantInfoMap.getString(PARTICIPANT_INFO_EXTERNAL_ID),
      participantInfoMap.getString(PARTICIPANT_INFO_AVATAR_URL)
    )
  }

  fun toNativeInfo(participantInfo: ParticipantInfo): ReadableMap {
    val map = Arguments.createMap()
    participantInfo.name?.let { map.putString(PARTICIPANT_INFO_NAME, it) }
    participantInfo.externalId?.let { map.putString(PARTICIPANT_INFO_EXTERNAL_ID, it) }
    participantInfo.avatarUrl?.let { map.putString(PARTICIPANT_INFO_AVATAR_URL, it) }
    return map
  }

  fun toNative(participant: Participant): ReadableMap {
    val map = Arguments.createMap()
    participant.id?.let { map.putString(PARTICIPANT_ID, participant.id) }
    map.putBoolean(PARTICIPANT_AUDIO_TRANSMITTING, participant.audioTransmitting())
    map.putString(PARTICIPANT_STATUS, toNativeParticipantStatus(participant.status))
    participant.info?.let { map.putMap(PARTICIPANT_INFO, toNativeInfo(it)) }
    map.putArray(PARTICIPANT_STREAMS, toNativeMediaStreams(participant.streams()))
    map.putString(PARTICIPANT_TYPE, toNativeParticipantType(participant.participantType()))
    return map
  }

  fun toNative(participants: List<Participant?>): ReadableArray {
    val participantsArray = Arguments.createArray()
    participants
      .filterNotNull()
      .map(::toNative)
      .forEach(participantsArray::pushMap)
    return participantsArray
  }

  private fun toNativeParticipantType(participantType: ParticipantType): String {
    return when (participantType) {
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
  }

  private fun toNativeParticipantStatus(participantStatus: ConferenceParticipantStatus): String {
    return when (participantStatus) {
      ConferenceParticipantStatus.CONNECTING -> "CONNECTING"
      ConferenceParticipantStatus.DECLINE -> "DECLINE"
      ConferenceParticipantStatus.ERROR -> "ERROR"
      ConferenceParticipantStatus.INACTIVE -> "INACTIVE"
      ConferenceParticipantStatus.KICKED -> "KICKED"
      ConferenceParticipantStatus.LEFT -> "LEFT"
      ConferenceParticipantStatus.RESERVED -> "RESERVED"
      ConferenceParticipantStatus.WARNING -> "WARNING"
      ConferenceParticipantStatus.IN_PROGRESS, ConferenceParticipantStatus.ON_AIR, ConferenceParticipantStatus.LATER, ConferenceParticipantStatus.MISSED, ConferenceParticipantStatus.UNKNOWN -> "UNKNOWN"
    }
  }

  private fun toNativeMedialStream(stream: MediaStream): ReadableMap {
    val map = Arguments.createMap()
    map.putString(PARTICIPANT_STREAMS_ID, stream.peerId())
    map.putString(PARTICIPANT_STREAMS_TYPE, toNativeMediaStreamType(stream.type))
    map.putArray(PARTICIPANT_STREAMS_AUDIO_TRACKS, toNativeAudioTracks(stream.audioTracks()))
    map.putArray(PARTICIPANT_STREAMS_VIDEO_TRACKS, toNativeVideoTracks(stream.videoTracks()))
    return map
  }

  private fun toNativeMediaStreams(streams: List<MediaStream>): ReadableArray {
    val streamsArray = Arguments.createArray()
    streams
      .map(::toNativeMedialStream)
      .forEach(streamsArray::pushMap)
    return streamsArray
  }

  private fun toNativeMediaStreamType(mediaStreamType: MediaStreamType): String {
    return when (mediaStreamType) {
      MediaStreamType.Camera -> "CAMERA"
      MediaStreamType.ScreenShare -> "SCREEN_SHARE"
      MediaStreamType.Custom1,
      MediaStreamType.Custom2,
      MediaStreamType.Custom3,
      MediaStreamType.Custom4,
      MediaStreamType.Custom5,
      MediaStreamType.Custom6,
      MediaStreamType.Custom7,
      MediaStreamType.Custom8 -> "UNKNOWN"
    }
  }

  private fun toNativeAudioTracks(audioTracks: List<AudioTrack?>): ReadableArray {
    val streamsArray = WritableNativeArray()
    audioTracks
      .filterNotNull()
      .map(AudioTrack::id)
      .forEach(streamsArray::pushString)
    return streamsArray
  }

  private fun toNativeVideoTracks(videoTracks: List<VideoTrack?>): ReadableArray {
    val streamsArray = Arguments.createArray()
    videoTracks
      .filterNotNull()
      .map(VideoTrack::id)
      .forEach(streamsArray::pushString)
    return streamsArray
  }

  companion object {
    const val PARTICIPANT_ID = "id"
    const val PARTICIPANT_AUDIO_TRANSMITTING = "audioTransmitting"
    const val PARTICIPANT_INFO = "info"
    const val PARTICIPANT_INFO_NAME = "name"
    const val PARTICIPANT_INFO_EXTERNAL_ID = "externalId"
    const val PARTICIPANT_INFO_AVATAR_URL = "avatarUrl"
    const val PARTICIPANT_STATUS = "status"
    const val PARTICIPANT_STREAMS = "streams"
    const val PARTICIPANT_STREAMS_ID = "id"
    const val PARTICIPANT_STREAMS_TYPE = "type"
    const val PARTICIPANT_STREAMS_AUDIO_TRACKS = "audioTracks"
    const val PARTICIPANT_STREAMS_VIDEO_TRACKS = "videoTracks"
    const val PARTICIPANT_TYPE = "type"
  }
}
