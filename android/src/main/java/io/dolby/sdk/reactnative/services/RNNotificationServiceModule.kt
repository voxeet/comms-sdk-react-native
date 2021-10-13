package io.dolby.sdk.reactnative.services

import com.facebook.react.bridge.*
import com.voxeet.sdk.services.ConferenceService
import com.voxeet.sdk.services.NotificationService
import io.dolby.sdk.reactnative.mapper.ConferenceMapper
import io.dolby.sdk.reactnative.mapper.ParticipantMapper
import io.dolby.sdk.reactnative.utils.Promises
import io.dolby.sdk.reactnative.utils.Promises.forward
import io.dolby.sdk.reactnative.utils.Promises.thenPromise
import io.dolby.sdk.reactnative.utils.Promises.thenValue
import io.dolby.sdk.reactnative.utils.ReactPromise

/**
 *
 */
class RNNotificationServiceModule(
        private val conferenceService: ConferenceService,
        private val notificationService: NotificationService,
        private val conferenceMapper: ConferenceMapper,
        private val participantMapper: ParticipantMapper,
        reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "DolbyIoIAPINotificationService"

    /**
     *
     */
    @ReactMethod
    fun invite(conferenceMap: ReadableMap, participantInfoArray: ReadableArray, promise: ReactPromise) {
        Promises.promise(conferenceMapper.toConferenceId(conferenceMap)) { "Conference should contain conferenceId" }
                .thenValue(conferenceService::getConference)
                .thenValue { conference ->
                    conference to participantMapper.toParticipantInfoList(participantInfoArray)
                }
                .thenPromise { (conference, participants) -> notificationService.invite(conference, participants) }
                .forward(promise, ignoreReturnType = true)
    }

    /**
     *
     */
    @ReactMethod
    fun decline(conferenceMap: ReadableMap, promise: ReactPromise) {
        Promises.promise(conferenceMapper.toConferenceId(conferenceMap)) { "Conference should contain conferenceId" }
                .thenValue(conferenceService::getConference)
                .thenPromise(notificationService::decline)
                .forward(promise)
    }
}
