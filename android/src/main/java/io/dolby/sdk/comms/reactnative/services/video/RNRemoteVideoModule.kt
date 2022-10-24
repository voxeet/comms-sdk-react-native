package io.dolby.sdk.comms.reactnative.services.video

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.voxeet.sdk.models.Participant
import com.voxeet.sdk.services.ConferenceService
import com.voxeet.sdk.services.VideoService
import com.voxeet.sdk.services.video.RemoteVideo
import io.dolby.sdk.comms.reactnative.mapper.ParticipantMapper
import io.dolby.sdk.comms.reactnative.utils.Promises
import io.dolby.sdk.comms.reactnative.utils.Promises.forward
import io.dolby.sdk.comms.reactnative.utils.Promises.rejectIfFalse
import io.dolby.sdk.comms.reactnative.utils.Promises.thenPromise
import io.dolby.sdk.comms.reactnative.utils.ReactPromise

/**
 * The [RNRemoteVideoModule] allows the local participant to locally start and stop remote participants` video streams transmission..
 *
 * @constructor
 * Creates a bridge wrapper for [RemoteVideo] model.
 *
 * @param reactContext          react context
 * @param videoService          [VideoService] from Android SDK
 * @param conferenceService     [ConferenceService] from Android SDK
 * @param participantMapper     mapper for a [Participant] and [Participant]-related models
 */
class RNRemoteVideoModule(
  reactContext: ReactApplicationContext,
  private val videoService: VideoService,
  private val conferenceService: ConferenceService,
  private val participantMapper: ParticipantMapper
) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "CommsAPIRemoteVideoModule"

  /**
   * If the local participant used the stop method to stop receiving video streams from selected remote participants,
   * the start method allows the participant to start receiving video streams from these participants.
   * The start method does not impact the video transmission between remote participants and a conference and does not
   * allow the local participant to force sending remote participants’ streams to the conference or to the local participant.
   *
   * The start method requires a few seconds to become effective.
   *
   * @param promise returns null
   */
  @ReactMethod
  fun start(participantRN: ReadableMap, promise: ReactPromise) {
    Promises.promise({ toParticipant(participantRN) }) { "Couldn't get participant" }
      .thenPromise { participant -> videoService.remote.start(participant) }
      .rejectIfFalse { "Start audio operation failed" }
      .forward(promise)
  }

  /**
   * Allows the local participant to stop receiving video from specific remote participants.
   * This method does not impact audio transmission between remote participants and a conference and does not allow the local
   * participant to stop sending remote participants’ streams to the conference.
   *
   * The stop method requires a few seconds to become effective.
   *
   * @param promise returns null
   */
  @ReactMethod
  fun stop(participantRN: ReadableMap, promise: ReactPromise) {
    Promises.promise({ toParticipant(participantRN) }) { "Couldn't get participant" }
      .thenPromise { participant -> videoService.remote.stop(participant) }
      .rejectIfFalse { "Stop audio operation failed" }
      .forward(promise)
  }

  /**
   * Gets [Participant] based on a React Native participant model. Throws
   * [IllegalArgumentException] if participant id is invalid.
   *
   * @param participantRN a React Native participant model
   * @return [Participant]
   */
  @Throws(Exception::class)
  private fun toParticipant(participantRN: ReadableMap): Participant {
    val participantId = participantMapper.participantIdFromRN(participantRN)
      ?: throw IllegalArgumentException("Conference should contain participantId")
    return conferenceService.findParticipantById(participantId)
      ?: throw Exception("Couldn't find the participant")
  }

}
