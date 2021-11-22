package io.dolby.sdk.reactnative.services

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.voxeet.sdk.json.VideoPresentationPaused
import com.voxeet.sdk.json.VideoPresentationPlay
import com.voxeet.sdk.json.VideoPresentationSeek
import com.voxeet.sdk.json.VideoPresentationStarted
import com.voxeet.sdk.json.VideoPresentationStopped
import com.voxeet.sdk.services.ConferenceService
import com.voxeet.sdk.services.VideoPresentationService
import com.voxeet.sdk.services.presentation.video.VideoPresentation
import io.dolby.sdk.reactnative.eventemitters.RNEventEmitter
import io.dolby.sdk.reactnative.mapper.VideoPresentationMapper
import io.dolby.sdk.reactnative.state.VideoPresentationHolder
import io.dolby.sdk.reactnative.utils.Promises
import io.dolby.sdk.reactnative.utils.Promises.forward
import io.dolby.sdk.reactnative.utils.Promises.rejectIfNull
import io.dolby.sdk.reactnative.utils.Promises.thenValue

/**
 * The [RNVideoPresentationServiceModule] allows an application to share a hosted video file with conference participants and
 * synchronously control the playback for all participants. The video file location, specified by the url parameter of the [start]
 * method, needs to be accessible by all participants. We recommend using the MPEG-4 Part 14 or MP4 file formats for the hosted video file.
 *
 * **Typical application workflow for the presenter:**
 *
 *  1. The application prepares the file and uploads it to the network location that is accessible by all participants through the `url`.
 *
 *  2. The application calls the [start] method to supply other conference participants with the url as a parameter. This method starts
 *  sharing the video file during the conference.
 *
 *  3. The application can call the [pause] method to pause the video and [play] to resume it.
 *
 *  4. While sharing the video with other conference participants, the application coordinates the timestamp in the local and presented
 *  video. It uses the [seek] method to inform other participants about the current video position (timestamp).
 *
 *  5. The application calls the [stop] method to end the video presentation.
 *
 * **Typical application workflow for other participants:**
 *
 *  1. The application receives the [VideoPresentationStarted] event informing that the presenter shares the video with other
 *  conference participants and it extracts the url of the video.
 *
 *  2. The application receives the [VideoPresentationPaused] event informing that the video is paused. When it is resumed, the
 *  application receives the [VideoPresentationPlay] event.
 *
 *  3. If the timestamp of the video changed, the application is informed about the current video position via [VideoPresentationSeek]
 *  event.
 *
 *  4. When the presentation is ended, the application receives the [VideoPresentationStopped] event.
 *
 * @constructor
 * Creates a bridge wrapper for [VideoPresentationService].
 *
 * @param reactContext react context
 * @param eventEmitter an emitter for the video presentation module events
 * @param videoPresentationService [VideoPresentationService] from Android SDK
 * @param conferenceService [ConferenceService] from Android SDK
 * @param videoPresentationHolder started video presentation data store
 * @param videoPresentationMapper mapper for a [VideoPresentation] model
 */
class RNVideoPresentationServiceModule(
  reactContext: ReactApplicationContext,
  eventEmitter: RNEventEmitter,
  private val videoPresentationService: VideoPresentationService,
  private val conferenceService: ConferenceService,
  private val videoPresentationHolder: VideoPresentationHolder,
  private val videoPresentationMapper: VideoPresentationMapper
) : RNEventEmitterModule(reactContext, eventEmitter) {

  override fun getName(): String = "DolbyIoIAPIVideoPresentationService"

  /**
   * Starts sharing a video file with other conference participants.
   *
   * @param url location of a video file
   * @param promise returns null
   */
  @ReactMethod
  fun start(url: String, promise: Promise) {
    videoPresentationService.start(url)
      .forward(promise, ignoreReturnType = true)
  }

  /**
   * Stops sharing a video file with other conference participants.
   *
   * @param promise returns null
   */
  @ReactMethod
  fun stop(promise: Promise) {
    videoPresentationService.stop()
      .forward(promise, ignoreReturnType = true)
  }

  /**
   * Pauses a video presentation.
   *
   * @param timestamp the timestamp of the paused video
   * @param promise returns null
   */
  @ReactMethod
  fun pause(timestamp: Double, promise: Promise) {
    videoPresentationService.pause(timestamp.toLong())
      .forward(promise, ignoreReturnType = true)
  }

  /**
   * Resumes a video presentation.
   *
   * @param promise returns null
   */
  @ReactMethod
  fun play(promise: Promise) {
    videoPresentationService.play()
      .forward(promise, ignoreReturnType = true)
  }

  /**
   * Informs other conference participants about the current video position (timestamp).
   *
   * @param timestamp the new timestamp
   * @param promise returns null
   */
  @ReactMethod
  fun seek(timestamp: Double, promise: Promise) {
    videoPresentationService.seek(timestamp.toLong())
      .forward(promise, ignoreReturnType = true)
  }

  /**
   * Provides information about a specific video presentation, such as the owner, URL and timestamp.
   *
   * @return returns the current video presentation. Rejection can indicate that a specified video presentation does not exist
   * at the moment.
   */
  @ReactMethod
  fun current(promise: Promise) {
    Promises.promise(videoPresentationService.currentPresentation) { "Couldn't get the current video presentation" }
      .thenValue { videoPresentation ->
        conferenceService.conference?.let { videoPresentation to it } ?: throw Exception("Couldn't get the conference")
      }
      .thenValue { (videoPresentation, conference) ->
        val owner = videoPresentationHolder.getOwner(conference.id)
          ?: throw Exception("No started video presentation for current conference")
        owner to videoPresentation
      }
      .thenValue { (owner, videoPresentation) -> videoPresentationMapper.toRN(videoPresentation, owner) }
      .forward(promise)
  }

  /**
   * Provides the current state of the video presentation.
   *
   * @return returns the current state of the video presentation
   */
  @ReactMethod
  fun state(promise: Promise) {
    Promises.promise(videoPresentationService.currentPresentation) { "Couldn't get the current video presentation" }
      .thenValue { videoPresentationMapper.stateToRN(it.state) }
      .rejectIfNull { "Unknown video presentation state" }
      .forward(promise)
  }

  /**
   * Every emitter module must implement this method in place, otherwise JS cannot receive event
   */
  @ReactMethod
  override fun addListener(eventName: String) {
    super.addListener(eventName)
  }

  /**
   * Every emitter module must implement this method in place, otherwise JS cannot receive event
   */
  @ReactMethod
  override fun removeListeners(count: Int) {
    super.removeListeners(count)
  }
}
