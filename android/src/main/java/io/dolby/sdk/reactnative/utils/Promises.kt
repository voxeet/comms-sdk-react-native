package io.dolby.sdk.reactnative.utils

import android.util.Log
import com.voxeet.promise.PromiseInOut
import com.voxeet.promise.solve.ThenPromise
import com.voxeet.promise.solve.ThenValue
import com.voxeet.promise.solve.ThenVoid

typealias VoxeetPromise<T> = com.voxeet.promise.Promise<T>
typealias ReactPromise = com.facebook.react.bridge.Promise

/**
 * Provide extension methods that simplify:
 * <p>- creation of [VoxeetPromise]
 * <p>- joining [VoxeetPromise]'s and [ReactPromise]'s</p>
 */
object Promises {

  private val TAG = Promises.javaClass.simpleName

  /**
   * Creates promise from Java Callable
   * Resolves value returned by callable, rejects in case of null value
   *
   * @param callable         callable to execute
   * @param nullErrorMessage error message provider in case of rejection
   */
  @JvmStatic
  fun <T> promise(
    callable: () -> T?,
    nullErrorMessage: () -> String = { "Required value is null" }
  ): VoxeetPromise<T> {
    return VoxeetPromise { solver ->
      try {
        callable.invoke()?.let {
          solver.resolve(it)
        } ?: solver.reject(Exception(nullErrorMessage()))
      } catch (cause: Exception) {
        Log.w(TAG, cause.message, cause)
        solver.reject(cause)
      }
    }
  }

  /**
   * Creates promise from object
   * Rejects in case of null object supplied
   *
   * @param value            object to return
   * @param nullErrorMessage error message provider in case of rejection
   */
  @JvmStatic
  fun <T> promise(value: T?, nullErrorMessage: () -> String = { "Required value is null" }): VoxeetPromise<T> {
    return value?.let { VoxeetPromise.resolve(value) }
      ?: VoxeetPromise.reject(Exception(nullErrorMessage()))
  }

  /**
   * Throws [IllegalArgumentException] if emitted value is null
   *
   * ```
   * promiseThatCanEmitNull
   *  .rejectIfNull()
   * ```
   *
   * @param nullErrorMessage error message provider in case of null value
   */
  fun <T> VoxeetPromise<T?>.rejectIfNull(nullErrorMessage: () -> String = { "Required value is null" }): PromiseInOut<T?, T> =
    thenValue { requireNotNull(it, nullErrorMessage) }

  /**
   * Throws [IllegalArgumentException] if emitted value is null
   *
   * ```
   * Promises.promise(Obj)
   *  .rejectIfNull()
   * ```
   *
   * @param nullErrorMessage error message provider in case of null value
   */
  fun <T, R> PromiseInOut<T, R?>.rejectIfNull(nullErrorMessage: () -> String = { "Required value is null" }): PromiseInOut<R?, R> =
    thenValue { requireNotNull(it, nullErrorMessage) }

  /**
   * Util method to simplify building promises chain mapping
   *
   * ```
   * Promises.promise(Obj)
   *  .thenValue { obj -> Obj2 }
   * ```
   *
   * @param thenValue [ThenValue] mapped value provider
   */
  fun <T, R> VoxeetPromise<T>.thenValue(thenValue: ThenValue<T, R>): PromiseInOut<T, R> = then(thenValue)

  /**
   * Util method to simplify building promises chain mapping
   *
   * ```
   * Promises.promise(Obj)
   *  .thenValue { obj -> Obj2 }
   * ```
   *
   * @param thenValue [ThenValue] mapped value provider
   */
  fun <T, R, K> PromiseInOut<T, R>.thenValue(thenValue: ThenValue<R, K>): PromiseInOut<R, K> = then(thenValue)

  /**
   * Util method to simplify building promises chain
   *
   * ```
   * Promises.promise(Obj)
   *  .thenPromise { obj -> FurtherPromise(obj) }
   * ```
   *
   * @param thenPromise [ThenPromise] further promise provider
   */
  fun <T, R> VoxeetPromise<T>.thenPromise(thenPromise: ThenPromise<T, R>): PromiseInOut<T, R> = then(thenPromise)

  /**
   * Util method to simplify building promises chain
   *
   * ```
   * Promises.promise(Obj)
   *  .thenPromise { obj -> FurtherPromise(obj) }
   * ```
   *
   * @param thenPromise [ThenPromise] further promise provider
   */
  fun <T, R, K> PromiseInOut<T, R>.thenPromise(thenPromise: ThenPromise<R, K>): PromiseInOut<R, K> = then(thenPromise)

  /**
   * Util method to simplify forwarding [VoxeetPromise] to [ReactPromise]
   *
   * @param promise          [ReactPromise] to forward
   * @param ignoreReturnType flag if [ReactPromise] returns null
   */
  fun <T> VoxeetPromise<T>.forward(promise: ReactPromise, ignoreReturnType: Boolean = false) =
    then(ThenVoid { result ->
      if (ignoreReturnType) promise.resolve(null) else promise.resolve(result)
    }).error {
      Log.d(TAG, "Dispatch error", it)
      promise.reject(it)
    }

  /**
   * Util method to simplify forwarding [PromiseInOut] to [ReactPromise]
   *
   * @param promise          [ReactPromise] to forward
   * @param ignoreReturnType flag if [ReactPromise] returns null
   */
  fun <T, R> PromiseInOut<T, R>.forward(promise: ReactPromise, ignoreReturnType: Boolean = false) =
    then<Void>(ThenVoid { result ->
      if (ignoreReturnType) promise.resolve(null) else promise.resolve(result)
    }).error {
      Log.d(TAG, "Dispatch error", it)
      promise.reject(it)
    }

}
