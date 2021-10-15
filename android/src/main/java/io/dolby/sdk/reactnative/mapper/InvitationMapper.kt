package io.dolby.sdk.reactnative.mapper

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.voxeet.sdk.json.ParticipantInvited

class InvitationMapper(
        private val permissionMapper: ConferencePermissionMapper,
        private val participantMapper: ParticipantMapper
) {

    private companion object {
        private const val PARTICIPANT_INFO = "info"
        private const val PARTICIPANT_PERMISSIONS = "permissions"
    }

    fun decode(invitedParticipantsArray: ReadableArray): List<ParticipantInvited> {
        return invitedParticipantsArray.toArrayList()
                .filterIsInstance<ReadableMap>()
                .mapNotNull { map ->
                    val info = map.getMap(PARTICIPANT_INFO)?.let(participantMapper::toParticipantInfo)
                    val permissions = map.getArray(PARTICIPANT_PERMISSIONS)?.let(permissionMapper::decode)
                    info?.let(::ParticipantInvited)?.apply { setPermissions(permissions) }
                }
    }
}
