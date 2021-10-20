package io.dolby.sdk.reactnative.services

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.voxeet.sdk.json.ParticipantInvited
import com.voxeet.sdk.models.Conference
import com.voxeet.sdk.services.ConferenceService
import com.voxeet.sdk.services.NotificationService
import io.dolby.sdk.reactnative.mapper.ConferenceMapper
import io.dolby.sdk.reactnative.mapper.InvitationMapper
import io.dolby.sdk.reactnative.utils.Promises
import io.dolby.sdk.reactnative.utils.Promises.forward
import io.dolby.sdk.reactnative.utils.Promises.thenPromise
import io.dolby.sdk.reactnative.utils.Promises.thenValue
import io.dolby.sdk.reactnative.utils.ReactPromise

/**
 * The [RNNotificationServiceModule] allows inviting participants to a conference.
 *
 * The application calls the [invite] method to invite specific participants to a conference.
 * For each invited user application can specify permissions, which allow conference participants to perform a specific set of actions within a protected conference.
 * If permissions are not specified, the platform assigns the default permissions, which include Join, SendAudio, SendVideo, ShareScreen, ShareVideo, ShareFile, SendMessage, Record, and Stream.
 *
 * Participants who do not wish to participate at a conference can [decline] the conference invitation.
 *
 * @constructor
 * Creates a bridge wrapper for [NotificationService].
 *
 * @param conferenceService   [ConferenceService] from Android SDK
 * @param notificationService [NotificationService] from Android SDK
 * @param conferenceMapper    [ConferenceMapper] mapper for a [Conference] and [Conference]-related models
 * @param invitationMapper    [InvitationMapper] mapper for a [ParticipantInvited] model
 */
class RNNotificationServiceModule(
  private val conferenceService: ConferenceService,
  private val notificationService: NotificationService,
  private val conferenceMapper: ConferenceMapper,
  private val invitationMapper: InvitationMapper,
  reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "DolbyIoIAPINotificationService"

  /**
   * Notifies conference participants about a conference invitation.
   *
   * The ParticipantInfo model included in the invitation has to include externalId.
   *
   * In the case of inviting participants to a conference that is not protected, inviters can invite participants to any conference.
   * In the case of inviting participants to a protected conference, inviters can invite participants only to the current conference.
   *
   * Participants who have permission to invite additional participants to a conference can also send invitations.
   * In the invitation, inviters can only grant permissions that the inviters have.
   *
   * @param conferenceRN          a conference to invite
   * @param invitedParticipantsRN information about the invited users
   * @param promise               returns null
   */
  @ReactMethod
  fun invite(conferenceRN: ReadableMap, invitedParticipantsRN: ReadableArray, promise: ReactPromise) {
    Promises.promise(conferenceMapper.conferenceIdFromRN(conferenceRN)) { "Conference should contain conferenceId" }
      .thenValue(conferenceService::getConference)
      .thenValue { conference -> conference to invitationMapper.fromRN(invitedParticipantsRN) }
      .thenPromise { (conference, participants) -> notificationService.inviteWithPermissions(conference, participants) }
      .forward(promise, ignoreReturnType = true)
  }

  /**
   * Declines the conference invitation.
   *
   * @param conferenceRN a conference to decline
   * @param promise      returns true if decline request succeed, false otherwise
   */
  @ReactMethod
  fun decline(conferenceRN: ReadableMap, promise: ReactPromise) {
    Promises.promise(conferenceMapper.conferenceIdFromRN(conferenceRN)) { "Conference should contain conferenceId" }
      .thenValue(conferenceService::getConference)
      .thenPromise(notificationService::decline)
      .forward(promise)
  }
}
