
package io.dolby.sdk.reactnative.services;

import androidx.annotation.VisibleForTesting;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.voxeet.VoxeetSDK;
import com.voxeet.sdk.authent.token.TokenCallback;
import com.voxeet.sdk.models.Conference;
import com.voxeet.sdk.services.ConferenceService;
import com.voxeet.sdk.services.builders.ConferenceCreateOptions;
import com.voxeet.sdk.services.builders.ConferenceJoinOptions;

import org.jetbrains.annotations.NotNull;
import org.webrtc.CodecDescriptorFactory;
import org.webrtc.VideoCodecType;
import org.webrtc.codecs.CodecDescriptor;
import org.webrtc.codecs.CodecDescriptorHolder;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.locks.ReentrantLock;

import io.dolby.sdk.reactnative.utils.Lock;

/**
 * <p>
 * {@link RNDolbyioIAPISdkModule} is a bridge wrapper for {@link VoxeetSDK} that is the main object
 * which provides methods interacting with the Voxeet service. The SDK is asynchronous and uses promise at its core.
 * </p>
 * <p>
 * The application initializes the Voxeet SDK through the {@link #initializeToken(String, Promise)} method.
 * </p>
 */
public class RNDolbyioIAPISdkModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private final ReentrantLock lockAwaitingToken = new ReentrantLock();

    @VisibleForTesting
    protected final List<TokenCallback> mAwaitingTokenCallback;

    /**
     * Creates a bridge wrapper for {@link VoxeetSDK}.
     *
     * @param reactContext react context
     */
    public RNDolbyioIAPISdkModule(@NotNull ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        mAwaitingTokenCallback = new ArrayList<>();
    }

    @NotNull
    @Override
    public String getName() {
        return "DolbyIoIAPIModule";
    }

    /**
     * Initializes the Voxeet SDK. For security purposes, prefer using the
     * {@link #initializeToken(String, Promise)} method.
     *
     * @param consumerKey    consumer key
     * @param consumerSecret consumer secret
     * @param promise        returns null
     */
    @Deprecated
    @ReactMethod
    public void initialize(
            @NotNull String consumerKey,
            @NotNull String consumerSecret,
            @NotNull Promise promise
    ) {
        VoxeetSDK.initialize(consumerKey, consumerSecret);
        VoxeetSDK.instance().register(this);
        enableOnEmulator();

        promise.resolve(null);
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
    public void initializeToken(@NotNull String accessToken, @NotNull Promise promise) {
        VoxeetSDK.initialize(
                accessToken,
                (isRequired, callback) -> {
                    Lock.lock(lockAwaitingToken);
                    if (!mAwaitingTokenCallback.contains(callback)) {
                        mAwaitingTokenCallback.add(callback);
                    }
                    Lock.unlock(lockAwaitingToken);
                    postRefreshAccessToken();
                });

        VoxeetSDK.instance().register(this);

        promise.resolve(null);
    }

    /**
     * Emits an access token to a callback.
     * <p>
     * Should be called along with {@link #initializeToken(String, Promise)} method.
     * </p>
     *
     * @param accessToken access token
     * @param promise     returns null
     */
    @ReactMethod
    public void onAccessTokenOk(
            @NotNull final String accessToken,
            @NotNull final Promise promise
    ) {
        Lock.lock(lockAwaitingToken);
        for (TokenCallback callback : mAwaitingTokenCallback) {
            try {
                callback.ok(accessToken);
            } catch (Exception ee) {
                ee.printStackTrace();
            }
        }
        mAwaitingTokenCallback.clear();
        Lock.unlock(lockAwaitingToken);
        promise.resolve(null);
    }

    /**
     * Emits an error to a callback.
     * <p>
     * Should be called along with {@link #initializeToken(String, Promise)} method.
     * </p>
     *
     * @param reason  reason of the refresh token failure
     * @param promise returns null
     */
    @ReactMethod
    public void onAccessTokenKo(
            @NotNull final String reason,
            @NotNull final Promise promise
    ) {
        try {
            throw new Exception("refreshToken failed with reason := " + reason);
        } catch (Exception e) {
            Lock.lock(lockAwaitingToken);
            for (TokenCallback callback : mAwaitingTokenCallback) {
                try {
                    callback.error(e);
                } catch (Exception ee) {
                    ee.printStackTrace();
                }
            }
            Lock.unlock(lockAwaitingToken);
        }
        mAwaitingTokenCallback.clear();
        promise.resolve(null);
    }

    private void postRefreshAccessToken() {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("refreshToken", null);
    }

    private void enableOnEmulator() {
        CodecDescriptorHolder encoders = CodecDescriptorFactory.getEncoders(VideoCodecType.H264);
        if (encoders != null) {
            encoders.register(new CodecDescriptor("OMX.google", 16, true));
        }

        CodecDescriptorFactory.getDecoders().register(new CodecDescriptor("OMX.google", 16, false));
    }
}
