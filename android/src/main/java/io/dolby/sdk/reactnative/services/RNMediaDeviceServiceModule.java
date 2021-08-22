
package io.dolby.sdk.reactnative.services;

import android.graphics.Point;
import android.support.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.voxeet.android.media.MediaEngine;
import com.voxeet.android.media.errors.MediaEngineException;
import com.voxeet.promise.solve.ErrorPromise;
import com.voxeet.promise.solve.ThenVoid;
import com.voxeet.sdk.services.MediaDeviceService;
import com.voxeet.sdk.services.ScreenShareService;

import io.dolby.sdk.reactnative.utils.RNUtils;

public class RNMediaDeviceServiceModule extends ReactContextBaseJavaModule {

    private final MediaDeviceService mediaDeviceService;

    public RNMediaDeviceServiceModule(MediaDeviceService mediaDeviceService, ReactApplicationContext reactContext) {
        super(reactContext);

        this.mediaDeviceService = mediaDeviceService;
    }

    @Override
    public String getName() {
        return RNMediaDeviceServiceModule.class.getSimpleName();
    }

    @ReactMethod
    public void switchCamera(Promise promise) {
        mediaDeviceService.switchCamera()
                .then(promise::resolve)
                .error(promise::reject);
    }

    @ReactMethod
    public void setComfortNoiseLevel(String comfortNoiseLevel, Promise promise) {
        try {
            MediaEngine.ComfortNoiseLevel level = getComfortNoiseLevel(comfortNoiseLevel);
            mediaDeviceService.setComfortNoiseLevel(level);
            promise.resolve(true);
        } catch (Throwable throwable) {
            promise.reject(throwable);
        }
    }

    @ReactMethod
    public void getComfortNoiseLevel(Promise promise) {
        try {
            promise.resolve(mediaDeviceService.getComfortNoiseLevel().name());
        } catch (Throwable throwable) {
            promise.reject(throwable);
        }
    }

    private MediaEngine.ComfortNoiseLevel getComfortNoiseLevel(String comfortNoiseLevel) {
        if (null == comfortNoiseLevel) return MediaEngine.ComfortNoiseLevel.DEFAULT;

        switch (comfortNoiseLevel) {
            case "MEDIUM":
                return MediaEngine.ComfortNoiseLevel.MEDIUM;
            case "LOW":
                return MediaEngine.ComfortNoiseLevel.LOW;
            case "OFF":
                return MediaEngine.ComfortNoiseLevel.OFF;
            case "DEFAULT":
            default:
                return MediaEngine.ComfortNoiseLevel.DEFAULT;
        }
    }

}