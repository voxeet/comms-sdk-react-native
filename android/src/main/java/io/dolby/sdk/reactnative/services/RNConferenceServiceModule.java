
package io.dolby.sdk.reactnative.services;

import android.support.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.voxeet.promise.solve.ErrorPromise;
import com.voxeet.promise.solve.PromiseSolver;
import com.voxeet.promise.solve.Solver;
import com.voxeet.promise.solve.ThenVoid;
import com.voxeet.sdk.json.ParticipantInvited;
import com.voxeet.sdk.models.Conference;
import com.voxeet.sdk.models.Participant;
import com.voxeet.sdk.services.ConferenceService;
import com.voxeet.sdk.services.SessionService;
import com.voxeet.sdk.services.conference.AudioProcessing;
import com.voxeet.sdk.utils.Opt;

import java.util.ArrayList;
import java.util.List;

import io.dolby.sdk.reactnative.models.ConferenceParticipantUtil;
import io.dolby.sdk.reactnative.models.ConferenceUtil;
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

    @ReactMethod
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