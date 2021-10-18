package io.dolby.sdk.reactnative.android.permissions

import android.app.Activity
import android.app.AlertDialog
import android.content.Context
import android.content.Intent
import android.content.Intent.FLAG_ACTIVITY_NEW_TASK
import android.content.SharedPreferences
import android.content.pm.PackageManager.PERMISSION_DENIED
import android.content.pm.PackageManager.PERMISSION_GRANTED
import android.net.Uri
import android.provider.Settings.ACTION_APPLICATION_DETAILS_SETTINGS
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat

/**
 * [SystemPermissions] wrapper for handling android runtime permission
 */
class SystemPermissions(
  private val activity: Activity
) {

  private val Context.permissionsPreferences: SharedPreferences
    get() = getSharedPreferences("permissions", Context.MODE_PRIVATE)

  /**
   * Request runtime permissions
   *
   * Before performing request method check is there is no permanently denied permission and is there need to display request rationale.
   *
   * @param permissions       permissions to request
   * @param rationaleProvider [RationaleProvider] to provide rationals
   */
  fun request(permissions: Array<String>, rationaleProvider: RationaleProvider) {
    permissions.firstOrNull(::isPermanentlyDeclined)
      ?.let(rationaleProvider::getPermanentlyDeniedRationale)
      ?.let { rationale ->
        showPermanentlyDeniedRationale(rationale)
        return
      }

    permissions.singleOrNull()
      ?.takeIf(::shouldShowRequestRationale)
      ?.let(rationaleProvider::getRequestRationale)
      ?.let { rationale ->
        showRequestRationale(permissions, rationale)
        return
      }

    ActivityCompat.requestPermissions(activity, permissions, REQUEST_CODE)
  }

  /**
   * Handle runtime permissions request result
   *
   * Method check if "Don't ask me again" option was checked to remember permanently denied permission in application preferences
   *
   * @param requestCode  identifier of performed request
   * @param permissions  permissions specified in request
   * @param grantResults grant result [PERMISSION_DENIED] or [PERMISSION_DENIED] for each permissions specified in request
   */
  fun onRequestResult(requestCode: Int, permissions: Array<String>, grantResults: IntArray) {
    if (requestCode != REQUEST_CODE) return
    permissions.zip(grantResults.toTypedArray())
      .map { (permission, grantResult) ->
        when (grantResult) {
          PERMISSION_DENIED -> {
            val permanently = !shouldShowRequestRationale(permission)
            setPermanentlyDeclined(permission, permanently)
          }
          PERMISSION_GRANTED -> {
            // no-op
          }
        }
      }
  }

  private fun showRequestRationale(permissions: Array<String>, rationale: Rationale) {
    AlertDialog.Builder(activity)
      .setTitle(rationale.title)
      .setMessage(rationale.message)
      .setPositiveButton(rationale.positiveButton) { _, _ ->
        ActivityCompat.requestPermissions(activity, permissions, REQUEST_CODE)
      }
      .setNegativeButton(rationale.negativeButton) { dialog, _ ->
        dialog.dismiss()
      }
      .show()
  }

  private fun showPermanentlyDeniedRationale(rationale: Rationale) {
    AlertDialog.Builder(activity)
      .setTitle(rationale.title)
      .setMessage(rationale.message)
      .setPositiveButton(rationale.positiveButton) { _, _ ->
        openSettings()
      }
      .setNegativeButton(rationale.negativeButton) { dialog, _ ->
        dialog.dismiss()
      }
      .show()
  }

  private fun openSettings() {
    Intent().apply {
      action = ACTION_APPLICATION_DETAILS_SETTINGS
      addFlags(FLAG_ACTIVITY_NEW_TASK)
      data = Uri.fromParts("package", activity.packageName, null)
    }.let(activity::startActivity)
  }

  private fun isGranted(permission: String): Boolean {
    val granted = ContextCompat.checkSelfPermission(activity, permission) == PERMISSION_GRANTED
    if (granted) setPermanentlyDeclined(permission, false)
    return granted
  }

  private fun shouldShowRequestRationale(permission: String): Boolean {
    return ActivityCompat.shouldShowRequestPermissionRationale(activity, permission)
  }

  private fun isPermanentlyDeclined(permission: String): Boolean {
    return !isGranted(permission) &&
      activity.permissionsPreferences.getBoolean(KEY_PERMANENTLY_DECLINED.format(permission), false)
  }

  private fun setPermanentlyDeclined(permission: String, value: Boolean) {
    if (!isGranted(permission)) {
      activity.permissionsPreferences.edit().putBoolean(KEY_PERMANENTLY_DECLINED.format(permission), value).apply()
    }
  }

  companion object {
    private const val REQUEST_CODE = 101
    private const val KEY_PERMANENTLY_DECLINED = "%s_permanently_declined"
  }
}
