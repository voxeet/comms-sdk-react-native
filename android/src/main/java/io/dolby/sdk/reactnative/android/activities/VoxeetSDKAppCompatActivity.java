package io.dolby.sdk.reactnative.android.activities;

import android.Manifest;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.Log;

import androidx.appcompat.app.AppCompatActivity;

import com.voxeet.VoxeetSDK;
import com.voxeet.sdk.events.error.PermissionRefusedEvent;
import com.voxeet.sdk.events.sdk.ConferenceStatusUpdatedEvent;
import com.voxeet.sdk.services.screenshare.RequestScreenSharePermissionEvent;
import com.voxeet.sdk.utils.Validate;

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

import io.dolby.sdk.reactnative.android.services.AbstractSDKService;
import io.dolby.sdk.reactnative.android.services.SDKBinder;
import io.dolby.sdk.reactnative.android.services.SystemServiceFactory;

/**
 * VoxeetSDKAppCompatActivity manages the call state for the in call notification
 *
 * Note : this class will be changed in future native versions of the SDK
 *
 * so that it will be shipped by default, next react native versions will just need to be :
 * - deprecated
 * - state in the documentation that the MainActivity should override the new class from the SDK
 */
public class VoxeetSDKAppCompatActivity extends AppCompatActivity {

    private static final String TAG = VoxeetSDKAppCompatActivity.class.getSimpleName();

    @Nullable
    private AbstractSDKService sdkService;

    /**
     * Flag set to true when the last request for camera permission failed, use the commit method to restore it to false
     * after the adequate warning has been made to the user
     */
    private boolean _camera_permission_permnantly_banned = false;

    public VoxeetSDKAppCompatActivity() {
        super();
    }


    @Nullable
    public AbstractSDKService getSdkService() {
        return sdkService;
    }

    public void onSdkServiceAvailable() {
        //nothing, override to change
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        startService();
    }

    @Override
    protected void onResume() {
        super.onResume();

        SystemServiceFactory.setLastAppCompatActivity(this.getClass());
        startService();

        VoxeetSDK.instance().register(this);

        if (!EventBus.getDefault().isRegistered(this)) {
            EventBus.getDefault().register(this); //registering this activity
        }

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

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void onEvent(@NonNull PermissionRefusedEvent event) {
        switch (event.getPermission()) {
            case CAMERA:
            case MICROPHONE:
                Validate.requestMandatoryPermissions(this,
                        event.getPermission().getPermissions(),
                        event.getPermission().getRequestCode());
                break;
        }
    }

    /**
     * Simple method warning if the last call for the camera permission was unsuccessful and the user did prevent any future popup for permission
     *
     * @return a flag indicating if the permission has been permanently refused
     */
    public boolean isCameraPermissionBanned() {
        if (Validate.hasCameraPermissions(this)) return false;
        if (_camera_permission_permnantly_banned) return true;
        //if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
        //    if (!shouldShowRequestPermissionRationale(Manifest.permission.CAMERA)) return true;
        //}
        return false;
    }

    /**
     * when the user has been warned by the developers about the permnantly refused error, simply reset back to normal
     */
    public void commitCameraPermissionBannedWarned() {
        _camera_permission_permnantly_banned = false;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {

        if (requestCode == PermissionRefusedEvent.RESULT_CAMERA) {
            if (isPermissionSet(Manifest.permission.CAMERA, permissions, grantResults)) {
                Log.d(TAG, "onActivityResult: camera is ok now");
                if (VoxeetSDK.conference().isLive()) {
                    VoxeetSDK.conference().startVideo()
                            .then(result -> {
                            })
                            .error(Throwable::printStackTrace);
                }
            } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                if (!shouldShowRequestPermissionRationale(Manifest.permission.CAMERA)) {
                    _camera_permission_permnantly_banned = true;
                }
            }
        } else {
            super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        boolean managed = VoxeetSDK.screenShare().onActivityResult(requestCode, resultCode, data);

        if (!managed) {
            super.onActivityResult(requestCode, resultCode, data);
        }
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void onEvent(RequestScreenSharePermissionEvent event) {
        VoxeetSDK.screenShare().sendUserPermissionRequest(this);
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Specific event used to manage the current "incoming" call feature
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    @Subscribe(threadMode = ThreadMode.MAIN)
    public final void onEvent(ConferenceStatusUpdatedEvent event) {
        onConferenceState(event);
    }

    protected void onConferenceState(@NonNull ConferenceStatusUpdatedEvent event) {

    }

    /**
     * Method called during the onResume of this
     *
     * @return true by default, override to change behaviour
     */
    protected boolean canBeRegisteredToReceiveCalls() {
        return true;
    }

    private void startService() {
        try {
            if (SystemServiceFactory.hasSDKServiceClass()) {
                Intent intent = new Intent(this, SystemServiceFactory.getSDKServiceClass());
                startService(intent);
                bindService(intent, sdkConnection, Context.BIND_AUTO_CREATE);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private ServiceConnection sdkConnection = new ServiceConnection() {
        public void onServiceConnected(ComponentName className, IBinder binder) {
            if (binder instanceof SDKBinder) {
                try {
                    sdkService = ((SDKBinder) binder).getService();
                    if (null != sdkService) {
                        onSdkServiceAvailable();
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

        public void onServiceDisconnected(ComponentName className) {
            sdkService = null;
        }
    };

    private boolean isPermissionSet(@NonNull String permission, @NonNull String[] permissions, @NonNull int[] grantResults) {
        if (null == permission) return false;

        if (null != permissions && null != grantResults && permissions.length == grantResults.length) {
            for (int i = 0; i < permissions.length; i++) {
                if (permission.equals(permissions[i])) {
                    return PackageManager.PERMISSION_DENIED != grantResults[i];
                }
            }
        }
        return false;
    }
}

