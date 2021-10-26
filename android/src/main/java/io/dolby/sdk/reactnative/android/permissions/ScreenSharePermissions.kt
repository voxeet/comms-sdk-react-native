package io.dolby.sdk.reactnative.android.permissions

import android.app.Activity
import android.content.Intent
import com.voxeet.VoxeetSDK
import io.dolby.sdk.reactnative.utils.VoxeetPromise

object ScreenSharePermissions {

  private var listener: ShareScreenPermissionListener? = null

  fun request(activity: Activity) {
    VoxeetSDK.screenShare().sendUserPermissionRequest(activity)
  }

  fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    val granted = data != null && VoxeetSDK.screenShare().onActivityResult(requestCode, resultCode, data)
    listener?.onPermissionResult(granted)
  }

  fun await() = VoxeetPromise<Boolean> { solver ->
    ShareScreenPermissionListener { granted ->
      solver.resolve(granted)
      listener = null
    }.also { listener = it }
  }

  private fun interface ShareScreenPermissionListener {
    fun onPermissionResult(granted: Boolean)
  }
}
