package io.dolby.sdk.reactnative.models;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.voxeet.sdk.json.ConferencePermission;
import com.voxeet.sdk.models.Conference;
import com.voxeet.sdk.models.Participant;
import com.voxeet.sdk.models.ParticipantNotification;
import com.voxeet.sdk.models.v1.CreateConferenceResult;
import com.voxeet.sdk.models.v1.HistoryConference;
import com.voxeet.sdk.models.v1.MetaData;
import com.voxeet.sdk.models.v1.SdkParticipant;
import com.voxeet.sdk.models.v1.SubscribeConference;
import com.voxeet.sdk.push.center.invitation.InvitationBundle;
import com.voxeet.sdk.push.center.subscription.event.ConferenceCreatedNotificationEvent;
import com.voxeet.sdk.push.center.subscription.event.ConferenceEndedNotificationEvent;
import com.voxeet.sdk.push.center.subscription.event.InvitationReceivedNotificationEvent;
import com.voxeet.sdk.push.center.subscription.event.ParticipantJoinedNotificationEvent;
import com.voxeet.sdk.push.center.subscription.event.ParticipantLeftNotificationEvent;
import com.voxeet.sdk.push.center.subscription.register.SubscribeConferenceCreated;
import com.voxeet.sdk.push.center.subscription.register.SubscribeParticipantLeft;

import java.util.List;

public final class NotificationUtil {

    public static final String CONFERENCE_ID = "conferenceId";
    public static final String CONFERENCE_ALIAS = "conferenceAlias";

    public static final String STATUS = "status";

    public static final String PARTICIPANT_INFO = "participantInfo";
    public static final String PARTICIPANT = "participant";
    public static final String PERMISSIONS = "permissions";

    private NotificationUtil() {

    }

    public static void toMap(WritableMap map, @Nullable ConferenceCreatedNotificationEvent event) {
        if (null != event.conferenceId) {
            map.putString(CONFERENCE_ID, event.conferenceId);
        }
        if (null != event.conferenceAlias) {
            map.putString(CONFERENCE_ALIAS, event.conferenceAlias);
        }
    }

    public static void toMap(WritableMap map, @Nullable ConferenceEndedNotificationEvent event) {
        if (null != event.conferenceId) {
            map.putString(CONFERENCE_ID, event.conferenceId);
        }
        if (null != event.conferenceAlias) {
            map.putString(CONFERENCE_ALIAS, event.conferenceAlias);
        }
    }

    public static void toMap(WritableMap map, @Nullable InvitationReceivedNotificationEvent event) {
        InvitationBundle bundle = event.invitation;
        if (null != bundle.conferenceId) {
            map.putString(CONFERENCE_ALIAS, bundle.conferenceId);
        }
        map.putMap(PARTICIPANT, toMap((bundle.inviter)));
    }

    public static void toMap(WritableMap map, @Nullable ParticipantJoinedNotificationEvent event) {
        if (null != event.conferenceId) {
            map.putString(CONFERENCE_ID, event.conferenceId);
        }
        if (null != event.conferenceAlias) {
            map.putString(CONFERENCE_ALIAS, event.conferenceAlias);
        }
        map.putMap(PARTICIPANT, toMap((event.participant)));
    }

    public static void toMap(WritableMap map, @Nullable ParticipantLeftNotificationEvent event) {
        if (null != event.conferenceId) {
            map.putString(CONFERENCE_ID, event.conferenceId);
        }
        if (null != event.conferenceAlias) {
            map.putString(CONFERENCE_ALIAS, event.conferenceAlias);
        }
        map.putMap(CONFERENCE_ALIAS, toMap((event.participant)));
    }

    @NonNull
    public static WritableMap toMap(@NonNull ParticipantNotification participant) {
        WritableMap map = new WritableNativeMap();

        map.putString("id", participant.getId());
        map.putString(STATUS, participant.getStatus().name());
        map.putMap(PARTICIPANT_INFO, ConferenceParticipantUtil.toMap(participant.getInfo()));

        return map;
    }

    public static ConferencePermission toConferencePermission(@Nullable String name) {
        if(null == name) return null;
        switch(name) {
            case "INVITE": return ConferencePermission.INVITE;
            case "KICK": return ConferencePermission.KICK;
            case "UPDATE_PERMISSIONS": return ConferencePermission.UPDATE_PERMISSIONS;
            case "JOIN": return ConferencePermission.JOIN;
            case "SEND_AUDIO": return ConferencePermission.SEND_AUDIO;
            case "SEND_VIDEO": return ConferencePermission.SEND_VIDEO;
            case "SHARE_SCREEN": return ConferencePermission.SHARE_SCREEN;
            case "SHARE_VIDEO": return ConferencePermission.SHARE_VIDEO;
            case "SHARE_FILE": return ConferencePermission.SHARE_FILE;
            case "SEND_MESSAGE": return ConferencePermission.SEND_MESSAGE;
            case "RECORD": return ConferencePermission.RECORD;
            case "STREAM": return ConferencePermission.STREAM;
        }
        return null;
    }
}
