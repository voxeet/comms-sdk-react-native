package io.dolby.sdk.reactnative

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.voxeet.VoxeetSDK
import io.dolby.sdk.filePresentation
import io.dolby.sdk.reactnative.eventemitters.RNCommandEventEmitter
import io.dolby.sdk.reactnative.eventemitters.RNConferenceEventEmitter
import io.dolby.sdk.reactnative.eventemitters.RNFilePresentationEventEmitter
import io.dolby.sdk.reactnative.eventemitters.RNNotificationEventEmitter
import io.dolby.sdk.reactnative.eventemitters.RNSdkEventEmitter
import io.dolby.sdk.reactnative.eventemitters.RNVideoPresentationEventEmitter
import io.dolby.sdk.reactnative.mapper.ConferenceCreateOptionsMapper
import io.dolby.sdk.reactnative.mapper.ConferenceJoinOptionsMapper
import io.dolby.sdk.reactnative.mapper.ConferenceMapper
import io.dolby.sdk.reactnative.mapper.ConferencePermissionMapper
import io.dolby.sdk.reactnative.mapper.FilePresentationMapper
import io.dolby.sdk.reactnative.mapper.InvitationMapper
import io.dolby.sdk.reactnative.mapper.MediaMapper
import io.dolby.sdk.reactnative.mapper.ParticipantMapper
import io.dolby.sdk.reactnative.mapper.ParticipantPermissionMapper
import io.dolby.sdk.reactnative.mapper.RecordingMapper
import io.dolby.sdk.reactnative.mapper.SystemPermissionsMapper
import io.dolby.sdk.reactnative.mapper.VideoPresentationMapper
import io.dolby.sdk.reactnative.services.RNCommandServiceModule
import io.dolby.sdk.reactnative.services.RNConferenceServiceModule
import io.dolby.sdk.reactnative.services.RNDolbyioIAPISdkModule
import io.dolby.sdk.reactnative.services.RNFilePresentationServiceModule
import io.dolby.sdk.reactnative.services.RNMediaServiceModule
import io.dolby.sdk.reactnative.services.RNNotificationServiceModule
import io.dolby.sdk.reactnative.services.RNRecordingServiceModule
import io.dolby.sdk.reactnative.services.RNSessionServiceModule
import io.dolby.sdk.reactnative.services.RNSystemPermissionsModule
import io.dolby.sdk.reactnative.services.RNVideoPresentationServiceModule
import io.dolby.sdk.reactnative.state.FilePresentationHolder
import io.dolby.sdk.reactnative.state.VideoPresentationHolder

class RNDolbyioIAPISdkPackage : ReactPackage {

  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
    val filePresentationHolder = FilePresentationHolder()
    val videoPresentationHolder = VideoPresentationHolder()

    val participantMapper = ParticipantMapper()
    val conferencePermissionMapper = ConferencePermissionMapper()
    val conferenceMapper = ConferenceMapper(
      participantMapper = participantMapper,
      permissionMapper = conferencePermissionMapper
    )
    val participantPermissionMapper = ParticipantPermissionMapper(
      participantMapper = participantMapper,
      conferencePermissionMapper = conferencePermissionMapper
    )
    val videoParticipantMapper = VideoPresentationMapper(participantMapper = participantMapper)
    val filePresentationMapper = FilePresentationMapper(
      reactContext = reactContext,
      participantMapper = participantMapper
    )

    val sdkEventEmitter = RNSdkEventEmitter(
      reactContext = reactContext
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
    val notificationEventEmitter = RNNotificationEventEmitter(
      reactContext = reactContext,
      conferenceService = VoxeetSDK.conference(),
      participantMapper = participantMapper
    )
    val videoPresentationEventEmitter = RNVideoPresentationEventEmitter(
      reactContext = reactContext,
      conferenceService = VoxeetSDK.conference(),
      videoPresentationService = VoxeetSDK.videoPresentation(),
      participantMapper = participantMapper,
      videoPresentationHolder = videoPresentationHolder
    )
    val filePresentationEventEmitter = RNFilePresentationEventEmitter(
      reactContext = reactContext,
      conferenceService = VoxeetSDK.conference(),
      filePresentationMapper = filePresentationMapper,
      filePresentationHolder = filePresentationHolder
    )
    return listOf(
      RNDolbyioIAPISdkModule(
        reactContext = reactContext,
        eventEmitter = sdkEventEmitter
      ),
      RNSessionServiceModule(
        reactContext = reactContext,
        sessionService = VoxeetSDK.session(),
        participantMapper = participantMapper
      ),
      RNConferenceServiceModule(
        reactContext = reactContext,
        screenShareService = VoxeetSDK.screenShare(),
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
        reactContext = reactContext,
        eventEmitter = notificationEventEmitter,
        conferenceService = VoxeetSDK.conference(),
        notificationService = VoxeetSDK.notification(),
        conferenceMapper = conferenceMapper,
        invitationMapper = InvitationMapper(conferencePermissionMapper, participantMapper)
      ),
      RNVideoPresentationServiceModule(
        reactContext = reactContext,
        eventEmitter = videoPresentationEventEmitter,
        videoPresentationService = VoxeetSDK.videoPresentation(),
        conferenceService = VoxeetSDK.conference(),
        videoPresentationHolder = videoPresentationHolder,
        videoPresentationMapper = videoParticipantMapper
      ),
      RNFilePresentationServiceModule(
        reactContext = reactContext,
        eventEmitter = filePresentationEventEmitter,
        sessionService = VoxeetSDK.session(),
        conferenceService = VoxeetSDK.conference(),
        filePresentationService = VoxeetSDK.instance().filePresentation(),
        filePresentationHolder = filePresentationHolder,
        filePresentationMapper = filePresentationMapper
      ),
      RNSystemPermissionsModule(
        reactContext = reactContext,
        systemPermissionsMapper = SystemPermissionsMapper()
      ),
      RNMediaServiceModule(
        reactContext = reactContext,
        mediaDeviceService = VoxeetSDK.mediaDevice(),
        mediaMapper = MediaMapper()
      )
    )
  }

  override fun createViewManagers(
    reactContext: ReactApplicationContext
  ): List<ViewManager<*, *>> = emptyList()

}
