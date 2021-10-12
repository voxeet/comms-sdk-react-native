
package io.dolby.sdk.reactnative.services;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.voxeet.promise.solve.ThenPromise;
import com.voxeet.promise.solve.ThenValue;
import com.voxeet.sdk.models.Conference;
import com.voxeet.sdk.models.Participant;
import com.voxeet.sdk.services.ConferenceService;
import com.voxeet.sdk.services.builders.ConferenceCreateOptions;
import com.voxeet.sdk.services.builders.ConferenceJoinOptions;
import com.voxeet.sdk.services.conference.information.ConferenceStatus;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.json.JSONArray;

import java.util.Map;

import io.dolby.sdk.reactnative.mapper.ConferenceCreateOptionsMapper;
import io.dolby.sdk.reactnative.mapper.ConferenceJoinOptionsMapper;
import io.dolby.sdk.reactnative.mapper.ConferenceMapper;
import io.dolby.sdk.reactnative.mapper.ParticipantMapper;
import io.dolby.sdk.reactnative.utils.Promises;

/**
 * The {@link RNConferenceServiceModule} allows the application to manage the conference life cycle
 * and interact with the conference.
 * <ol>
 * <b>Typical application APIs workflow:</b>
 *
 * <li>The application creates ({@link #create(ReadableMap, Promise)}) a conference.</li>
 *
 * <li>The application uses the {@link #fetch(String, Promise)} method to obtain the conference object.</li>
 *
 * <li>The application can choose to either:
 * <ul>
 * <li>{@link #join(ReadableMap, ReadableMap, Promise)} a conference</li>
 * <li>Replay a conference</li> TODO DEXA-42 link to replay
 * </ul>
 * </li>
 * TODO DEXA-37 link to start/stopAudio
 * <li>The application can start and stop sending the local participant's audio streams to the conference.
 * The application can also start and stop sending the remote participants' audio streams to the local participant.</li>
 * TODO DEXA-37 link to start/stopVideo
 * <li>The application can start and stop sending the local participant's video streams to the conference.
 * The application can also start and stop sending the remote participants' video streams to the local participant.</li>
 *
 * <li>During a conference, the application can:
 * <ul>
 * TODO DEXA-39 link to setMaxVideoForwarding
 * <li>Customize the number of the received video streams and prioritize the selected participants' video streams.</li>
 * <li>Mute the local or remote participant</li> TODO DEXA-39 link to mute
 * <li>Check if the local participant {@link #isMuted(Promise)}</li>
 * <li>Check which participant {@link #isSpeaking(ReadableMap, Promise)}</li>
 * <li>Check the audio level of a specific participant ({@link #getAudioLevel(ReadableMap, Promise)})</li>
 * <li>Get information about the conference, such as Conference object ({@link #current(Promise)}),
 * conference status ({@link #getStatus(ReadableMap, Promise)})</li>
 * <li>Get information about conference participants, such as the participant instance
 * ({@link #getParticipant(String, Promise)}), audio level of a participant ({@link #getAudioLevel(ReadableMap, Promise)})
 * and list of participants ({@link #getParticipants(ReadableMap, Promise)}).</li>
 * <li>Check the standard WebRTC statistics for the application ({@link #getLocalStats(Promise)}).</li>
 * <li>{@link #kick(ReadableMap, Promise)} a participant from a conference.</li>
 * <li>Update the participant's permissions.</li> TODO DEXA-39 link to update permissions
 * </ul>
 * </li>
 * <li>The application calls the {@link #leave(Promise)} method to leave a conference.</li>
 * </ol>
 * The application can interact with the service through these events:
 * TODO DEXA-73, DEXA-75 and more: add javadoc about events
 */
public class RNConferenceServiceModule extends ReactContextBaseJavaModule {

    @NotNull
    private final ConferenceService conferenceService;
    @NotNull
    private final ConferenceMapper conferenceMapper;
    @NotNull
    private final ConferenceCreateOptionsMapper conferenceCreateOptionsMapper;
    @NotNull
    private final ConferenceJoinOptionsMapper conferenceJoinOptionsMapper;
    @NotNull
    private final ParticipantMapper participantMapper;

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
            @NotNull ConferenceJoinOptionsMapper conferenceJoinOptionsMapper,
            @NotNull ParticipantMapper participantMapper
    ) {
        super(reactContext);

        this.conferenceService = conferenceService;
        this.conferenceMapper = conferenceMapper;
        this.conferenceCreateOptionsMapper = conferenceCreateOptionsMapper;
        this.conferenceJoinOptionsMapper = conferenceJoinOptionsMapper;
        this.participantMapper = participantMapper;
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
     * @param optionsMap information holder where the ID, parameters, and metadata can be passed
     * @param promise    returns a created conference
     */
    @ReactMethod
    public void create(@Nullable ReadableMap optionsMap, @NotNull final Promise promise) {
        Promises.promise(() -> conferenceCreateOptionsMapper.toConferenceCreateOptions(optionsMap))
                .then((ThenPromise<ConferenceCreateOptions, Conference>) conferenceService::create)
                .then((ThenValue<Conference, ReadableMap>) conferenceMapper::toMap)
                .then(promise::resolve)
                .error(promise::reject);
    }

    /**
     * Provides a Conference object that allows joining a conference.
     *
     * @param conferenceId the conference ID
     * @param promise      returns a conference with the given {@code conferenceId} or the current
     *                     conference if {@code conferenceId} is null
     */
    @ReactMethod
    public void fetch(@Nullable String conferenceId, @NotNull Promise promise) {
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
                        promise.reject(new Exception("Couldn't find the conference"));
                    }
                })
                .error(promise::reject);
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
     * @param conferenceMap a conference to join
     * @param optionsMap    the holder of the options to join
     * @param promise       returns a joined conference
     */
    @ReactMethod
    public void join(
            @NotNull ReadableMap conferenceMap,
            @Nullable ReadableMap optionsMap,
            Promise promise
    ) {
        Promises.promise(() -> toConferenceJoinOptions(conferenceMap, optionsMap))
                .then((ThenPromise<ConferenceJoinOptions, Conference>) conferenceService::join)
                .then((ThenValue<Conference, ReadableMap>) conferenceMapper::toMap)
                .then(promise::resolve)
                .error(promise::reject);
    }

    /**
     * Allows the conference owner, or a participant with adequate permissions, to kick another
     * participant from the conference by revoking the conference access token. The kicked
     * participant cannot join the conference again.
     *
     * @param participantMap the participant who needs to be kicked from the conference
     * @param promise        returns null
     */
    @ReactMethod
    public void kick(@NotNull ReadableMap participantMap, @NotNull Promise promise) {
        Promises.promise(() -> toParticipant(participantMap))
                .then(conferenceService::kick)
                .then(promise::resolve)
                .error(promise::reject);
    }

    /**
     * Leaves the current conference.
     *
     * @param promise returns null
     */
    @ReactMethod
    public void leave(@NotNull Promise promise) {
        conferenceService.leave()
                .then(result -> {
                    promise.resolve(null);
                })
                .error(promise::reject);
    }

    /**
     * Gets the current Conference object.
     *
     * @param promise returns the current conference
     */
    @ReactMethod
    public void current(@NotNull Promise promise) {
        Promises.promise(conferenceService::getConference)
                .then(conference -> {
                    if (conference != null) {
                        promise.resolve(conferenceMapper.toMap(conference));
                    } else {
                        promise.reject(new Exception("Missing current conference"));
                    }
                })
                .error(promise::reject);
    }

    /**
     * <p>
     * Gets the participant's audio level. The audio level value ranges from 0.0 to 1.0.
     * </p>
     * <p>
     * Note: When the local participant is muted, the audioLevel value is set to a non-zero value,
     * and isSpeaking is set to true if the audioLevel is greater than 0.05. This implementation
     * allows adding a warning message to notify the local participant that their audio is not sent
     * to a conference.
     * </p>
     *
     * @param participantMap this method gets audioLevel of a participant provided here
     * @param promise        returns the value between 0 and 1
     */
    @ReactMethod
    public void getAudioLevel(@NotNull ReadableMap participantMap, @NotNull Promise promise) {
        Promises.promise(() -> toParticipant(participantMap))
                .then((ThenValue<Participant, Double>) conferenceService::audioLevel)
                .then(promise::resolve)
                .error(promise::reject);
    }

    /**
     * Provides the maximum number of video streams that may be transmitted to the local participant.
     *
     * @param promise returns the max video forwarded value for the current conference
     */
    @ReactMethod
    public void getMaxVideoForwarding(@NotNull Promise promise) {
        Promises.promise(conferenceService::getMaxVideoForwarding)
                .then(value -> {
                    if (value != null) {
                        promise.resolve(value);
                    } else {
                        promise.reject(new Exception("Can't get max video forwarding"));
                    }
                })
                .error(promise::reject);
    }

    /**
     * Provides the instance of the desired participant.
     *
     * @param participantId participant id
     * @param promise       returns the instance of the participant. The null value informs that the
     *                      conference or the participant does not exist in the current time session.
     */
    @ReactMethod
    public void getParticipant(@NotNull String participantId, @NotNull Promise promise) {
        Promises.promise(() -> conferenceService.findParticipantById(participantId))
                .then(participant -> {
                    if (participant != null) {
                        promise.resolve(participantMapper.toMap(participant));
                    } else {
                        promise.reject(new Exception("Couldn't get the participant"));
                    }
                })
                .error(promise::reject);
    }

    /**
     * Gets information about conference participants.
     *
     * @param conferenceMap this method gets participants from a conference provided here
     * @param promise       returns the direct reference to the array of participants
     */
    @ReactMethod
    public void getParticipants(@NotNull ReadableMap conferenceMap, @NotNull Promise promise) {
        Promises.promise(() -> toConference(conferenceMap))
                .then((ThenValue<Conference, ReadableArray>) conference ->
                        participantMapper.toParticipantsArray(conference.getParticipants())
                )
                .then(promise::resolve)
                .error(promise::reject);
    }

    /**
     * Provides the current conference status.
     *
     * @param conferenceMap this method gets status of a conference provided here
     * @param promise       returns the valid {@link ConferenceStatus} for a manipulation
     */
    @ReactMethod
    public void getStatus(@NotNull ReadableMap conferenceMap, @NotNull Promise promise) {
        Promises.promise(() -> toConference(conferenceMap))
                .then((ThenValue<Conference, String>) conference ->
                        conferenceMapper.toString(conference.getState())
                )
                .then(promise::resolve)
                .error(promise::reject);
    }

    /**
     * <p>
     * Informs whether the local participant is muted.
     * </p>
     * <p>Note: This API is no longer supported for remote participants.
     * </p>
     *
     * @param promise returns boolean - information if the local participant is muted. Returns
     *                false if the participant is not muted or is not present at the conference.
     *                Returns true if the participant is muted.
     */
    @ReactMethod
    public void isMuted(Promise promise) {
        promise.resolve(conferenceService.isMuted());
    }

    /**
     * Indicates whether the current participant is speaking.
     *
     * @param participantMap this method gets speaking status of a participant provided here
     * @param promise        returns a boolean indicating whether the current participant is speaking.
     */
    @ReactMethod
    public void isSpeaking(@NotNull ReadableMap participantMap, @NotNull Promise promise) {
        Promises.promise(() -> toParticipant(participantMap))
                .then(conferenceService::isSpeaking)
                .then(promise::resolve)
                .error(promise::reject);
    }

    /**
     * Provides standard WebRTC statistics for the application to implement its own quality
     * monitoring mechanisms.
     *
     * @param promise returns The WebRTC Stat Matrix
     */
    @ReactMethod
    public void getLocalStats(@NotNull Promise promise) {
        Promises.promise(conferenceService::localStats)
                .then((ThenValue<Map<String, JSONArray>, ReadableMap>) conferenceMapper::toMap)
                .then(promise::resolve)
                .error(promise::reject);
    }

    /**
     * Creates a {@link ConferenceJoinOptions} based on provided {@code options} for a given
     * {@code conference}. Throws {@link IllegalArgumentException} if conference id is invalid.
     *
     * @param conferenceMap a conference to join
     * @param optionsMap    the holder of the options to join
     * @return {@link ConferenceJoinOptions}
     */
    @NotNull
    private ConferenceJoinOptions toConferenceJoinOptions(
            @NotNull ReadableMap conferenceMap,
            @Nullable ReadableMap optionsMap
    ) {
        Conference conference = toConference(conferenceMap);
        return conferenceJoinOptionsMapper.toConferenceJoinOptions(conference, optionsMap);
    }

    /**
     * Gets {@link Participant} based on a React Native participant model. Throws
     * {@link IllegalArgumentException} if participant id is invalid.
     *
     * @param participantMap a React Native participant model
     * @return {@link Participant}
     */
    @NotNull
    private Participant toParticipant(@NotNull ReadableMap participantMap) throws Exception {
        String participantId = participantMapper.toParticipantId(participantMap);
        if (participantId == null) {
            throw new IllegalArgumentException("Conference should contain participantId");
        }

        Participant foundParticipant = conferenceService.findParticipantById(participantId);
        if (foundParticipant == null) {
            throw new Exception("Couldn't find the participant");
        }
        return foundParticipant;
    }

    /**
     * Gets {@link Conference} based on a React Native conference model. Throws
     * {@link IllegalArgumentException} if conference id is invalid.
     *
     * @param conferenceMap a React Native conference model
     * @return {@link Conference}
     */
    @NotNull
    private Conference toConference(@NotNull ReadableMap conferenceMap) {
        String conferenceId = conferenceMapper.toConferenceId(conferenceMap);
        if (conferenceId == null) {
            throw new IllegalArgumentException("Conference should contain conferenceId");
        }
        return conferenceService.getConference(conferenceId);
    }
}
