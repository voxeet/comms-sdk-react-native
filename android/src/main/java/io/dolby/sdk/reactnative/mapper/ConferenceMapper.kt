package io.dolby.sdk.reactnative.mapper

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.voxeet.sdk.models.Conference
import com.voxeet.sdk.services.conference.AudioProcessing
import com.voxeet.sdk.services.conference.information.ConferenceStatus
import io.dolby.sdk.reactnative.mapper.ConferenceCommonConstants.CONFERENCE_PARAMS_DOLBY_VOICE
import io.dolby.sdk.reactnative.mapper.ConferenceCommonConstants.CONFERENCE_PARAMS_LIVE_RECORDING
import io.dolby.sdk.reactnative.mapper.ConferenceCommonConstants.CONFERENCE_PARAMS_RTCP_MODE
import io.dolby.sdk.reactnative.mapper.ConferenceCommonConstants.CONFERENCE_PARAMS_TTL
import io.dolby.sdk.reactnative.mapper.ConferenceCommonConstants.CONFERENCE_PARAMS_VIDEO_CODEC
import io.dolby.sdk.reactnative.utils.RnCollections.getOptionalBoolean
import org.json.JSONArray

/**
 * Provides methods that map [Conference] and [Conference]-related models to React Native models and vice versa
 */
class ConferenceMapper(
  private val participantMapper: ParticipantMapper,
  private val permissionMapper: ConferencePermissionMapper
) {

  fun conferenceIdFromRN(conferenceRN: ReadableMap): String? = conferenceRN.getString(CONFERENCE_ID)

  fun fromRN(optionsRN: ReadableMap): AudioProcessing =
    optionsRN.getMap(SEND)
      ?.getOptionalBoolean(AUDIO_PROCESSING)
      ?.takeIf { isAudioProcessing -> isAudioProcessing }
      ?.let { AudioProcessing.VOICE }
      ?: AudioProcessing.ENVIRONMENT

  fun replayOffsetFromRN(optionsRN: ReadableMap) =
    optionsRN.getDouble(REPLAY_OPTIONS_OFFSET)

  fun toRN(conference: Conference): ReadableMap =
    Arguments.createMap().apply {
      putString(CONFERENCE_ID, conference.id)
      putString(CONFERENCE_ALIAS, conference.alias)
      putBoolean(CONFERENCE_IS_NEW, conference.isNew)
      putString(CONFERENCE_STATUS, toRNConferenceStatus(conference.state))
      putMap(CONFERENCE_PARAMS, toRNConferenceParams(conference))
      putArray(CONFERENCE_PERMISSIONS, permissionMapper.toRN(conference.permissions))
      putArray(CONFERENCE_PARTICIPANTS, participantMapper.toRN(conference.participants))
    }

  fun toRNConferenceStatus(status: ConferenceStatus): String = when (status) {
    ConferenceStatus.CREATED -> "CREATED"
    ConferenceStatus.DESTROYED -> "DESTROYED"
    ConferenceStatus.ENDED -> "ENDED"
    ConferenceStatus.ERROR -> "ERROR"
    ConferenceStatus.JOINED -> "JOINED"
    ConferenceStatus.LEFT -> "LEFT"
    ConferenceStatus.DEFAULT,
    ConferenceStatus.CREATING,
    ConferenceStatus.JOINING,
    ConferenceStatus.FIRST_PARTICIPANT,
    ConferenceStatus.NO_MORE_PARTICIPANT,
    ConferenceStatus.LEAVING -> "UNKNOWN"
  }

  fun toRNLocalStats(localStats: Map<String, JSONArray>): ReadableMap =
    Arguments.createMap().apply {
      localStats.forEach { (key, value) -> putString(key, value.toString()) }
    }

  private fun toRNConferenceParams(conference: Conference): ReadableMap {
    val map = Arguments.createMap()
    val metadata = conference.metadata ?: return map

    map.putBoolean(CONFERENCE_PARAMS_DOLBY_VOICE, conference.isDolbyVoice)
    (metadata[CONFERENCE_PARAMS_LIVE_RECORDING] as? String)
      ?.let { map.putString(CONFERENCE_PARAMS_LIVE_RECORDING, it) }
    (metadata[CONFERENCE_PARAMS_RTCP_MODE] as? String)
      ?.let { map.putString(CONFERENCE_PARAMS_RTCP_MODE, it) }
    (metadata[CONFERENCE_PARAMS_TTL] as? String)
      ?.toIntOrNull()
      ?.let { map.putInt(CONFERENCE_PARAMS_TTL, it) }
    (metadata[CONFERENCE_PARAMS_VIDEO_CODEC] as? String)
      ?.let { map.putString(CONFERENCE_PARAMS_VIDEO_CODEC, it) }

    return map
  }

  companion object {
    private const val CONFERENCE_ID = "id"
    private const val CONFERENCE_ALIAS = "alias"
    private const val CONFERENCE_IS_NEW = "isNew"
    private const val CONFERENCE_STATUS = "status"
    private const val CONFERENCE_PARAMS = "params"
    private const val CONFERENCE_PERMISSIONS = "permissions"
    private const val CONFERENCE_PARTICIPANTS = "participants"
    private const val SEND = "send"
    private const val AUDIO_PROCESSING = "audioProcessing"
    private const val REPLAY_OPTIONS_OFFSET = "offset"
  }
}
