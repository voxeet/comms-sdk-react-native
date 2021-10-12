package io.dolby.sdk.reactnative.mapper;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.voxeet.android.media.MediaStream;
import com.voxeet.android.media.stream.AudioTrack;
import com.voxeet.android.media.stream.MediaStreamType;
import com.voxeet.android.media.stream.VideoTrack;
import com.voxeet.sdk.json.ParticipantInfo;
import com.voxeet.sdk.models.Participant;
import com.voxeet.sdk.models.v1.ConferenceParticipantStatus;
import com.voxeet.sdk.models.v2.ParticipantType;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.List;

import io.dolby.sdk.reactnative.utils.RNCollectionExtractor;

/**
 * Provides methods that map:
 * <p>- {@link Participant} and {@link Participant}-related models to React Native models</p>
 * <p>- React Native model to {@link Participant} model and {@link Participant}-related models</p>
 */
public class ParticipantMapper {

    public final static String PARTICIPANT_ID = "id";
    public final static String PARTICIPANT_AUDIO_TRANSMITTING = "audioTransmitting";
    public final static String PARTICIPANT_INFO = "info";
    public final static String PARTICIPANT_INFO_NAME = "name";
    public final static String PARTICIPANT_INFO_EXTERNAL_ID = "externalId";
    public final static String PARTICIPANT_INFO_AVATAR_URL = "avatarUrl";
    public final static String PARTICIPANT_STATUS = "status";
    public final static String PARTICIPANT_STREAMS = "streams";
    public final static String PARTICIPANT_STREAMS_ID = "id";
    public final static String PARTICIPANT_STREAMS_TYPE = "type";
    public final static String PARTICIPANT_STREAMS_AUDIO_TRACKS = "audioTracks";
    public final static String PARTICIPANT_STREAMS_VIDEO_TRACKS = "videoTracks";
    public final static String PARTICIPANT_TYPE = "type";

    @NotNull
    private final RNCollectionExtractor rnCollectionExtractor;

    public ParticipantMapper(
            @NotNull RNCollectionExtractor rnCollectionExtractor
    ) {
        this.rnCollectionExtractor = rnCollectionExtractor;
    }

    @NotNull
    public ParticipantInfo toParticipantInfo(@NotNull ReadableMap participantInfoMap) {
        return new ParticipantInfo(
                rnCollectionExtractor.getString(participantInfoMap, PARTICIPANT_INFO_NAME),
                rnCollectionExtractor.getString(participantInfoMap, PARTICIPANT_INFO_EXTERNAL_ID),
                rnCollectionExtractor.getString(participantInfoMap, PARTICIPANT_INFO_AVATAR_URL)
        );
    }

    @Nullable
    public String toParticipantId(@NotNull ReadableMap participantMap) {
        return rnCollectionExtractor.getString(participantMap, PARTICIPANT_ID);
    }

    @NotNull
    public WritableMap toMap(@NotNull Participant participant) {
        WritableMap map = new WritableNativeMap();

        if (participant.getId() != null) {
            map.putString(PARTICIPANT_ID, participant.getId());
        }
        map.putBoolean(PARTICIPANT_AUDIO_TRANSMITTING, participant.audioTransmitting());
        map.putString(PARTICIPANT_STATUS, toString(participant.getStatus()));
        if (participant.getInfo() != null) {
            map.putMap(PARTICIPANT_INFO, toMap(participant.getInfo()));
        }
        map.putArray(PARTICIPANT_STREAMS, toStreamsArray(participant.streams()));
        map.putString(PARTICIPANT_TYPE, toString((participant.participantType())));

        return map;
    }

    @NonNull
    public WritableArray toParticipantsArray(@NotNull List<Participant> participants) {
        WritableNativeArray participantsArray = new WritableNativeArray();
        for (Participant participant : participants) {
            if (participant != null) {
                participantsArray.pushMap(toMap(participant));
            }
        }
        return participantsArray;
    }

    @NotNull
    private String toString(@NotNull ConferenceParticipantStatus participantStatus) {
        switch (participantStatus) {
            case CONNECTING:
                return "CONNECTING";
            case DECLINE:
                return "DECLINE";
            case ERROR:
                return "ERROR";
            case INACTIVE:
                return "INACTIVE";
            case KICKED:
                return "KICKED";
            case LEFT:
                return "LEFT";
            case RESERVED:
                return "RESERVED";
            case WARNING:
                return "WARNING";
            case IN_PROGRESS:
            case ON_AIR:
            case LATER:
            case MISSED:
            case UNKNOWN:
            default:
                return "UNKNOWN";
        }
    }

    @NotNull
    private WritableMap toMap(@NotNull ParticipantInfo participantInfo) {
        WritableMap map = new WritableNativeMap();

        if (participantInfo.getName() != null) {
            map.putString(PARTICIPANT_INFO_NAME, participantInfo.getName());
        }
        if (participantInfo.getExternalId() != null) {
            map.putString(PARTICIPANT_INFO_EXTERNAL_ID, participantInfo.getExternalId());
        }
        if (participantInfo.getAvatarUrl() != null) {
            map.putString(PARTICIPANT_INFO_AVATAR_URL, participantInfo.getAvatarUrl());
        }

        return map;
    }

    @NotNull
    private WritableNativeArray toStreamsArray(@NotNull List<MediaStream> streams) {
        WritableNativeArray streamsArray = new WritableNativeArray();
        for (MediaStream stream : streams) {
            if (stream != null) {
                streamsArray.pushMap(toMap(stream));
            }
        }
        return streamsArray;
    }

    @NotNull
    private ReadableMap toMap(@NotNull MediaStream stream) {
        WritableNativeMap map = new WritableNativeMap();

        map.putString(PARTICIPANT_STREAMS_ID, stream.peerId());
        map.putString(PARTICIPANT_STREAMS_TYPE, toString(stream.getType()));
        map.putArray(PARTICIPANT_STREAMS_AUDIO_TRACKS, toAudioTrackArray(stream.audioTracks()));
        map.putArray(PARTICIPANT_STREAMS_VIDEO_TRACKS, toVideoTrackArray(stream.videoTracks()));

        return map;
    }

    @NotNull
    private String toString(@NotNull MediaStreamType mediaStreamType) {
        switch (mediaStreamType) {
            case Camera:
                return "CAMERA";
            case ScreenShare:
                return "SCREEN_SHARE";
            case Custom1:
            case Custom2:
            case Custom3:
            case Custom4:
            case Custom5:
            case Custom6:
            case Custom7:
            case Custom8:
            default:
                return "UNKNOWN";
        }
    }

    @NotNull
    private ReadableArray toAudioTrackArray(@NotNull List<AudioTrack> audioTracks) {
        WritableNativeArray streamsArray = new WritableNativeArray();
        for (AudioTrack audioTrack : audioTracks) {
            if (audioTrack != null) {
                streamsArray.pushString(audioTrack.id());
            }
        }
        return streamsArray;
    }

    @NotNull
    private ReadableArray toVideoTrackArray(@NotNull List<VideoTrack> videoTracks) {
        WritableNativeArray streamsArray = new WritableNativeArray();
        for (VideoTrack videoTrack : videoTracks) {
            if (videoTrack != null) {
                streamsArray.pushString(videoTrack.id());
            }
        }
        return streamsArray;
    }

    @NotNull
    private String toString(@NotNull ParticipantType participantType) {
        switch (participantType) {
            case USER:
                return "USER";
            case LISTENER:
                return "LISTENER";
            case SPEAKER:
            case PSTN:
            case MIXER:
            case NONE:
            case DVC:
            case ROBOT:
            case ROBOT_SPEAKER:
            case ROBOT_LISTENER:
            case ROBOT_PSTN:
            case ROBOT_MIXER:
            case ROBOT_NONE:
            default:
                return "UNKNOWN";
        }
    }
}
