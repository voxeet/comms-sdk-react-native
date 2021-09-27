
package io.dolby.sdk.reactnative.services;

import androidx.annotation.VisibleForTesting;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.voxeet.VoxeetSDK;
import com.voxeet.sdk.authent.token.TokenCallback;

import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.locks.ReentrantLock;

import io.dolby.sdk.reactnative.utils.Lock;

public class RNDolbyioIAPISdkModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private final ReentrantLock lockAwaitingToken = new ReentrantLock();

    @VisibleForTesting
    protected final List<TokenCallback> mAwaitingTokenCallback;

    public RNDolbyioIAPISdkModule(ReactApplicationContext reactContext) {
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
     * @param consumerKey consumer key
     * @param consumerSecret consumer secret
     * @param promise returns true
     */
    @Deprecated
    @ReactMethod
    public void initialize(String consumerKey, String consumerSecret, Promise promise) {
        VoxeetSDK.initialize(consumerKey, consumerSecret);
        VoxeetSDK.instance().register(this);

        promise.resolve(true);
    }

    /**
     * Initializes the SDK with an access token that is provided by the customer's backend
     * communicating with the Voxeet servers. The access token allows securing the customer key and
     * secret. Due to a limited period of validity for security reasons, the token needs to be
     * refreshed. To refresh the token, the Android Voxeet SDK calls the callback that calls the
     * customer's backend and returns a promise containing the refreshed access token. Then this
     * method emitts a refreshToken event that can be handled by the React Native.
     * @param accessToken the access token that is provided by the customer's backend
     * @param promise returns true
     */
    @ReactMethod
    public void initializeToken(String accessToken, Promise promise) {
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

        promise.resolve(true);
    }

    /**
     * Emits an access token to a callback.
     *
     * Should be called along with {@link #initializeToken(String, Promise)} method.
     * @param accessToken access token
     * @param promise returns true
     */
    @ReactMethod
    public void onAccessTokenOk(final String accessToken,
                                final Promise promise) {
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
        promise.resolve(true);
    }

    /**
     * Emits an error to a callback.
     *
     * Should be called along with {@link #initializeToken(String, Promise)} method.
     * @param reason reason of the refresh token failure
     * @param promise returns true
     */
    @ReactMethod
    public void onAccessTokenKo(final String reason,
                                final Promise promise) {
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
        promise.resolve(true);
    }

    private void postRefreshAccessToken() {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("refreshToken", null);
    }
}
