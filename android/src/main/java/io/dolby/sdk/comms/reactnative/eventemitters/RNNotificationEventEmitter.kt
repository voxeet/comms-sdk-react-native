package io.dolby.sdk.comms.reactnative.eventemitters

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.voxeet.sdk.models.Participant
import com.voxeet.sdk.push.center.subscription.event.ConferenceCreatedNotificationEvent
import com.voxeet.sdk.push.center.subscription.event.ConferenceEndedNotificationEvent
import com.voxeet.sdk.push.center.subscription.event.InvitationReceivedNotificationEvent
import com.voxeet.sdk.push.center.subscription.event.ParticipantJoinedNotificationEvent
import com.voxeet.sdk.push.center.subscription.event.ParticipantLeftNotificationEvent
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
    Arguments.createMap()
      .apply {
        putString(KEY_CONFERENCE_ALIAS, event.conferenceAlias)
        putString(KEY_CONFERENCE_ID, event.conferenceId)
      }
      .also { send(NotificationEvent.ConferenceEnded.withData(it)) }
  }

  /**
   * Emitted when conference status change.
   */
  @Subscribe(threadMode = MAIN)
  fun on(event: ConferenceStatusNotificationEvent) {
    Arguments.createMap()
      .apply {
        putString(KEY_CONFERENCE_ALIAS, event.conferenceAlias)
        putString(KEY_CONFERENCE_ID, event.conferenceId)
        putBoolean(KEY_CONFERENCE_LIVE, event.isLive)
        putArray(KEY_PARTICIPANT_LIST, Arguments.createArray().apply {
          event.participants
            .filterNotNull()
            .map(participantMapper::toRN)
            .forEach(::pushMap)
        })
      }
      .also { send(NotificationEvent.ConferenceStatus.withData(it)) }
  }

  /**
   * Emitted when participant joined to conference.
   */
  @Subscribe(threadMode = MAIN)
  fun on(event: ParticipantJoinedNotificationEvent) {
    Arguments.createMap()
      .apply {
        putString(KEY_CONFERENCE_ALIAS, event.conferenceAlias)
        putString(KEY_CONFERENCE_ID, event.conferenceId)
        putMap(KEY_PARTICIPANT, participantMapper.toRN(event.participant))
      }
      .also { send(NotificationEvent.ParticipantJoined.withData(it)) }
  }

  /**
   * Emitted when participant left conference.
   */
  @Subscribe(threadMode = MAIN)
  fun on(event: ParticipantLeftNotificationEvent) {
    Arguments.createMap()
      .apply {
        putString(KEY_CONFERENCE_ALIAS, event.conferenceAlias)
        putString(KEY_CONFERENCE_ID, event.conferenceId)
        putMap(KEY_PARTICIPANT, participantMapper.toRN(event.participant))
      }
      .also { send(NotificationEvent.ParticipantLeft.withData(it)) }
  }

  /**
   * Notification events
   */
  private object NotificationEvent {
    object InvitationReceived : RNEvent("EVENT_NOTIFICATION_INVITATION_RECEIVED")
    object ConferenceCreated : RNEvent("EVENT_NOTIFICATION_CONFERENCE_CREATED")
    object ConferenceEnded : RNEvent("EVENT_NOTIFICATION_CONFERENCE_ENDED")
    object ConferenceStatus : RNEvent("EVENT_NOTIFICATION_CONFERENCE_STATUS")
    object ParticipantJoined : RNEvent("EVENT_NOTIFICATION_PARTICIPANT_JOINED")
    object ParticipantLeft : RNEvent("EVENT_NOTIFICATION_PARTICIPANT_LEFT")
  }

  /**
   * The event payload keys
   */
  companion object {
    private const val KEY_CONFERENCE_ALIAS = "conferenceAlias"
    private const val KEY_CONFERENCE_ID = "conferenceId"
    private const val KEY_PARTICIPANT = "participant"
    private const val KEY_PARTICIPANT_LIST = "participants"
    private const val KEY_CONFERENCE_LIVE = "live"
  }
}
