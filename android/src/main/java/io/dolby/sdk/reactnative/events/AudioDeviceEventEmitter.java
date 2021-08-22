package io.dolby.sdk.reactnative.events;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.voxeet.audio2.devices.MediaDevice;
import com.voxeet.sdk.events.error.CameraSwitchErrorEvent;
import com.voxeet.sdk.events.error.GetConferenceStatusErrorEvent;
import com.voxeet.sdk.events.error.ParticipantAddedErrorEvent;
import com.voxeet.sdk.events.error.PermissionRefusedEvent;
import com.voxeet.sdk.events.error.SdkLogoutErrorEvent;
import com.voxeet.sdk.events.sdk.CameraSwitchSuccessEvent;
import com.voxeet.sdk.events.sdk.ConferenceStatusUpdatedEvent;
import com.voxeet.sdk.events.sdk.IncomingCallEvent;
import com.voxeet.sdk.events.sdk.QualityIndicators;
import com.voxeet.sdk.events.sdk.SdkLogoutSuccessEvent;
import com.voxeet.sdk.events.sdk.StartScreenShareAnswerEvent;
import com.voxeet.sdk.events.sdk.StopScreenShareAnswerEvent;
import com.voxeet.sdk.json.ConferenceDestroyedPush;
import com.voxeet.sdk.json.ConferenceEnded;
import com.voxeet.sdk.json.MediaResponse;
import com.voxeet.sdk.json.RecordingStatusUpdatedEvent;

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

import java.util.List;

import io.dolby.sdk.reactnative.models.MediaDeviceUtil;

public class AudioDeviceEventEmitter extends AbstractEventEmitter {

    public AudioDeviceEventEmitter(@NonNull ReactContext context, @NonNull EventBus eventBus) {
        super(context, eventBus);

        register(new EventFormatterCallback<MediaDevice>(MediaDevice.class) {
            @Override
            void transform(@NonNull WritableMap map, @NonNull MediaDevice instance) {
                MediaDeviceUtil.intoMap(instance, map);
            }

            @NonNull
            @Override
            String name() {
                return "MediaDevices";
            }
        });
    }

    public void emitList(List<MediaDevice> devices) {
        super.emit(devices);
    }
}
