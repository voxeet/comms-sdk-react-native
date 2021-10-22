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

  /**
   * The supported events for JS
   */
  override val eventMap: Map<String, String>
    get() = mapOf(
      "EVENT_COMMAND_MESSAGE_RECEIVED" to EVENT_MESSAGE_RECEIVED
    )

  @Subscribe
  fun on(event: MessageReceived) {
    val participant = conferenceService.findParticipantById(event.participantId)
    Arguments.createMap()
      .apply {
        participant?.let { putMap(KEY_PARTICIPANT, participantMapper.toRN(participant)) }
        putString(KEY_MESSAGE, event.message)
      }
      .also { send(EVENT_MESSAGE_RECEIVED, it) }
  }

  /**
   * The event names and payload keys, make sure they are unique in the application scope
   */
  companion object {
    private const val EVENT_MESSAGE_RECEIVED = "MessageReceived"
    private const val KEY_PARTICIPANT = "participant"
    private const val KEY_MESSAGE = "message"
  }
}
