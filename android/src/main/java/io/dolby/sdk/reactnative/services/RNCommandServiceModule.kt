package io.dolby.sdk.reactnative.services

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.voxeet.sdk.services.CommandService
import com.voxeet.sdk.services.ConferenceService
import io.dolby.sdk.reactnative.eventemitters.RNCommandEventEmitter
import io.dolby.sdk.reactnative.eventemitters.RNEventEmitter
import io.dolby.sdk.reactnative.utils.Promises
import io.dolby.sdk.reactnative.utils.Promises.forward
import io.dolby.sdk.reactnative.utils.Promises.thenValue

/**
 * The [RNCommandServiceModule] allows the application to send [send] text messages to all other participants of
 * a specific conference.
 *
 * @constructor
 * Creates a bridge wrapper for [CommandService].
 *
 * @param reactContext      react context
 * @param conferenceService [ConferenceService] from Android SDK
 * @param commandService    [CommandService] from Android SDK
 * @param eventEmitter      an emitter for the command module events
 */
class RNCommandServiceModule(
  reactContext: ReactApplicationContext,
  eventEmitter: RNCommandEventEmitter,
  private val conferenceService: ConferenceService,
  private val commandService: CommandService
) : RNEventEmitterModule(reactContext, eventEmitter) {

  override fun getName(): String = "DolbyIoIAPICommandServiceModule"

  /**
   * Sends the message to the conference. The message must be in the form of a string or a representation of strings (json or
   * base64).
   *
   * @param message content of the message (any possible string)
   * @param promise returns true if message was send, false otherwise
   */
  @ReactMethod
  fun send(message: String, promise: Promise) {
    Promises.promise(conferenceService.conferenceId) { "Couldn't find the conference" }
      .thenValue { conferenceId -> commandService.send(conferenceId, message) }
      .forward(promise)
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
