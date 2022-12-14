package io.dolby.sdk.comms.reactnative

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.voxeet.VoxeetSDK
import io.dolby.sdk.comms.reactnative.eventemitters.RNCommandEventEmitter
import io.dolby.sdk.comms.reactnative.eventemitters.RNConferenceEventEmitter
import io.dolby.sdk.comms.reactnative.eventemitters.RNFilePresentationEventEmitter
import io.dolby.sdk.comms.reactnative.eventemitters.RNNotificationEventEmitter
import io.dolby.sdk.comms.reactnative.eventemitters.RNRecordingEventEmitter
import io.dolby.sdk.comms.reactnative.eventemitters.RNSdkEventEmitter
import io.dolby.sdk.comms.reactnative.eventemitters.RNVideoPresentationEventEmitter
import io.dolby.sdk.comms.reactnative.eventemitters.RNVideoViewEventEmitter
import io.dolby.sdk.comms.reactnative.mapper.AudioMapper
import io.dolby.sdk.comms.reactnative.mapper.ConferenceCreateOptionsMapper
import io.dolby.sdk.comms.reactnative.mapper.ConferenceJoinOptionsMapper
import io.dolby.sdk.comms.reactnative.mapper.ConferenceListenOptionsMapper
import io.dolby.sdk.comms.reactnative.mapper.ConferenceMapper
import io.dolby.sdk.comms.reactnative.mapper.ConferencePermissionMapper
import io.dolby.sdk.comms.reactnative.mapper.FilePresentationMapper
import io.dolby.sdk.comms.reactnative.mapper.InvitationMapper
import io.dolby.sdk.comms.reactnative.mapper.ParticipantMapper
import io.dolby.sdk.comms.reactnative.mapper.ParticipantPermissionMapper
import io.dolby.sdk.comms.reactnative.mapper.RecordingMapper
import io.dolby.sdk.comms.reactnative.mapper.SpatialAudioMapper
import io.dolby.sdk.comms.reactnative.mapper.SystemPermissionsMapper
import io.dolby.sdk.comms.reactnative.mapper.VideoPresentationMapper
import io.dolby.sdk.comms.reactnative.services.RNCommandServiceModule
import io.dolby.sdk.comms.reactnative.services.RNCommsAPISdkModule
import io.dolby.sdk.comms.reactnative.services.RNConferenceServiceModule
import io.dolby.sdk.comms.reactnative.services.RNFilePresentationServiceModule
import io.dolby.sdk.comms.reactnative.services.RNMediaDeviceServiceModule
import io.dolby.sdk.comms.reactnative.services.RNNotificationServiceModule
import io.dolby.sdk.comms.reactnative.services.RNRecordingServiceModule
import io.dolby.sdk.comms.reactnative.services.RNSessionServiceModule
import io.dolby.sdk.comms.reactnative.services.RNSystemPermissionsModule
import io.dolby.sdk.comms.reactnative.services.RNVideoPresentationServiceModule
import io.dolby.sdk.comms.reactnative.services.audio.RNLocalAudioModule
import io.dolby.sdk.comms.reactnative.services.audio.RNRemoteAudioModule
import io.dolby.sdk.comms.reactnative.services.video.RNLocalVideoModule
import io.dolby.sdk.comms.reactnative.services.video.RNRemoteVideoModule
import io.dolby.sdk.comms.reactnative.state.FilePresentationHolder
import io.dolby.sdk.comms.reactnative.state.VideoPresentationHolder
import io.dolby.sdk.comms.reactnative.view.VideoViewManager

class RNCommsAPISdkPackage : ReactPackage {

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
    val audioMapper = AudioMapper()

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
    val recordingEventEmitter = RNRecordingEventEmitter(
      reactContext = reactContext,
    )
    return listOf(
      RNCommsAPISdkModule(
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
        conferenceListenOptionsMapper = ConferenceListenOptionsMapper(),
        spatialAudioMapper = SpatialAudioMapper(),
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
        eventEmitter = recordingEventEmitter,
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
        filePresentationService = VoxeetSDK.filePresentation(),
        filePresentationHolder = filePresentationHolder,
        filePresentationMapper = filePresentationMapper
      ),
      RNSystemPermissionsModule(
        reactContext = reactContext,
        systemPermissionsMapper = SystemPermissionsMapper()
      ),
      RNMediaDeviceServiceModule(
        reactContext = reactContext,
        mediaDeviceService = VoxeetSDK.mediaDevice(),
        audioMapper = AudioMapper()
      ),
      RNLocalAudioModule(
        reactContext = reactContext,
        audioService = VoxeetSDK.audio(),
        mediaDeviceService = VoxeetSDK.mediaDevice(),
        audioMapper = audioMapper
      ),
      RNRemoteAudioModule(
        reactContext = reactContext,
        audioService = VoxeetSDK.audio(),
        conferenceService = VoxeetSDK.conference(),
        participantMapper = participantMapper
      ),
      RNLocalVideoModule(
        reactContext = reactContext,
        videoService = VoxeetSDK.video()
      ),
      RNRemoteVideoModule(
        reactContext = reactContext,
        videoService = VoxeetSDK.video(),
        conferenceService = VoxeetSDK.conference(),
        participantMapper = participantMapper
      )
    )
  }

  override fun createViewManagers(
    reactContext: ReactApplicationContext
  ): List<ViewManager<*, *>> = listOf(
    VideoViewManager(
      eventEmitter = RNVideoViewEventEmitter(reactContext),
      conferenceService = VoxeetSDK.conference()
    )
  )

}
