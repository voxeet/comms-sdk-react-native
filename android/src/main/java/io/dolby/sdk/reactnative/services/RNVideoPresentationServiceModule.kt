package io.dolby.sdk.reactnative.services

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.voxeet.sdk.services.VideoPresentationService
import io.dolby.sdk.reactnative.utils.Promises.forward

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
 * @param videoPresentationService [VideoPresentationService] from Android SDK
 */
class RNVideoPresentationServiceModule(
  reactContext: ReactApplicationContext,
  private val videoPresentationService: VideoPresentationService,
) : ReactContextBaseJavaModule(reactContext) {

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
}
