package io.dolby.sdk.reactnative.android.permissions

/**
 * [RationaleProvider] is [Rationale] provider interface for specific permission
 */
interface RationaleProvider {
  /**
   * Provides rationale for permission request
   *
   * @param permission permission for which [Rationale] needed
   */
  fun getRequestRationale(permission: String): Rationale?

  /**
   * Provides rationale for permanently denied permission
   *
   * @param permission permission for which [Rationale] needed
   */
  fun getPermanentlyDeniedRationale(permission: String): Rationale
}
