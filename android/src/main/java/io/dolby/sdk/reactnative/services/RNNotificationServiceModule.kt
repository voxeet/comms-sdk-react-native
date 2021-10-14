package io.dolby.sdk.reactnative.services

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.voxeet.sdk.models.Conference
import com.voxeet.sdk.models.Participant
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
 * The [RNNotificationServiceModule] allows inviting participants to a conference.
 *
 * The application calls the [invite] method to invite specific participants to a conference.
 * Participants who do not wish to participate at a conference can [decline] the conference invitation.
 *
 * @constructor
 * Creates a bridge wrapper for [NotificationService].
 *
 * @param conferenceService   [ConferenceService] from Android SDK
 * @param notificationService [NotificationService] from Android SDK
 * @param conferenceMapper    [ConferenceMapper] mapper for a [Conference] and [Conference]-related models
 * @param participantMapper   [ParticipantMapper] mapper for a [Participant] and [Participant]-related models
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
     * Notifies conference participants about a conference invitation.
     *
     * The ParticipantInfo model included in the invitation has to include externalId.
     *
     * @param conferenceMap        a conference to invite
     * @param participantInfoArray information about the invited users
     * @param promise              returns null
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
     * Declines the conference invitation.
     *
     * @param conferenceMap a conference to decline
     * @param promise       returns true if decline request succeed, false otherwise
     */
    @ReactMethod
    fun decline(conferenceMap: ReadableMap, promise: ReactPromise) {
        Promises.promise(conferenceMapper.toConferenceId(conferenceMap)) { "Conference should contain conferenceId" }
                .thenValue(conferenceService::getConference)
                .thenPromise(notificationService::decline)
                .forward(promise)
    }
}
