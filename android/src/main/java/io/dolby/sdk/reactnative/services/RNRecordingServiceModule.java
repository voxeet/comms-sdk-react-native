
package io.dolby.sdk.reactnative.services;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.voxeet.sdk.services.RecordingService;

public class RNRecordingServiceModule extends ReactContextBaseJavaModule {

    private final RecordingService recordingService;

    public RNRecordingServiceModule(RecordingService recordingService, ReactApplicationContext reactContext) {
        super(reactContext);

        this.recordingService = recordingService;
    }

    @Override
    public String getName() {
        return RNRecordingServiceModule.class.getSimpleName();
    }

    @ReactMethod
    public void start(Promise promise) {
        recordingService.start()
                .then(promise::resolve)
                .error(promise::reject);
    }

    @ReactMethod
    public void stop(Promise promise) {
        recordingService.stop()
                .then(promise::resolve)
                .error(promise::reject);
    }
}