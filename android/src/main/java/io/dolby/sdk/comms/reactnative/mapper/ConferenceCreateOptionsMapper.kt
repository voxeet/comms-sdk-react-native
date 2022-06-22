package io.dolby.sdk.comms.reactnative.mapper

import com.facebook.react.bridge.ReadableMap
import com.voxeet.sdk.json.internal.MetadataHolder
import com.voxeet.sdk.json.internal.ParamsHolder
import com.voxeet.sdk.services.builders.ConferenceCreateOptions
import com.voxeet.sdk.services.conference.spatialisation.SpatialAudioStyle
import io.dolby.sdk.comms.reactnative.mapper.ConferenceCommonConstants.CONFERENCE_PARAMS_DOLBY_VOICE
import io.dolby.sdk.comms.reactnative.mapper.ConferenceCommonConstants.CONFERENCE_PARAMS_LIVE_RECORDING
import io.dolby.sdk.comms.reactnative.mapper.ConferenceCommonConstants.CONFERENCE_PARAMS_RTCP_MODE
import io.dolby.sdk.comms.reactnative.mapper.ConferenceCommonConstants.CONFERENCE_PARAMS_SPATIAL_AUDIO_STYLE
import io.dolby.sdk.comms.reactnative.mapper.ConferenceCommonConstants.CONFERENCE_PARAMS_TTL
import io.dolby.sdk.comms.reactnative.mapper.ConferenceCommonConstants.CONFERENCE_PARAMS_VIDEO_CODEC
import io.dolby.sdk.comms.reactnative.utils.RnCollections.getOptionalBoolean
import io.dolby.sdk.comms.reactnative.utils.RnCollections.getOptionalInt

/**
 * Provides a method that maps React Native model to [ConferenceCreateOptions] model.
 */
class ConferenceCreateOptionsMapper {
  /**
   * Creates a [ConferenceCreateOptions] based on provided `options`.
   *
   * @param  optionsRN options to set (conference alias, params)
   * @return [ConferenceCreateOptions]
   */
  fun fromRN(optionsRN: ReadableMap?) = ConferenceCreateOptions.Builder()
    .setMetadataHolder(MetadataHolder())
    .setParamsHolder(optionsRN.getConferenceParamsHolder())
    .setConferenceAlias(optionsRN?.getString(CONFERENCE_CREATE_OPTIONS_ALIAS))
    .build()

  private fun ReadableMap?.getConferenceParamsHolder(): ParamsHolder {
    val paramsHolder = ParamsHolder()

    this?.getMap(CONFERENCE_CREATE_OPTIONS_PARAMS)?.let { paramsMap ->
      paramsMap.getString(CONFERENCE_PARAMS_VIDEO_CODEC)
        ?.let(paramsHolder::setVideoCodec)
      paramsMap.getString(CONFERENCE_PARAMS_SPATIAL_AUDIO_STYLE)
        ?.let { spatialAudioStyleFromRN(it) }
        ?.let { paramsHolder.setSpatialAudioStyle(it) }
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

  private fun spatialAudioStyleFromRN(style: String) = when (style) {
    "INDIVIDUAL" -> SpatialAudioStyle.INDIVIDUAL
    "SHARED" -> SpatialAudioStyle.SHARED
    "DISABLED" -> SpatialAudioStyle.DISABLED
    else -> null
  }

  companion object {
    private const val CONFERENCE_CREATE_OPTIONS_ALIAS = "alias"
    private const val CONFERENCE_CREATE_OPTIONS_PARAMS = "params"
  }
}
