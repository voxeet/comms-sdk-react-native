package io.dolby.sdk.reactnative.mapper

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
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
 * Provides methods that map:
 * - [Conference] and [Conference]-related models to React Native models
 * - React Native models to [Conference] model and [Conference]-related model
 */
class ConferenceMapper(
  private val participantMapper: ParticipantMapper,
  private val permissionMapper: ConferencePermissionMapper
) {

  fun conferenceIdFromNative(conferenceMap: ReadableMap): String? {
    return conferenceMap.getString(CONFERENCE_ID)
  }

  fun fromNative(optionsMap: ReadableMap): AudioProcessing {
    return optionsMap.getMap(SEND)
      ?.getOptionalBoolean(AUDIO_PROCESSING)
      ?.takeIf { isAudioProcessing -> isAudioProcessing }
      ?.let { AudioProcessing.VOICE }
      ?: AudioProcessing.ENVIRONMENT
  }

  fun toNative(conference: Conference): WritableMap {
    val map = Arguments.createMap()
    val participantsArray = participantMapper.toParticipantsArray(conference.participants)
    val permissionsArray = permissionMapper.toNative(conference.permissions)
    map.putString(CONFERENCE_ID, conference.id)
    map.putString(CONFERENCE_ALIAS, conference.alias)
    map.putBoolean(CONFERENCE_IS_NEW, conference.isNew)
    map.putString(CONFERENCE_STATUS, toNativeConferenceStatus(conference.state))
    map.putMap(CONFERENCE_PARAMS, toNativeConferenceParams(conference))
    map.putArray(CONFERENCE_PERMISSIONS, permissionsArray)
    map.putArray(CONFERENCE_PARTICIPANTS, participantsArray)
    return map
  }

  fun toNativeConferenceStatus(status: ConferenceStatus): String {
    return when (status) {
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
  }

  fun toNativeLocalStats(localStats: Map<String, JSONArray>): ReadableMap {
    val map = Arguments.createMap()
    localStats.forEach { (key, value) ->
      map.putString(key, value.toString())
    }
    return map
  }

  private fun toNativeConferenceParams(conference: Conference): ReadableMap {
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
    const val CONFERENCE_ID = "id"
    const val CONFERENCE_ALIAS = "alias"
    const val CONFERENCE_IS_NEW = "isNew"
    const val CONFERENCE_STATUS = "status"
    const val CONFERENCE_PARAMS = "params"
    const val CONFERENCE_PERMISSIONS = "permissions"
    const val CONFERENCE_PARTICIPANTS = "participants"
    const val SEND = "send"
    const val AUDIO_PROCESSING = "audioProcessing"
  }
}
