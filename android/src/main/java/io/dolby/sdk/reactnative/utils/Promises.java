package io.dolby.sdk.reactnative.utils;

import android.util.Log;

import java.util.concurrent.Callable;

/**
 * Helps to wrap a call that can throw an exception with a chain-friendly way. Example:
 * <p>
 * <pre>
 * Promises.promise(() -> toParticipant(participantMap)) // can thrown an exception
 *      .then(conferenceService::kick)
 *      .then(promise::resolve)
 *      .error(promise::reject);
 * </pre>
 */
public class Promises {

    private static final String TAG = Promises.class.getSimpleName();

    private Promises() {
    }

    public static <T> com.voxeet.promise.Promise<T> promise(Callable<T> callable) {
        return new com.voxeet.promise.Promise<>(solver -> {
            try {
                solver.resolve(callable.call());
            } catch (Exception cause) {
                Log.w(TAG, cause.getMessage(), cause);
                solver.reject(cause);
            }
        });
    }
}
