package io.dolby.sdk.comms.reactnative.services.video

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.voxeet.sdk.services.VideoService
import com.voxeet.sdk.services.video.LocalVideo
import io.dolby.sdk.comms.reactnative.utils.Promises.forward
import io.dolby.sdk.comms.reactnative.utils.Promises.rejectIfFalse
import io.dolby.sdk.comms.reactnative.utils.ReactPromise

/**
 * The [RNLocalVideoModule] allows enabling and disabling the local participant's video.
 *
 * @constructor
 * Creates a bridge wrapper for [LocalVideo] model.
 *
 * @param reactContext          react context
 * @param videoService          [VideoService] from Android SDK
 */
class RNLocalVideoModule(
  reactContext: ReactApplicationContext,
  private val videoService: VideoService,
) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "CommsAPILocalVideoModule"

  /**
   * Enables the local participant's video and sends the video to a conference.
   * Rejection may be caused by the PromisePermissionRefusedEventException or MediaException.
   * If the application does not have a permission to start a video stream, it emits PermissionRefusedEvent.
   *
   * @param promise returns null
   */
  @ReactMethod
  fun start(promise: ReactPromise) {
    videoService.local.start()
      .rejectIfFalse { "Start video operation failed" }
      .forward(promise)
  }

  /**
   * Disables the local participant's video and stops sending the video to a conference.
   * Use this method only when the current participant is at the conference.
   * Otherwise, the application emits an exception in the catch block of the promise.
   *
   * @param promise returns null
   */
  @ReactMethod
  fun stop(promise: ReactPromise) {
    videoService.local.stop()
      .rejectIfFalse { "Stop video operation failed" }
      .forward(promise)
  }

}
