package io.dolby.sdk.reactnative.models;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.voxeet.android.media.MediaStream;
import com.voxeet.sdk.models.v1.File;
import com.voxeet.sdk.models.v1.FilePresentationConverted;
import com.voxeet.sdk.services.presentation.file.FilePresentation;
import com.voxeet.sdk.services.presentation.video.VideoPresentation;
import com.voxeet.sdk.utils.Opt;

import io.dolby.sdk.reactnative.utils.RNUtils;
import io.dolby.sdk.reactnative.video.RNVideoViewManager;

public final class PresentationUtil {

    public final static String KEY = "key";
    public final static String NB_PAGE = "nbPage";
    public final static String PAGE = "page";
    public final static String STATE = "state";
    public final static String URL = "url";

    public final static String FILE_ID = "fileId";
    public final static String NB_IMAGE_CONVERTED = "nbImageConverted";
    public final static String NAME = "name";
    public final static String SIZE = "size";

    public final static String LAST_SEEK_TIMESTAMP = "lastSeekTimestamp";

    private PresentationUtil() {

    }

    @NonNull
    public static WritableMap toMap(@NonNull FilePresentation filePresentation) {
        WritableMap map = new WritableNativeMap();
        map.putString(PresentationUtil.KEY, filePresentation.key);
        map.putInt(PresentationUtil.NB_PAGE, filePresentation.nbPage);
        map.putInt(PresentationUtil.PAGE, filePresentation.page);
        map.putString(PresentationUtil.STATE, filePresentation.state.name());
        map.putString(PresentationUtil.URL, filePresentation.url);
        return map;
    }

    public static FilePresentationConverted toFilePresentationConverted(ReadableMap body) {
        FilePresentationConverted converted = new FilePresentationConverted();
        converted.nbImageConverted = RNUtils.getInteger(body, NB_IMAGE_CONVERTED);
        converted.fileId = RNUtils.getString(body, FILE_ID);
        converted.name = RNUtils.getString(body, NAME);
        converted.size = RNUtils.getInteger(body, SIZE);
        return converted;
    }

    public static FilePresentation toFilePresentation(ReadableMap body) {
        return new FilePresentation(
                Opt.of(RNUtils.getString(body, KEY)).or(""),
                Opt.of(RNUtils.getString(body, URL)).or("")
        );
    }

    public static WritableMap toMap(VideoPresentation videoPresentation) {
        if (null == videoPresentation) return null;
        WritableMap map = new WritableNativeMap();
        map.putString(PresentationUtil.KEY, videoPresentation.key);
        map.putDouble(PresentationUtil.LAST_SEEK_TIMESTAMP, videoPresentation.lastSeekTimestamp);
        map.putString(PresentationUtil.STATE, videoPresentation.state.name());
        map.putString(PresentationUtil.URL, videoPresentation.url);
        return map;
    }
}
