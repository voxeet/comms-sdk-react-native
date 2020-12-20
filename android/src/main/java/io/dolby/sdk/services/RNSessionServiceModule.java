
package io.dolby.sdk.services;

import android.support.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.voxeet.VoxeetSDK;
import com.voxeet.promise.solve.ErrorPromise;
import com.voxeet.promise.solve.ThenVoid;
import com.voxeet.sdk.models.v1.ConferenceUser;

import io.dolby.sdk.models.ConferenceUserUtil;

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