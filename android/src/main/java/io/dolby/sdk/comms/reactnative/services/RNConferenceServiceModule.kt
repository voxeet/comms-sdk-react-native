package io.dolby.sdk.comms.reactnative.services

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.voxeet.android.media.errors.MediaEngineException
import com.voxeet.promise.Promise
import com.voxeet.sdk.events.promises.InConferenceException
import com.voxeet.sdk.events.promises.ParticipantAddedErrorEventException
import com.voxeet.sdk.events.promises.ServerErrorException
import com.voxeet.sdk.models.Conference
import com.voxeet.sdk.models.Participant
import com.voxeet.sdk.models.ParticipantPermissions
import com.voxeet.sdk.services.ConferenceService
import com.voxeet.sdk.services.ScreenShareService
import com.voxeet.sdk.services.builders.ConferenceCreateOptions
import com.voxeet.sdk.services.builders.ConferenceJoinOptions
import com.voxeet.sdk.services.builders.ConferenceListenOptions
import com.voxeet.sdk.services.builders.VideoForwardingOptions
import com.voxeet.sdk.services.conference.information.ConferenceStatus
import io.dolby.sdk.comms.reactnative.android.permissions.ScreenSharePermissions
import io.dolby.sdk.comms.reactnative.eventemitters.RNEventEmitter
import io.dolby.sdk.comms.reactnative.mapper.ConferenceCreateOptionsMapper
import io.dolby.sdk.comms.reactnative.mapper.ConferenceJoinOptionsMapper
import io.dolby.sdk.comms.reactnative.mapper.ConferenceListenOptionsMapper
import io.dolby.sdk.comms.reactnative.mapper.ConferenceMapper
import io.dolby.sdk.comms.reactnative.mapper.ParticipantMapper
import io.dolby.sdk.comms.reactnative.mapper.ParticipantPermissionMapper
import io.dolby.sdk.comms.reactnative.mapper.SpatialAudioMapper
import io.dolby.sdk.comms.reactnative.utils.Promises
import io.dolby.sdk.comms.reactnative.utils.Promises.forward
import io.dolby.sdk.comms.reactnative.utils.Promises.rejectIfFalse
import io.dolby.sdk.comms.reactnative.utils.Promises.rejectIfNull
import io.dolby.sdk.comms.reactnative.utils.Promises.thenPromise
import io.dolby.sdk.comms.reactnative.utils.Promises.thenValue
import io.dolby.sdk.comms.reactnative.utils.ReactPromise

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
 *      * [replay] a conference
 *
 *  4. The application can [startAudio] and [stopAudio] sending audio transmission between:
 *      * local participant's and a conference.
 *      * remote participant’s from the conference and the local participant.
 *
 *  5. The application can [startVideo] and [stopVideo] sending video transmission between:
 *      * local participant's and a conference.
 *      * remote participant’s from the conference and the local participant.
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
 *      * Update the participant's permissions ([updatePermissions]).
 *
 *  7. The application calls the [leave] method to leave a conference.
 *
 * **The application can interact with the service through these events:**
 * TODO DEXA-73, DEXA-75 and more: add javadoc about events
 *
 * @constructor Creates a bridge wrapper for [ConferenceService].
 *
 * @param reactContext                  react context
 * @param conferenceService             [ConferenceService] from Android SDK
 * @param screenShareService            [ScreenShareService] from Android SDK
 * @param conferenceMapper              mapper for a [Conference] and [Conference]-related models
 * @param conferenceCreateOptionsMapper mapper for a [ConferenceCreateOptions] model
 * @param conferenceJoinOptionsMapper   mapper for a [ConferenceJoinOptions] model
 * @param participantMapper             mapper for a [Participant] and [Participant]-related models
 * @param participantPermissionMapper   mapper for a [ParticipantPermissions] model
 * @param eventEmitter                  an emitter for the conference module events
 */
class RNConferenceServiceModule(
  private val reactContext: ReactApplicationContext,
  private val conferenceService: ConferenceService,
  private val screenShareService: ScreenShareService,
  private val conferenceMapper: ConferenceMapper,
  private val conferenceCreateOptionsMapper: ConferenceCreateOptionsMapper,
  private val conferenceJoinOptionsMapper: ConferenceJoinOptionsMapper,
  private val conferenceListenOptionsMapper: ConferenceListenOptionsMapper,
  private val spatialAudioMapper: SpatialAudioMapper,
  private val participantMapper: ParticipantMapper,
  private val participantPermissionMapper: ParticipantPermissionMapper,
  private val eventEmitter: RNEventEmitter
) : RNEventEmitterModule(reactContext, eventEmitter) {

  override fun getName() = "CommsAPIConferenceServiceModule"

  /**
   * Creates the conference based on information from the `optionsRN`.
   *
   * Note that some parameters of the conference (returned as a `promise`), won't be available
   * (like dolbyVoice or ttl that are normally placed in [Conference.getMetadata]). [join] call
   * returns a conference object that contains that data. Also, if you call [fetch] after [join]
   * then it also contains that data (if not, [Conference.getMetadata] returns null).
   *
   * @param optionsRN information holder where the ID, parameters, and metadata can be passed
   * @param promise   returns a created conference
   */
  @ReactMethod
  fun create(optionsRN: ReadableMap, promise: ReactPromise) {
    Promises.promise(conferenceCreateOptionsMapper.fromRN(optionsRN))
      .thenPromise(conferenceService::create)
      .thenValue(conferenceMapper::toRN)
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
      .thenValue(conferenceMapper::toRN)
      .forward(promise)
  }

  /**
   * Joins the conference based on information from the `optionsRN`.
   *
   * The possible exception in the rejection:
   *  * [ServerErrorException]
   *  * [InConferenceException]
   *  * [MediaEngineException]
   *  * [ParticipantAddedErrorEventException]
   *  * [IllegalArgumentException]
   *
   * @param conferenceRN a conference to join
   * @param optionsRN    the holder of the options to join
   * @param promise      returns a joined conference
   */
  @ReactMethod
  fun join(conferenceRN: ReadableMap, optionsRN: ReadableMap?, promise: ReactPromise) {
    Promises.promise({
      toConferenceJoinOptions(
        conferenceRN,
        optionsRN
      )
    }) { "Couldn't get the conference join options" }
      .thenPromise(conferenceService::join)
      .thenValue(conferenceMapper::toRN)
      .forward(promise)
  }

  /**
   * Joins the conference in the listener mode in which the conference participant can only receive video and audio and cannot transmit any media.
   *
   * Possible rejection causes :
   *  * [ServerErrorException]
   *  * [InConferenceException]
   *  * [MediaEngineException]
   *  * [ParticipantAddedErrorEventException]
   *
   * @param conferenceRN a conference to join
   * @param optionsRN    the holder of the options to listen
   * @param promise      returns a joined conference
   */
  @ReactMethod
  fun listen(conferenceRN: ReadableMap, optionsRN: ReadableMap?, promise: ReactPromise) {
    Promises.promise({
      toConferenceListenOptions(
        conferenceRN,
        optionsRN
      )
    }) { "Couldn't get the conference listen options" }
      .thenPromise(conferenceService::listen)
      .thenValue(conferenceMapper::toRN)
      .forward(promise)
  }

  /**
   * Replays the previously recorded conference. For more information, see the
   * [Recording Conferences](doc:guides-recording-conferences)
   * article.
   *
   * Possible rejection causes:
   *  * [ServerErrorException]
   *  * [InConferenceException]
   *  * [MediaEngineException]
   *  * [ParticipantAddedErrorEventException]
   *  * [IllegalArgumentException]
   *
   *  @param conferenceRN a conference to replay
   *  @param replayOptionsRN contains the offset to start with
   *  @param promise returns null
   */
  @ReactMethod
  fun replay(
    conferenceRN: ReadableMap,
    replayOptionsRN: ReadableMap?,
    promise: ReactPromise
  ) {
    Promises.promise({ toConference(conferenceRN) }) { "Couldn't get the conference" }
      .thenValue { it to (replayOptionsRN?.let(conferenceMapper::replayOffsetFromRN) ?: 0) }
      .thenPromise { (conference, offset) -> conferenceService.replay(conference, offset.toLong()) }
      .thenValue(conferenceMapper::toRN)
      .forward(promise)
  }

  /**
   * Allows the conference owner, or a participant with adequate permissions, to kick another
   * participant from the conference by revoking the conference access token. The kicked
   * participant cannot join the conference again.
   *
   * @param participantRN the participant who needs to be kicked from the conference
   * @param promise       returns null
   */
  @ReactMethod
  fun kick(participantRN: ReadableMap, promise: ReactPromise) {
    Promises.promise({ toParticipant(participantRN) }) { "Couldn't get participant" }
      .thenPromise(conferenceService::kick)
      .rejectIfFalse { "Kick participant operation failed" }
      .forward(promise)
  }

  /**
   * Leaves the current conference.
   *
   * @param promise returns null
   */
  @ReactMethod
  fun leave(promise: ReactPromise) {
    conferenceService.leave()
      .rejectIfFalse {
        "Leave conference operation failed" }
      .forward(promise)
  }

  /**
   * Gets the current Conference object.
   *
   * @param promise returns the current conference
   */
  @ReactMethod
  fun current(promise: ReactPromise) {
    val conference = conferenceService.conference
    if (conference == null || !conferenceService.isInConference) {
      promise.resolve(null);
      return
    }
    Promises.promise(conference) { "Couldn't get current conference" }
      .thenValue(conferenceMapper::toRN)
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
   * @param participantRN this method gets audioLevel of a participant provided here
   * @param promise       returns the value between 0 and 1
   */
  @ReactMethod
  fun getAudioLevel(participantRN: ReadableMap, promise: ReactPromise) {
    Promises.promise({ toParticipant(participantRN) }) { "Couldn't get participant" }
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
      .thenValue(participantMapper::toRN)
      .forward(promise)
  }

  /**
   * Gets information about conference participants.
   *
   * @param conferenceRN this method gets participants from a conference provided here
   * @param promise      returns the direct reference to the array of participants
   */
  @ReactMethod
  fun getParticipants(conferenceRN: ReadableMap, promise: ReactPromise) {
    Promises.promise({ toConference(conferenceRN) }) { "Couldn't get the conference" }
      .thenValue { conference -> participantMapper.toRN(conference.participants) }
      .forward(promise)
  }

  /**
   * Provides the current conference status.
   *
   * @param conferenceRN this method gets status of a conference provided here
   * @param promise      returns the valid [ConferenceStatus] for a manipulation
   */
  @ReactMethod
  fun getStatus(conferenceRN: ReadableMap, promise: ReactPromise) {
    Promises.promise({ toConference(conferenceRN) }) { "Couldn't get the conference" }
      .thenValue { conference -> conferenceMapper.toRNConferenceStatus(conference.state) }
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
   * @param participantRN this method gets speaking status of a participant provided here
   * @param promise       returns a boolean indicating whether the current participant is speaking.
   */
  @ReactMethod
  fun isSpeaking(participantRN: ReadableMap, promise: ReactPromise) {
    Promises.promise({ toParticipant(participantRN) }) { "Couldn't get the participant" }
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
      .thenValue(conferenceMapper::toRNLocalStats)
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
   * @param participantRN a remote participant to mute
   * @param isMuted       true indicates that the local participant is muted, false indicates that
   * a participant is not muted
   * @param promise       returns null
   */
  @ReactMethod
  fun mute(participantRN: ReadableMap, isMuted: Boolean, promise: ReactPromise) {
    Promises.promise({ toParticipant(participantRN) }) { "Couldn't get participant" }
      .thenValue { participant -> conferenceService.mute(participant, isMuted) }
      .rejectIfFalse { "Mute participant operation failed" }
      .forward(promise)
  }

  /**
   * Controls playing remote participants' audio to the local participant.
   *
   * Note: This API is only supported when the client connects to a Dolby Voice conference.
   *
   * @param isMuted true indicates that remote participants are muted, false indicates that remote
   * participants are not muted
   * @param promise returns null
   */
  @ReactMethod
  fun muteOutput(isMuted: Boolean, promise: ReactPromise) {
    Promises.promise(conferenceService.muteOutput(isMuted))
      .rejectIfFalse { "Mute output operation failed" }
      .forward(promise)
  }

  /**
   * Enables and disables audio processing for the local participant.
   *
   * @param audioProcessingRN the audio processing mode
   * @param promise           returns null
   */
  @ReactMethod
  fun setAudioProcessing(audioProcessingRN: ReadableMap, promise: ReactPromise) {
    Promises.promise(conferenceMapper.fromRN(audioProcessingRN))
      .thenValue(conferenceService::setAudioProcessing)
      .rejectIfFalse { "Set audio processing for the local participant operation failed" }
      .forward(promise)
  }

  /**
   * Sets the maximum number of video streams that may be transmitted to the local participant.
   * For more information, see the
   * [Video Forwarding](https://docs.dolby.io/communications-apis/docs/guides-video-forwarding) article.
   *
   * @param max             The maximum number of video streams that may be transmitted to the local
   * participant. The valid values are between 0 and 4. The default value is 4.
   * In the case of providing a value smaller than 0 or greater than 4, SDK triggers
   * the [IllegalStateException] error.
   * @param participantsRN The list of participants' objects. Allows prioritizing specific participant's
   * video streams and display their videos even when these participants do not talk.
   * For example, in the case of virtual classes, this option allows participants to pin the teacher's
   * video and see the teacher, even when the teacher is not the active speaker.
   * @param promise         returns null
   */
  @ReactMethod
  @Deprecated(
    message = "Use setVideoForwarding(strategy, max, participantsRN, promise) instead",
    replaceWith = ReplaceWith("setVideoForwarding(strategy, max, participantsRN, promise)")
  )
  fun setMaxVideoForwarding(max: Int, participantsRN: ReadableArray, promise: ReactPromise) {
    setVideoForwarding(
      strategy = null,
      max = max,
      participantsRN = participantsRN,
      promise = promise
    )
  }

  /**
   * Sets the maximum number of video streams that may be transmitted to the local participant.
   * For more information, see the
   * [Video Forwarding](https://docs.dolby.io/communications-apis/docs/guides-video-forwarding) article.
   *
   * @param strategy Defines how the SDK should select conference participants whose videos will be
   * transmitted to the local participant. There are two possible values; the selection can be either
   * based on the participants' audio volume or the distance from the local participant
   * @param max             The maximum number of video streams that may be transmitted to the local
   * participant. The valid values are between 0 and 4. The default value is 4.
   * In the case of providing a value smaller than 0 or greater than 4, SDK triggers
   * the [IllegalStateException] error.
   * @param participantsRN The list of participants' objects. Allows prioritizing specific participant's
   * video streams and display their videos even when these participants do not talk.
   * For example, in the case of virtual classes, this option allows participants to pin the teacher's
   * video and see the teacher, even when the teacher is not the active speaker.
   * @param promise         returns null
   */
  @ReactMethod
  fun setVideoForwarding(strategy: String?, max: Int, participantsRN: ReadableArray, promise: ReactPromise) {
    Promises.promise(participantMapper.participantIdsFromRN(participantsRN))
      .thenValue { participantId -> participantId.mapNotNull(conferenceService::findParticipantById) }
      .thenPromise { participants ->
        VideoForwardingOptions
          .Builder()
          .setMaxVideoForwarding(max)
          .setParticipants(participants.map { participant -> participant.id })
          .apply {
            strategy
              ?.let { conferenceJoinOptionsMapper.videoForwardingStrategyFromRN(it) }
              ?.let { setVideoForwardingStrategy(it) }
          }
          .build()
          .let { conferenceService.videoForwarding(it) }
      }
      .rejectIfFalse { "Set video forwarding options for local participant failed" }
      .forward(promise)
  }

  /**
   * Starts audio transmission between the local client and a conference.
   * The startAudio method impacts only the audio streams that the local participant sends and receives;
   * the method does not impact the audio transmission between remote participants and a conference and does not allow the local
   * participant to force sending remote participants’ streams to the conference or to the local participant.
   *
   * Depending on the specified participant in the participant parameter, the startAudio method starts the proper audio transmission:
   * - When the specified participant is the local participant, startAudio ensures sending local participant’s audio from the local client to the conference.
   * - When the specified participant is a remote participant, startAudio ensures sending remote participant’s audio from the conference to the local client.
   *   This allows the local participant to unmute remote participants who are locally muted through the stopAudio method.
   *
   * @param participantMap The selected participant.
   *                       If you wish to transmit the local participant's audio stream to the conference, provide the local participant's object.
   *                       If you wish to receive the specific remote participants' audio streams, provide these remote participants' objects.
   * @param promise        returns null
   */
  @ReactMethod
  fun startAudio(participantMap: ReadableMap, promise: ReactPromise) {
    Promises.promise({ toParticipant(participantMap) }) { "Couldn't get participant" }
      .thenPromise(conferenceService::startAudio)
      .rejectIfFalse { "Start audio operation failed" }
      .forward(promise)
  }

  /**
   * Stops audio transmission between the local client and a conference.
   * The stopAudio method impacts only the audio streams that the local participant sends and receives;
   * the method does not impact the audio transmission between remote participants and a conference and does not allow the local
   * participant to stop sending remote participants’ streams to the conference.
   *
   * Depending on the specified participant in the participant parameter, the stopAudio method stops the proper audio transmission:
   * - When the specified participant is the local participant, stopAudio stops sending local participant’s audio from the local client to the conference.
   * - When the specified participant is a remote participant, stopAudio stops sending remote participant’s audio from the conference to the local client.
   *   This allows the local participant to locally mute remote participants.
   *
   * Leaving a conference resets the stopAudio settings.
   * Participants who rejoin a conference need to provide the desired stopAudio parameters and call the stopAudio method once again.
   *
   * The stopAudio method requires up to a few seconds to become effective.
   *
   * @param participantMap The selected participant.
   *                       If you wish to not transmit the local participant's audio stream to the conference, provide the local participant's object.
   *                       If you wish to not receive the specific remote participants' audio streams, provide these remote participants' objects.
   * @param promise        returns null
   */
  @ReactMethod
  fun stopAudio(participantMap: ReadableMap, promise: ReactPromise) {
    Promises.promise({ toParticipant(participantMap) }) { "Couldn't get participant" }
      .thenPromise(conferenceService::stopAudio)
      .rejectIfFalse { "Stop audio operation failed" }
      .forward(promise)
  }

  /**
   * Notifies the server to either start sending the local participant's video stream to the conference or start sending a remote participant's video stream
   * to the local participant.
   *
   * The startVideo method does not control the remote participant's video stream; if a remote participant does not transmit any video stream,
   * the local participant cannot change it using the startVideo method.
   *
   * @param participantMap  The participant who will receive the video stream, either remote or local.
   * @param promise         returns null
   */
  @ReactMethod
  fun startVideo(participantMap: ReadableMap, promise: ReactPromise) {
    Promises.promise({ toParticipant(participantMap) }) { "Couldn't get participant" }
      .thenPromise(conferenceService::startVideo)
      .rejectIfFalse { "Start video operation failed" }
      .forward(promise)
  }

  /**
   * Notifies the server to either stop sending the local participant's video stream to the conference or stop sending a remote participant's video stream
   * to the local participant.
   *
   * @param participantMap The participant who will stop receiving the video stream.
   * @param promise        return null
   */
  @ReactMethod
  fun stopVideo(participantMap: ReadableMap, promise: ReactPromise) {
    Promises.promise({ toParticipant(participantMap) }) { "Couldn't get participant" }
      .thenPromise(conferenceService::stopVideo)
      .rejectIfFalse { "Stop video operation failed" }
      .forward(promise)
  }

  /**
   * Requests screen sharing permission and starts screen sharing session.
   * If permission is denied promise is rejected.
   *
   * @param promise        return null
   */
  @ReactMethod
  fun startScreenShare(promise: ReactPromise) {
    screenShareService.sendRequestStartScreenShare()
    ScreenSharePermissions
      .await()
      .rejectIfFalse { "Could not start screen share" }
      .forward(promise)
  }

  /**
   * Stops a screen-sharing session
   *
   * @param promise        return null
   */
  @ReactMethod
  fun stopScreenShare(promise: ReactPromise) {
    screenShareService
      .stopScreenShare()
      .rejectIfFalse { "Could not stop screen share" }
      .forward(promise)
  }

  /**
   * Updates the participant's conference permissions. If a participant does not have permission to
   * perform a specific action, this action is not available for this participant during a conference,
   * and the participant receives InsufficientPermissionsError. If a participant started a specific
   * action and then lost permission to perform this action, the SDK stops the blocked action.
   * For example, if a participant started sharing a screen and received the updated permissions that
   * do not allow him to share a screen, the SDK stops the screen sharing session and the participant
   *
   * @param participantPermissionsRN the updated participant's permissions
   * @param promise returns null
   */
  @ReactMethod
  fun updatePermissions(participantPermissionsRN: ReadableArray, promise: ReactPromise) {
    Promises.promise({
      participantPermissionMapper.fromRN(participantPermissionsRN)
        .map { (participantId, conferencePermissions) ->
          participantPermissionMapper.toParticipantPermissions(
            participant = participantId?.let(conferenceService::findParticipantById),
            conferencePermissions = conferencePermissions
          )
        }
    }) { "Couldn't get the participant permissions" }
      .thenPromise(conferenceService::updatePermissions)
      .rejectIfFalse { "Update participant permissions operation failed" }
      .forward(promise)
  }

  /**
   * Configures a spatial environment of an application, so the audio renderer understands which directions the application considers forward, up, and right and which units it uses for distance.
   * This method is available only for participants who joined the conference with the spatialAudio parameter enabled. Otherwise, SDK triggers SpatialAudioException.
   * If not called, the SDK uses the default spatial environment, which consists of the following values:
   * * forward = (0, 0, 1), where +Z axis is in front
   * * up = (0, 1, 0), where +Y axis is above
   * * right = (1, 0, 0), where +X axis is to the right
   * * scale = (1, 1, 1), where one unit on any axis is 1 meter
   *
   * @param spatialScaleRN The application's distance units or scale in application units per one meter. The value must be greater than 0.
   * @param forwardRN      A vector describing the direction the application considers as forward. The value must be orthogonal to up and right.
   * @param upRN           A vector describing the direction the application considers as up. The value must be orthogonal to forward and right.
   * @param rightRN        A vector describing the direction the application considers as right. The value must be orthogonal to forward and up.
   * @param promise        returns null
   */
  @ReactMethod
  fun setSpatialEnvironment(
    spatialScaleRN: ReadableMap,
    forwardRN: ReadableMap,
    upRN: ReadableMap,
    rightRN: ReadableMap,
    promise: ReactPromise
  ) {
    Promises
      .promise({
        conferenceService.setSpatialEnvironment(
          spatialAudioMapper.spatialScaleFromRN(spatialScaleRN),
          spatialAudioMapper.spatialPositionFromRN(forwardRN),
          spatialAudioMapper.spatialPositionFromRN(upRN),
          spatialAudioMapper.spatialPositionFromRN(rightRN),
        )
      }) { "Could not set spatial environment. Did you join participant with spatial audio enabled?" }
      .forward(promise, ignoreReturnType = true)
  }

  /**
   * Sets a remote participant's position in space to enable the spatial audio experience during a Dolby Voice conference.
   * If the remote participant does not have an established location, the participant does not have a default position and will remain muted until a position is specified.
   * This method is available only for participants who joined the conference with the setSpatialAudio parameter enabled. Otherwise, SDK triggers the SpatialAudioException.
   *
   * For example, if a local participant Eric, who does not have a set direction, calls setSpatialPosition(CommsSDK.session.participant, {x:3,y:0,z:0}),
   * Eric hears audio from the position (3,0,0). If Eric also calls setSpatialPosition(Sophia, {x:7,y:1,z:2}),
   * he hears Sophia from the position (7,1,2). In this case, Eric hears Sophia 4 meters to the right, 1 meter above, and 2 meters in front.
   *
   * @param participantRN       The selected remote participant.
   * @param spatialPositionRN The participant's audio location from which their audio will be rendered.
   * @param promise           returns null
   */
  @ReactMethod
  fun setSpatialPosition(
    participantRN: ReadableMap,
    spatialPositionRN: ReadableMap,
    promise: ReactPromise
  ) {
    Promises
      .promise({
        val participant = toParticipant(participantRN)
        val position = spatialAudioMapper.spatialPositionFromRN(spatialPositionRN)
        conferenceService.setSpatialPosition(participant, position)
      }) { "Could not set spatial position. Did you join participant with spatial audio enabled?" }
      .forward(promise, ignoreReturnType = true)
  }

  /**
   * Sets the direction a participant is facing in space.
   * This method is available only for participants who joined the conference with the spatialAudio parameter enabled. Otherwise, SDK triggers UnsupportedError.
   *
   * Currently, this method is only supported for the local participant. The method changes the direction the local participant is facing.
   * When the specified participant is a remote participant, SDK triggers UnsupportedError.
   *
   * If the local participant hears audio from the position (0,0,0) facing down the Z-axis and locates a remote participant in the position (1,0,1), the local participant hears the remote participant from their front-right.
   * If the local participant chooses to change the direction they are facing and rotate +90 degrees about the Y-axis, then instead of hearing the speaker from the front-right position, they hear the speaker from the front-left position.
   *
   * @param directionRN The direction the local participant is facing in space.
   * @param promise     returns null
   */
  @ReactMethod
  fun setSpatialDirection(
    directionRN: ReadableMap,
    promise: ReactPromise
  ) {
    Promises
      .promise({
        val direction = spatialAudioMapper.spatialDirectionFromRN(directionRN)
        conferenceService.setSpatialDirection(direction)
      }) { "Could not set spatial direction. Did you join participant with spatial audio enabled?" }
      .forward(promise, ignoreReturnType = true)
  }

  /**
   * Creates a [ConferenceJoinOptions] based on provided `optionsRN` for a given
   * `conferenceRN`. Throws [IllegalArgumentException] if conference id is invalid.
   *
   * @param conferenceRN a conference to join
   * @param optionsRN    the holder of the options to join
   * @return [ConferenceJoinOptions]
   */
  private fun toConferenceJoinOptions(
    conferenceRN: ReadableMap,
    optionsRN: ReadableMap?
  ): ConferenceJoinOptions {
    val conference = toConference(conferenceRN)
    return conferenceJoinOptionsMapper.fromRN(conference, optionsRN)
  }

  /**
   * Creates a [ConferenceListenOptions] based on provided `optionsRN` for a given
   * `conferenceRN`. Throws [IllegalArgumentException] if conference id is invalid.
   *
   * @param conferenceRN a conference to join
   * @param optionsRN    the holder of the options to join
   * @return [ConferenceJoinOptions]
   */
  private fun toConferenceListenOptions(
    conferenceRN: ReadableMap,
    optionsRN: ReadableMap?
  ): ConferenceListenOptions {
    val conference = toConference(conferenceRN)
    return conferenceListenOptionsMapper.fromRN(conference, optionsRN)
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

  /**
   * Gets [Conference] based on a React Native conference model. Throws
   * [IllegalArgumentException] if conference id is invalid.
   *
   * @param conferenceRN a React Native conference model
   * @return [Conference]
   */
  private fun toConference(conferenceRN: ReadableMap): Conference {
    val conferenceId = conferenceMapper.conferenceIdFromRN(conferenceRN)
      ?: throw IllegalArgumentException("Conference should contain conferenceId")
    return conferenceService.getConference(conferenceId)
  }

  /**
   * Every emitter module must implement this method in place, otherwise JS cannot receive event
   */
  @ReactMethod
  override fun addListener(eventName: String) {
    super.addListener(eventName)
  }

  /**
   * Every emitter module must implement this method in place, otherwise JS cannot receive event
   */
  @ReactMethod
  override fun removeListeners(count: Int) {
    super.removeListeners(count)
  }

}
