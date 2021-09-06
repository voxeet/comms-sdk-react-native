package io.dolby.sdk.reactnative.android.services;

import android.app.Activity;
import android.content.Intent;

import androidx.annotation.NonNull;

import io.dolby.sdk.reactnative.R;

public class DolbyioIAPISystemService extends AbstractSDKService<DolbyioIAPISystemService.VoxeetSystemBinder> {

    public static class VoxeetSystemBinder extends SDKBinder<DolbyioIAPISystemService> {

        private DolbyioIAPISystemService instance;

        public VoxeetSystemBinder(@NonNull DolbyioIAPISystemService instance) {
            this.instance = instance;
        }

        @NonNull
        @Override
        public DolbyioIAPISystemService getService() {
            return instance;
        }
    }

    @NonNull
    @Override
    public VoxeetSystemBinder onBind(@NonNull Intent intent) {
        return new VoxeetSystemBinder(this);
    }

    @Override
    protected int getConferenceStateCreating() {
        return R.string.voxeet_foreground_conference_state_creating;
    }

    @Override
    protected int getConferenceStateCreated() {
        return R.string.voxeet_foreground_conference_state_created;
    }

    @Override
    protected int getConferenceStateJoining() {
        return R.string.voxeet_foreground_conference_state_joining;
    }

    @Override
    protected int getConferenceStateJoined() {
        return R.string.voxeet_foreground_conference_state_joined;
    }

    @Override
    protected int getConferenceStateJoinedError() {
        return R.string.voxeet_foreground_conference_state_join_error;
    }

    @Override
    protected int getConferenceStateLeft() {
        return R.string.voxeet_foreground_conference_state_left;
    }

    @Override
    protected int getConferenceStateEnd() {
        return R.string.voxeet_foreground_conference_state_ended;
    }

    @Override
    protected int getNotificationId() {
        return 342;
    }

    @Override
    protected int getSmallIcon() {
        return R.drawable.ic_stat_conference;
    }

    @NonNull
    @Override
    protected String getContentTitle() {
        return getString(R.string.voxeet_foreground_content_title);
    }

    @Override
    protected Class<? extends Activity> getActivityClass() {
        return SystemServiceFactory.getAppCompatActivity();
    }

}
