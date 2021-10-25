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
   * The supported events for JS
   */
  override val eventMap: Map<String, String>
    get() = mapOf(
      /**
       * Invitation event
       */
      "EVENT_NOTIFICATION_INVITATION_RECEIVED" to EVENT_NOTIFICATION_INVITATION_RECEIVED,
      "EVENT_CONFERENCE_ALIAS_KEY" to EVENT_CONFERENCE_ALIAS_KEY,
      "EVENT_CONFERENCE_ID_KEY" to EVENT_CONFERENCE_ID_KEY,
      // JS could get Participant object by this key
      "EVENT_PARTICIPANT_KEY" to EVENT_PARTICIPANT_KEY
    )

  /**
   * Emitted when the application user received an invitation.
   */
  @Subscribe(threadMode = MAIN)
  fun on(event: InvitationReceivedNotificationEvent) {
    val invitation = event.invitation
    val conference = invitation.conferenceId?.let(conferenceService::getConference) ?: return

    Arguments.createMap()
      .apply {
        putString(EVENT_CONFERENCE_ALIAS_KEY, conference.alias)
        putString(EVENT_CONFERENCE_ID_KEY, conference.id)
        putMap(EVENT_PARTICIPANT_KEY, participantMapper.toRN(invitation.inviter))
      }
      .also { send(EVENT_NOTIFICATION_INVITATION_RECEIVED, it) }
  }

  companion object {
    private const val EVENT_NOTIFICATION_INVITATION_RECEIVED = "EVENT_NOTIFICATION_INVITATION_RECEIVED"
    private const val EVENT_CONFERENCE_ALIAS_KEY = "conferenceAlias"
    private const val EVENT_CONFERENCE_ID_KEY = "conferenceId"
    private const val EVENT_PARTICIPANT_KEY = "participant"
  }
}
