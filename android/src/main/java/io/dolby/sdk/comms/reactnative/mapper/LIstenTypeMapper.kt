package io.dolby.sdk.comms.reactnative.mapper

import com.voxeet.sdk.models.ListenType
import java.lang.Exception
import java.security.InvalidParameterException

object ListenTypeMapper {
  fun convertToRN(listenType: ListenType) = when(listenType) {
    ListenType.REGULAR -> "REGULAR"
    ListenType.MIXED -> "MIXED"
  }

  fun convertToModel(listenRNType: String) = when(listenRNType) {
    REGULAR -> ListenType.REGULAR
    MIXED -> ListenType.MIXED
    else -> throw InvalidParameterException("Invalid value for listen type")
  }

  private const val REGULAR = "REGULAR"
  private const val MIXED = "MIXED"
}
