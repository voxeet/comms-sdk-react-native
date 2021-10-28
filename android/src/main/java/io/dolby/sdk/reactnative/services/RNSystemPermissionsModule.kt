package io.dolby.sdk.reactnative.services

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import io.dolby.sdk.reactnative.android.permissions.Rationale
import io.dolby.sdk.reactnative.android.permissions.RationaleInformationHolder
import io.dolby.sdk.reactnative.mapper.SystemPermissionsMapper
import io.dolby.sdk.reactnative.utils.Promises
import io.dolby.sdk.reactnative.utils.Promises.forward
import io.dolby.sdk.reactnative.utils.Promises.thenValue
import io.dolby.sdk.reactnative.utils.ReactPromise

/**
 * [RNNotificationServiceModule] allows application to customize permissions [Rationale] information displayed to user.
 */
class RNSystemPermissionsModule(
  reactContext: ReactApplicationContext,
  private val systemPermissionsMapper: SystemPermissionsMapper
) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "DolbyIoIAPISystemPermissionsModule"

  /**
   * Customize permission request [Rationale]
   *
   * @param permission   permission for which custom [Rationale] should be used
   * @param rationaleMap [Rationale] information
   * @param promise      returns null
   */
  @ReactMethod
  fun setPermissionRequestRationale(permission: String, rationaleMap: ReadableMap, promise: ReactPromise) {
    Promises.promise({ systemPermissionsMapper.fromRN(rationaleMap) })
      .thenValue { RationaleInformationHolder.setRequestRationale(permission, it) }
      .forward(promise, ignoreReturnType = true)
  }

  /**
   * Customize permanently denied permission [Rationale]
   *
   * @param permission   permission for which custom [Rationale] should be used
   * @param rationaleMap [Rationale] information
   * @param promise      returns null
   */
  @ReactMethod
  fun setPermissionPermanentlyDeniedRationale(permission: String, rationaleMap: ReadableMap, promise: ReactPromise) {
    Promises.promise({ systemPermissionsMapper.fromRN(rationaleMap) })
      .thenValue { RationaleInformationHolder.setPermanentlyDeniedRationale(permission, it) }
      .forward(promise, ignoreReturnType = true)
  }
}
