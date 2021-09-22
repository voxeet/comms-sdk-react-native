package io.dolby.sdk.reactnative.utils;

import android.util.Log;

import androidx.annotation.NonNull;

public class IAPILog {

    public static void log(@NonNull String tag, @NonNull String text) {
        Log.d("IAPILog", ":: " + tag + " // " + text);
    }
}
