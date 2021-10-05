
package io.dolby.sdk.reactnative.services;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.voxeet.sdk.json.internal.MetadataHolder;
import com.voxeet.sdk.json.internal.ParamsHolder;
import com.voxeet.sdk.models.Conference;
import com.voxeet.sdk.services.ConferenceService;
import com.voxeet.sdk.services.builders.ConferenceCreateOptions;
import com.voxeet.sdk.services.builders.ConferenceJoinOptions;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import io.dolby.sdk.reactnative.mapper.ConferenceMapper;

public class RNConferenceServiceModule extends ReactContextBaseJavaModule {

    @NotNull
    private final ConferenceService conferenceService;
    @NotNull
    private final ConferenceMapper conferenceMapper;

    /**
     * Creates a bridge wrapper for {@link ConferenceService}.
     *
     * @param conferenceService {@link ConferenceService} from Android SDK
     * @param reactContext      react context
     * @param conferenceMapper  mapper for a {@link Conference} and {@link Conference}-related models
     */
    public RNConferenceServiceModule(
            @NotNull ConferenceService conferenceService,
            @NotNull ReactApplicationContext reactContext,
            @NotNull ConferenceMapper conferenceMapper
    ) {
        super(reactContext);

        this.conferenceService = conferenceService;
        this.conferenceMapper = conferenceMapper;
    }

    @NotNull
    @Override
    public String getName() {
        return "DolbyIoIAPIConferenceService";
    }

    /**
     * <p>
     * Creates the conference based on information from the {@code options}.
     * </p>
     * <p>
     * Note that some parameters of the conference (returned as a {@code promise}), won't be
     * available (like dolbyVoice or ttl that are normally placed in
     * {@link Conference#getMetadata()}). {@link #join(ReadableMap, ReadableMap, Promise)} call
     * returns a conference object that contains that data. Also, if you call
     * {@link #fetch(String, Promise)} after {@link #join(ReadableMap, ReadableMap, Promise)} then
     * it also contains that data (if not, {@link Conference#getMetadata()} returns null).
     * </p>
     *
     * @param options information holder where the ID, parameters, and metadata can be passed
     * @param promise returns a created conference
     */
    @ReactMethod
    public void create(@Nullable ReadableMap options, @NotNull final Promise promise) {
        ConferenceCreateOptions conferenceCreateOptions = toConferenceCreateOptions(options);

        conferenceService.create(conferenceCreateOptions)
                .then(conference -> {
                    promise.resolve(conferenceMapper.toMap(conference));
                }).error(promise::reject);
    }

    /**
     * Provides a Conference object that allows joining a conference.
     *
     * @param conferenceId the conference ID
     * @param promise      returns a conference with the given {@code conferenceId} or the current
     *                     conference if {@code conferenceId} is null
     */
    @ReactMethod
    public void fetch(@Nullable String conferenceId, Promise promise) {
        com.voxeet.promise.Promise<Conference> conferencePromise;
        if (conferenceId != null) {
            conferencePromise = conferenceService.fetchConference(conferenceId);
        } else {
            conferencePromise = com.voxeet.promise.Promise.resolve(conferenceService.getConference());
        }

        conferencePromise
                .then(conference -> {
                    if (conference != null) {
                        promise.resolve(conferenceMapper.toMap(conference));
                    } else {
                        promise.reject(new Throwable("Couldn't find the conference"));
                    }
                }).error(promise::reject);
    }

    // TODO the final code will be provided in DEXA-42.
    //  Now it's tmp code just to enable metadata content (like dolbyVoice) checking
    //  Note: remember to manually grant permissions to CAMERA and MICROPHONE
    @ReactMethod
    public void join(@NotNull ReadableMap conference, @Nullable ReadableMap options, Promise promise) {
        try {
            String conferenceId = conferenceMapper.toConferenceId(conference);

            if (conferenceId == null) {
                promise.reject(new IllegalArgumentException("Conference should contain conferenceId"));
                return;
            }

            Conference foundConference = conferenceService.getConference(conferenceId);
            ConferenceJoinOptions joinOptions = new ConferenceJoinOptions.Builder(foundConference)
                    .build();

            conferenceService.join(joinOptions).then(resultConference -> {
                promise.resolve(conferenceMapper.toMap(resultConference));
            }).error(promise::reject);
        } catch (Throwable throwable) {
            throwable.printStackTrace();
            promise.reject(throwable);
        }
    }

    private ConferenceCreateOptions toConferenceCreateOptions(@Nullable ReadableMap options) {
        MetadataHolder metadataHolder = new MetadataHolder();
        ParamsHolder paramsHolder = conferenceMapper.toConferenceParamsHolder(options);

        ConferenceCreateOptions.Builder conferenceCreateOptions = new ConferenceCreateOptions.Builder()
                .setMetadataHolder(metadataHolder)
                .setParamsHolder(paramsHolder);

        if (options != null) {
            conferenceCreateOptions.setConferenceAlias(conferenceMapper.toConferenceAlias(options));
        }
        return conferenceCreateOptions.build();
    }
}
