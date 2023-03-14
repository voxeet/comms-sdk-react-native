package io.dolby.sdk.comms.reactnative.eventemitters

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.voxeet.sdk.models.Participant
import com.voxeet.sdk.push.center.subscription.event.ConferenceCreatedNotificationEvent
import com.voxeet.sdk.push.center.subscription.event.ConferenceEndedNotificationEvent
import com.voxeet.sdk.push.center.subscription.event.InvitationReceivedNotificationEvent
import com.voxeet.sdk.services.ConferenceService
import com.voxeet.sdk.services.notification.events.ConferenceStatusNotificationEvent
import io.dolby.sdk.comms.reactnative.mapper.ParticipantMapper
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
   * Emitted when conference was created.
   */
  @Subscribe(threadMode = MAIN)
  fun on(event: ConferenceCreatedNotificationEvent) {
    android.util.Log.d("[KB]", "on conference created")
    Arguments.createMap()
      .apply {
        putString(KEY_CONFERENCE_ALIAS, event.conferenceAlias)
        putString(KEY_CONFERENCE_ID, event.conferenceId)
      }
      .also { send(NotificationEvent.ConferenceCreated.withData(it)) }
  }

  /**
   * Emitted when conference was ended.
   */
  @Subscribe(threadMode = MAIN)
  fun on(event: ConferenceEndedNotificationEvent) {
    android.util.Log.d("[KB]", "on conference ended: ${event.conferenceAlias}")
    Arguments.createMap()
      .apply {
        putString(KEY_CONFERENCE_ALIAS, event.conferenceAlias)
        putString(KEY_CONFERENCE_ID, event.conferenceId)
      }
      .also { send(NotificationEvent.ConferenceEnded.withData(it)) }
  }

  /**
   * Notification events
   */
  private object NotificationEvent {
    object InvitationReceived : RNEvent("EVENT_NOTIFICATION_INVITATION_RECEIVED")
    object ConferenceCreated : RNEvent("EVENT_NOTIFICATION_CONFERENCE_CREATED")
    object ConferenceEnded : RNEvent("EVENT_NOTIFICATION_CONFERENCE_ENDED")
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
