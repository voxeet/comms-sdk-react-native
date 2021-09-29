package io.dolby.sdk.reactnative.mapper;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.voxeet.android.media.MediaStream;
import com.voxeet.android.media.stream.AudioTrack;
import com.voxeet.android.media.stream.VideoTrack;
import com.voxeet.sdk.json.ParticipantInfo;
import com.voxeet.sdk.models.Participant;
import com.voxeet.sdk.models.v1.ConferenceParticipantStatus;
import com.voxeet.sdk.utils.Opt;

import org.jetbrains.annotations.NotNull;

import java.util.List;

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
    public final static String PARTICIPANT_CONFERENCE_STATUS = "conferenceStatus";
    public final static String PARTICIPANT_STREAMS = "streams";
    public final static String PARTICIPANT_STREAMS_ID = "id";
    public final static String PARTICIPANT_STREAMS_TYPE = "type";
    public final static String PARTICIPANT_STREAMS_AUDIO_TRACKS = "audioTracks";
    public final static String PARTICIPANT_STREAMS_VIDEO_TRACKS = "videoTracks";
    public final static String PARTICIPANT_TYPE = "type";

    @NonNull
    public ParticipantInfo toParticipantInfo(ReadableMap map) {
        return new ParticipantInfo(
                map.getString(PARTICIPANT_INFO_NAME),
                map.getString(PARTICIPANT_INFO_EXTERNAL_ID),
                map.getString(PARTICIPANT_INFO_AVATAR_URL)
        );
    }

    @NonNull
    public WritableMap toMap(@NonNull Participant participant) {
        ParticipantInfo participantInfo = participant.getInfo();

        WritableMap map = new WritableNativeMap();
        map.putString(PARTICIPANT_ID, participant.getId());
        map.putBoolean(PARTICIPANT_AUDIO_TRANSMITTING, participant.audioTransmitting());
        map.putString(
                PARTICIPANT_CONFERENCE_STATUS,
                Opt.of(participant.getStatus()).or(ConferenceParticipantStatus.UNKNOWN).name()
        );

        map.putMap(PARTICIPANT_INFO, toMap(participantInfo));
        map.putArray(PARTICIPANT_STREAMS, toStreams(participant));
        // fixme waiting for answer regarding types other than USER and LISTENER
        map.putString(PARTICIPANT_TYPE, participant.participantType().name());

        return map;
    }

    @NotNull
    private WritableMap toMap(ParticipantInfo participantInfo) {
        WritableMap map = new WritableNativeMap();

        if (participantInfo != null) {
            if (participantInfo.getName() != null) {
                map.putString(PARTICIPANT_INFO_NAME, participantInfo.getName());
            }
            if (participantInfo.getExternalId() != null) {
                map.putString(PARTICIPANT_INFO_EXTERNAL_ID, participantInfo.getExternalId());
            }
            if (participantInfo.getAvatarUrl() != null) {
                map.putString(PARTICIPANT_INFO_AVATAR_URL, participantInfo.getAvatarUrl());
            }
        }

        return map;
    }

    @NotNull
    private WritableNativeArray toStreams(@NotNull Participant participant) {
        WritableNativeArray streamsArray = new WritableNativeArray();
        for (MediaStream stream : participant.streams()) {
            streamsArray.pushMap(toStream(stream));
        }
        return streamsArray;
    }

    private ReadableMap toStream(MediaStream stream) {
        WritableNativeMap map = new WritableNativeMap();

        map.putString(PARTICIPANT_STREAMS_ID, stream.peerId());
        // fixme waiting for answer regarding types other than CAMERA and SCREEN SHARE
        map.putString(PARTICIPANT_STREAMS_TYPE, stream.getType().name());
        map.putArray(PARTICIPANT_STREAMS_AUDIO_TRACKS, toAudioTracks(stream.audioTracks()));
        map.putArray(PARTICIPANT_STREAMS_VIDEO_TRACKS, toVideoTracks(stream.videoTracks()));

        return map;
    }

    private ReadableArray toAudioTracks(List<AudioTrack> audioTracks) {
        WritableNativeArray streamsArray = new WritableNativeArray();
        for (AudioTrack audioTrack : audioTracks) {
            if (audioTrack != null) {
                streamsArray.pushString(audioTrack.id());
            }
        }
        return streamsArray;
    }

    private ReadableArray toVideoTracks(List<VideoTrack> videoTracks) {
        WritableNativeArray streamsArray = new WritableNativeArray();
        for (VideoTrack videoTrack : videoTracks) {
            if (videoTrack != null) {
                streamsArray.pushString(videoTrack.id());
            }
        }
        return streamsArray;
    }
}
