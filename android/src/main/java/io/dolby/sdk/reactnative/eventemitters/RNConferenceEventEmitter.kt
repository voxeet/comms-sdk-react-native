package io.dolby.sdk.reactnative.eventemitters

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.voxeet.sdk.events.v2.ParticipantAddedEvent
import com.voxeet.sdk.events.v2.ParticipantUpdatedEvent
import io.dolby.sdk.reactnative.mapper.ParticipantMapper
import org.greenrobot.eventbus.Subscribe

/**
 * The conference event emitter
 * @param participantMapper map participant to react JS data
 */
class RNConferenceEventEmitter(private val participantMapper: ParticipantMapper) : RNEventEmitter {

  override var context: ReactApplicationContext? = null

  /**
   * The supported events for JS
   */
  override val eventMap: Map<String, String>
    get() = mapOf(
      "EVENT_CONFERENCE_PARTICIPANT_ADDED" to EVENT_PARTICIPANT_ADDED,
      "EVENT_CONFERENCE_PARTICIPANT_UPDATED" to EVENT_PARTICIPANT_UPDATED,
      "EVENT_CONFERENCE_PARTICIPANT_KEY" to EVENT_PARTICIPANT_KEY
    )

  /**
   * New participant add event
   */
  @Subscribe
  fun on(event: ParticipantAddedEvent) {
    val data = Arguments.createMap()
    data.putMap(EVENT_PARTICIPANT_KEY, participantMapper.toMap(event.participant))
    send(EVENT_PARTICIPANT_ADDED, data)
  }

  /**
   * Existing participant update event
   */
  @Subscribe
  fun on(event: ParticipantUpdatedEvent) {
    val data = Arguments.createMap()
    data.putMap(EVENT_PARTICIPANT_KEY, participantMapper.toMap(event.participant))
    send(EVENT_PARTICIPANT_UPDATED, data)
  }

  /**
   * The event names and payload keys, make sure they are unique in the application scope
   */
  companion object {
    const val EVENT_PARTICIPANT_ADDED = "ParticipantAdded"
    const val EVENT_PARTICIPANT_UPDATED = "ParticipantUpdated"
    const val EVENT_PARTICIPANT_KEY = "participant"
  }
}
