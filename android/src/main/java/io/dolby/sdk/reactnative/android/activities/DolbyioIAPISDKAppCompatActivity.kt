package io.dolby.sdk.reactnative.android.activities

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.voxeet.VoxeetSDK
import com.voxeet.sdk.events.error.PermissionRefusedEvent
import com.voxeet.sdk.events.error.PermissionRefusedEvent.Permission.CAMERA
import com.voxeet.sdk.events.error.PermissionRefusedEvent.Permission.MICROPHONE
import io.dolby.sdk.reactnative.android.permissions.RationaleInformationHolder
import io.dolby.sdk.reactnative.android.permissions.SystemPermissions
import org.greenrobot.eventbus.Subscribe
import org.greenrobot.eventbus.ThreadMode

/**
 * [DolbyioIAPISDKAppCompatActivity] manages the call state for the in call notification
 *
 * Note : this class will be changed in future as per native versions of the SDK
 *
 * so that it will be shipped by default, next react native versions will just need to be :
 * - deprecated
 * - state in the documentation that the MainActivity should override the new class from the SDK
 */
open class DolbyioIAPISDKAppCompatActivity : ReactActivity() {

  private var systemPermissions: SystemPermissions? = null

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    systemPermissions = SystemPermissions(this)
  }

  override fun onResume() {
    super.onResume()
    VoxeetSDK.instance().register(this)
    VoxeetSDK.screenShare().consumeRightsToScreenShare()
  }

  override fun onPause() {
    //stop fetching stats if any pending
    if (!VoxeetSDK.conference().isLive) {
      VoxeetSDK.localStats().stopAutoFetch()
    }
    VoxeetSDK.instance().unregister(this)
    super.onPause()
  }

  override fun onDestroy() {
    systemPermissions = null
    super.onDestroy()
  }

  @Subscribe(threadMode = ThreadMode.MAIN)
  fun onEvent(event: PermissionRefusedEvent) {
    when (event.permission) {
      CAMERA, MICROPHONE -> systemPermissions?.request(event.permission.permissions, RationaleInformationHolder)
      else -> {
        // no-op
      }
    }
  }

  override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<String>, grantResults: IntArray) {
    systemPermissions?.onRequestResult(requestCode, permissions, grantResults)
    super.onRequestPermissionsResult(requestCode, permissions, grantResults)
  }
}
