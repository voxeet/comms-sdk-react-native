package io.dolby.sdk.comms.reactnative.view

import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.voxeet.android.media.MediaStream
import com.voxeet.sdk.services.ConferenceService
import com.voxeet.sdk.views.VideoView
import io.dolby.sdk.comms.reactnative.eventemitters.RNVideoViewEventEmitter

/**
 * [VideoViewManager] exposes native view to RN and allows manipulating it.
 * @param eventEmitter an emitter for the video view events
 * @param conferenceService [ConferenceService] from Android SDK
 */
class VideoViewManager(
  private val eventEmitter: RNVideoViewEventEmitter,
  private val conferenceService: ConferenceService
) : SimpleViewManager<VideoView>() {

  override fun getName() = VIDEO_VIEW_NAME

  override fun createViewInstance(reactContext: ThemedReactContext) = VideoView(reactContext)

  /**
   * Exposes available commands to RN
   */
  override fun getCommandsMap(): Map<String, Int> =
    VideoViewCommand.values().associate { it.commandName to it.commandId }

  /**
   * Receives RN command specified in [getCommandsMap]
   * Sends back result in form of a event using [RNVideoViewEventEmitter]
   */
  override fun receiveCommand(videoView: VideoView, commandId: String?, args: ReadableArray?) {
    super.receiveCommand(videoView, commandId, args)
    val requestId = args?.getInt(REQUEST_ID_ARG) ?: return

    when (VideoViewCommand.fromString(commandId)) {
      VideoViewCommand.ATTACH ->
        eventEmitter.onCommandCallback(
          requestId = requestId,
          result = attach(args.getString(PARTICIPANT_ID_ARG), args.getString(STREAM_ID_ARG), videoView)
        )
      VideoViewCommand.DETACH -> eventEmitter.onCommandCallback(requestId = requestId, result = detach(videoView))
      VideoViewCommand.IS_ATTACHED -> eventEmitter.onCommandCallback(requestId = requestId, result = videoView.isAttached)
      else -> throw IllegalArgumentException("Command $commandId is not supported")
    }
  }

  /**
   * Required for RN built in Event Emitter Calls.
   */
  @ReactMethod
  fun addListener(eventName: String) {
    // no-op
  }

  /**
   * Required for RN built in Event Emitter Calls.
   */
  @ReactMethod
  fun removeListeners(count: Int) {
    // no-op
  }

  /**
   * Allows flipping video image horizontally
   * @param videoView view on which property has been set
   * @param mirror boolean telling if video image should be flipped horizontally
   */
  @ReactProp(name = "isMirror")
  fun setMirror(videoView: VideoView, mirror: Boolean) = videoView.setMirror(mirror)

  /**
   * Allows changing video scaling type.
   * @param videoView view on which property has been set
   * @param scaleType String with "fill" or "fit" value
   */
  @ReactProp(name = "scaleType")
  fun setScaleType(videoView: VideoView, scaleType: String): Unit = when (scaleType) {
    SCALE_TYPE_FILL -> videoView.setVideoFill()
    else -> videoView.setVideoFit()
  }

  private fun detach(videoView: VideoView) = try {
    videoView.unAttach()
    true
  } catch (exception: Exception) {
    false
  }

  private fun attach(participantId: String?, streamId: String?, videoView: VideoView): Boolean {
    return try {
      if (participantId == null || streamId == null) return false
      findMediaStream(participantId, streamId)?.let {
        videoView.attach(participantId, it)
        true
      } ?: run {
        videoView.unAttach()
        false
      }
    } catch (exception: Exception) {
      false
    }
  }

  private fun findMediaStream(participantId: String, streamId: String): MediaStream? =
    conferenceService
      .findParticipantById(participantId)
      ?.streams()
      ?.find { it.peerId() == participantId && it.label() == streamId }

  private enum class VideoViewCommand(val commandId: Int, val commandName: String) {
    ATTACH(1, "attach"),
    DETACH(2, "detach"),
    IS_ATTACHED(3, "isAttached");

    companion object {
      fun fromString(commandId: String?) = commandId?.toIntOrNull()?.let { id -> values().find { it.commandId == id } }
    }
  }

  companion object {
    private const val VIDEO_VIEW_NAME = "DIOVideoView"

    private const val SCALE_TYPE_FILL = "fill"

    private const val REQUEST_ID_ARG = 0
    private const val PARTICIPANT_ID_ARG = 1
    private const val STREAM_ID_ARG = 2
  }
}
