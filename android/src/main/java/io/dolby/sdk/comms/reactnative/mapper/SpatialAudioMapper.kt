package io.dolby.sdk.comms.reactnative.mapper

import com.facebook.react.bridge.ReadableMap
import com.voxeet.android.media.spatialisation.SpatialDirection
import com.voxeet.android.media.spatialisation.SpatialPosition
import com.voxeet.android.media.spatialisation.SpatialScale

/**
 * Provides a methods that map spatial audio related models
 */
class SpatialAudioMapper {

  fun spatialPositionFromRN(spatialPositionRN: ReadableMap) = SpatialPosition(
    spatialPositionRN.getDouble(X_AXIS),
    spatialPositionRN.getDouble(Y_AXIS),
    spatialPositionRN.getDouble(Z_AXIS),
  )

  fun spatialScaleFromRN(spatialScaleRN: ReadableMap) = SpatialScale(
    spatialScaleRN.getDouble(X_AXIS),
    spatialScaleRN.getDouble(Y_AXIS),
    spatialScaleRN.getDouble(Z_AXIS),
  )

  fun spatialDirectionFromRN(spatialDirectionRN: ReadableMap) = SpatialDirection(
    spatialDirectionRN.getDouble(X_AXIS),
    spatialDirectionRN.getDouble(Y_AXIS),
    spatialDirectionRN.getDouble(Z_AXIS),
  )

  companion object {
    private const val X_AXIS = "x"
    private const val Y_AXIS = "y"
    private const val Z_AXIS = "z"
  }
}
