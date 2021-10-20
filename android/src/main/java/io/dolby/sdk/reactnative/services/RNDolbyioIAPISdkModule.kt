package io.dolby.sdk.reactnative.services

import androidx.annotation.VisibleForTesting
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.voxeet.VoxeetSDK
import com.voxeet.sdk.authent.token.TokenCallback
import io.dolby.sdk.reactnative.utils.lockCatching
import io.dolby.sdk.reactnative.utils.unlockCatching
import org.webrtc.CodecDescriptorFactory
import org.webrtc.VideoCodecType
import org.webrtc.codecs.CodecDescriptor
import java.util.concurrent.locks.ReentrantLock

/**
 * [RNDolbyioIAPISdkModule] is a bridge wrapper for [VoxeetSDK] that is the main object
 * which provides methods interacting with the Voxeet service. The SDK is asynchronous and uses promise at its core.
 *
 * The application initializes the Voxeet SDK through the [initializeToken] method.
 *
 * @constructor
 * Creates a bridge wrapper for [VoxeetSDK].
 *
 * @param reactContext react context
 */
class RNDolbyioIAPISdkModule(
  private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

  @VisibleForTesting
  val awaitingTokenCallbacks: MutableList<TokenCallback> = mutableListOf()

  private val lockAwaitingToken = ReentrantLock()

  override fun getName(): String = "DolbyIoIAPIModule"

  /**
   * Initializes the Voxeet SDK. For security purposes, prefer using the
   * [initializeToken] method.
   *
   * @param consumerKey    consumer key
   * @param consumerSecret consumer secret
   * @param promise        returns null
   */
  @Deprecated("")
  @ReactMethod
  fun initialize(
    consumerKey: String,
    consumerSecret: String,
    promise: Promise
  ) {
    VoxeetSDK.initialize(consumerKey, consumerSecret)
    VoxeetSDK.instance().register(this)
    enableOnEmulator()
    promise.resolve(null)
  }

  /**
   * Initializes the SDK with an access token that is provided by the customer's backend
   * communicating with the Voxeet servers. The access token allows securing the customer key and
   * secret. Due to a limited period of validity for security reasons, the token needs to be
   * refreshed. To refresh the token, the Android Voxeet SDK calls the callback that calls the
   * customer's backend and returns a promise containing the refreshed access token. Then this
   * method emitts a refreshToken event that can be handled by the React Native.
   *
   * @param accessToken the access token that is provided by the customer's backend
   * @param promise     returns null
   */
  @ReactMethod
  fun initializeToken(accessToken: String, promise: Promise) {
    VoxeetSDK.initialize(accessToken) { _: Boolean, callback: TokenCallback ->
      lockAwaitingToken.lockCatching()
      if (callback !in awaitingTokenCallbacks) {
        awaitingTokenCallbacks.add(callback)
      }
      lockAwaitingToken.unlockCatching()
      postRefreshAccessToken()
    }
    VoxeetSDK.instance().register(this)
    promise.resolve(null)
  }

  /**
   * Emits an access token to a callback.
   *
   *
   * Should be called along with [initializeToken] method.
   *
   *
   * @param accessToken access token
   * @param promise     returns null
   */
  @ReactMethod
  fun onAccessTokenOk(
    accessToken: String,
    promise: Promise
  ) {
    lockAwaitingToken.lockCatching()
    for (callback in awaitingTokenCallbacks) {
      try {
        callback.ok(accessToken)
      } catch (ee: Exception) {
        ee.printStackTrace()
      }
    }
    awaitingTokenCallbacks.clear()
    lockAwaitingToken.unlockCatching()
    promise.resolve(null)
  }

  /**
   * Emits an error to a callback.
   *
   *
   * Should be called along with [initializeToken] method.
   *
   *
   * @param reason  reason of the refresh token failure
   * @param promise returns null
   */
  @ReactMethod
  fun onAccessTokenKo(
    reason: String,
    promise: Promise
  ) {
    try {
      throw Exception("refreshToken failed with reason := $reason")
    } catch (e: Exception) {
      lockAwaitingToken.lockCatching()
      for (callback in awaitingTokenCallbacks) {
        try {
          callback.error(e)
        } catch (ee: Exception) {
          ee.printStackTrace()
        }
      }
      lockAwaitingToken.unlockCatching()
    }
    awaitingTokenCallbacks.clear()
    promise.resolve(null)
  }

  private fun postRefreshAccessToken() =
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit("refreshToken", null)

  private fun enableOnEmulator() {
    CodecDescriptorFactory
      .getEncoders(VideoCodecType.H264)
      ?.register(CodecDescriptor("OMX.google", 16, true))
    CodecDescriptorFactory
      .getDecoders()
      .register(CodecDescriptor("OMX.google", 16, false))
  }
}
