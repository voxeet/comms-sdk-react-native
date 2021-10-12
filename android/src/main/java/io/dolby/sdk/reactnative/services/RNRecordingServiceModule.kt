package io.dolby.sdk.reactnative.services

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.voxeet.sdk.services.RecordingService
import io.dolby.sdk.reactnative.utils.Promises.forward
import io.dolby.sdk.reactnative.utils.ReactPromise

/**
 * The RNRecordingServiceModule allows an application to record conferences by using the [start] and [stop] methods that turn the recording on and off.
 *
 * @constructor
 * Creates a bridge wrapper for [RecordingService].
 *
 * @param recordingService [RecordingService] from Android SDK
 * @param reactContext     react context
 */
class RNRecordingServiceModule(
        private val recordingService: RecordingService,
        reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "DolbyIoIAPIRecordingServiceModule"

    /**
     * Starts recording a conference.
     *
     * @param promise returns true if start recording request succeed, false otherwise
     */
    @ReactMethod
    fun start(promise: ReactPromise) {
        recordingService.start().forward(promise)
    }

    /**
     * Stops recording a conference.
     *
     * @param promise returns true if stop recording request succeed, false otherwise
     */
    @ReactMethod
    fun stop(promise: ReactPromise) {
        recordingService.stop().forward(promise)
    }
}
