package io.dolby.sdk.reactnative.mapper

import com.facebook.react.bridge.ReadableArray
import com.voxeet.sdk.json.ParticipantInvited

/**
 * Provides methods that map React Native model to [ParticipantInvited] model
 */
class InvitationMapper(
  private val permissionMapper: ConferencePermissionMapper,
  private val participantMapper: ParticipantMapper
) {

  fun fromRN(invitedParticipantsRN: ReadableArray): List<ParticipantInvited> =
    (0 until invitedParticipantsRN.size())
      .map(invitedParticipantsRN::getMap)
      .mapNotNull { map ->
        val info = map.getMap(PARTICIPANT_INFO)?.let(participantMapper::infoFromRN)
        val permissions = map.getArray(PARTICIPANT_PERMISSIONS)?.let(permissionMapper::fromRN)
        info?.let(::ParticipantInvited)?.apply { setPermissions(permissions) }
      }

  private companion object {
    private const val PARTICIPANT_INFO = "info"
    private const val PARTICIPANT_PERMISSIONS = "permissions"
  }
}
