package io.dolby.sdk.reactnative.eventemitters

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.voxeet.sdk.models.Participant
import com.voxeet.sdk.push.center.subscription.event.InvitationReceivedNotificationEvent
import com.voxeet.sdk.services.ConferenceService
import io.dolby.sdk.reactnative.mapper.ParticipantMapper
import org.greenrobot.eventbus.Subscribe
import org.greenrobot.eventbus.ThreadMode.MAIN

/**
 * The conference event emitter
 * @param reactContext      react application context for sending event
 * @param conferenceService [ConferenceService] from Android SDK
 * @param participantMapper mapper for a [Participant] and [Participant]-related model
 */
class RNNotificationEventEmitter(
  reactContext: ReactApplicationContext,
  private val conferenceService: ConferenceService,
  private val participantMapper: ParticipantMapper
) : RNEventEmitter(reactContext) {

  /**
   * Emitted when the application user received an invitation.
   */
  @Subscribe(threadMode = MAIN)
  fun on(event: InvitationReceivedNotificationEvent) {
    val invitation = event.invitation
    val conference = invitation.conferenceId?.let(conferenceService::getConference) ?: return

    Arguments.createMap()
      .apply {
        putString(KEY_CONFERENCE_ALIAS, conference.alias)
        putString(KEY_CONFERENCE_ID, conference.id)
        putMap(KEY_PARTICIPANT, participantMapper.toRN(invitation.inviter))
      }
      .also { send(NotificationEvent.InvitationReceived.withData(it)) }
  }

  /**
   * Notification events
   */
  private object NotificationEvent {
    object InvitationReceived : RNEvent("EVENT_NOTIFICATION_INVITATION_RECEIVED")
  }

  /**
   * The event payload keys
   */
  companion object {
    private const val KEY_CONFERENCE_ALIAS = "conferenceAlias"
    private const val KEY_CONFERENCE_ID = "conferenceId"
    private const val KEY_PARTICIPANT = "participant"
  }
}
