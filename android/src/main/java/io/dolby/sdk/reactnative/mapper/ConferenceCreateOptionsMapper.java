package io.dolby.sdk.reactnative.mapper;

import com.facebook.react.bridge.ReadableMap;
import com.voxeet.sdk.json.internal.MetadataHolder;
import com.voxeet.sdk.json.internal.ParamsHolder;
import com.voxeet.sdk.services.builders.ConferenceCreateOptions;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import io.dolby.sdk.reactnative.utils.RNCollectionExtractor;

import static io.dolby.sdk.reactnative.mapper.ConferenceCommonConstants.CONFERENCE_PARAMS_DOLBY_VOICE;
import static io.dolby.sdk.reactnative.mapper.ConferenceCommonConstants.CONFERENCE_PARAMS_LIVE_RECORDING;
import static io.dolby.sdk.reactnative.mapper.ConferenceCommonConstants.CONFERENCE_PARAMS_RTCP_MODE;
import static io.dolby.sdk.reactnative.mapper.ConferenceCommonConstants.CONFERENCE_PARAMS_TTL;
import static io.dolby.sdk.reactnative.mapper.ConferenceCommonConstants.CONFERENCE_PARAMS_VIDEO_CODEC;

/**
 * Provides a method that maps React Native model to {@link ConferenceCreateOptions} model.
 */
public class ConferenceCreateOptionsMapper {

    public static final String CONFERENCE_CREATE_OPTIONS_ALIAS = "alias";
    public static final String CONFERENCE_CREATE_OPTIONS_PARAMS = "params";

    @NotNull
    private final RNCollectionExtractor rnCollectionExtractor;

    public ConferenceCreateOptionsMapper(
            @NotNull RNCollectionExtractor rnCollectionExtractor
    ) {
        this.rnCollectionExtractor = rnCollectionExtractor;
    }

    /**
     * Creates a {@link ConferenceCreateOptions} based on provided {@code options}.
     *
     * @param optionsMap options to set (conference alias, params)
     * @return {@link ConferenceCreateOptions}
     */
    @NotNull
    public ConferenceCreateOptions toConferenceCreateOptions(@Nullable ReadableMap optionsMap) {
        MetadataHolder metadataHolder = new MetadataHolder();
        ParamsHolder paramsHolder = toConferenceParamsHolder(optionsMap);

        ConferenceCreateOptions.Builder createOptionsBuilder = new ConferenceCreateOptions.Builder()
                .setMetadataHolder(metadataHolder)
                .setParamsHolder(paramsHolder);

        if (optionsMap != null) {
            createOptionsBuilder.setConferenceAlias(toConferenceAlias(optionsMap));
        }
        return createOptionsBuilder.build();
    }

    @Nullable
    private String toConferenceAlias(@NotNull ReadableMap optionsMap) {
        return rnCollectionExtractor.getString(optionsMap, CONFERENCE_CREATE_OPTIONS_ALIAS);
    }

    @NotNull
    private ParamsHolder toConferenceParamsHolder(@Nullable ReadableMap optionsMap) {
        ParamsHolder paramsHolder = new ParamsHolder();
        if (optionsMap == null) {
            return paramsHolder;
        }

        ReadableMap paramsMap = rnCollectionExtractor.getMap(optionsMap, CONFERENCE_CREATE_OPTIONS_PARAMS);
        if (paramsMap == null) {
            return paramsHolder;
        }

        if (rnCollectionExtractor.hasKey(paramsMap, CONFERENCE_PARAMS_VIDEO_CODEC)) {
            String videoCodec = rnCollectionExtractor.getString(paramsMap, CONFERENCE_PARAMS_VIDEO_CODEC);
            if (videoCodec != null) {
                paramsHolder.setVideoCodec(videoCodec);
            }
        }

        if (rnCollectionExtractor.hasKey(paramsMap, CONFERENCE_PARAMS_TTL)) {
            paramsHolder.putValue(
                    CONFERENCE_PARAMS_TTL,
                    rnCollectionExtractor.getInteger(paramsMap, CONFERENCE_PARAMS_TTL)
            );
        }

        if (rnCollectionExtractor.hasKey(paramsMap, CONFERENCE_PARAMS_RTCP_MODE)) {
            paramsHolder.putValue(
                    CONFERENCE_PARAMS_RTCP_MODE,
                    rnCollectionExtractor.getString(paramsMap, CONFERENCE_PARAMS_RTCP_MODE)
            );
        }

        if (rnCollectionExtractor.hasKey(paramsMap, CONFERENCE_PARAMS_LIVE_RECORDING)) {
            paramsHolder.putValue(
                    CONFERENCE_PARAMS_LIVE_RECORDING,
                    rnCollectionExtractor.getBoolean(paramsMap, CONFERENCE_PARAMS_LIVE_RECORDING)
            );
        }

        if (rnCollectionExtractor.hasKey(paramsMap, CONFERENCE_PARAMS_DOLBY_VOICE)) {
            paramsHolder.setDolbyVoice(
                    rnCollectionExtractor.getBoolean(paramsMap, CONFERENCE_PARAMS_DOLBY_VOICE)
            );
        }
        return paramsHolder;
    }
}
