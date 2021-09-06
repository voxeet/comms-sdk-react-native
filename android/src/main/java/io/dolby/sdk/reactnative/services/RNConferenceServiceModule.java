
package io.dolby.sdk.reactnative.services;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.voxeet.VoxeetSDK;
import com.voxeet.promise.solve.ErrorPromise;
import com.voxeet.promise.solve.PromiseSolver;
import com.voxeet.promise.solve.Solver;
import com.voxeet.promise.solve.ThenVoid;
import com.voxeet.sdk.json.ConferencePermission;
import com.voxeet.sdk.json.ParticipantInfo;
import com.voxeet.sdk.json.ParticipantInvited;
import com.voxeet.sdk.json.internal.MetadataHolder;
import com.voxeet.sdk.json.internal.ParamsHolder;
import com.voxeet.sdk.models.Conference;
import com.voxeet.sdk.models.Participant;
import com.voxeet.sdk.models.ParticipantPermissions;
import com.voxeet.sdk.services.ConferenceService;
import com.voxeet.sdk.services.SessionService;
import com.voxeet.sdk.services.builders.ConferenceCreateOptions;
import com.voxeet.sdk.services.builders.ConferenceJoinOptions;
import com.voxeet.sdk.services.conference.AudioProcessing;
import com.voxeet.sdk.services.conference.information.ConferenceParticipantType;
import com.voxeet.sdk.services.simulcast.ParticipantQuality;
import com.voxeet.sdk.services.simulcast.Quality;
import com.voxeet.sdk.utils.Opt;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import io.dolby.sdk.reactnative.models.ConferenceParticipantUtil;
import io.dolby.sdk.reactnative.models.ConferenceUtil;
import io.dolby.sdk.reactnative.models.NotificationUtil;
import io.dolby.sdk.reactnative.utils.Execute;
import io.dolby.sdk.reactnative.utils.RNUtils;

public class RNConferenceServiceModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private final ConferenceService conferenceService;
    private final SessionService sessionService;

    public RNConferenceServiceModule(
            ConferenceService conferenceService,
            SessionService sessionService,
            ReactApplicationContext reactContext) {
        super(reactContext);

        this.sessionService = sessionService;
        this.conferenceService = conferenceService;
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return RNConferenceServiceModule.class.getSimpleName();
    }


    @ReactMethod
    public void mute(boolean mute, ReadableMap optional_participant, Promise promise) {
        executeOntoLocalOrRemoteParticipant(optional_participant, promise,
                participant -> conferenceService.mute(participant, mute) // automatically call mute(mute) if local
        );
    }

    @ReactMethod
    public void isMuted(ReadableMap optional_participant, Promise promise) {
        executeOntoLocalOrRemoteParticipant(optional_participant, promise,
                conferenceService::isMuted //isMuted on Participant who is local will automatically call isMuted()
        );
    }

    @ReactMethod
    public void muteOutput(boolean mute, Promise promise) {
        boolean updated = conferenceService.muteOutput(mute);
        promise.resolve(updated);
    }

    @ReactMethod
    public void isOutputMuted(Promise promise) {
        promise.resolve(conferenceService.isOutputMuted());
    }

    @ReactMethod
    public void setAudioProcessing(String audioProcessing, Promise promise) {
        AudioProcessing processing;
        switch (audioProcessing) {
            case "ENVIRONMENT":
                processing = AudioProcessing.ENVIRONMENT;
                break;
            default:
                processing = AudioProcessing.VOICE;
        }

        conferenceService.setAudioProcessing(processing);
    }

    @ReactMethod
    public void getAudioProcessing(Promise promise) {
        promise.resolve(conferenceService.getAudioProcessing().name());
    }

    @ReactMethod
    public void isSpeaking(ReadableMap optional_participant, Promise promise) {
        executeOntoLocalOrRemoteParticipant(optional_participant, promise,
                conferenceService::isSpeaking);
    }

    @ReactMethod
    public void audioLevel(ReadableMap optional_participant, Promise promise) {
        executeOntoLocalOrRemoteParticipant(optional_participant, promise,
                conferenceService::audioLevel);
    }

    @ReactMethod
    public void getParticipants(ReadableMap conf, Promise promise) {
        sendParticipants(Conference::getParticipants, conf, promise);
    }

    @ReactMethod
    public void hasParticipants(Promise promise) {
        promise.resolve(conferenceService.hasParticipants());
    }

    @ReactMethod
    public void getMixers(ReadableMap conf, Promise promise) {
        sendParticipants(Conference::getMixers, conf, promise);
    }


    @ReactMethod
    public void create(@Nullable ReadableMap options, @NonNull final Promise promise) {
        String conferenceAlias = null;
        ReadableMap params;
        MetadataHolder holder = new MetadataHolder();
        ParamsHolder paramsHolder = new ParamsHolder();

        if (RNUtils.hasKey(options, "alias"))
            conferenceAlias = RNUtils.getString(options, "alias");

        if (RNUtils.hasKey(options, "params")) {
            params = RNUtils.getMap(options, "params");

            if (RNUtils.hasKey(params, "videoCodec"))
                paramsHolder.setVideoCodec(params.getString("videoCodec"));

            if (RNUtils.hasKey(params, "ttl"))
                paramsHolder.putValue("ttl", RNUtils.getInteger(params, "ttl"));

            if (RNUtils.hasKey(params, "rtcpMode"))
                paramsHolder.putValue("rtcpMode", RNUtils.getString(params, "rtcpMode"));

            if (RNUtils.hasKey(params, "mode"))
                paramsHolder.putValue("mode", RNUtils.getString(params, "mode"));

            if (RNUtils.hasKey(params, "liveRecording"))
                paramsHolder.putValue("liveRecording", RNUtils.getString(params, "liveRecording"));

            if (RNUtils.hasKey(params, "dolbyVoice"))
                paramsHolder.setDolbyVoice(RNUtils.getBoolean(params, "dolbyVoice"));

            if (RNUtils.hasKey(params, "simulcast"))
                paramsHolder.setSimulcast(RNUtils.getBoolean(params, "simulcast"));
        }

        conferenceService.create(new ConferenceCreateOptions.Builder()
                .setConferenceAlias(conferenceAlias)
                .setMetadataHolder(holder)
                .setParamsHolder(paramsHolder).build()
        ).then(result -> {
            promise.resolve(ConferenceUtil.toMap(result));
        }).error(promise::reject);
    }

    @ReactMethod
    public void join(ReadableMap conf, ReadableMap options, Promise promise) {
        try {
            Conference conference = Opt.of(conf).then(c -> RNUtils.getString(c, ConferenceUtil.CONFERENCE_ID))
                    .then(conferenceService::getConference).orNull();

            if (null == conference) throw new NullPointerException("Invalid Conference");

            ReadableMap user = RNUtils.getMap(options, "user");
            ConferenceParticipantType type = null != user && "listener".equals(RNUtils.getString(user, "type"))
                    ? ConferenceParticipantType.LISTENER : ConferenceParticipantType.NORMAL;

            ConferenceJoinOptions.Builder joinOptions = new ConferenceJoinOptions.Builder(conference)
                    .setConferenceParticipantType(type);

            if (RNUtils.hasKey(options, "maxVideoForwarding")) {
                joinOptions.setMaxVideoForwarding(RNUtils.getInteger(options,"maxVideoForwarding"));
            }

            conferenceService.join(joinOptions.build()).then(conference1 -> {
                promise.resolve(ConferenceUtil.toMap(conference1));
            }).error(promise::reject);
        } catch (Throwable throwable) {
            throwable.printStackTrace();
            promise.reject(throwable);
        }
    }

    @ReactMethod
    public void replay(ReadableMap conf, long offset, Promise promise) {
        try {
            Conference conference = Opt.of(conf).then(c -> RNUtils.getString(c, ConferenceUtil.CONFERENCE_ID))
                    .then(conferenceService::getConference).orNull();

            if (null == conference) throw new NullPointerException("Invalid Conference");

            conferenceService.replay(conference, offset).then(result -> {
                promise.resolve(ConferenceUtil.toMap(result));
            }).error(promise::reject);
        } catch (Throwable throwable) {
            throwable.printStackTrace();
            promise.reject(throwable);
        }
    }

    @ReactMethod
    public void updatePermissions(ReadableArray permissions, Promise promise) {
        try {
            List<ParticipantPermissions> list = new ArrayList<>();

            if(null == permissions) throw new NullPointerException("permissions are invalid, expect []");

            for (int i = 0; i < permissions.size(); i++) {
                ReadableMap temp = permissions.getMap(i);
                ReadableMap participant = RNUtils.getMap(temp, NotificationUtil.PARTICIPANT);
                ReadableArray permissionsArray = RNUtils.getArray(temp, NotificationUtil.PERMISSIONS);

                if(null == participant) continue;

                String participantId = RNUtils.getString(participant, ConferenceParticipantUtil.PARTICIPANT_ID);
                if(null == participantId) continue;

                Participant fromNative = conferenceService.findParticipantById(participantId);
                if(null == fromNative) continue;

                ParticipantPermissions invitation = new ParticipantPermissions();
                invitation.participant = fromNative;
                invitation.permissions = new HashSet<>();
                if (null != permissionsArray) {
                    for (int j = 0; j < permissionsArray.size(); j++) {
                        String name = permissionsArray.getString(j);
                        ConferencePermission perm = NotificationUtil.toConferencePermission(name);
                        if (null != perm) invitation.permissions.add(perm);
                    }
                }
            }

            conferenceService.updatePermissions(list).then(promise::resolve).error(promise::reject);
        } catch(Throwable throwable) {
            promise.reject(throwable);
        }
    }

    @Deprecated
    @ReactMethod
    public void getConferenceStatus(String conferenceId, Promise promise) {
        try {
            if (null == conferenceId) throw new NullPointerException("Invalid Conference");

            conferenceService.getConferenceStatus(conferenceId).then(status -> {
                promise.resolve(ConferenceUtil.toMap(status));
            }).error(promise::reject);
        } catch (Throwable throwable) {
            throwable.printStackTrace();
            promise.reject(throwable);
        }
    }

    @ReactMethod
    public void kick(ReadableMap participant, Promise promise) {
        executePromiseOntoParticipant(participant, promise, conferenceService::kick);
    }

    @ReactMethod
    public void findParticipantById(String participantId, Promise promise) {
        try {
            if (null == participantId) throw new NullPointerException("participantId is invalid");

            WritableMap participant = Opt.of(participantId)
                    .then(conferenceService::findParticipantById)
                    .then(ConferenceParticipantUtil::toMap)
                    .orNull();

            if (null == participant) throw new NullPointerException("Participant is not found");

            promise.resolve(participant);
        } catch (Throwable throwable) {
            promise.reject(throwable);
        }
    }

    @ReactMethod
    public void getConferenceType(Promise promise) {
        try {
            promise.resolve(conferenceService.getConferenceType().name());
        } catch (Throwable throwable) {
            promise.reject(throwable);
        }
    }

    @ReactMethod
    public void getConference(Promise promise) {
        try {
            promise.resolve(Opt.of(conferenceService.getConference()).then(ConferenceUtil::toMap));
        } catch (Throwable throwable) {
            promise.reject(throwable);
        }
    }

    @ReactMethod
    public void fetchConference(String conferenceId, Promise promise) {
        conferenceService.fetchConference(conferenceId).then(conference -> {
            promise.resolve(Opt.of(conferenceService.getConference())
                    .then(ConferenceUtil::toMap));
        }).error(promise::reject);
    }

    @ReactMethod
    public void isInConference(Promise promise) {
        promise.resolve(conferenceService.isInConference());
    }

    @ReactMethod
    public void isLive(Promise promise) {
        promise.resolve(conferenceService.isLive());
    }

    @ReactMethod
    public void startAudio(ReadableMap optional_participant, Promise promise) {
        executePromiseOntoLocalOrRemoteParticipant(optional_participant, promise, conferenceService::startAudio);
    }

    @ReactMethod
    public void stopAudio(ReadableMap optional_participant, Promise promise) {
        executePromiseOntoLocalOrRemoteParticipant(optional_participant, promise, conferenceService::stopAudio);
    }

    @ReactMethod
    public void startVideo(boolean isFrontFacing, Promise promise) {
        conferenceService.startVideo(isFrontFacing).then(promise::resolve).error(promise::reject);
    }

    @ReactMethod
    public void stopVideo(Promise promise) {
        conferenceService.stopVideo().then(promise::resolve).error(promise::reject);
    }

    @ReactMethod
    public void startVideoForParticipant(ReadableMap optional_participant, Promise promise) {
        executePromiseOntoLocalOrRemoteParticipant(optional_participant, promise, conferenceService::startVideo);
    }

    @ReactMethod
    public void stopVideoForParticipant(ReadableMap optional_participant, Promise promise) {
        executePromiseOntoLocalOrRemoteParticipant(optional_participant, promise, conferenceService::stopVideo);
    }

    @ReactMethod
    public void simulcast(ReadableArray requested, Promise promise) {
        try {
            List<ParticipantQuality> qualities = new ArrayList<>();
            if (null == requested)
                throw new NullPointerException("Invalid ParticipantQuality array");

            for (int i = 0; i < requested.size(); i++) {
                ParticipantQuality quality = ConferenceUtil.toParticipantQuality(RNUtils.getMap(requested, i));
                if (null == quality) continue;
                qualities.add(quality);
            }

            conferenceService.simulcast(qualities);
        } catch (Throwable throwable) {
            throwable.printStackTrace();
            promise.reject(throwable);
        }
    }

    @ReactMethod
    public void getMaxVideoForwarding(Promise promise) {
        promise.resolve(conferenceService.getMaxVideoForwarding());
    }

    @ReactMethod
    public void videoForwarding(int max, ReadableArray optional_participants, Promise promise) {
        List<Participant> participants = new ArrayList<>();
        if (null != optional_participants) {
            for (int i = 0; i < optional_participants.size(); i++) {
                ReadableMap map = RNUtils.getMap(optional_participants, i);
                if (null == map) continue;

                Participant participant = Opt.of(RNUtils.getString(map, "participantId"))
                        .then(conferenceService::findParticipantById).orNull();

                if (null != participant) participants.add(participant);
            }
        }
        conferenceService.videoForwarding(max, participants).then(promise::resolve).error(promise::reject);
    }

    @ReactMethod
    public void leave(Promise promise) {
        conferenceService.leave().then(promise::resolve).error(promise::reject);
    }

    private void sendParticipants(Execute<Conference, List<Participant>> action, ReadableMap conf, Promise promise) {
        try {
            if (null == conf) throw new NullPointerException("conference is invalid");

            Conference conference = Opt.of(conf)
                    .then(map -> RNUtils.getString(map, ConferenceUtil.CONFERENCE_ID))
                    .then(conferenceService::getConference)
                    .orNull();

            if (null == conference) throw new NullPointerException("Participant is not found");

            promise.resolve(ConferenceParticipantUtil.toMap(action.call(conference)));
        } catch (Throwable throwable) {
            promise.reject(throwable);
        }
    }

    @ReactMethod
    private void executeOntoLocalOrRemoteParticipant(ReadableMap optional_participant, Promise promise,
                                                     Execute<Participant, Object> resolve) {
        executePromiseOntoLocalOrRemoteParticipant(optional_participant, promise,
                participant -> new com.voxeet.promise.Promise<>(solver -> {
                    //the executePromiseOntoLocalOrRemoteParticipant will call this new promise
                    solver.resolve(resolve.call(participant));
                }));
    }

    private <TYPE> void executePromiseOntoParticipant(@NonNull ReadableMap participant, Promise promise,
                                                      Execute<Participant, com.voxeet.promise.Promise<TYPE>> resolve) {
        executePromiseOntoLocalOrRemoteParticipant(participant, promise, resolve);
    }

    private <TYPE> void executePromiseOntoLocalOrRemoteParticipant(ReadableMap optional_participant, Promise promise,
                                                                   Execute<Participant, com.voxeet.promise.Promise<TYPE>> resolve) {
        try {
            Participant participant;
            if (null != optional_participant) {
                participant = Opt.of(RNUtils.getString(optional_participant, "participantId"))
                        .then(conferenceService::findParticipantById)
                        .orNull();
            } else {
                participant = Opt.of(sessionService.getParticipantId())
                        .then(conferenceService::findParticipantById).orNull();
            }

            if (null == participant) throw new NullPointerException("Participant is invalid");

            resolve.call(participant).then(promise::resolve).error(promise::reject);
        } catch (Throwable throwable) {
            promise.reject(throwable);
        }
    }
}
