package io.dolby.sdk.reactnative.events;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.voxeet.sdk.push.center.subscription.event.ConferenceCreatedNotificationEvent;
import com.voxeet.sdk.push.center.subscription.event.ConferenceEndedNotificationEvent;
import com.voxeet.sdk.push.center.subscription.event.InvitationReceivedNotificationEvent;
import com.voxeet.sdk.push.center.subscription.event.ParticipantJoinedNotificationEvent;
import com.voxeet.sdk.push.center.subscription.event.ParticipantLeftNotificationEvent;

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

import io.dolby.sdk.reactnative.models.NotificationUtil;

public class NotificationEventEmitter extends AbstractEventEmitter {

    public NotificationEventEmitter(@NonNull ReactContext context, @NonNull EventBus eventBus) {
        super(context, eventBus);

        register(new EventFormatterCallback<ConferenceCreatedNotificationEvent>(ConferenceCreatedNotificationEvent.class) {
            @Override
            void transform(@NonNull WritableMap map, @NonNull ConferenceCreatedNotificationEvent instance) {
                NotificationUtil.toMap(map, instance);
            }

            @NonNull
            @Override
            String name() {
                return "ConferenceCreatedNotification";
            }
        }).register(new EventFormatterCallback<ConferenceEndedNotificationEvent>(ConferenceEndedNotificationEvent.class) {
            @Override
            void transform(@NonNull WritableMap map, @NonNull ConferenceEndedNotificationEvent instance) {
                NotificationUtil.toMap(map, instance);
            }

            @NonNull
            @Override
            String name() {
                return "ConferenceEndedNotification";
            }
        }).register(new EventFormatterCallback<InvitationReceivedNotificationEvent>(InvitationReceivedNotificationEvent.class) {
            @Override
            void transform(@NonNull WritableMap map, @NonNull InvitationReceivedNotificationEvent instance) {
                NotificationUtil.toMap(map, instance);
            }

            @NonNull
            @Override
            String name() {
                return "InvitationReceivedNotification";
            }
        }).register(new EventFormatterCallback<ParticipantJoinedNotificationEvent>(ParticipantJoinedNotificationEvent.class) {
            @Override
            void transform(@NonNull WritableMap map, @NonNull ParticipantJoinedNotificationEvent instance) {
                NotificationUtil.toMap(map, instance);
            }

            @NonNull
            @Override
            String name() {
                return "ParticipantJoinedNotification";
            }
        }).register(new EventFormatterCallback<ParticipantLeftNotificationEvent>(ParticipantLeftNotificationEvent.class) {
            @Override
            void transform(@NonNull WritableMap map, @NonNull ParticipantLeftNotificationEvent instance) {
                NotificationUtil.toMap(map, instance);
            }

            @NonNull
            @Override
            String name() {
                return "ParticipantLeftNotification";
            }
        });
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void onEvent(ConferenceCreatedNotificationEvent event) {
        emit(event);
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void onEvent(ConferenceEndedNotificationEvent event) {
        emit(event);
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void onEvent(InvitationReceivedNotificationEvent event) {
        emit(event);
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void onEvent(ParticipantJoinedNotificationEvent event) {
        emit(event);
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void onEvent(ParticipantLeftNotificationEvent event) {
        emit(event);
    }
}
