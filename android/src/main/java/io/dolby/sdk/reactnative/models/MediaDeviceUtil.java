package io.dolby.sdk.reactnative.models;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.voxeet.android.media.MediaStream;
import com.voxeet.audio2.devices.MediaDevice;

import io.dolby.sdk.reactnative.video.RNVideoViewManager;

public final class MediaDeviceUtil {

    private final static String ID = "id";
    private final static String NAME = "name";
    private final static String DEVICE_TYPE = "deviceType";
    private final static String CONNECTION_STATE = "connectionState";
    private final static String PLATFORM_CONNECTION_STATE = "platformConnectionState";


    private MediaDeviceUtil() {

    }

    @NonNull
    public static WritableArray toMap(@Nullable Iterable<MediaDevice> devices) {
        WritableNativeArray array = new WritableNativeArray();
        if (null != devices) {
            for (MediaDevice device : devices) {
                array.pushMap(toMap(device));
            }
        }
        return array;
    }

    @NonNull
    public static WritableMap toMap(@NonNull MediaDevice device) {
        WritableMap map = new WritableNativeMap();
        intoMap(device, map);
        return map;
    }

    @NonNull
    public static void intoMap(@NonNull MediaDevice device, @NonNull WritableMap map) {
        map.putString(MediaDeviceUtil.ID, device.id());
        map.putString(MediaDeviceUtil.NAME, device.name());
        map.putString(MediaDeviceUtil.DEVICE_TYPE, device.deviceType().name());
        map.putString(MediaDeviceUtil.CONNECTION_STATE, device.connectionState().name());
        map.putString(MediaDeviceUtil.PLATFORM_CONNECTION_STATE, device.platformConnectionState().name());
    }

    @Nullable
    public static String id(@Nullable ReadableMap map) {
        if (null == map) return null;
        if (map.hasKey(ID) && !map.isNull(ID)) return map.getString(ID);
        return null;
    }
}
