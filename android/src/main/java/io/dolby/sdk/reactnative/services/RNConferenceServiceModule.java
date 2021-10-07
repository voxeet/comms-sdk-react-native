
package io.dolby.sdk.reactnative.services;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.voxeet.sdk.models.Conference;
import com.voxeet.sdk.services.ConferenceService;
import com.voxeet.sdk.services.builders.ConferenceCreateOptions;
import com.voxeet.sdk.services.builders.ConferenceJoinOptions;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import io.dolby.sdk.reactnative.mapper.ConferenceCreateOptionsMapper;
import io.dolby.sdk.reactnative.mapper.ConferenceJoinOptionsMapper;
import io.dolby.sdk.reactnative.mapper.ConferenceMapper;

public class RNConferenceServiceModule extends ReactContextBaseJavaModule {

    @NotNull
    private final ConferenceService conferenceService;
    @NotNull
    private final ConferenceMapper conferenceMapper;
    @NotNull
    private final ConferenceCreateOptionsMapper conferenceCreateOptionsMapper;
    @NotNull
    private final ConferenceJoinOptionsMapper conferenceJoinOptionsMapper;

    /**
     * Creates a bridge wrapper for {@link ConferenceService}.
     *
     * @param conferenceService             {@link ConferenceService} from Android SDK
     * @param reactContext                  react context
     * @param conferenceMapper              mapper for a {@link Conference} and {@link Conference}-related models
     * @param conferenceCreateOptionsMapper mapper for a {@link ConferenceCreateOptions} model
     * @param conferenceJoinOptionsMapper   mapper for a {@link ConferenceJoinOptions} model
     */
    public RNConferenceServiceModule(
            @NotNull ConferenceService conferenceService,
            @NotNull ReactApplicationContext reactContext,
            @NotNull ConferenceMapper conferenceMapper,
            @NotNull ConferenceCreateOptionsMapper conferenceCreateOptionsMapper,
            @NotNull ConferenceJoinOptionsMapper conferenceJoinOptionsMapper
    ) {
        super(reactContext);

        this.conferenceService = conferenceService;
        this.conferenceMapper = conferenceMapper;
        this.conferenceCreateOptionsMapper = conferenceCreateOptionsMapper;
        this.conferenceJoinOptionsMapper = conferenceJoinOptionsMapper;
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
        ConferenceCreateOptions createOptions = conferenceCreateOptionsMapper.toConferenceCreateOptions(options);

        conferenceService.create(createOptions)
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

    // TODO Note: remember to manually grant permissions to CAMERA and MICROPHONE.
    //  That mechanism will be added in DEXA-140.
    /**
     * <p>
     * Joins the conference based on information from the {@code options}.
     * </p>
     * <p>
     * <ul>
     * The possible exception in the rejection:
     * <li>ServerErrorException</li>
     * <li>InConferenceException</li>
     * <li>MediaEngineException</li>
     * <li>ParticipantAddedErrorEventException</li>
     * <li>IllegalArgumentException</li>
     * </ul>
     * </p>
     *
     * @param conference a conference to join
     * @param options    the holder of the options to join
     * @param promise    returns a joined conference
     */
    @ReactMethod
    public void join(@NotNull ReadableMap conference, @Nullable ReadableMap options, Promise promise) {
        try {
            ConferenceJoinOptions joinOptions = toConferenceJoinOptions(conference, options);

            conferenceService.join(joinOptions)
                    .then(resultConference -> {
                        promise.resolve(conferenceMapper.toMap(resultConference));
                    }).error(promise::reject);
        } catch (Throwable throwable) {
            throwable.printStackTrace();
            promise.reject(throwable);
        }
    }

    /**
     * Creates a {@link ConferenceJoinOptions} based on provided {@code options} for a given
     * {@code conference}. Throws {@link IllegalArgumentException} if conference id is invalid.
     *
     * @param conference a conference to join
     * @param options    the holder of the options to join
     * @return {@link ConferenceJoinOptions}
     */
    private ConferenceJoinOptions toConferenceJoinOptions(
            @NotNull ReadableMap conference,
            @Nullable ReadableMap options
    ) {
        String conferenceId = conferenceMapper.toConferenceId(conference);
        if (conferenceId == null) {
            throw new IllegalArgumentException("Conference should contain conferenceId");
        }

        Conference foundConference = conferenceService.getConference(conferenceId);
        return conferenceJoinOptionsMapper.toConferenceJoinOptions(foundConference, options);
    }
}
