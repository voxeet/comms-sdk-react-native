package io.dolby.sdk.reactnative.utils;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReadableMap;

/**
 * Provides methods that extract various data types (like {@link Integer} or {@link Boolean}
 * from React Native models (like {@link ReadableMap}).
 */
public class RNCollectionExtractor {

    public int getInteger(@Nullable ReadableMap map, @NonNull String key) {
        try {
            return map != null && map.hasKey(key) ? map.getInt(key) : 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }

    public boolean getBoolean(@Nullable ReadableMap map, @NonNull String key) {
        try {
            return map != null && map.hasKey(key) && map.getBoolean(key);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    @Nullable
    public ReadableMap getMap(@Nullable ReadableMap map, @NonNull String key) {
        try {
            return map != null && map.hasKey(key) ? map.getMap(key) : null;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Nullable
    public String getString(@Nullable ReadableMap map, @NonNull String key) {
        try {
            if (map != null && map.hasKey(key)) return map.getString(key);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public boolean hasKey(@Nullable ReadableMap map, @NonNull String key) {
        return map != null && map.hasKey(key);
    }
}