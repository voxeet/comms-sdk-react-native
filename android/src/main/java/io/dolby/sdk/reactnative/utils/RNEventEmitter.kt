package io.dolby.sdk.reactnative.utils

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.voxeet.VoxeetSDK

/**
 * Any module needs to send events to JS must implement this interface
 * @see [Sending Events to JavaScript](https://reactnative.dev/docs/native-modules-android#sending-events-to-javascript)
 */
interface RNEventEmitter {

    /**
     * Record the count of listeners
     */
    var listenerCount: Int

    /**
     * Default implementation of emitting event, nothing will be sent if no listener is registered
     * @param eventName the name of the event
     * @param data the event data
     */
    fun send(context: ReactApplicationContext, eventName: String, data: WritableMap) {
        if (hasListener()) {
            context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                    .emit(eventName, data)
        }
    }

    /**
     * Invoked when adding listener from JS side
     * @param eventName the name of event
     */
    fun addListener(eventName: String) {
        if (listenerCount == 0) {
            VoxeetSDK.instance().register(this)
        }
        listenerCount += 1;
    }

    /**
     * Invoked when remove listeners from JS side
     * @param count how many listeners are removed
     */
    fun removeListeners(count: Int) {
        if (listenerCount == 0) return
        listenerCount -= 1;
        if (listenerCount == 0) {
            VoxeetSDK.instance().unregister(this)
        }
    }

    fun hasListener(): Boolean = listenerCount > 0
}
