package io.dolby.sdk.reactnative.services

import com.facebook.react.bridge.*
import com.voxeet.promise.solve.ThenVoid
import com.voxeet.sdk.models.Participant
import com.voxeet.sdk.services.SessionService
import io.dolby.sdk.reactnative.mapper.ParticipantMapper
import io.dolby.sdk.reactnative.utils.Promises
import io.dolby.sdk.reactnative.utils.Promises.forward
import io.dolby.sdk.reactnative.utils.Promises.rejectIfNull
import io.dolby.sdk.reactnative.utils.Promises.thenValue

/**
 * The [RNSessionServiceModule] allows an application to register participants' information in the Voxeet service.
 * The application needs to open a session before it can interact with the service further.
 * The application may open [open] and close [close] sessions multiple times.
 *
 * @constructor
 * Creates a bridge wrapper for [SessionService].
 *
 * @param sessionService    [SessionService] from Android SDK
 * @param reactContext      react context
 * @param participantMapper mapper for a [Participant] and [Participant]-related models
 */
class RNSessionServiceModule(
  reactContext: ReactApplicationContext,
  private val sessionService: SessionService,
  private val participantMapper: ParticipantMapper
) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "DolbyIoIAPISessionServiceModule"

  /**
   * Opens a session using information from the ParticipantInfo model.
   *
   * @param participantInfoRN ParticipantInfo which should contain at least one participant name
   * @param promise           returns true if session was opened successfully, false otherwise
   */
  @ReactMethod
  fun open(participantInfoRN: ReadableMap, promise: Promise) {
    Promises
      .promise(participantMapper.infoFromRN(participantInfoRN), { "Couldn't get participant info" })
      .thenValue(sessionService::open)
      .forward(promise)
  }

  /**
   * Logs out from the current session.
   * Logging out cancels all logging processes and leaves the conference.
   *
   * @param promise returns true if logout succeeded, false otherwise
   */
  @ReactMethod
  fun close(promise: Promise) {
    sessionService
      .close()
      .forward(promise)
  }

  /**
   * Gets a corresponding currently logged in participants' representation. It is not an object
   * related to any conference.
   *
   * @param promise returns a new instance aggregating the ID and participantInfo
   */
  @ReactMethod
  fun getParticipant(promise: Promise) {
    Promises
      .promise(sessionService.participant, { "No current user's session" })
      .thenValue(participantMapper::toRN)
      .forward(promise)
  }
}
