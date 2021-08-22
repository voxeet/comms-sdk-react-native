
package io.dolby.sdk.reactnative.services;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.voxeet.sdk.models.v1.FilePresentationConverted;
import com.voxeet.sdk.services.FilePresentationService;
import com.voxeet.sdk.services.VideoPresentationService;
import com.voxeet.sdk.services.presentation.file.FilePresentation;
import com.voxeet.sdk.services.presentation.video.VideoPresentation;

import java.io.File;

import io.dolby.sdk.reactnative.models.PresentationUtil;

public class RNVideoPresentationServiceModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private final VideoPresentationService videoPresentationService;

    public RNVideoPresentationServiceModule(
            VideoPresentationService videoPresentationService,
            ReactApplicationContext reactContext) {
        super(reactContext);

        this.videoPresentationService = videoPresentationService;
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return RNVideoPresentationServiceModule.class.getSimpleName();
    }

    @ReactMethod
    public void start(String url, Promise promise) {
        videoPresentationService.start(url)
                .then(videoPresentation -> {
                    promise.resolve(PresentationUtil.toMap(videoPresentation));
                })
                .error(promise::reject);
    }

    @ReactMethod
    public void stop(Promise promise) {
        videoPresentationService.stop()
                .then(videoPresentation -> {
                    promise.resolve(PresentationUtil.toMap(videoPresentation));
                })
                .error(promise::reject);
    }

    @ReactMethod
    public void play(Promise promise) {
        videoPresentationService.play()
                .then(videoPresentation -> {
                    promise.resolve(PresentationUtil.toMap(videoPresentation));
                })
                .error(promise::reject);
    }

    @ReactMethod
    public void pause(int timestamp, Promise promise) {
        videoPresentationService.pause(timestamp)
                .then(videoPresentation -> {
                    promise.resolve(PresentationUtil.toMap(videoPresentation));
                })
                .error(promise::reject);
    }

    @ReactMethod
    public void seek(int timestamp, Promise promise) {
        videoPresentationService.seek(timestamp)
                .then(videoPresentation -> {
                    promise.resolve(PresentationUtil.toMap(videoPresentation));
                })
                .error(promise::reject);
    }

    @ReactMethod
    public void getCurrentPresentation(Promise promise) {
        try {
            VideoPresentation videoPresentation = videoPresentationService.getCurrentPresentation();
            promise.resolve(PresentationUtil.toMap(videoPresentation));
        } catch (Throwable throwable) {
            promise.reject(throwable);
        }
    }

}