package io.dolby.sdk.reactnative.android.permissions

/**
 * [RationaleInformationHolder] is [Rationale] configuration holding class
 *
 * Provides possibility to customize rationale information displayed to user
 */
object RationaleInformationHolder : RationaleProvider {

  private val DEFAULT_PERMANENTLY_DENIED_RATIONALE = Rationale(
    title = "Need Permissions",
    message = "This app needs permission to use this feature. You can grant them in app settings",
    positiveButton = "Goto Settings"
  )

  private val requestRationals = mutableMapOf<String, Rationale>()
  private val permanentlyDeniedRationals = mutableMapOf<String, Rationale>()

  override fun getRequestRationale(permission: String): Rationale? =
    requestRationals[permission]

  override fun getPermanentlyDeniedRationale(permission: String): Rationale =
    permanentlyDeniedRationals[permission] ?: DEFAULT_PERMANENTLY_DENIED_RATIONALE

  fun setRequestRationale(permission: String, rationale: Rationale) {
    requestRationals[permission] = rationale
  }

  fun setPermanentlyDeniedRationale(permission: String, rationale: Rationale) {
    permanentlyDeniedRationals[permission] = rationale
  }
}
