package io.dolby.sdk.reactnative.android;

import android.app.Application;
import android.content.Context;
import android.content.pm.ProviderInfo;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.soloader.SoLoader;
import com.voxeet.VoxeetSDK;
import com.voxeet.android.media.utils.MediaEngineEnvironmentHelper;
import com.voxeet.sdk.manifests.AbstractManifestComponentProvider;
import com.voxeet.sdk.preferences.VoxeetPreferences;
import com.voxeet.sdk.utils.VoxeetEnvironmentHolder;

import io.dolby.sdk.reactnative.utils.IAPILog;

public final class RNDolbyioIAPISDKManifestComponent extends AbstractManifestComponentProvider {

    private static final String TAG = RNDolbyioIAPISDKManifestComponent.class.getSimpleName();

    @Override
    protected void init(@NonNull Context context, @Nullable ProviderInfo providerInfo) {
        if (!(context instanceof Application)) {
            IAPILog.log(TAG, "init: ISSUE CONTEXT IS NOT AN Application");
            return;
        }

        // init React native right away using the ApplicationContext
        SoLoader.init(context, /* native exopackage */ false);

        SoLoader.loadLibrary("dvclient");
        SoLoader.loadLibrary("MediaEngineJni");
        MediaEngineEnvironmentHelper.initSoLoader(false);

        //Log.d(TAG, "init: com.testappvoxeet reload");
        Application application = (Application) context;

        //Set the context to the SDK to ensure that all the required components are available
        //(call made here in case that the RNVoxeetManifestComponent class is called before the SDK)
        VoxeetSDK.setApplication(context);

        //force a default voxeet preferences manager
        //in sdk mode, no issues
        VoxeetPreferences.init(application, new VoxeetEnvironmentHolder(application));
    }

    @Override
    protected String getComponentName() {
        return RNDolbyioIAPISDKManifestComponent.class.getSimpleName();
    }

    @Override
    protected String getDefaultAuthority() {
        return "com.voxeet.reactnative.manifests.";
    }
}
