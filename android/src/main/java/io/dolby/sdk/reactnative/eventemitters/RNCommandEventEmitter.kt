package io.dolby.sdk.reactnative.eventemitters

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.voxeet.sdk.events.sdk.MessageReceived
import com.voxeet.sdk.services.ConferenceService
import io.dolby.sdk.reactnative.mapper.ParticipantMapper
import org.greenrobot.eventbus.Subscribe

/**
 * The command event emitter
 * @param conferenceService manage the conference life cycle and interact with the conference
 * @param participantMapper map participant to react JS data
 * @param reactContext react application context for sending event
 */
class RNCommandEventEmitter(
  reactContext: ReactApplicationContext,
  private val conferenceService: ConferenceService,
  private val participantMapper: ParticipantMapper
) : RNEventEmitter(reactContext) {

  @Subscribe
  fun on(event: MessageReceived) {
    val participant = conferenceService.findParticipantById(event.participantId)
    Arguments.createMap()
      .apply {
        participant?.let { putMap(KEY_PARTICIPANT, participantMapper.toRN(participant)) }
        putString(KEY_MESSAGE, event.message)
      }
      .also { send(CommandEvent.MessageReceived.withData(it)) }
  }

  /**
   * Command events
   */
  private object CommandEvent {
    object MessageReceived : RNEvent("EVENT_COMMAND_MESSAGE_RECEIVED")
  }

  /**
   * The event payload keys
   */
  companion object {
    private const val KEY_PARTICIPANT = "participant"
    private const val KEY_MESSAGE = "message"
  }
}
