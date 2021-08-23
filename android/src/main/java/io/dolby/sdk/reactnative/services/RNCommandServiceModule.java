
package io.dolby.sdk.reactnative.services;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.voxeet.sdk.services.CommandService;

import io.dolby.sdk.reactnative.models.ConferenceUtil;
import io.dolby.sdk.reactnative.utils.RNUtils;

public class RNCommandServiceModule extends ReactContextBaseJavaModule {

    private final CommandService commandService;

    public RNCommandServiceModule(CommandService commandService, ReactApplicationContext reactContext) {
        super(reactContext);

        this.commandService = commandService;
    }

    @Override
    public String getName() {
        return RNCommandServiceModule.class.getSimpleName();
    }


    @ReactMethod
    public void send(ReadableMap map, String message, Promise promise) {
        String conferenceId = RNUtils.getString(map, ConferenceUtil.CONFERENCE_ID);

        if (null == conferenceId) {
            promise.resolve(false);
            return;
        }

        commandService.send(conferenceId, message)
                .then(promise::resolve)
                .error(promise::reject);
    }

}