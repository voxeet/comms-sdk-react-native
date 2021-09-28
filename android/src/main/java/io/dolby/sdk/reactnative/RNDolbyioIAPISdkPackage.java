
package io.dolby.sdk.reactnative;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.voxeet.VoxeetSDK;

import org.jetbrains.annotations.NotNull;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import io.dolby.sdk.reactnative.mapper.ParticipantMapper;
import io.dolby.sdk.reactnative.services.RNDolbyioIAPISdkModule;
import io.dolby.sdk.reactnative.services.RNSessionServiceModule;

public class RNDolbyioIAPISdkPackage implements ReactPackage {

    @NotNull
    @Override
    public List<NativeModule> createNativeModules(@NotNull ReactApplicationContext reactContext) {
        ParticipantMapper participantMapper = new ParticipantMapper();

        return Arrays.asList(
                new RNDolbyioIAPISdkModule(reactContext),
                new RNSessionServiceModule(
                        VoxeetSDK.session(),
                        reactContext,
                        participantMapper
                )
        );
    }

    @NotNull
    @Override
    public List<ViewManager> createViewManagers(@NotNull ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
