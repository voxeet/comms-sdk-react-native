package io.dolby.sdk.reactnative.android.permissions

/**
 *
 */
data class Rationale(
  val title: String,
  val message: String,
  val positiveButton: String,
  val negativeButton: String? = null
)
