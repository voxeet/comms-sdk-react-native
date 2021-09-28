package io.dolby.sdk.reactnative.android.activities;

import com.facebook.react.ReactActivity;
import com.voxeet.VoxeetSDK;

import org.greenrobot.eventbus.EventBus;

/**
 * VoxeetSDKAppCompatActivity manages the call state for the in call notification
 *
 * Note : this class will be changed in future as per native versions of the SDK
 *
 * so that it will be shipped by default, next react native versions will just need to be :
 * - deprecated
 * - state in the documentation that the MainActivity should override the new class from the SDK
 */
public class DolbyioIAPISDKAppCompatActivity extends ReactActivity {

    @Override
    protected void onResume() {
        super.onResume();

        VoxeetSDK.instance().register(this);
        VoxeetSDK.screenShare().consumeRightsToScreenShare();
    }

    @Override
    protected void onPause() {
        //stop fetching stats if any pending
        if (!VoxeetSDK.conference().isLive()) {
            VoxeetSDK.localStats().stopAutoFetch();
        }

        EventBus.getDefault().unregister(this);

        super.onPause();
    }
}
