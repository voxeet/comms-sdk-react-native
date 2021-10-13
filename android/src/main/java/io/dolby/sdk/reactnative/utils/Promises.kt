package io.dolby.sdk.reactnative.utils

import android.util.Log
import com.voxeet.promise.PromiseInOut
import com.voxeet.promise.solve.ThenPromise
import com.voxeet.promise.solve.ThenValue
import com.voxeet.promise.solve.ThenVoid
import java.util.concurrent.Callable

typealias VoxeetPromise<T> = com.voxeet.promise.Promise<T>
typealias ReactPromise = com.facebook.react.bridge.Promise

/**
 * Provide extension methods that simplify:
 * <p>- creation of [VoxeetPromise]
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

    @JvmStatic
    fun <T> promise(value: T?, errorMessage: () -> String = { "Required value is null" }): VoxeetPromise<T> {
        return if (value != null) VoxeetPromise.resolve(value) else VoxeetPromise.reject(Exception(errorMessage()))
    }

    fun <T, R> VoxeetPromise<T>.thenValue(thenValue: ThenValue<T, R>): PromiseInOut<T, R> = then(thenValue)

    fun <T, R, K> PromiseInOut<T, R>.thenValue(thenValue: ThenValue<R, K>): PromiseInOut<R, K> = then(thenValue)

    fun <T, R> VoxeetPromise<T>.thenPromise(thenPromise: ThenPromise<T, R>): PromiseInOut<T, R> = then(thenPromise)

    fun <T, R, K> PromiseInOut<T, R>.thenPromise(thenPromise: ThenPromise<R, K>): PromiseInOut<R, K> = then(thenPromise)

    fun <T> VoxeetPromise<T>.forward(promise: ReactPromise, ignoreReturnType: Boolean = false) = then(ThenVoid { result ->
        if (ignoreReturnType) promise.resolve(null) else promise.resolve(result)
    }).error {
        Log.d(TAG, "Dispatch error", it)
        promise.reject(it)
    }

    fun <T, R> PromiseInOut<T, R>.forward(promise: ReactPromise, ignoreReturnType: Boolean = false) = then<Void>(ThenVoid { result ->
        if (ignoreReturnType) promise.resolve(null) else promise.resolve(result)
    }).error {
        Log.d(TAG, "Dispatch error", it)
        promise.reject(it)
    }

}
