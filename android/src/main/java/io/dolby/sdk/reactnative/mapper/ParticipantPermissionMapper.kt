package io.dolby.sdk.reactnative.mapper

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.voxeet.sdk.json.ConferencePermission
import com.voxeet.sdk.models.Participant
import com.voxeet.sdk.models.ParticipantPermissions

typealias ParticipantId = String

/**
 * Provides methods that map [ParticipantPermissions] model to React Native models and vice versa
 */
class ParticipantPermissionMapper(
  private val participantMapper: ParticipantMapper,
  private val conferencePermissionMapper: ConferencePermissionMapper
) {

  fun fromRN(permissionsRN: ReadableArray) =
    (0 until permissionsRN.size())
      .map(permissionsRN::getMap)
      .map(::participantPermissionsFromRN)

  fun toParticipantPermissions(participant: Participant?, conferencePermissions: Set<ConferencePermission>?) =
    ParticipantPermissions().apply {
      participant?.let { this.participant = it }
      conferencePermissions?.let { this.permissions = it }
    }

  private fun participantPermissionsFromRN(permissionRN: ReadableMap): Pair<ParticipantId?, Set<ConferencePermission>?> {
    val participantId = permissionRN.getMap(PARTICIPANT)?.let {
      participantMapper.participantIdFromRN(it)
        ?: throw IllegalArgumentException("Conference should contain participantId")
    }
    val conferencePermissions = permissionRN.getArray(CONFERENCE_PERMISSIONS)?.let {
      conferencePermissionMapper.fromRN(it)
    }

    return participantId to conferencePermissions
  }

  companion object {
    private const val PARTICIPANT = "participant"
    private const val CONFERENCE_PERMISSIONS = "permissions"
  }
}
