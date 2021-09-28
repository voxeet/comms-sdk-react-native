package io.dolby.sdk.reactnative.mapper;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.voxeet.sdk.json.ParticipantInfo;
import com.voxeet.sdk.models.Participant;
import com.voxeet.sdk.models.v1.ConferenceParticipantStatus;
import com.voxeet.sdk.utils.Opt;

public class ParticipantMapper {

    public final static String PARTICIPANT_ID = "id";
    public final static String PARTICIPANT_NAME = "name";
    public final static String PARTICIPANT_EXTERNAL_ID = "externalId";
    public final static String PARTICIPANT_AVATAR_URL = "avatarUrl";
    public final static String CONFERENCE_STATUS = "conferenceStatus";

    @NonNull
    public ParticipantInfo toParticipantInfo(ReadableMap map) {
        return new ParticipantInfo(
                map.getString(PARTICIPANT_NAME),
                map.getString(PARTICIPANT_EXTERNAL_ID),
                map.getString(PARTICIPANT_AVATAR_URL)
        );
    }

    @NonNull
    public WritableMap toMap(@NonNull Participant participant) {
        ParticipantInfo participantInfo = participant.getInfo();

        WritableMap map = new WritableNativeMap();
        map.putString(PARTICIPANT_ID, participant.getId());
        map.putString(
                CONFERENCE_STATUS,
                Opt.of(participant.getStatus()).or(ConferenceParticipantStatus.UNKNOWN).name()
        );

        if (participantInfo != null) {
            if (participantInfo.getName() != null) {
                map.putString(PARTICIPANT_NAME, participantInfo.getName());
            }
            if (participantInfo.getExternalId() != null) {
                map.putString(PARTICIPANT_EXTERNAL_ID, participantInfo.getExternalId());
            }
            if (participantInfo.getAvatarUrl() != null) {
                map.putString(PARTICIPANT_AVATAR_URL, participantInfo.getAvatarUrl());
            }
        }

        return map;
    }
}
