package io.dolby.sdk.reactnative.utils

import android.util.Log
import java.util.concurrent.Callable

typealias VoxeetPromise<T> = com.voxeet.promise.Promise<T>
typealias ReactPromise = com.facebook.react.bridge.Promise

/**
 * Provide extension methods that simplify:
 * <p>- creation of [VoxeetPromise] from Java callable
 * <p>- joining [VoxeetPromise]'s and [ReactPromise]'s</p>
 */
object Promises {

    private val TAG = Promises.javaClass.simpleName

    @JvmStatic
    fun <T> promise(callable: Callable<T>): VoxeetPromise<T> {
        return VoxeetPromise { solver ->
            try {
                solver.resolve(callable.call())
            } catch (cause: Exception) {
                Log.w(TAG, cause.message, cause)
                solver.reject(cause)
            }
        }
    }

    fun <T> VoxeetPromise<T>.forward(promise: ReactPromise) {
        then(promise::resolve).error(promise::reject)
    }
}
