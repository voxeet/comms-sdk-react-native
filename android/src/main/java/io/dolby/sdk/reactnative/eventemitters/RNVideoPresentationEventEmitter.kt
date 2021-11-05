package io.dolby.sdk.reactnative.eventemitters

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.voxeet.sdk.json.VideoPresentationPaused
import com.voxeet.sdk.json.VideoPresentationPlay
import com.voxeet.sdk.json.VideoPresentationSeek
import com.voxeet.sdk.json.VideoPresentationStarted
import com.voxeet.sdk.json.VideoPresentationStopped
import com.voxeet.sdk.models.Participant
import com.voxeet.sdk.services.ConferenceService
import com.voxeet.sdk.services.VideoPresentationService
import io.dolby.sdk.reactnative.mapper.ParticipantMapper
import io.dolby.sdk.reactnative.state.VideoPresentationHolder
import org.greenrobot.eventbus.Subscribe
import org.greenrobot.eventbus.ThreadMode.MAIN

/**
 * The video presentation event emitter
 * @param reactContext react application context for sending event
 * @param conferenceService [ConferenceService] from Android SDK
 * @param videoPresentationService [VideoPresentationService] from Android SDK
 * @param videoPresentationHolder started video presentation data store
 * @param participantMapper mapper for a [Participant] and [Participant]-related model
 */
class RNVideoPresentationEventEmitter(
  reactContext: ReactApplicationContext,
  private val conferenceService: ConferenceService,
  private val videoPresentationService: VideoPresentationService,
  private val videoPresentationHolder: VideoPresentationHolder,
  private val participantMapper: ParticipantMapper
) : RNEventEmitter(reactContext) {

  /**
   * Emitted when the presenter starts sharing a video.
   */
  @Subscribe(threadMode = MAIN)
  fun on(event: VideoPresentationStarted) {
    val participant = conferenceService.findParticipantById(event.participantId) ?: return

    videoPresentationHolder.onStarted(
      conferenceId = event.conferenceId,
      owner = participant
    )

    Arguments.createMap()
      .apply {
        putMap(KEY_OWNER, participantMapper.toRN(participant))
        putString(KEY_URL, event.url)
        putDouble(KEY_TIMESTAMP, event.timestamp.toDouble())
      }
      .also { send(VideoPresentationEvent.VideoPresentationStarted.withData(it)) }
  }

  /**
   * Emitted when the presenter pauses the shared video.
   */
  @Subscribe(threadMode = MAIN)
  fun on(event: VideoPresentationPaused) {
    val participant = conferenceService.findParticipantById(event.participantId) ?: return
    val url = videoPresentationService.currentPresentation?.url ?: return

    Arguments.createMap()
      .apply {
        putMap(KEY_OWNER, participantMapper.toRN(participant))
        putString(KEY_URL, url)
        putDouble(KEY_TIMESTAMP, event.timestamp.toDouble())
      }
      .also { send(VideoPresentationEvent.VideoPresentationPaused.withData(it)) }
  }

  /**
   * Emitted when the presenter resumes the video presentation.
   */
  @Subscribe(threadMode = MAIN)
  fun on(event: VideoPresentationPlay) {
    val participant = conferenceService.findParticipantById(event.participantId) ?: return
    val url = videoPresentationService.currentPresentation?.url ?: return

    Arguments.createMap()
      .apply {
        putMap(KEY_OWNER, participantMapper.toRN(participant))
        putString(KEY_URL, url)
        putDouble(KEY_TIMESTAMP, event.timestamp.toDouble())
      }
      .also { send(VideoPresentationEvent.VideoPresentationPlay.withData(it)) }
  }

  /**
   * Emitted when the presenter changes the timestamp of the displayed video.
   */
  @Subscribe(threadMode = MAIN)
  fun on(event: VideoPresentationSeek) {
    val participant = conferenceService.findParticipantById(event.participantId) ?: return
    val url = videoPresentationService.currentPresentation?.url ?: return

    Arguments.createMap()
      .apply {
        putMap(KEY_OWNER, participantMapper.toRN(participant))
        putString(KEY_URL, url)
        putDouble(KEY_TIMESTAMP, event.timestamp.toDouble())
      }
      .also { send(VideoPresentationEvent.VideoPresentationSeek.withData(it)) }
  }

  /**
   * Emitted when the presenter stops sharing a video.
   */
  @Subscribe(threadMode = MAIN)
  fun on(event: VideoPresentationStopped) {
    videoPresentationHolder.onStopped(event.conferenceId)

    send(VideoPresentationEvent.VideoPresentationStopped)
  }

  /**
   * Video presentation events
   */
  private object VideoPresentationEvent {
    object VideoPresentationStarted : RNEvent("EVENT_VIDEOPRESENTATION_STARTED")
    object VideoPresentationPaused : RNEvent("EVENT_VIDEOPRESENTATION_PAUSED")
    object VideoPresentationPlay : RNEvent("EVENT_VIDEOPRESENTATION_PLAYED")
    object VideoPresentationSeek : RNEvent("EVENT_VIDEOPRESENTATION_SOUGHT")
    object VideoPresentationStopped : RNEvent("EVENT_VIDEOPRESENTATION_STOPPED")
  }

  /**
   * The event payload keys
   */
  companion object {
    private const val KEY_OWNER = "owner"
    private const val KEY_URL = "url"
    private const val KEY_TIMESTAMP = "timestamp"
  }
}
