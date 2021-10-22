package io.dolby.sdk.reactnative.android.permissions

/**
 * The [Rationale] model which contains information shown as permission explanation UI to the user.
 *
 * Rational is used to show explanation:
 * - before showing system permission dialog [RationaleProvider.getRequestRationale]
 * - permanently denied permission [RationaleProvider.getPermanentlyDeniedRationale]
 */
data class Rationale(
  val title: String,
  val message: String,
  val positiveButton: String,
  val negativeButton: String? = null
)
