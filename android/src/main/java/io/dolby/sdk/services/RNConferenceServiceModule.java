
package io.dolby.sdk.services;

import android.app.Application;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.voxeet.VoxeetSDK;
import com.voxeet.sdk.authent.token.TokenCallback;

import java.util.List;
import java.util.concurrent.locks.ReentrantLock;

import io.dolby.sdk.utils.Lock;

public class RNConferenceServiceModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public RNConferenceServiceModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return RNConferenceServiceModule.class.getSimpleName();
    }


    @ReactMethod
    public void methodToImplement(String accessToken, Promise promise) {
        promise.resolve(false);
    }

}