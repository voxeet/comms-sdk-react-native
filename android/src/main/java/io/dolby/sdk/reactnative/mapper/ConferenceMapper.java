package io.dolby.sdk.reactnative.mapper;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.voxeet.sdk.json.ConferencePermission;
import com.voxeet.sdk.json.internal.ParamsHolder;
import com.voxeet.sdk.models.Conference;
import com.voxeet.sdk.models.Participant;
import com.voxeet.sdk.services.conference.information.ConferenceStatus;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.HashMap;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArrayList;

import io.dolby.sdk.reactnative.utils.RNCollectionExtractor;

/**
 * Provides methods that map:
 * <p>- {@link Conference} and {@link Conference}-related models to React Native models</p>
 * <p>- React Native models to {@link Conference} model and {@link Conference}-related model</p>
 */
public class ConferenceMapper {

    public static String CONFERENCE_ID = "id";
    public static String CONFERENCE_ALIAS = "alias";
    public static String CONFERENCE_IS_NEW = "isNew";
    public static String CONFERENCE_STATUS = "status";
    public static String CONFERENCE_PARAMS = "params";
    public static String CONFERENCE_PERMISSIONS = "permissions";
    public static String CONFERENCE_PARTICIPANTS = "participants";

    public static String CONFERENCE_OPTIONS_ALIAS = "alias";
    public static String CONFERENCE_OPTIONS_PARAMS = "params";
    public static String CONFERENCE_OPTIONS_PARAMS_VIDEO_CODEC = "videoCodec";
    public static String CONFERENCE_OPTIONS_PARAMS_TTL = "ttl";
    public static String CONFERENCE_OPTIONS_PARAMS_RTCP_MODE = "rtcpMode";
    public static String CONFERENCE_OPTIONS_PARAMS_LIVE_RECORDING = "liveRecording";
    public static String CONFERENCE_OPTIONS_PARAMS_DOLBY_VOICE = "dolbyVoice";

    @NotNull
    private final ParticipantMapper participantMapper;
    @NotNull
    private final RNCollectionExtractor rnCollectionExtractor;

    public ConferenceMapper(
            @NotNull ParticipantMapper participantMapper,
            @NotNull RNCollectionExtractor rnCollectionExtractor
    ) {
        this.participantMapper = participantMapper;
        this.rnCollectionExtractor = rnCollectionExtractor;
    }

    @Nullable
    public String toConferenceId(@NotNull ReadableMap conference) {
        return rnCollectionExtractor.getString(conference, CONFERENCE_ID);
    }

    @Nullable
    public String toConferenceAlias(@NotNull ReadableMap conferenceOptions) {
        return rnCollectionExtractor.getString(conferenceOptions, CONFERENCE_OPTIONS_ALIAS);
    }

    @NotNull
    public ParamsHolder toConferenceParamsHolder(@Nullable ReadableMap conferenceOptions) {
        ParamsHolder paramsHolder = new ParamsHolder();
        if (conferenceOptions == null) {
            return paramsHolder;
        }

        ReadableMap params = rnCollectionExtractor.getMap(conferenceOptions, CONFERENCE_OPTIONS_PARAMS);
        if (params == null) {
            return paramsHolder;
        }

        if (rnCollectionExtractor.hasKey(params, CONFERENCE_OPTIONS_PARAMS_VIDEO_CODEC)) {
            String videoCodec = rnCollectionExtractor.getString(params, CONFERENCE_OPTIONS_PARAMS_VIDEO_CODEC);
            if (videoCodec != null) {
                paramsHolder.setVideoCodec(videoCodec);
            }
        }

        if (rnCollectionExtractor.hasKey(params, CONFERENCE_OPTIONS_PARAMS_TTL)) {
            paramsHolder.putValue(
                    CONFERENCE_OPTIONS_PARAMS_TTL,
                    rnCollectionExtractor.getInteger(params, CONFERENCE_OPTIONS_PARAMS_TTL)
            );
        }

        if (rnCollectionExtractor.hasKey(params, CONFERENCE_OPTIONS_PARAMS_RTCP_MODE)) {
            paramsHolder.putValue(
                    CONFERENCE_OPTIONS_PARAMS_RTCP_MODE,
                    rnCollectionExtractor.getString(params, CONFERENCE_OPTIONS_PARAMS_RTCP_MODE)
            );
        }

        if (rnCollectionExtractor.hasKey(params, CONFERENCE_OPTIONS_PARAMS_LIVE_RECORDING)) {
            paramsHolder.putValue(
                    CONFERENCE_OPTIONS_PARAMS_LIVE_RECORDING,
                    rnCollectionExtractor.getBoolean(params, CONFERENCE_OPTIONS_PARAMS_LIVE_RECORDING)
            );
        }

        if (rnCollectionExtractor.hasKey(params, CONFERENCE_OPTIONS_PARAMS_DOLBY_VOICE)) {
            paramsHolder.setDolbyVoice(
                    rnCollectionExtractor.getBoolean(params, CONFERENCE_OPTIONS_PARAMS_DOLBY_VOICE)
            );
        }
        return paramsHolder;
    }

    @NotNull
    public WritableMap toMap(@NotNull Conference conference) {
        WritableMap map = new WritableNativeMap();

        map.putString(CONFERENCE_ID, conference.getId());
        map.putString(CONFERENCE_ALIAS, conference.getAlias());
        map.putBoolean(CONFERENCE_IS_NEW, conference.isNew());
        map.putString(CONFERENCE_STATUS, toString(conference.getState()));
        map.putMap(CONFERENCE_PARAMS, toParamsMap(conference));
        map.putArray(CONFERENCE_PERMISSIONS, toPermissionsArray(conference.getPermissions()));
        map.putArray(CONFERENCE_PARTICIPANTS, toParticipantsArray(conference.getParticipants()));

        return map;
    }

    @NotNull
    private String toString(@NotNull ConferenceStatus status) {
        switch (status) {
            case CREATED:
                return "CREATED";
            case DESTROYED:
                return "DESTROYED";
            case ENDED:
                return "ENDED";
            case ERROR:
                return "ERROR";
            case JOINED:
                return "JOINED";
            case LEFT:
                return "LEFT";
            case DEFAULT:
            case CREATING:
            case JOINING:
            case FIRST_PARTICIPANT:
            case NO_MORE_PARTICIPANT:
            case LEAVING:
            default:
                return "UNKNOWN";
        }
    }

    @NotNull
    private ReadableMap toParamsMap(@NotNull Conference conference) {
        HashMap<String, Object> metadata = conference.getMetadata();

        WritableMap map = new WritableNativeMap();
        if (metadata == null) {
            return map;
        }

        map.putBoolean(CONFERENCE_OPTIONS_PARAMS_DOLBY_VOICE, conference.isDolbyVoice());
        if (metadata.containsKey(CONFERENCE_OPTIONS_PARAMS_LIVE_RECORDING)) {
            map.putString(CONFERENCE_OPTIONS_PARAMS_LIVE_RECORDING, (String) metadata.get(CONFERENCE_OPTIONS_PARAMS_LIVE_RECORDING));
        }
        if (metadata.containsKey(CONFERENCE_OPTIONS_PARAMS_RTCP_MODE)) {
            map.putString(CONFERENCE_OPTIONS_PARAMS_RTCP_MODE, (String) metadata.get(CONFERENCE_OPTIONS_PARAMS_RTCP_MODE));
        }
        if (metadata.containsKey(CONFERENCE_OPTIONS_PARAMS_TTL)) {
            String ttl = (String) metadata.get(CONFERENCE_OPTIONS_PARAMS_TTL);
            if (ttl != null && !ttl.isEmpty()) {
                map.putInt(CONFERENCE_OPTIONS_PARAMS_TTL, Integer.parseInt(ttl));
            }
        }
        if (metadata.containsKey(CONFERENCE_OPTIONS_PARAMS_VIDEO_CODEC)) {
            map.putString(CONFERENCE_OPTIONS_PARAMS_VIDEO_CODEC, (String) metadata.get(CONFERENCE_OPTIONS_PARAMS_VIDEO_CODEC));
        }
        return map;
    }

    @NotNull
    private WritableNativeArray toPermissionsArray(@NotNull Set<ConferencePermission> permissions) {
        WritableNativeArray permissionsArray = new WritableNativeArray();
        for (ConferencePermission permission : permissions) {
            if (permission != null) {
                permissionsArray.pushString(toString(permission));
            }
        }
        return permissionsArray;
    }

    @NotNull
    private String toString(@NotNull ConferencePermission permission) {
        switch (permission) {
            case INVITE:
                return "INVITE";
            case JOIN:
                return "JOIN";
            case KICK:
                return "KICK";
            case RECORD:
                return "RECORD";
            case SEND_AUDIO:
                return "SEND_AUDIO";
            case SEND_MESSAGE:
                return "SEND_MESSAGE";
            case SEND_VIDEO:
                return "SEND_VIDEO";
            case SHARE_FILE:
                return "SHARE_FILE";
            case SHARE_SCREEN:
                return "SHARE_SCREEN";
            case SHARE_VIDEO:
                return "SHARE_VIDEO";
            case STREAM:
                return "STREAM";
            case UPDATE_PERMISSIONS:
                return "UPDATE_PERMISSIONS";
            default:
                return "UNKNOWN";
        }
    }

    @NotNull
    private WritableNativeArray toParticipantsArray(@NotNull CopyOnWriteArrayList<Participant> participants) {
        WritableNativeArray participantsArray = new WritableNativeArray();
        for (Participant participant : participants) {
            if (participant != null) {
                participantsArray.pushMap(participantMapper.toMap(participant));
            }
        }
        return participantsArray;
    }
}
