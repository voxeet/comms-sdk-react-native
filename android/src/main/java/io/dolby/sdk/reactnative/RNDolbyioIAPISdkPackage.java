
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

import io.dolby.sdk.reactnative.mapper.ConferenceCreateOptionsMapper;
import io.dolby.sdk.reactnative.mapper.ConferenceJoinOptionsMapper;
import io.dolby.sdk.reactnative.mapper.ConferenceMapper;
import io.dolby.sdk.reactnative.mapper.ConferencePermissionMapper;
import io.dolby.sdk.reactnative.mapper.InvitationMapper;
import io.dolby.sdk.reactnative.mapper.ParticipantMapper;
import io.dolby.sdk.reactnative.mapper.ParticipantPermissionMapper;
import io.dolby.sdk.reactnative.mapper.RecordingMapper;
import io.dolby.sdk.reactnative.services.RNCommandServiceModule;
import io.dolby.sdk.reactnative.eventemitters.RNConferenceEventEmitter;
import io.dolby.sdk.reactnative.services.RNConferenceServiceModule;
import io.dolby.sdk.reactnative.services.RNDolbyioIAPISdkModule;
import io.dolby.sdk.reactnative.services.RNNotificationServiceModule;
import io.dolby.sdk.reactnative.services.RNRecordingServiceModule;
import io.dolby.sdk.reactnative.services.RNSessionServiceModule;

public class RNDolbyioIAPISdkPackage implements ReactPackage {

    @NotNull
    @Override
    public List<NativeModule> createNativeModules(@NotNull ReactApplicationContext reactContext) {
        ParticipantMapper participantMapper = new ParticipantMapper();
        ConferencePermissionMapper conferencePermissionMapper = new ConferencePermissionMapper();
        ConferenceMapper conferenceMapper = new ConferenceMapper(participantMapper, conferencePermissionMapper);
        ParticipantPermissionMapper participantPermissionMapper = new ParticipantPermissionMapper(
                participantMapper,
                conferencePermissionMapper
        );

        return Arrays.asList(
                new RNDolbyioIAPISdkModule(reactContext),
                new RNSessionServiceModule(
                        VoxeetSDK.session(),
                        reactContext,
                        participantMapper
                ),
                new RNConferenceServiceModule(
                        reactContext,
                        VoxeetSDK.conference(),
                        conferenceMapper,
                        new ConferenceCreateOptionsMapper(),
                        new ConferenceJoinOptionsMapper(),
                        participantMapper,
                        participantPermissionMapper,
                        new RNConferenceEventEmitter(participantMapper)
                ),
                new RNCommandServiceModule(
                        VoxeetSDK.conference(),
                        VoxeetSDK.command(),
                        reactContext
                ),
                new RNRecordingServiceModule(
                        VoxeetSDK.conference(),
                        VoxeetSDK.recording(),
                        reactContext,
                        new RecordingMapper()
                ),
                new RNNotificationServiceModule(
                        VoxeetSDK.conference(),
                        VoxeetSDK.notification(),
                        conferenceMapper,
                        new InvitationMapper(conferencePermissionMapper, participantMapper),
                        reactContext
                )
        );
    }

    @NotNull
    @Override
    public List<ViewManager> createViewManagers(@NotNull ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
