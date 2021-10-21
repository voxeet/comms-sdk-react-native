package io.dolby.sdk.reactnative.utils

import android.util.Log

object IAPILog {
  fun log(tag: String, text: String) {
    Log.d("IAPILog", ":: $tag // $text")
  }
}
