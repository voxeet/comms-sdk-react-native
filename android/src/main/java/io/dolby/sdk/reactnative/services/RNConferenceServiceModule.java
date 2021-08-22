
package io.dolby.sdk.reactnative.services;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

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