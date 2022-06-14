package io.dolby.sdk.comms.reactnative.mapper

import com.facebook.react.bridge.ReadableMap
import com.voxeet.sdk.media.constraints.Constraints
import com.voxeet.sdk.models.Conference
import com.voxeet.sdk.models.VideoForwardingStrategy
import com.voxeet.sdk.services.builders.ConferenceJoinOptions
import io.dolby.sdk.comms.reactnative.utils.RnCollections.getOptionalBoolean
import io.dolby.sdk.comms.reactnative.utils.RnCollections.getOptionalInt

/**
 * Provides a method that maps React Native model to [ConferenceJoinOptions] model.
 */
class ConferenceJoinOptionsMapper {
  /**
   * Creates a [ConferenceJoinOptions] based on provided `options` for a given `conference`.
   *
   * @param conference a conference to join
   * @param optionsRN  options to set (access token, constraints, max video forwarding)
   * @return [ConferenceJoinOptions]
   */
  fun fromRN(conference: Conference, optionsRN: ReadableMap?) =
    ConferenceJoinOptions
      .Builder(conference)
      .apply {
        optionsRN?.let {
          it.getString(CONFERENCE_JOIN_OPTIONS_ACCESS_TOKEN)?.let(::setConferenceAccessToken)
          it.getString(CONFERENCE_JOIN_OPTIONS_VIDEO_FORWARDING_STRATEGY)
            ?.let { videoForwardingStrategyFromRN(it) }
            ?.let { setVideoForwardingStrategy(it) }
          it.getConstraints()?.let(::setConstraints)
          it.getOptionalInt(CONFERENCE_JOIN_OPTIONS_MAX_VIDEO_FORWARDING)
            ?.let(::setMaxVideoForwarding)
          it.getOptionalBoolean(CONFERENCE_JOIN_OPTIONS_SPATIAL_AUDIO)?.let(::setSpatialAudio)
        }
      }
      .build()

  private fun ReadableMap.getConstraints(): Constraints? = getMap(CONFERENCE_JOIN_OPTIONS_CONSTRAINTS)
    ?.let { constraintsMap ->
      val hasAudio = constraintsMap.getOptionalBoolean(CONFERENCE_JOIN_OPTIONS_CONSTRAINTS_AUDIO) ?: false
      val hasVideo = constraintsMap.getOptionalBoolean(CONFERENCE_JOIN_OPTIONS_CONSTRAINTS_VIDEO) ?: false
      return Constraints(hasAudio, hasVideo)
    }

  fun videoForwardingStrategyFromRN(strategy: String) = when (strategy) {
    "LAST_SPEAKER" -> VideoForwardingStrategy.LAST_SPEAKER
    "CLOSEST_USER" -> VideoForwardingStrategy.CLOSEST_USER
    else -> null
  }

  companion object {
    private const val CONFERENCE_JOIN_OPTIONS_SPATIAL_AUDIO = "spatialAudio"
    private const val CONFERENCE_JOIN_OPTIONS_ACCESS_TOKEN = "conferenceAccessToken"
    private const val CONFERENCE_JOIN_OPTIONS_MAX_VIDEO_FORWARDING = "maxVideoForwarding"
    private const val CONFERENCE_JOIN_OPTIONS_CONSTRAINTS = "constraints"
    private const val CONFERENCE_JOIN_OPTIONS_CONSTRAINTS_AUDIO = "audio"
    private const val CONFERENCE_JOIN_OPTIONS_CONSTRAINTS_VIDEO = "video"
    private const val CONFERENCE_JOIN_OPTIONS_VIDEO_FORWARDING_STRATEGY = "videoForwardingStrategy"
  }
}
