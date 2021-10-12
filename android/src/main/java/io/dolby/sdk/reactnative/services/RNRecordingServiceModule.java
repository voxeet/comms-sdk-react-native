package io.dolby.sdk.reactnative.services;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.voxeet.sdk.services.RecordingService;

import org.jetbrains.annotations.NotNull;

/**
 * The RNRecordingServiceModule allows an application to record conferences by using the start {@link #start(Promise)} and stop {@link #stop(Promise)} methods that turn the recording on and off.
 */
public class RNRecordingServiceModule extends ReactContextBaseJavaModule {

    @NotNull
    private RecordingService recordingService;

    /**
     * Creates a bridge wrapper for {@link RecordingService}.
     *
     * @param recordingService {@link RecordingService} from Android SDK
     * @param reactContext     react context
     */
    public RNRecordingServiceModule(
            @NotNull RecordingService recordingService,
            @NotNull ReactApplicationContext reactContext) {
        super(reactContext);
        this.recordingService = recordingService;
    }

    @NotNull
    @Override
    public String getName() {
        return "DolbyIoIAPIRecordingServiceModule";
    }

    /**
     * Starts recording a conference.
     *
     * @param promise returns true if start recording request succeed, false otherwise
     */
    @ReactMethod
    public void start(@NotNull Promise promise) {
        recordingService.start()
                .then(promise::resolve)
                .error(promise::reject);
    }

    /**
     * Stops recording a conference.
     *
     * @param promise returns true if stop recording request succeed, false otherwise
     */
    @ReactMethod
    public void stop(@NotNull Promise promise) {
        recordingService.stop()
                .then(promise::resolve)
                .error(promise::reject);
    }
}
