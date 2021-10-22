package io.dolby.sdk.reactnative

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.voxeet.VoxeetSDK
import io.dolby.sdk.reactnative.eventemitters.RNCommandEventEmitter
import io.dolby.sdk.reactnative.eventemitters.RNConferenceEventEmitter
import io.dolby.sdk.reactnative.mapper.ConferenceCreateOptionsMapper
import io.dolby.sdk.reactnative.mapper.ConferenceJoinOptionsMapper
import io.dolby.sdk.reactnative.mapper.ConferenceMapper
import io.dolby.sdk.reactnative.mapper.ConferencePermissionMapper
import io.dolby.sdk.reactnative.mapper.InvitationMapper
import io.dolby.sdk.reactnative.mapper.ParticipantMapper
import io.dolby.sdk.reactnative.mapper.ParticipantPermissionMapper
import io.dolby.sdk.reactnative.mapper.RecordingMapper
import io.dolby.sdk.reactnative.mapper.SystemPermissionsMapper
import io.dolby.sdk.reactnative.services.RNCommandServiceModule
import io.dolby.sdk.reactnative.services.RNConferenceServiceModule
import io.dolby.sdk.reactnative.services.RNDolbyioIAPISdkModule
import io.dolby.sdk.reactnative.services.RNNotificationServiceModule
import io.dolby.sdk.reactnative.services.RNRecordingServiceModule
import io.dolby.sdk.reactnative.services.RNSessionServiceModule
import io.dolby.sdk.reactnative.services.RNSystemPermissionsModule

class RNDolbyioIAPISdkPackage : ReactPackage {

  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
    val participantMapper = ParticipantMapper()
    val conferencePermissionMapper = ConferencePermissionMapper()
    val conferenceMapper = ConferenceMapper(participantMapper, conferencePermissionMapper)
    val participantPermissionMapper = ParticipantPermissionMapper(
      participantMapper = participantMapper,
      conferencePermissionMapper = conferencePermissionMapper
    )
    val conferenceEventEmitter = RNConferenceEventEmitter(
      reactContext = reactContext,
      participantMapper = participantMapper,
      conferenceMapper = conferenceMapper,
      permissionsMapper = conferencePermissionMapper
    )
    val commandEventEmitter = RNCommandEventEmitter(
      conferenceService = VoxeetSDK.conference(),
      participantMapper = participantMapper,
      reactContext = reactContext
    )

    return listOf(
      RNDolbyioIAPISdkModule(reactContext),
      RNSessionServiceModule(
        reactContext = reactContext,
        sessionService = VoxeetSDK.session(),
        participantMapper = participantMapper
      ),
      RNConferenceServiceModule(
        reactContext = reactContext,
        conferenceService = VoxeetSDK.conference(),
        conferenceMapper = conferenceMapper,
        conferenceCreateOptionsMapper = ConferenceCreateOptionsMapper(),
        conferenceJoinOptionsMapper = ConferenceJoinOptionsMapper(),
        participantMapper = participantMapper,
        eventEmitter = conferenceEventEmitter,
        participantPermissionMapper = participantPermissionMapper
      ),
      RNCommandServiceModule(
        reactContext = reactContext,
        conferenceService = VoxeetSDK.conference(),
        commandService = VoxeetSDK.command(),
        eventEmitter = commandEventEmitter
      ),
      RNRecordingServiceModule(
        conferenceService = VoxeetSDK.conference(),
        recordingService = VoxeetSDK.recording(),
        reactContext = reactContext,
        recordingMapper = RecordingMapper()
      ),
      RNNotificationServiceModule(
        conferenceService = VoxeetSDK.conference(),
        notificationService = VoxeetSDK.notification(),
        conferenceMapper = conferenceMapper,
        invitationMapper = InvitationMapper(conferencePermissionMapper, participantMapper),
        reactContext = reactContext
      ),
      RNSystemPermissionsModule(
        reactContext,
        SystemPermissionsMapper()
      )
    )
  }

  override fun createViewManagers(
    reactContext: ReactApplicationContext
  ): List<ViewManager<*, *>> = emptyList()

}
