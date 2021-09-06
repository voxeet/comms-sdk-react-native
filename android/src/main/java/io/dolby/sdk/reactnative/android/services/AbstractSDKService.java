package io.dolby.sdk.reactnative.android.services;

import android.app.Activity;
import android.app.Notification;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Handler;
import android.util.Log;

import androidx.annotation.DrawableRes;
import androidx.annotation.NonNull;
import androidx.annotation.StringRes;
import androidx.core.app.NotificationCompat;

import com.voxeet.VoxeetSDK;
import com.voxeet.sdk.events.sdk.ConferenceStatusUpdatedEvent;
import com.voxeet.sdk.json.ConferenceDestroyedPush;
import com.voxeet.sdk.json.ConferenceEnded;
import com.voxeet.sdk.push.utils.NotificationHelper;
import com.voxeet.sdk.services.ConferenceService;
import com.voxeet.sdk.services.conference.information.ConferenceInformation;
import com.voxeet.sdk.services.conference.information.ConferenceStatus;
import com.voxeet.sdk.utils.Opt;

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

import javax.annotation.Nullable;

import io.dolby.sdk.reactnative.R;

/**
 * This will be set inside the SDK in the future
 */
public abstract class AbstractSDKService<BINDER extends SDKBinder> extends Service {

    private static final String TAG = AbstractSDKService.class.getSimpleName();

    @Nullable
    protected EventBus eventBus;
    private Handler handler;

    @StringRes
    private int lastForeground;
    protected ConferenceStatus currentConferenceState;

    @NonNull
    private ConferenceService conferenceService;

    @Nullable
    public final VoxeetSDK sdk() {
        return VoxeetSDK.instance();
    }

    @NonNull
    public abstract BINDER onBind(@NonNull Intent intent);

    public AbstractSDKService() {
    }

    private Runnable stopForeground = new Runnable() {
        @Override
        public void run() {
            stopForeground(true);
        }
    };

    @Override
    public void onCreate() {
        super.onCreate();

        AbstractSDKService.createNotificationChannel(this);
        conferenceService = VoxeetSDK.conference();

        lastForeground = -1;

        handler = new Handler();

        checkEventBus();

        NotificationHelper.createNotificationChannel(this);

        if (conferenceService.isLive())
            setForegroundState(getConferenceStateJoined());

        currentConferenceState = null;
    }

    @NonNull
    protected ConferenceStatus getConferenceStateFromSDK() {
        ConferenceInformation info = conferenceService.getCurrentConference();
        if (null != info) {
            return info.getConferenceState();
        }

        return ConferenceStatus.DEFAULT;
    }

    @NonNull
    public ConferenceStatus getConferenceState() {
        ConferenceStatus state = currentConferenceState;
        if (null == state) state = getConferenceStateFromSDK();
        return state;
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void onEvent(@NonNull ConferenceStatusUpdatedEvent event) {
        switch (event.state) {
            case CREATING:
                setForegroundState(getConferenceStateCreating());
                break;
            case CREATED:
                setForegroundState(getConferenceStateCreated());
                break;
            case JOINING:
                setForegroundState(getConferenceStateJoining());
                break;
            case JOINED:
                setForegroundState(getConferenceStateJoined());
                break;
            case LEFT:
            case ERROR:
                setForegroundState(getConferenceStateLeft());
                stopForeground();
                break;
            default:

        }
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void onEvent(ConferenceDestroyedPush event) {
        setForegroundState(getConferenceStateEnd());
        stopForeground();
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void onEvent(ConferenceEnded event) {
        setForegroundState(getConferenceStateEnd());
        stopForeground();
    }

    @StringRes
    protected abstract int getConferenceStateCreating();

    @StringRes
    protected abstract int getConferenceStateCreated();

    @StringRes
    protected abstract int getConferenceStateJoining();

    @StringRes
    protected abstract int getConferenceStateJoined();

    @StringRes
    protected abstract int getConferenceStateJoinedError();

    @StringRes
    protected abstract int getConferenceStateLeft();

    @StringRes
    protected abstract int getConferenceStateEnd();

    protected void setForegroundState(@StringRes int string) {
        Class<? extends Activity> activity = getActivityClass();
        if (null != activity) {
            if (lastForeground == string) return;
            lastForeground = string;

            Intent notificationIntent = new Intent(this, getActivityClass());

            PendingIntent pendingIntent = PendingIntent.getActivity(this, 0,
                    notificationIntent, 0);

            Notification notification = new NotificationCompat.Builder(this, NotificationHelper.getChannelId(this))
                    .setSmallIcon(getSmallIcon())
                    .setContentTitle(getContentTitle())
                    .setContentText(getString(string))
                    .setContentIntent(pendingIntent).build();

            startForeground(getNotificationId(), notification);
        } else {
            Log.d(TAG, "setForegroundState: impossible to set foreground, activity is null");
        }
    }


    protected abstract int getNotificationId();

    @DrawableRes
    protected abstract int getSmallIcon();

    @NonNull
    protected abstract String getContentTitle();

    protected abstract Class<? extends Activity> getActivityClass();

    protected void stopForeground() {
        lastForeground = -1;

        if (Opt.of(eventBus).then(e -> e.isRegistered(this)).or(false)) {
            eventBus.unregister(this);
            //eventBus = null;
        }

        handler.removeCallbacks(stopForeground);
        stopForeground.run();
    }

    protected void checkEventBus() {
        eventBus = Opt.of(VoxeetSDK.instance()).then(VoxeetSDK::getEventBus).orNull();
        if (null != eventBus && !eventBus.isRegistered(this)) {
            eventBus.register(this);
        }
    }

    public static void createNotificationChannel(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationHelper.createNotificationChannel(context,
                    NotificationHelper.DEFAULT_ID,
                    context.getString(R.string.voxeet_channel_title),
                    context.getString(R.string.voxeet_channel_description),
                    0);
        }
    }
}
