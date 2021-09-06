package io.dolby.sdk.reactnative.utils;

import androidx.annotation.NonNull;

import java.util.concurrent.locks.ReentrantLock;

public class Lock {

    public static void lock(@NonNull ReentrantLock lock) {
        try {
            lock.lock();
        } catch (Exception e) {

        }
    }

    public static void unlock(@NonNull ReentrantLock lock) {
        try {
            if (lock.isLocked())
                lock.unlock();
        } catch (Exception e) {

        }
    }


}
