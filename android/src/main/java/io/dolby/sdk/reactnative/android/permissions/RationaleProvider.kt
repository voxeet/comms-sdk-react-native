package io.dolby.sdk.reactnative.android.permissions

/**
 *
 */
interface RationaleProvider {
  fun getRequestRationale(permission: String): Rationale?
  fun getPermanentlyDeniedRationale(permission: String): Rationale
}
