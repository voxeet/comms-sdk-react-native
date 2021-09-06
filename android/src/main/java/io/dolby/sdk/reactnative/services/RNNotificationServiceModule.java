
package io.dolby.sdk.reactnative.services;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.voxeet.sdk.json.ConferencePermission;
import com.voxeet.sdk.json.ParticipantInfo;
import com.voxeet.sdk.json.ParticipantInvited;
import com.voxeet.sdk.models.Conference;
import com.voxeet.sdk.push.center.subscription.register.BaseSubscription;
import com.voxeet.sdk.push.center.subscription.register.SubscribeConferenceCreated;
import com.voxeet.sdk.push.center.subscription.register.SubscribeConferenceEnded;
import com.voxeet.sdk.push.center.subscription.register.SubscribeInvitation;
import com.voxeet.sdk.push.center.subscription.register.SubscribeParticipantJoined;
import com.voxeet.sdk.push.center.subscription.register.SubscribeParticipantLeft;
import com.voxeet.sdk.services.ConferenceService;
import com.voxeet.sdk.services.NotificationService;

import org.greenrobot.eventbus.EventBus;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import io.dolby.sdk.reactnative.models.ConferenceParticipantUtil;
import io.dolby.sdk.reactnative.models.ConferenceUtil;
import io.dolby.sdk.reactnative.models.NotificationUtil;
import io.dolby.sdk.reactnative.utils.Execute;
import io.dolby.sdk.reactnative.utils.RNUtils;

public class RNNotificationServiceModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private final NotificationService notificationService;
    private final ConferenceService conferenceService;

    public RNNotificationServiceModule(
            ConferenceService conferenceService,
            NotificationService notificationService,
            ReactApplicationContext reactContext) {
        super(reactContext);

        this.conferenceService = conferenceService;
        this.notificationService = notificationService;
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return RNNotificationServiceModule.class.getSimpleName();
    }


    @ReactMethod
    public void subscribe(ReadableArray subscriptions, Promise promise) {
        action(notificationService::subscribe, subscriptions, promise);
    }

    @ReactMethod
    public void unsubscribe(ReadableArray subscriptions, Promise promise) {
        action(notificationService::unsubscribe, subscriptions, promise);
    }

    @ReactMethod
    public void action(Execute<List<BaseSubscription>, com.voxeet.promise.Promise<Boolean>> action, ReadableArray subscriptions, Promise promise) {
        try {
            List<BaseSubscription> subscriptionList = new ArrayList<>();

            for (int i = 0; i < subscriptions.size(); i++) {
                ReadableMap map = subscriptions.getMap(i);
                String subscription = RNUtils.getString(map, "type");
                String conferenceAlias = RNUtils.getString(map, "conferenceAlias");

                BaseSubscription base = toSubscription(subscription, conferenceAlias);
                subscriptionList.add(base);
            }

            action.call(subscriptionList)
                    .then(promise::resolve)
                    .error(promise::reject);
        } catch (Throwable throwable) {
            promise.reject(throwable);
        }
    }

    @ReactMethod
    public void invite(ReadableMap conf, ReadableArray participantInfos, Promise promise) {
        String conferenceId = RNUtils.getString(conf, "conferenceId");
        if (null == conferenceId) {
            promise.resolve(false);
            return;
        }

        Conference conference = conferenceService.getConference(conferenceId);
        List<ParticipantInfo> participants = new ArrayList<>();
        for (int i = 0; i < participantInfos.size(); i++) {
            ReadableMap temp = participantInfos.getMap(i);
            ParticipantInfo info = ConferenceParticipantUtil.toParticipantInfo(temp);
            participants.add(info);
        }

        notificationService.invite(conference, participants)
                .then(participants1 -> {
                    promise.resolve(true);
                })
                .error(promise::reject);
    }

    @ReactMethod
    public void inviteWithPermissions(ReadableMap conf, ReadableArray participantInvitedList, Promise promise) {
        String conferenceId = RNUtils.getString(conf, "conferenceId");
        if (null == conferenceId) {
            promise.resolve(false);
            return;
        }

        Conference conference = conferenceService.getConference(conferenceId);
        List<ParticipantInvited> participants = new ArrayList<>();
        for (int i = 0; i < participantInvitedList.size(); i++) {
            ReadableMap temp = participantInvitedList.getMap(i);
            ReadableMap participantInfoMap = RNUtils.getMap(temp, NotificationUtil.PARTICIPANT);
            ReadableArray permissionsArray = RNUtils.getArray(temp, NotificationUtil.PERMISSIONS);
            ParticipantInfo info = ConferenceParticipantUtil.toParticipantInfo(participantInfoMap);

            ParticipantInvited invitation = new ParticipantInvited(info);
            Set<ConferencePermission> set = new HashSet<>();

            if (null != permissionsArray) {
                for (int j = 0; j < permissionsArray.size(); j++) {
                    String name = permissionsArray.getString(j);
                    ConferencePermission perm = NotificationUtil.toConferencePermission(name);
                    if (null != perm) set.add(perm);
                }
            }

            invitation.setPermissions(set);

            participants.add(invitation);
        }

        notificationService.inviteWithPermissions(conference, participants)
                .then(participants1 -> {
                    promise.resolve(true);
                })
                .error(promise::reject);
    }

    @ReactMethod
    public void decline(ReadableMap map, ReadableArray participantInvitedList, Promise promise) {
        String conferenceId = RNUtils.getString(map, ConferenceUtil.CONFERENCE_ID);
        if (null == conferenceId) {
            promise.resolve(false);
            return;
        }
        Conference conference = conferenceService.getConference(conferenceId);

        notificationService.decline(conference)
                .then(promise::resolve)
                .error(promise::reject);
    }

    private BaseSubscription toSubscription(String subscription, String conferenceAlias) {
        if (null == subscription) return null;
        switch (subscription) {
            case "ConferenceCreated":
                return new SubscribeConferenceCreated(conferenceAlias);
            case "ConferenceEnded":
                return new SubscribeConferenceEnded(conferenceAlias);
            case "InvitationReceived":
                return new SubscribeInvitation();
            case "ParticipantJoined":
                return new SubscribeParticipantJoined(conferenceAlias);
            case "ParticipantLeft":
                return new SubscribeParticipantLeft(conferenceAlias);
            default:
                return null;
        }
    }
}
