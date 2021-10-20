package io.dolby.sdk.reactnative.android

import android.app.Application
import android.content.Context
import android.content.pm.ProviderInfo
import com.facebook.soloader.SoLoader
import com.voxeet.VoxeetSDK
import com.voxeet.android.media.utils.MediaEngineEnvironmentHelper
import com.voxeet.sdk.manifests.AbstractManifestComponentProvider
import com.voxeet.sdk.preferences.VoxeetPreferences
import com.voxeet.sdk.utils.VoxeetEnvironmentHolder
import io.dolby.sdk.reactnative.android.RNDolbyioIAPISDKManifestComponent
import io.dolby.sdk.reactnative.utils.IAPILog.log

class RNDolbyioIAPISDKManifestComponent : AbstractManifestComponentProvider() {

  override fun init(context: Context, providerInfo: ProviderInfo?) {
    if (context !is Application) {
      log(TAG, "init: ISSUE CONTEXT IS NOT AN Application")
      return
    }

    // init React native right away using the ApplicationContext
    SoLoader.init(context,  /* native exopackage */false)
    SoLoader.loadLibrary("dvclient")
    SoLoader.loadLibrary("MediaEngineJni")
    MediaEngineEnvironmentHelper.initSoLoader(false)

    //Set the context to the SDK to ensure that all the required components are available
    //(call made here in case that the RNVoxeetManifestComponent class is called before the SDK)
    VoxeetSDK.setApplication(context)

    //force a default voxeet preferences manager
    //in sdk mode, no issues
    VoxeetPreferences.init(context, VoxeetEnvironmentHolder(context))
  }

  override fun getComponentName(): String =
    RNDolbyioIAPISDKManifestComponent::class.java.simpleName

  override fun getDefaultAuthority(): String = "com.voxeet.reactnative.manifests."

  companion object {
    private val TAG = RNDolbyioIAPISDKManifestComponent::class.java.simpleName
  }

}
