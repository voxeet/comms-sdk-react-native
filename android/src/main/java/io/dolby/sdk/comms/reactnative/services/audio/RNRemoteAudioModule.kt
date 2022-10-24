package io.dolby.sdk.comms.reactnative.services.audio

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.voxeet.sdk.models.Participant
import com.voxeet.sdk.services.AudioService
import com.voxeet.sdk.services.ConferenceService
import com.voxeet.sdk.services.MediaDeviceService
import com.voxeet.sdk.services.audio.LocalAudio
import io.dolby.sdk.comms.reactnative.eventemitters.RNCommandEventEmitter
import io.dolby.sdk.comms.reactnative.mapper.ParticipantMapper
import io.dolby.sdk.comms.reactnative.services.RNEventEmitterModule
import io.dolby.sdk.comms.reactnative.utils.Promises
import io.dolby.sdk.comms.reactnative.utils.Promises.forward
import io.dolby.sdk.comms.reactnative.utils.Promises.rejectIfFalse
import io.dolby.sdk.comms.reactnative.utils.Promises.thenPromise
import io.dolby.sdk.comms.reactnative.utils.Promises.thenValue
import io.dolby.sdk.comms.reactnative.utils.ReactPromise

/**
 * The [RNRemoteAudioModule] allows the local participant to locally mute and unmute remote participants.
 *
 * @constructor
 * Creates a bridge wrapper for [LocalAudio] model.
 *
 * @param reactContext          react context
 * @param audioService          [AudioService] from Android SDK
 * @param conferenceService     [ConferenceService] from Android SDK
 * @param participantMapper     mapper for a [Participant] and [Participant]-related models
 */
class RNRemoteAudioModule(
  reactContext: ReactApplicationContext,
  private val audioService: AudioService,
  private val conferenceService: ConferenceService,
  private val participantMapper: ParticipantMapper,
) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "CommsAPIRemoteAudioModule"

  /**
   * Allows the local participant to unmute a specific remote participant who is locally muted through the stop method.
   * The start method does not impact the audio transmission between remote participants and a conference and does not allow the local
   * participant to force sending remote participants’ streams to the conference or to the local participant.
   * This method is not available for listeners and triggers the UnsupportedError.
   *
   * @param promise returns null
   */
  @ReactMethod
  fun start(participantRN: ReadableMap, promise: ReactPromise) {
    Promises.promise({ toParticipant(participantRN) }) { "Couldn't get participant" }
      .thenPromise { participant -> audioService.remote.start(participant) }
      .rejectIfFalse { "Start audio operation failed" }
      .forward(promise)
  }

  /**
   * Allows the local participant to locally mute specific remote participants.
   * This method does not impact the audio transmission between remote participants and a conference and does not allow the
   * local participant to stop sending remote participants’ streams to the conference.
   * The method is not available for listeners and triggers UnsupportedError.
   *
   * @param promise returns null
   */
  @ReactMethod
  fun stop(participantRN: ReadableMap, promise: ReactPromise) {
    Promises.promise({ toParticipant(participantRN) }) { "Couldn't get participant" }
      .thenPromise { participant -> audioService.remote.stop(participant) }
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
