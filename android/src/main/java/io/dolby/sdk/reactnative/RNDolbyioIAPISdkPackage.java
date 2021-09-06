
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
import io.dolby.sdk.reactnative.services.RNFilePresentationServiceModule;
import io.dolby.sdk.reactnative.services.RNMediaDeviceServiceModule;
import io.dolby.sdk.reactnative.services.RNNotificationServiceModule;
import io.dolby.sdk.reactnative.services.RNRecordingServiceModule;
import io.dolby.sdk.reactnative.services.RNScreenShareServiceModule;
import io.dolby.sdk.reactnative.services.RNSessionServiceModule;
import io.dolby.sdk.reactnative.services.RNVideoPresentationServiceModule;
import io.dolby.sdk.reactnative.services.RNDolbyioIAPISdkModule;
import io.dolby.sdk.reactnative.video.RNVideoViewManager;

public class RNDolbyioIAPISdkPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        EventBus eventBus = VoxeetSDK.instance().getEventBus();

        return Arrays.asList(new RNDolbyioIAPISdkModule(reactContext),
                new RNConferenceServiceModule(VoxeetSDK.conference(),
                        VoxeetSDK.session(),
                        reactContext),
                new RNSessionServiceModule(VoxeetSDK.session(),
                        reactContext),
                new RNAudioDeviceServiceModule(VoxeetSDK.audio(),
                        eventBus,
                        reactContext),
                new RNCommandServiceModule(VoxeetSDK.command(),
                        reactContext),
                new RNScreenShareServiceModule(VoxeetSDK.screenShare(),
                        reactContext),
                new RNMediaDeviceServiceModule(VoxeetSDK.mediaDevice(),
                        reactContext),
                new RNRecordingServiceModule(VoxeetSDK.recording(),
                        reactContext),
                new RNFilePresentationServiceModule(VoxeetSDK.filePresentation(),
                        reactContext),
                new RNVideoPresentationServiceModule(VoxeetSDK.videoPresentation(),
                        reactContext),
                new RNNotificationServiceModule(VoxeetSDK.conference(),
                        VoxeetSDK.notification(),
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
