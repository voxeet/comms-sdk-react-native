package io.dolby.sdk.reactnative.utils;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

public class RNUtils {

    public static int getInteger(@Nullable ReadableMap map, @NonNull String key) {
        try {
            return null != map && map.hasKey(key) ? map.getInt(key) : 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }

    public static boolean getBoolean(@Nullable ReadableMap map, @NonNull String key) {
        try {
            return null != map && map.hasKey(key) && map.getBoolean(key);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    @Nullable
    public static ReadableMap getMap(@Nullable ReadableMap map, @NonNull String key) {
        try {
            return null != map && map.hasKey(key) ? map.getMap(key) : null;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static ReadableArray getArray(@Nullable ReadableMap map, String key) {
        try {
            return null != map && map.hasKey(key) ? map.getArray(key) : null;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Nullable
    public static String getString(@Nullable ReadableMap map, @NonNull String key) {
        try {
            if (null != map && map.hasKey(key)) return map.getString(key);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Nullable
    public static ReadableMap getMap(ReadableArray array, int index) {
        try {
            return array.getMap(index);
        } catch (Throwable e) {
            e.printStackTrace();
            return null;
        }
    }

    public static boolean hasKey(@Nullable ReadableMap map, String key) {
        return null != map && map.hasKey(key);
    }
}
