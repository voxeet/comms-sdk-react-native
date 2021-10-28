package io.dolby.sdk.reactnative.services

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.voxeet.sdk.services.MediaDeviceService
import io.dolby.sdk.reactnative.mapper.MediaMapper
import io.dolby.sdk.reactnative.utils.Promises
import io.dolby.sdk.reactnative.utils.Promises.forward
import io.dolby.sdk.reactnative.utils.Promises.rejectIfFalse
import io.dolby.sdk.reactnative.utils.Promises.thenValue
import io.dolby.sdk.reactnative.utils.ReactPromise

/**
 * [RNMediaServiceModule] allows the application to manage media devices that are used during conferences.
 *
 * The service allows the application to:
 * - Switch device cameras [switchCamera]
 * - Check if selected camera is the front facing one [isFrontCamera]
 * - Check the selected comfort noise level [getComfortNoiseLevel] for output devices in Dolby Voice conferences
 *   and change the comfort noise level [setComfortNoiseLevel].
 *
 * @constructor Creates a bridge wrapper for [MediaDeviceService].
 *
 * @param reactContext        react context
 * @param mediaDeviceService  [MediaDeviceService] from Android SDK
 * @param mediaMapper         [MediaMapper] mapper for a media-related models
 */
class RNMediaServiceModule constructor(
  reactContext: ReactApplicationContext,
  private val mediaDeviceService: MediaDeviceService,
  private val mediaMapper: MediaMapper
) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "DolbyIoIAPIMediaService"

  /**
   * The ComfortNoiseLevel model represents the possible comfort noise levels in Dolby Voice conferences.
   * The offered levels allow customizing the comfort noise intensity.
   * You can either use the default level that is based on the device database or choose the medium or low level if you wish to change the comfort noise intensity.
   * The model also allows disabling the comfort noise completely.
   * To find out currently used noise level call [getComfortNoiseLevel]
   *
   * @param comfortNoiseLevelRN   a comfort noise level
   * @param promise               returns null
   */
  @ReactMethod
  fun setComfortNoiseLevel(comfortNoiseLevelRN: ReadableMap, promise: ReactPromise) {
    Promises.promise({ mediaMapper.fromRN(comfortNoiseLevelRN) }) { "Invalid comfort noise level" }
      .thenValue(mediaDeviceService::setComfortNoiseLevel)
      .forward(promise, ignoreReturnType = true)
  }

  /**
   * Returns comfort noise level set with [setComfortNoiseLevel]
   *
   * @param promise      returns comfort noise level
   */
  @ReactMethod
  fun getComfortNoiseLevel(promise: ReactPromise) {
    Promises.promise({ mediaDeviceService.comfortNoiseLevel }) { "Could not get comfort noise level" }
      .then(mediaMapper::toRN)
      .forward(promise)
  }

  /**
   * Switches the current camera to another available camera that is connected to the device.
   * On Android, the second camera exists by default but on other devices, there may be none, one, two, or even more cameras.
   *
   * @param promise      returns null
   */
  @ReactMethod
  fun switchCamera(promise: ReactPromise) {
    mediaDeviceService
      .switchCamera()
      .rejectIfFalse { "Could not switch camera" }
      .forward(promise, ignoreReturnType = true)
  }

  /**
   * Checks if the application uses the front-facing (true) or back-facing camera (false).
   *
   * @param promise      returns Boolean
   */
  @ReactMethod
  fun isFrontCamera(promise: ReactPromise) {
    Promises
      .promise({ mediaDeviceService.cameraContext.isDefaultFrontFacing })
      .forward(promise)
  }
}
