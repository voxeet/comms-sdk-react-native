package io.dolby.sdk.reactnative.mapper

import com.facebook.react.bridge.ReadableMap
import com.voxeet.sdk.json.internal.MetadataHolder
import com.voxeet.sdk.json.internal.ParamsHolder
import com.voxeet.sdk.services.builders.ConferenceCreateOptions
import io.dolby.sdk.reactnative.mapper.ConferenceCommonConstants.CONFERENCE_PARAMS_DOLBY_VOICE
import io.dolby.sdk.reactnative.mapper.ConferenceCommonConstants.CONFERENCE_PARAMS_LIVE_RECORDING
import io.dolby.sdk.reactnative.mapper.ConferenceCommonConstants.CONFERENCE_PARAMS_RTCP_MODE
import io.dolby.sdk.reactnative.mapper.ConferenceCommonConstants.CONFERENCE_PARAMS_TTL
import io.dolby.sdk.reactnative.mapper.ConferenceCommonConstants.CONFERENCE_PARAMS_VIDEO_CODEC
import io.dolby.sdk.reactnative.utils.RnCollections.getOptionalBoolean
import io.dolby.sdk.reactnative.utils.RnCollections.getOptionalInt

/**
 * Provides a method that maps React Native model to [ConferenceCreateOptions] model.
 */
class ConferenceCreateOptionsMapper {
  /**
   * Creates a [ConferenceCreateOptions] based on provided `options`.
   *
   * @param optionsMap options to set (conference alias, params)
   * @return [ConferenceCreateOptions]
   */
  fun fromNative(optionsMap: ReadableMap?): ConferenceCreateOptions {
    val metadataHolder = MetadataHolder()
    val paramsHolder = optionsMap.getConferenceParamsHolder()
    return ConferenceCreateOptions.Builder()
      .setMetadataHolder(metadataHolder)
      .setParamsHolder(paramsHolder)
      .setConferenceAlias(optionsMap?.getString(CONFERENCE_CREATE_OPTIONS_ALIAS))
      .build()
  }

  private fun ReadableMap?.getConferenceParamsHolder(): ParamsHolder {
    val paramsHolder = ParamsHolder()

    this?.getMap(CONFERENCE_CREATE_OPTIONS_PARAMS)?.let { paramsMap ->
      paramsMap.getString(CONFERENCE_PARAMS_VIDEO_CODEC)
        ?.let(paramsHolder::setVideoCodec)
      paramsMap.getOptionalInt(CONFERENCE_PARAMS_TTL)
        ?.let { paramsHolder.putValue(CONFERENCE_PARAMS_TTL, it) }
      paramsMap.getString(CONFERENCE_PARAMS_RTCP_MODE)
        ?.let { paramsHolder.putValue(CONFERENCE_PARAMS_RTCP_MODE, it) }
      paramsMap.getOptionalBoolean(CONFERENCE_PARAMS_LIVE_RECORDING)
        ?.let { paramsHolder.putValue(CONFERENCE_PARAMS_LIVE_RECORDING, it) }
      paramsMap.getOptionalBoolean(CONFERENCE_PARAMS_DOLBY_VOICE)
        ?.let { paramsHolder.putValue(CONFERENCE_PARAMS_DOLBY_VOICE, it) }
    }

    return paramsHolder
  }

  companion object {
    const val CONFERENCE_CREATE_OPTIONS_ALIAS = "alias"
    const val CONFERENCE_CREATE_OPTIONS_PARAMS = "params"
  }
}
