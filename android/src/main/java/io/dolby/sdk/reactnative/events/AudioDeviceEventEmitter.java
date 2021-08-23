package io.dolby.sdk.reactnative.events;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.voxeet.audio2.devices.MediaDevice;

import org.greenrobot.eventbus.EventBus;

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
