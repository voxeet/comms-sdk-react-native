package io.dolby.sdk.reactnative.mapper;

import com.facebook.react.bridge.ReadableMap;
import com.voxeet.sdk.media.constraints.Constraints;
import com.voxeet.sdk.models.Conference;
import com.voxeet.sdk.services.builders.ConferenceJoinOptions;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import io.dolby.sdk.reactnative.utils.RNCollectionExtractor;

/**
 * Provides a method that maps React Native model to {@link ConferenceJoinOptions} model.
 */
public class ConferenceJoinOptionsMapper {

    public static final String CONFERENCE_JOIN_OPTIONS_ACCESS_TOKEN = "conferenceAccessToken";
    public static final String CONFERENCE_JOIN_OPTIONS_MAX_VIDEO_FORWARDING = "maxVideoForwarding";
    public static final String CONFERENCE_JOIN_OPTIONS_CONSTRAINTS = "constraints";
    public static final String CONFERENCE_JOIN_OPTIONS_CONSTRAINTS_AUDIO = "audio";
    public static final String CONFERENCE_JOIN_OPTIONS_CONSTRAINTS_VIDEO = "video";

    @NotNull
    private final RNCollectionExtractor rnCollectionExtractor;

    public ConferenceJoinOptionsMapper(
            @NotNull RNCollectionExtractor rnCollectionExtractor
    ) {
        this.rnCollectionExtractor = rnCollectionExtractor;
    }

    /**
     * Creates a {@link ConferenceJoinOptions} based on provided {@code options} for a given
     * {@code conference}.
     *
     * @param conference a conference to join
     * @param optionsMap options to set (access token, constraints, max video forwarding)
     * @return {@link ConferenceJoinOptions}
     */
    @NotNull
    public ConferenceJoinOptions toConferenceJoinOptions(
            @NotNull Conference conference,
            @Nullable ReadableMap optionsMap
    ) {
        ConferenceJoinOptions.Builder joinOptionsBuilder = new ConferenceJoinOptions.Builder(conference);

        if (optionsMap == null) {
            return joinOptionsBuilder.build();
        }

        String accessToken = toConferenceAccessToken(optionsMap);
        if (accessToken != null) {
            joinOptionsBuilder.setConferenceAccessToken(accessToken);
        }

        Constraints constraints = toConstraints(optionsMap);
        if (constraints != null) {
            joinOptionsBuilder.setConstraints(constraints);
        }

        Integer maxVideoForwarding = toMaxVideoForwarding(optionsMap);
        if (maxVideoForwarding != null) {
            joinOptionsBuilder.setMaxVideoForwarding(maxVideoForwarding);
        }

        return joinOptionsBuilder.build();
    }

    @Nullable
    private String toConferenceAccessToken(@NotNull ReadableMap optionsMap) {
        return rnCollectionExtractor.getString(optionsMap, CONFERENCE_JOIN_OPTIONS_ACCESS_TOKEN);
    }

    @Nullable
    private Constraints toConstraints(@NotNull ReadableMap optionsMap) {
        ReadableMap constraintsMap = rnCollectionExtractor.getMap(optionsMap, CONFERENCE_JOIN_OPTIONS_CONSTRAINTS);
        if (constraintsMap == null) {
            return null;
        }
        boolean hasAudio = rnCollectionExtractor.getBoolean(constraintsMap, CONFERENCE_JOIN_OPTIONS_CONSTRAINTS_AUDIO);
        boolean hasVideo = rnCollectionExtractor.getBoolean(constraintsMap, CONFERENCE_JOIN_OPTIONS_CONSTRAINTS_VIDEO);
        return new Constraints(hasAudio, hasVideo);
    }

    @Nullable
    private Integer toMaxVideoForwarding(@NotNull ReadableMap optionsMap) {
        return rnCollectionExtractor.getInteger(optionsMap, CONFERENCE_JOIN_OPTIONS_MAX_VIDEO_FORWARDING);
    }
}
