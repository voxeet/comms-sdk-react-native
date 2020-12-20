package io.dolby.sdk.models;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.voxeet.android.media.MediaStream;

import io.dolby.sdk.video.RNVoxeetSDKVideoViewManager;

public final class MediaStreamUtil {
    private MediaStreamUtil() {

    }

    @NonNull
    public static WritableMap toMap(@NonNull MediaStream stream) {
        WritableMap map = new WritableNativeMap();
        map.putString(RNVoxeetSDKVideoViewManager.PEER_ID, stream.peerId());
        map.putString(RNVoxeetSDKVideoViewManager.LABEL, stream.peerId());
        map.putString(RNVoxeetSDKVideoViewManager.STREAM_TYPE, stream.getType().name());
        return map;
    }
}
