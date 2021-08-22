
package io.dolby.sdk.reactnative.services;

import android.support.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.voxeet.promise.solve.ErrorPromise;
import com.voxeet.promise.solve.ThenVoid;
import com.voxeet.sdk.models.v1.FilePresentationConverted;
import com.voxeet.sdk.services.FilePresentationService;
import com.voxeet.sdk.services.SessionService;
import com.voxeet.sdk.services.presentation.file.FilePresentation;

import java.io.File;

import io.dolby.sdk.reactnative.models.ConferenceParticipantUtil;
import io.dolby.sdk.reactnative.models.PresentationUtil;
import io.dolby.sdk.reactnative.utils.RNUtils;

public class RNFilePresentationServiceModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private final FilePresentationService filePresentationService;

    public RNFilePresentationServiceModule(
            FilePresentationService filePresentationService,
            ReactApplicationContext reactContext) {
        super(reactContext);

        this.filePresentationService = filePresentationService;
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return RNFilePresentationServiceModule.class.getSimpleName();
    }


    @ReactMethod
    public void getImage(String fileId, int pageNumber, Promise promise) {
        String url = filePresentationService.getImage(fileId, pageNumber);
        promise.resolve(url);
    }

    @ReactMethod
    public void getThumbnail(String fileId, int pageNumber, Promise promise) {
        String url = filePresentationService.getThumbnail(fileId, pageNumber);
        promise.resolve(url);
    }

    @ReactMethod
    public void convertFile(String filePath, Promise promise) {
        try {
            File file = new File(filePath);
            filePresentationService.convertFile(file)
                    .then(filePresentation -> {
                        promise.resolve(PresentationUtil.toMap(filePresentation));
                    })
                    .error(promise::reject);
        } catch (Throwable throwable) {
            promise.reject(throwable);
        }
    }

    @ReactMethod
    public void start(ReadableMap body, Promise promise) {
        start(body, 0, promise);
    }

    @ReactMethod
    public void start(ReadableMap body, int position, Promise promise) {
        try {
            FilePresentationConverted converted = PresentationUtil.toFilePresentationConverted(body);

            filePresentationService.start(converted, position)
                    .then(filePresentation -> {
                        promise.resolve(PresentationUtil.toMap(filePresentation));
                    })
                    .error(promise::reject);
        } catch (Throwable throwable) {
            promise.reject(throwable);
        }
    }

    @ReactMethod
    public void stop(ReadableMap body, Promise promise) {
        try {
            FilePresentationConverted converted = PresentationUtil.toFilePresentationConverted(body);

            filePresentationService.stop(converted.fileId)
                    .then(filePresentation -> {
                        promise.resolve(PresentationUtil.toMap(filePresentation));
                    })
                    .error(promise::reject);
        } catch (Throwable throwable) {
            promise.reject(throwable);
        }
    }

    @ReactMethod
    public void update(ReadableMap body, int position, Promise promise) {
        try {
            FilePresentation converted = PresentationUtil.toFilePresentation(body);

            filePresentationService.update(converted.key, position)
                    .then(filePresentation -> {
                        promise.resolve(PresentationUtil.toMap(filePresentation));
                    })
                    .error(promise::reject);
        } catch (Throwable throwable) {
            promise.reject(throwable);
        }
    }

}