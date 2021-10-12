package io.dolby.sdk.reactnative.services

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.voxeet.promise.solve.ThenVoid
import com.voxeet.sdk.services.RecordingService

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
    fun start(promise: Promise) {
        recordingService.start()
                .then(ThenVoid { value: Boolean? -> promise.resolve(value) })
                .error { throwable: Throwable? -> promise.reject(throwable) }
    }

    /**
     * Stops recording a conference.
     *
     * @param promise returns true if stop recording request succeed, false otherwise
     */
    @ReactMethod
    fun stop(promise: Promise) {
        recordingService.stop()
                .then(ThenVoid { value: Boolean? -> promise.resolve(value) })
                .error { throwable: Throwable? -> promise.reject(throwable) }
    }
}
