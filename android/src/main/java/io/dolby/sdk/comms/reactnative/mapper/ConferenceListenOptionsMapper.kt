package io.dolby.sdk.comms.reactnative.mapper

import com.facebook.react.bridge.ReadableMap
import com.voxeet.sdk.models.Conference
import com.voxeet.sdk.models.VideoForwardingStrategy
import com.voxeet.sdk.services.builders.ConferenceListenOptions
import io.dolby.sdk.comms.reactnative.utils.RnCollections.getOptionalBoolean
import io.dolby.sdk.comms.reactnative.utils.RnCollections.getOptionalInt

/**
 * Provides a method that maps React Native model to [ConferenceListenOptions] model.
 */
class ConferenceListenOptionsMapper {
  /**
   * Creates a [ConferenceListenOptions] based on provided `options` for a given `conference`.
   *
   * @param conference a conference to join
   * @param optionsRN  options to set (access token, constraints, max video forwarding)
   * @return [ConferenceListenOptions]
   */
  fun fromRN(conference: Conference, optionsRN: ReadableMap?) =
    ConferenceListenOptions
      .Builder(conference)
      .apply {
        optionsRN?.let {
          it.getString(CONFERENCE_LISTEN_OPTIONS_ACCESS_TOKEN)?.let(::setConferenceAccessToken)
          it.getString(CONFERENCE_LISTEN_OPTIONS_VIDEO_FORWARDING_STRATEGY)
            ?.let { videoForwardingStrategyFromRN(it) }
            ?.let { setVideoForwardingStrategy(it) }
          it.getOptionalInt(CONFERENCE_LISTEN_OPTIONS_MAX_VIDEO_FORWARDING)
            ?.let(::setMaxVideoForwarding)
          it.getOptionalBoolean(CONFERENCE_LISTEN_OPTIONS_SPATIAL_AUDIO)?.let(::setSpatialAudio)
        }
      }
      .build()

  private fun videoForwardingStrategyFromRN(strategy: String) = when (strategy) {
    "LAST_SPEAKER" -> VideoForwardingStrategy.LAST_SPEAKER
    "CLOSEST_USER" -> VideoForwardingStrategy.CLOSEST_USER
    else -> null
  }

  companion object {
    private const val CONFERENCE_LISTEN_OPTIONS_SPATIAL_AUDIO = "spatialAudio"
    private const val CONFERENCE_LISTEN_OPTIONS_ACCESS_TOKEN = "conferenceAccessToken"
    private const val CONFERENCE_LISTEN_OPTIONS_MAX_VIDEO_FORWARDING = "maxVideoForwarding"
    private const val CONFERENCE_LISTEN_OPTIONS_VIDEO_FORWARDING_STRATEGY = "videoForwardingStrategy"
  }
}
