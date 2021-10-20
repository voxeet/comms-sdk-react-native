package io.dolby.sdk.reactnative.utils

import java.util.concurrent.locks.ReentrantLock

fun ReentrantLock.lockCatching() {
  try {
    lock()
  } catch (e: Exception) {
    // no-op
  }
}

fun ReentrantLock.unlockCatching() {
  try {
    if (isLocked) unlock()
  } catch (e: Exception) {
    // no-op
  }
}
