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
   * New participant add event
   */
  @Subscribe
  fun on(event: ParticipantAddedEvent) {
    Arguments
      .createMap()
      .apply { putMap(KEY_PARTICIPANT, participantMapper.toRN(event.participant)) }
      .also { send(ConferenceEvent.ParticipantAdded.withData(it)) }
  }

  /**
   * Existing participant update event
   */
  @Subscribe
  fun on(event: ParticipantUpdatedEvent) {
    Arguments
      .createMap()
      .apply { putMap(KEY_PARTICIPANT, participantMapper.toRN(event.participant)) }
      .also { send(ConferenceEvent.ParticipantUpdated.withData(it)) }
  }

  /**
   * Current conference status update event
   */
  @Subscribe
  fun on(event: ConferenceStatusUpdatedEvent) {
    Arguments
      .createMap()
      .apply { putString(KEY_CONFERENCE_STATUS, conferenceMapper.toRNConferenceStatus(event.state)) }
      .also { send(ConferenceEvent.StatusUpdated.withData(it)) }
  }

  /**
   * Emitted when the local participant's permissions are updated.
   */
  @Subscribe
  fun on(event: PermissionsUpdatedEvent) {
    Arguments
      .createMap()
      .apply { putArray(KEY_PERMISSIONS, permissionsMapper.toRN(event.permissions)) }
      .also { send(ConferenceEvent.PermissionsUpdated.withData(it)) }
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
    Arguments
      .createMap()
      .apply {
        putMap(KEY_PARTICIPANT, participantMapper.toRN(event.participant))
        putMap(KEY_MEDIA_STREAM, participantMapper.toRNMediaStream(event.mediaStream))
      }
      .also { send(ConferenceEvent.StreamAdded.withData(it)) }
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
    Arguments
      .createMap()
      .apply {
        putMap(KEY_PARTICIPANT, participantMapper.toRN(event.participant))
        // TODO mediaStream should be not null. Android SDK will update the annotation and then we'll remove the nullability check here
        event.mediaStream?.let {
          putMap(KEY_MEDIA_STREAM, participantMapper.toRNMediaStream(it))
        }
      }
      .also { send(ConferenceEvent.StreamRemoved.withData(it)) }
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
    Arguments
      .createMap()
      .apply {
        putMap(KEY_PARTICIPANT, participantMapper.toRN(event.participant))
        putMap(KEY_MEDIA_STREAM, participantMapper.toRNMediaStream(event.mediaStream))
      }
      .also { send(ConferenceEvent.StreamUpdated.withData(it)) }
  }

  /**
   * Conference events
   */
  private object ConferenceEvent {
    object PermissionsUpdated : RNEvent("EVENT_CONFERENCE_PERMISSIONS_UPDATED")
    object ParticipantAdded : RNEvent("EVENT_CONFERENCE_PARTICIPANT_ADDED")
    object ParticipantUpdated : RNEvent("EVENT_CONFERENCE_PARTICIPANT_UPDATED")
    object StatusUpdated : RNEvent("EVENT_CONFERENCE_STATUS_UPDATED")
    object StreamAdded : RNEvent("EVENT_CONFERENCE_STREAM_ADDED")
    object StreamRemoved : RNEvent("EVENT_CONFERENCE_STREAM_REMOVED")
    object StreamUpdated : RNEvent("EVENT_CONFERENCE_STREAM_UPDATED")
  }

  /**
   * The event payload keys
   */
  companion object {
    private const val KEY_PARTICIPANT = "participant"
    private const val KEY_CONFERENCE_STATUS = "conferenceStatus"
    private const val KEY_PERMISSIONS = "permissions"
    private const val KEY_MEDIA_STREAM = "mediaStream"
  }
}
