package io.dolby.sdk.reactnative.services

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.voxeet.promise.Promise
import com.voxeet.sdk.models.Conference
import com.voxeet.sdk.models.Participant
import com.voxeet.sdk.services.ConferenceService
import com.voxeet.sdk.services.builders.ConferenceCreateOptions
import com.voxeet.sdk.services.builders.ConferenceJoinOptions
import com.voxeet.sdk.services.conference.information.ConferenceStatus
import io.dolby.sdk.reactnative.mapper.ConferenceCreateOptionsMapper
import io.dolby.sdk.reactnative.mapper.ConferenceJoinOptionsMapper
import io.dolby.sdk.reactnative.mapper.ConferenceMapper
import io.dolby.sdk.reactnative.mapper.ParticipantMapper
import io.dolby.sdk.reactnative.utils.Promises
import io.dolby.sdk.reactnative.utils.Promises.forward
import io.dolby.sdk.reactnative.utils.Promises.rejectIfNull
import io.dolby.sdk.reactnative.utils.Promises.thenPromise
import io.dolby.sdk.reactnative.utils.Promises.thenValue
import io.dolby.sdk.reactnative.utils.ReactPromise

/**
 * The [RNConferenceServiceModule] allows the application to manage the conference life cycle
 * and interact with the conference.
 *
 * **Typical application APIs workflow:**
 *
 *  1. The application creates ([create]) a conference.
 *
 *  2. The application uses the [fetch] method to obtain the conference object.
 *
 *  3. The application can choose to either:
 *      * [join] a conference
 *      * Replay a conference TODO DEXA-42 link to replay
 *
 *  4. The application can start and stop sending the local participant's audio streams to the conference. TODO DEXA-37 link to start/stopAudio
 * The application can also start and stop sending the remote participants' audio streams to the local participant. TODO DEXA-37 link to start/stopVideo
 *
 *  5. The application can start and stop sending the local participant's video streams to the conference.
 * The application can also start and stop sending the remote participants' video streams to the local participant.
 *
 *  6. During a conference, the application can:
 *      * Customize the number of the received video streams and prioritize the selected participants'
 *      video streams ([setMaxVideoForwarding]).
 *      * [mute] the local or remote participant
 *      * Check if the local participant [isMuted]
 *      * Check which participant [isSpeaking]
 *      * Check the audio level of a specific participant ([getAudioLevel])
 *      * Get information about the conference, such as Conference object ([current]),
 *      conference status ([getStatus])
 *      * Get information about conference participants, such as the participant instance
 *      ([getParticipant]), audio level of a participant ([getAudioLevel]) and list of participants
 *      ([getParticipants]).
 *      * Check the standard WebRTC statistics for the application ([getLocalStats]).
 *      * [kick] a participant from a conference.
 *      * Update the participant's permissions. TODO DEXA-39 link to update permissions
 *
 *  7. The application calls the [leave] method to leave a conference.
 *
 * **The application can interact with the service through these events:**
 * TODO DEXA-73, DEXA-75 and more: add javadoc about events
 *
 * Creates a bridge wrapper for [ConferenceService].
 *
 * @param conferenceService             [ConferenceService] from Android SDK
 * @param reactContext                  react context
 * @param conferenceMapper              mapper for a [Conference] and [Conference]-related models
 * @param conferenceCreateOptionsMapper mapper for a [ConferenceCreateOptions] model
 * @param conferenceJoinOptionsMapper   mapper for a [ConferenceJoinOptions] model
 */
class RNConferenceServiceModule(
    reactContext: ReactApplicationContext,
    private val conferenceService: ConferenceService,
    private val conferenceMapper: ConferenceMapper,
    private val conferenceCreateOptionsMapper: ConferenceCreateOptionsMapper,
    private val conferenceJoinOptionsMapper: ConferenceJoinOptionsMapper,
    private val participantMapper: ParticipantMapper
) : ReactContextBaseJavaModule(reactContext) {

  override fun getName() = "DolbyIoIAPIConferenceService"

  /**
   * Creates the conference based on information from the `optionsMap`.
   *
   * Note that some parameters of the conference (returned as a `promise`), won't be available
   * (like dolbyVoice or ttl that are normally placed in [Conference.getMetadata]). [join] call
   * returns a conference object that contains that data. Also, if you call [fetch] after [join]
   * then it also contains that data (if not, [Conference.getMetadata] returns null).
   *
   * @param optionsMap information holder where the ID, parameters, and metadata can be passed
   * @param promise    returns a created conference
   */
  @ReactMethod
  fun create(optionsMap: ReadableMap, promise: ReactPromise) {
    Promises.promise(conferenceCreateOptionsMapper.toConferenceCreateOptions(optionsMap))
        .thenPromise(conferenceService::create)
        .thenValue(conferenceMapper::toMap)
        .forward(promise)
  }

  /**
   * Provides a Conference object that allows joining a conference.
   *
   * @param conferenceId the conference ID
   * @param promise      returns a conference with the given `conferenceId` or the current
   * conference if `conferenceId` is null
   */
  @ReactMethod
  fun fetch(conferenceId: String?, promise: ReactPromise) {
    val conferencePromise = conferenceId
        ?.let(conferenceService::fetchConference)
        ?: Promise.resolve(conferenceService.conference)

    conferencePromise
        .rejectIfNull { "Couldn't get the conference" }
        .thenValue(conferenceMapper::toMap)
        .forward(promise)

  }
  // TODO Note: remember to manually grant permissions to CAMERA and MICROPHONE.
  //  That mechanism will be added in DEXA-140.
  /**
   * Joins the conference based on information from the `optionsMap`.
   *
   * The possible exception in the rejection:
   *  * ServerErrorException
   *  * InConferenceException
   *  * MediaEngineException
   *  * ParticipantAddedErrorEventException
   *  * IllegalArgumentException
   *
   * @param conferenceMap a conference to join
   * @param optionsMap    the holder of the options to join
   * @param promise       returns a joined conference
   */
  @ReactMethod
  fun join(conferenceMap: ReadableMap, optionsMap: ReadableMap?, promise: ReactPromise) {
    Promises.promise({ toConferenceJoinOptions(conferenceMap, optionsMap) }) { "Couldn't get the conference join options" }
        .thenPromise(conferenceService::join)
        .thenValue(conferenceMapper::toMap)
        .forward(promise)
  }

  /**
   * Allows the conference owner, or a participant with adequate permissions, to kick another
   * participant from the conference by revoking the conference access token. The kicked
   * participant cannot join the conference again.
   *
   * @param participantMap the participant who needs to be kicked from the conference
   * @param promise        returns null
   */
  @ReactMethod
  fun kick(participantMap: ReadableMap, promise: ReactPromise) {
    Promises.promise({ toParticipant(participantMap) }) { "Couldn't get participant" }
        .thenPromise(conferenceService::kick)
        .forward(promise)
  }

  /**
   * Leaves the current conference.
   *
   * @param promise returns null
   */
  @ReactMethod
  fun leave(promise: ReactPromise) {
    conferenceService.leave().forward(promise, ignoreReturnType = true)
  }

  /**
   * Gets the current Conference object.
   *
   * @param promise returns the current conference
   */
  @ReactMethod
  fun current(promise: ReactPromise) {
    Promises.promise(conferenceService.conference) { "Missing current conference" }
        .thenValue(conferenceMapper::toMap)
        .forward(promise)
  }

  /**
   * Gets the participant's audio level. The audio level value ranges from 0.0 to 1.0.
   *
   * Note: When the local participant is muted, the audioLevel value is set to a non-zero value,
   * and isSpeaking is set to true if the audioLevel is greater than 0.05. This implementation
   * allows adding a warning message to notify the local participant that their audio is not sent
   * to a conference.
   *
   * @param participantMap this method gets audioLevel of a participant provided here
   * @param promise        returns the value between 0 and 1
   */
  @ReactMethod
  fun getAudioLevel(participantMap: ReadableMap, promise: ReactPromise) {
    Promises.promise({ toParticipant(participantMap) }) { "Couldn't get participant" }
        .thenValue(conferenceService::audioLevel)
        .forward(promise)
  }

  /**
   * Provides the maximum number of video streams that may be transmitted to the local participant.
   *
   * @param promise returns the max video forwarded value for the current conference
   */
  @ReactMethod
  fun getMaxVideoForwarding(promise: ReactPromise) {
    Promises.promise(conferenceService.maxVideoForwarding) { "Couldn't get max video forwarding" }
        .forward(promise)
  }

  /**
   * Provides the instance of the desired participant.
   *
   * @param participantId participant id
   * @param promise       returns the instance of the participant. Reject can mean that the
   * conference or the participant does not exist in the current time session.
   */
  @ReactMethod
  fun getParticipant(participantId: String, promise: ReactPromise) {
    Promises.promise({ conferenceService.findParticipantById(participantId) }) { "Couldn't get the participant" }
        .thenValue(participantMapper::toMap)
        .forward(promise)
  }

  /**
   * Gets information about conference participants.
   *
   * @param conferenceMap this method gets participants from a conference provided here
   * @param promise       returns the direct reference to the array of participants
   */
  @ReactMethod
  fun getParticipants(conferenceMap: ReadableMap, promise: ReactPromise) {
    Promises.promise({ toConference(conferenceMap) }) { "Couldn't get the conference" }
        .thenValue { conference -> participantMapper.toParticipantsArray(conference.participants) }
        .forward(promise)
  }

  /**
   * Provides the current conference status.
   *
   * @param conferenceMap this method gets status of a conference provided here
   * @param promise       returns the valid [ConferenceStatus] for a manipulation
   */
  @ReactMethod
  fun getStatus(conferenceMap: ReadableMap, promise: ReactPromise) {
    Promises.promise({ toConference(conferenceMap) }) { "Couldn't get the conference" }
        .thenValue { conference -> conferenceMapper.toString(conference.state) }
        .forward(promise)
  }

  /**
   * Informs whether the local participant is muted.
   *
   * Note: This API is no longer supported for remote participants.
   *
   * @param promise returns boolean - information if the local participant is muted. Returns
   * false if the participant is not muted or is not present at the conference.
   * Returns true if the participant is muted.
   */
  @ReactMethod
  fun isMuted(promise: ReactPromise) {
    promise.resolve(conferenceService.isMuted)
  }

  /**
   * Indicates whether the current participant is speaking.
   *
   * @param participantMap this method gets speaking status of a participant provided here
   * @param promise        returns a boolean indicating whether the current participant is speaking.
   */
  @ReactMethod
  fun isSpeaking(participantMap: ReadableMap, promise: ReactPromise) {
    Promises.promise({ toParticipant(participantMap) }) { "Couldn't get the participant" }
        .thenValue(conferenceService::isSpeaking)
        .forward(promise)
  }

  /**
   * Provides standard WebRTC statistics for the application to implement its own quality
   * monitoring mechanisms.
   *
   * @param promise returns The WebRTC Stat Matrix
   */
  @ReactMethod
  fun getLocalStats(promise: ReactPromise) {
    Promises.promise(conferenceService.localStats()) { "Couldn't get local stats" }
        .thenValue(conferenceMapper::toMap)
        .forward(promise)
  }

  /**
   * Stops playing the specified remote participants' audio to the local participant. The mute
   * method does not notify the server to stop audio stream transmission.
   *
   * Note: This API is not supported when the client connects to a Dolby Voice conference.
   * If you wish to mute remote participants in Dolby Voice conferences, we recommend using the
   * stopAudio API. This API allows the conference participants to stop receiving the specific
   * audio streams from the server.
   *
   * @param participantMap a remote participant to mute
   * @param isMuted        true indicates that the local participant is muted, false indicates that
   * a participant is not muted
   * @param promise        returns a boolean indicating if the mute state has changed
   */
  @ReactMethod
  fun mute(participantMap: ReadableMap, isMuted: Boolean, promise: ReactPromise) {
    Promises.promise({ toParticipant(participantMap) }) { "Couldn't get participant" }
        .thenValue { participant -> conferenceService.mute(participant, isMuted) }
        .forward(promise, ignoreReturnType = true)
  }

  /**
   * Controls playing remote participants' audio to the local participant.
   *
   * Note: This API is only supported when the client connects to a Dolby Voice conference.
   *
   * @param isMuted true indicates that remote participants are muted, false indicates that remote
   * participants are not muted
   * @param promise returns a boolean indicating whether remote participants are muted.
   */
  @ReactMethod
  fun muteOutput(isMuted: Boolean, promise: ReactPromise) {
    conferenceService.muteOutput(isMuted)
    promise.resolve(null)
  }

  /**
   * Enables and disables audio processing for the local participant.
   *
   * @param audioProcessingMap the audio processing mode
   * @param promise            returns null
   */
  @ReactMethod
  fun setAudioProcessing(audioProcessingMap: ReadableMap, promise: ReactPromise) {
    Promises.promise(conferenceMapper.toAudioProcessing(audioProcessingMap))
        .thenValue(conferenceService::setAudioProcessing)
        .forward(promise, ignoreReturnType = true)
  }

  /**
   * Sets the maximum number of video streams that may be transmitted to the local participant.
   * For more information, see the
   * [Video Forwarding](https://docs.dolby.io/communications-apis/docs/guides-video-forwarding) article.
   *
   * @param max     The maximum number of video streams that may be transmitted to the local
   * participant. The valid values are between 0 and 4. The default value is 4.
   * In the case of providing a value smaller than 0 or greater than 4, SDK triggers
   * the [IllegalStateException] error.
   * @param promise returns null
   */
  @ReactMethod
  fun setMaxVideoForwarding(max: Int, promise: ReactPromise) {
    conferenceService.videoForwarding(max, emptyList())
        .forward(promise, ignoreReturnType = true)
  }

  /**
   * Creates a [ConferenceJoinOptions] based on provided `optionsMap` for a given
   * `conferenceMap`. Throws [IllegalArgumentException] if conference id is invalid.
   *
   * @param conferenceMap a conference to join
   * @param optionsMap    the holder of the options to join
   * @return [ConferenceJoinOptions]
   */
  private fun toConferenceJoinOptions(conferenceMap: ReadableMap, optionsMap: ReadableMap?): ConferenceJoinOptions {
    val conference = toConference(conferenceMap)
    return conferenceJoinOptionsMapper.toConferenceJoinOptions(conference, optionsMap)
  }

  /**
   * Gets [Participant] based on a React Native participant model. Throws
   * [IllegalArgumentException] if participant id is invalid.
   *
   * @param participantMap a React Native participant model
   * @return [Participant]
   */
  @Throws(Exception::class)
  private fun toParticipant(participantMap: ReadableMap): Participant {
    val participantId = participantMapper.toParticipantId(participantMap)
        ?: throw IllegalArgumentException("Conference should contain participantId")
    return conferenceService.findParticipantById(participantId)
        ?: throw Exception("Couldn't find the participant")
  }

  /**
   * Gets [Conference] based on a React Native conference model. Throws
   * [IllegalArgumentException] if conference id is invalid.
   *
   * @param conferenceMap a React Native conference model
   * @return [Conference]
   */
  private fun toConference(conferenceMap: ReadableMap): Conference {
    val conferenceId = conferenceMapper.toConferenceId(conferenceMap)
        ?: throw IllegalArgumentException("Conference should contain conferenceId")
    return conferenceService.getConference(conferenceId)
  }
}
