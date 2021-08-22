
package io.dolby.sdk.reactnative.services;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.voxeet.sdk.services.SessionService;

import io.dolby.sdk.reactnative.models.ConferenceParticipantUtil;
import io.dolby.sdk.reactnative.utils.RNUtils;

public class RNSessionServiceModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private final SessionService sessionService;

    public RNSessionServiceModule(
            SessionService sessionService,
            ReactApplicationContext reactContext) {
        super(reactContext);

        this.sessionService = sessionService;
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return RNSessionServiceModule.class.getSimpleName();
    }


    @ReactMethod
    public void open(ReadableMap participantInfo, Promise promise) {
        sessionService.open(ConferenceParticipantUtil.toParticipantInfo(participantInfo))
                .then(promise::resolve).error(promise::reject);
    }

    @ReactMethod
    public void close(Promise promise) {
        sessionService.close().then(promise::resolve).error(promise::reject);
    }

    @ReactMethod
    public void isLocalParticipant(ReadableMap map, Promise promise) {
        String participantId = RNUtils.getString(map, ConferenceParticipantUtil.PARTICIPANT_ID);

        String local = sessionService.getParticipantId();
        if (null == local) {
            promise.resolve(false);
            return;
        }

        promise.resolve(local.equals(participantId));
    }

    @ReactMethod
    public void isSocketOpen(Promise promise) {
        promise.resolve(sessionService.isSocketOpen());
    }
}