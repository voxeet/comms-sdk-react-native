package io.dolby.sdk.reactnative.eventemitters

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.voxeet.sdk.events.sdk.ConferenceStatusUpdatedEvent
import com.voxeet.sdk.events.sdk.PermissionsUpdatedEvent
import com.voxeet.sdk.events.v2.ParticipantAddedEvent
import com.voxeet.sdk.events.v2.ParticipantUpdatedEvent
import com.voxeet.sdk.events.v2.StreamAddedEvent
import com.voxeet.sdk.events.v2.StreamRemovedEvent
import com.voxeet.sdk.events.v2.StreamUpdatedEvent
import io.dolby.sdk.reactnative.mapper.ConferenceMapper
import io.dolby.sdk.reactnative.mapper.ConferencePermissionMapper
import io.dolby.sdk.reactnative.mapper.ParticipantMapper
import io.dolby.sdk.reactnative.services.RNConferenceServiceModule
import org.greenrobot.eventbus.Subscribe

/**
 * The conference event emitter
 * @param participantMapper map participant to react JS data
 * @param conferenceMapper map conference to react JS data
 * @param reactContext          react application context for sending event
 */
class RNConferenceEventEmitter(
  reactContext: ReactApplicationContext,
  private val participantMapper: ParticipantMapper,
  private val conferenceMapper: ConferenceMapper,
  private val permissionsMapper: ConferencePermissionMapper
) : RNEventEmitter(reactContext) {

  /**
   * The supported events for JS
   */
  override val eventMap: Map<String, String>
    get() = mapOf(
      "EVENT_CONFERENCE_PERMISSIONS_UPDATED" to EVENT_PERMISSIONS_UPDATED,
      /**
       * Participant events
       */
      "EVENT_CONFERENCE_PARTICIPANT_ADDED" to EVENT_PARTICIPANT_ADDED,
      "EVENT_CONFERENCE_PARTICIPANT_UPDATED" to EVENT_PARTICIPANT_UPDATED,

      /**
       * Conference status event
       */
      "EVENT_CONFERENCE_STATUS_UPDATE" to EVENT_STATUS_UPDATE,

      /**
       * Steam events
       */
      "EVENT_CONFERENCE_STREAM_ADDED" to EVENT_STREAM_ADDED,
      "EVENT_CONFERENCE_STREAM_REMOVED" to EVENT_STREAM_REMOVED,
      "EVENT_CONFERENCE_STREAM_UPDATED" to EVENT_STREAM_UPDATED,

      // JS could get Participant object by this key
      "EVENT_CONFERENCE_PARTICIPANT_KEY" to EVENT_PARTICIPANT_KEY,
      // JS could get ConferenceStatus object by this key
      "EVENT_CONFERENCE_STATUS_KEY" to EVENT_STATUS_KEY,
      // JS could get ConferencePermission array by this key
      "EVENT_PERMISSIONS_KEY" to EVENT_PERMISSIONS_KEY,
      // JS could get MediaStream object by this key
      "EVENT_MEDIA_STREAM_KEY" to EVENT_MEDIA_STREAM_KEY
    )

  /**
   * New participant add event
   */
  @Subscribe
  fun on(event: ParticipantAddedEvent) {
    val data = Arguments.createMap().apply {
      putMap(EVENT_PARTICIPANT_KEY, participantMapper.toRN(event.participant))
    }
    send(EVENT_PARTICIPANT_ADDED, data)
  }

  /**
   * Existing participant update event
   */
  @Subscribe
  fun on(event: ParticipantUpdatedEvent) {
    val data = Arguments.createMap().apply {
      putMap(EVENT_PARTICIPANT_KEY, participantMapper.toRN(event.participant))
    }
    send(EVENT_PARTICIPANT_UPDATED, data)
  }

  /**
   * Current conference status update event
   */
  @Subscribe
  fun on(event: ConferenceStatusUpdatedEvent) {
    val data = Arguments.createMap().apply {
      putString(EVENT_STATUS_KEY, conferenceMapper.toRNConferenceStatus(event.state))
    }
    send(EVENT_STATUS_UPDATE, data)
  }

  /**
   * Emitted when the local participant's permissions are updated.
   */
  @Subscribe
  fun on(event: PermissionsUpdatedEvent) {
    Arguments.createMap().apply {
      putArray(EVENT_PERMISSIONS_KEY, permissionsMapper.toRN(event.permissions))
    }.also {
      send(EVENT_PERMISSIONS_UPDATED, it)
    }
  }

  /**
   * New stream added event
   *
   * Emitted when the SDK adds a new stream to a conference participant. Each conference participant can be connected to two streams:
   * the `audio and video` stream and the `screen-share` stream. If a participant enables audio or video, the SDK adds the
   * `audio and video` stream to the participant and emits [StreamAddedEvent] to all participants. When a participant is connected to
   * the `audio and video` stream and changes the stream, for example, enables a camera while using a microphone, the SDK updates the
   * `audio and video` stream and emits [StreamUpdatedEvent]. When a participant starts sharing a screen, the SDK adds the
   * `screen-share` stream to this participants and emits [StreamAddedEvent] to all participants. The following
   * [graphic](https://files.readme.io/c729fdb-conference-stream-added.png) shows this behavior.
   *
   * When a new participant joins a conference with enabled audio and video, the SDK emits [StreamAddedEvent] that includes audio and
   * video tracks.
   *
   * The SDK can also emit [StreamAddedEvent] only for the local participant. When the local participant uses the
   * [RNConferenceServiceModule.stopAudio] method to locally mute the selected remote participant who does not use a camera, the local
   * participant receives [StreamRemovedEvent]. After using the [RNConferenceServiceModule.startAudio] method for this remote
   * participant, the local participant receives [StreamAddedEvent].
   */
  @Subscribe
  fun on(event: StreamAddedEvent) {
    val data = Arguments.createMap().apply {
      putMap(EVENT_PARTICIPANT_KEY, participantMapper.toRN(event.participant))
      putMap(EVENT_MEDIA_STREAM_KEY, participantMapper.toRNMediaStream(event.mediaStream))
    }
    send(EVENT_STREAM_ADDED, data)
  }

  /**
   * Stream removed event
   *
   * Emitted when the SDK removes a stream from a conference participant. Each conference participant can be connected to two streams:
   * the `audio and video` stream and the `screen-share` stream. If a participant disables audio and video or stops a screen-share
   * presentation, the SDK removes the proper stream and emits StreamRemovedEvent to all conference participants.
   *
   * The SDK can also emit [StreamRemovedEvent] only for the local participant. When the local participant uses the
   * [RNConferenceServiceModule.stopAudio] method to locally mute a selected remote participant who does not use a camera, the local
   * participant receives [StreamRemovedEvent].
   */
  @Subscribe
  fun on(event: StreamRemovedEvent) {
    val data = Arguments.createMap().apply {
      putMap(EVENT_PARTICIPANT_KEY, participantMapper.toRN(event.participant))
      // TODO mediaStream should be not null. Android SDK will update the annotation and then we'll remove the nullability check here
      event.mediaStream?.let {
        putMap(EVENT_MEDIA_STREAM_KEY, participantMapper.toRNMediaStream(it))
      }
    }
    send(EVENT_STREAM_REMOVED, data)
  }

  /**
   * Stream update event
   *
   * Emitted when a conference participant who is connected to the `audio and video` stream changes the stream by enabling a microphone
   * while using a camera or by enabling a camera while using a microphone. The event is emitted to all conference participants.
   * The following [graphic](https://files.readme.io/c729fdb-conference-stream-added.png) shows this behavior.
   *
   * The SDK can also emit [StreamUpdatedEvent] only for the local participant. When the local participant uses the
   * [RNConferenceServiceModule.stopAudio] or [RNConferenceServiceModule.startAudio] method to locally mute or unmute a selected remote
   * participant who uses a camera, the local participant receives [StreamUpdatedEvent].
   */
  @Subscribe
  fun on(event: StreamUpdatedEvent) {
    val data = Arguments.createMap().apply {
      putMap(EVENT_PARTICIPANT_KEY, participantMapper.toRN(event.participant))
      putMap(EVENT_MEDIA_STREAM_KEY, participantMapper.toRNMediaStream(event.mediaStream))
    }
    send(EVENT_STREAM_UPDATED, data)
  }

  /**
   * The event names and payload keys, make sure they are unique in the application scope
   */
  companion object {
    const val EVENT_PERMISSIONS_UPDATED = "PermissionsUpdated"
    const val EVENT_PARTICIPANT_ADDED = "ParticipantAdded"
    const val EVENT_PARTICIPANT_UPDATED = "ParticipantUpdated"
    const val EVENT_STATUS_UPDATE = "conferenceStatusUpdated"
    const val EVENT_STREAM_ADDED = "StreamAdded"
    const val EVENT_STREAM_REMOVED = "StreamRemoved"
    const val EVENT_STREAM_UPDATED = "StreamUpdated"

    const val EVENT_PARTICIPANT_KEY = "participant"
    const val EVENT_STATUS_KEY = "conferenceStatus"
    const val EVENT_PERMISSIONS_KEY = "permissions"
    const val EVENT_MEDIA_STREAM_KEY = "mediaStream"
  }
}
