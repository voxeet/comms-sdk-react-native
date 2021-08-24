package io.dolby.sdk.reactnative.utils;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

public class RNUtils {

    public static int getInteger(@NonNull ReadableMap map, @NonNull String key) {
        try {
            return map.hasKey(key) ? map.getInt(key) : 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }

    public static boolean getBoolean(@NonNull ReadableMap map, @NonNull String key) {
        try {
            return map.hasKey(key) && map.getBoolean(key);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    @Nullable
    public static ReadableMap getMap(@NonNull ReadableMap map, @NonNull String key) {
        try {
            return map.hasKey(key) ? map.getMap(key) : null;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static ReadableArray getArray(ReadableMap map, String key) {
        try {
            return map.hasKey(key) ? map.getArray(key) : null;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Nullable
    public static String getString(@NonNull ReadableMap map, @NonNull String key) {
        try {
            if (map.hasKey(key)) return map.getString(key);
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
}
