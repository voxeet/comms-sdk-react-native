
package io.dolby.sdk.reactnative.services;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.voxeet.VoxeetSDK;
import com.voxeet.sdk.services.SessionService;

import io.dolby.sdk.reactnative.models.ConferenceUserUtil;

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
        sessionService.open(ConferenceUserUtil.toParticipantInfo(participantInfo))
                .then(promise::resolve).error(promise::reject);
    }

    @ReactMethod
    public void close(Promise promise) {
        sessionService.close().then(promise::resolve).error(promise::reject);
    }

}