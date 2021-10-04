package io.dolby.sdk.reactnative.utils;


import com.facebook.react.bridge.ReadableMap;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

/**
 * Provides methods that extract various data types (like {@link Integer} or {@link Boolean}
 * from React Native models (like {@link ReadableMap}).
 */
public class RNCollectionExtractor {

    @Nullable
    public Integer getInteger(@NotNull ReadableMap map, @NotNull String key) {
        return map.hasKey(key) ? map.getInt(key) : null;
    }

    public boolean getBoolean(@NotNull ReadableMap map, @NotNull String key) {
        return map.hasKey(key) && map.getBoolean(key);
    }

    @Nullable
    public ReadableMap getMap(@NotNull ReadableMap map, @NotNull String key) {
        return map.hasKey(key) ? map.getMap(key) : null;
    }

    @Nullable
    public String getString(@NotNull ReadableMap map, @NotNull String key) {
        return (map.hasKey(key)) ? map.getString(key) : null;
    }

    public boolean hasKey(@NotNull ReadableMap map, @NotNull String key) {
        return map.hasKey(key);
    }
}