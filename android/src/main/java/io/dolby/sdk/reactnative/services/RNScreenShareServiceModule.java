
package io.dolby.sdk.reactnative.services;

import android.graphics.Point;
import android.support.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.voxeet.promise.solve.ErrorPromise;
import com.voxeet.promise.solve.ThenVoid;
import com.voxeet.sdk.services.CommandService;
import com.voxeet.sdk.services.ScreenShareService;

import io.dolby.sdk.reactnative.models.ConferenceUtil;
import io.dolby.sdk.reactnative.utils.RNUtils;

public class RNScreenShareServiceModule extends ReactContextBaseJavaModule {

    private final ScreenShareService screenShareService;

    public RNScreenShareServiceModule(ScreenShareService screenShareService, ReactApplicationContext reactContext) {
        super(reactContext);

        this.screenShareService = screenShareService;
    }

    @Override
    public String getName() {
        return RNScreenShareServiceModule.class.getSimpleName();
    }

    @ReactMethod
    public void sendRequestStartScreenShare(Promise promise) {
        screenShareService.sendRequestStartScreenShare();
        promise.resolve(true);
    }

    @ReactMethod
    public void stopScreenShare(Promise promise) {
        screenShareService.stopScreenShare()
                .then(promise::resolve)
                .error(promise::reject);
    }

    @ReactMethod
    public void setScreenSizeInformation(ReadableMap map, Promise promise) {
        try {
            int x = RNUtils.getInteger(map, "x");
            int y = RNUtils.getInteger(map, "y");
            Point point = new Point(x, y);
            screenShareService.setScreenSizeInformation(point);
            promise.resolve(true);
        } catch (Throwable throwable) {
            promise.reject(throwable);
        }
    }

}