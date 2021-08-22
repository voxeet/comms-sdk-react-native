
package io.dolby.sdk.reactnative;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.voxeet.VoxeetSDK;

import org.greenrobot.eventbus.EventBus;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import io.dolby.sdk.reactnative.services.RNAudioDeviceServiceModule;
import io.dolby.sdk.reactnative.services.RNCommandServiceModule;
import io.dolby.sdk.reactnative.services.RNConferenceServiceModule;
import io.dolby.sdk.reactnative.services.RNSessionServiceModule;
import io.dolby.sdk.reactnative.services.RNVoxeetSdkModule;
import io.dolby.sdk.reactnative.video.RNVideoViewManager;

public class RNVoxeetSdkPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        EventBus eventBus = VoxeetSDK.instance().getEventBus();

        return Arrays.asList(new RNVoxeetSdkModule(reactContext),
                new RNConferenceServiceModule(reactContext),
                new RNSessionServiceModule(VoxeetSDK.session(),
                        reactContext),
                new RNAudioDeviceServiceModule(VoxeetSDK.audio(),
                        eventBus,
                        reactContext),
                new RNCommandServiceModule(VoxeetSDK.command(),
                        reactContext));
    }

    // Deprecated from RN 0.47
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.singletonList(new RNVideoViewManager());
    }
}