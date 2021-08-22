
package io.dolby.sdk.reactnative.services;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.voxeet.VoxeetSDK;
import com.voxeet.audio2.devices.MediaDevice;
import com.voxeet.sdk.media.audio.SoundManager;
import com.voxeet.sdk.services.AudioService;
import com.voxeet.sdk.utils.Opt;

import org.greenrobot.eventbus.EventBus;

import java.util.ArrayList;
import java.util.List;

import io.dolby.sdk.reactnative.events.AudioDeviceEventEmitter;
import io.dolby.sdk.reactnative.models.MediaDeviceUtil;

public class RNAudioDeviceServiceModule extends ReactContextBaseJavaModule {

    private final AudioService service;
    private final AudioDeviceEventEmitter events;
    private List<MediaDevice> cached;

    private final SoundManager.Call<List<MediaDevice>> onNewDevices;

    public RNAudioDeviceServiceModule(
            AudioService service,
            EventBus eventBus,
            ReactApplicationContext reactContext) {
        super(reactContext);

        events = new AudioDeviceEventEmitter(reactContext, eventBus);
        cached = new ArrayList<>();

        this.service = service;
        this.onNewDevices = events::emitList;

        service.registerUpdateDevices(this.onNewDevices);
    }

    @Override
    public String getName() {
        return RNAudioDeviceServiceModule.class.getSimpleName();
    }

    @ReactMethod
    public void enumerateDevices(ReadableMap device, Promise promise) {
        service.enumerateDevices().then(mediaDevices -> {
            promise.resolve(MediaDeviceUtil.toMap(mediaDevices));
        }).error(promise::reject);
    }

    @ReactMethod
    public void currentMediaDevice(@NonNull Promise promise) {
        service.currentMediaDevice().then(mediaDevice -> {
            promise.resolve(MediaDeviceUtil.toMap(mediaDevice));
        }).error(promise::reject);
    }

    @ReactMethod
    public void connect(@Nullable ReadableMap map, @NonNull Promise promise) {
        String id = MediaDeviceUtil.id(map);
        MediaDevice device = Opt.of(id).then(this::cached).orNull();
        if (null != device) {
            service.disconnect(device).then(promise::resolve).error(promise::reject);
        } else {
            promise.resolve(false);
        }
    }

    @ReactMethod
    public void disconnect(@Nullable ReadableMap map, @NonNull Promise promise) {
        String id = MediaDeviceUtil.id(map);
        MediaDevice device = Opt.of(id).then(this::cached).orNull();
        if (null != device) {
            service.disconnect(device).then(promise::resolve).error(promise::reject);
        } else {
            promise.resolve(false);
        }
    }

    @ReactMethod
    public void checkOutputRoute(Promise promise) {
        service.checkOutputRoute();
        promise.resolve(true);
    }

    @ReactMethod
    public void requestAudioFocus(Promise promise) {
        service.requestAudioFocus();
        promise.resolve(true);
    }

    @ReactMethod
    public void abandonAudioFocusRequest(Promise promise) {
        service.abandonAudioFocusRequest();
        promise.resolve(true);
    }

    private void update(List<MediaDevice> mediaDevices) {
        // safe to assume it won't grow
        for (MediaDevice newDevice : mediaDevices) {
            if (!contains(cached, newDevice)) cached.add(newDevice);
        }
    }

    private MediaDevice cached(String id) {
        return get(cached, id);
    }

    private MediaDevice get(List<MediaDevice> mediaDevices, String id) {
        if (null == id) return null;

        for (MediaDevice mediaDevice : mediaDevices) {
            if (id.equals(mediaDevice.id())) {
                return mediaDevice;
            }
        }
        return null;
    }

    private boolean contains(List<MediaDevice> mediaDevices, MediaDevice device) {
        for (MediaDevice mediaDevice : mediaDevices) {
            if (Opt.of(mediaDevice).then(MediaDevice::id).or("").equals(device.id())) {
                return true;
            }
        }
        return false;
    }
}