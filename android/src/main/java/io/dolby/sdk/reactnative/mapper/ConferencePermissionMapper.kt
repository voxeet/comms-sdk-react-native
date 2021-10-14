package io.dolby.sdk.reactnative.mapper

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.voxeet.sdk.json.ConferencePermission
import com.voxeet.sdk.json.ConferencePermission.INVITE
import com.voxeet.sdk.json.ConferencePermission.JOIN
import com.voxeet.sdk.json.ConferencePermission.KICK
import com.voxeet.sdk.json.ConferencePermission.RECORD
import com.voxeet.sdk.json.ConferencePermission.SEND_AUDIO
import com.voxeet.sdk.json.ConferencePermission.SEND_MESSAGE
import com.voxeet.sdk.json.ConferencePermission.SEND_VIDEO
import com.voxeet.sdk.json.ConferencePermission.SHARE_FILE
import com.voxeet.sdk.json.ConferencePermission.SHARE_SCREEN
import com.voxeet.sdk.json.ConferencePermission.SHARE_VIDEO
import com.voxeet.sdk.json.ConferencePermission.STREAM
import com.voxeet.sdk.json.ConferencePermission.UPDATE_PERMISSIONS

/**
 * Provides methods that map [ConferencePermission] model to React Native models and vice versa
 */
class ConferencePermissionMapper {

    fun decode(permissionsArray: ReadableArray): Set<ConferencePermission> {
        return permissionsArray.toArrayList()
                .filterIsInstance<String>()
                .mapNotNull(::fromString)
                .toSet()
    }

    fun encode(permissions: Set<ConferencePermission>): ReadableArray {
        return permissions.map(::toString)
                .let(Arguments::fromList)
    }

    private fun toString(permission: ConferencePermission): String {
        return when (permission) {
            INVITE -> "INVITE"
            JOIN -> "JOIN"
            KICK -> "KICK"
            RECORD -> "RECORD"
            SEND_AUDIO -> "SEND_AUDIO"
            SEND_MESSAGE -> "SEND_MESSAGE"
            SEND_VIDEO -> "SEND_VIDEO"
            SHARE_FILE -> "SHARE_FILE"
            SHARE_SCREEN -> "SHARE_SCREEN"
            SHARE_VIDEO -> "SHARE_VIDEO"
            STREAM -> "STREAM"
            UPDATE_PERMISSIONS -> "UPDATE_PERMISSIONS"
        }
    }

    private fun fromString(permission: String): ConferencePermission? {
        return when (permission) {
            "INVITE" -> INVITE
            "JOIN" -> JOIN
            "KICK" -> KICK
            "RECORD" -> RECORD
            "SEND_AUDIO" -> SEND_AUDIO
            "SEND_MESSAGE" -> SEND_MESSAGE
            "SEND_VIDEO" -> SEND_VIDEO
            "SHARE_FILE" -> SHARE_FILE
            "SHARE_SCREEN" -> SHARE_SCREEN
            "SHARE_VIDEO" -> SHARE_VIDEO
            "STREAM" -> STREAM
            "UPDATE_PERMISSIONS" -> UPDATE_PERMISSIONS
            else -> null
        }
    }
}
