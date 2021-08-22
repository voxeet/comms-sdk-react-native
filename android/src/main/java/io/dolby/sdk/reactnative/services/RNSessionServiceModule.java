
package io.dolby.sdk.reactnative.services;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.voxeet.VoxeetSDK;

import io.dolby.sdk.reactnative.models.ConferenceUserUtil;

public class RNSessionServiceModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public RNSessionServiceModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return RNSessionServiceModule.class.getSimpleName();
    }


    @ReactMethod
    public void open(ReadableMap participantInfo, Promise promise) {
        VoxeetSDK.session().open(ConferenceUserUtil.toParticipantInfo(participantInfo))
                .then(promise::resolve).error(promise::reject);
    }

    @ReactMethod
    public void close(Promise promise) {
        VoxeetSDK.session().close().then(promise::resolve).error(promise::reject);
    }

}