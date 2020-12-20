
package io.dolby.sdk;

import android.app.Application;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.voxeet.VoxeetSDK;
import com.voxeet.sdk.authent.token.TokenCallback;

import org.greenrobot.eventbus.EventBus;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.locks.ReentrantLock;

import io.dolby.sdk.events.AbstractEventEmitter;
import io.dolby.sdk.events.ConferenceStatusEventEmitter;
import io.dolby.sdk.events.ConferenceUserEventEmitter;
import io.dolby.sdk.utils.Lock;

public class RNVoxeetSdkModule extends ReactContextBaseJavaModule {

    private static final String ERROR_SDK_NOT_INITIALIZED = "ERROR_SDK_NOT_INITIALIZED";
    private static final String ERROR_SDK_NOT_LOGGED_IN = "ERROR_SDK_NOT_LOGGED_IN";

    private final ReactApplicationContext reactContext;
    private ReentrantLock lockAwaitingToken = new ReentrantLock();
    private List<TokenCallback> mAwaitingTokenCallback;
    private final List<AbstractEventEmitter> eventEmitters;

    public RNVoxeetSdkModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        mAwaitingTokenCallback = new ArrayList<>();

        eventEmitters = new ArrayList<>();
        eventEmitters.add(new ConferenceStatusEventEmitter(reactContext, EventBus.getDefault()));
        eventEmitters.add(new ConferenceUserEventEmitter(reactContext, EventBus.getDefault()));

        for (AbstractEventEmitter emitter : eventEmitters) {
            emitter.register();
        }

    }

    @Override
    public String getName() {
        return "RNVoxeetSDK";
    }


    @ReactMethod
    public void initializeToken(String accessToken, Promise promise) {
        Application application = (Application) reactContext.getApplicationContext();

        if (!VoxeetSDK.instance().isInitialized()) {
            //refreshAccessTokenCallbackInstance = callback;

            VoxeetSDK.setApplication(application);
            VoxeetSDK.initialize(
                    accessToken,
                    callback -> {
                        Lock.lock(lockAwaitingToken);
                        if (!mAwaitingTokenCallback.contains(callback)) {
                            mAwaitingTokenCallback.add(callback);
                        }
                        Lock.unlock(lockAwaitingToken);
                        postRefreshAccessToken();
                    });

            internalInitialize();
        }
        promise.resolve(true);
    }

    @ReactMethod
    public void initialize(String consumerKey, String consumerSecret, Promise promise) {
        Application application = (Application) reactContext.getApplicationContext();

        if (!VoxeetSDK.instance().isInitialized()) {
            VoxeetSDK.setApplication(application);
            VoxeetSDK.initialize(consumerKey, consumerSecret);

            internalInitialize();
        }

        promise.resolve(true);
    }

    private void internalInitialize() {
        Application application = (Application) reactContext.getApplicationContext();
        VoxeetSDK.conference().ConferenceConfigurations.TelecomWaitingForParticipantTimeout = 30 * 1000; //30s

        VoxeetSDK.instance().register(this);
    }

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
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("refreshToken", null);
        /*Log.d("VoxeetCordova", "postRefreshAccessToken: sending call to javascript to refresh token");
        if(null != refreshAccessTokenCallbackInstance) {
            refreshAccessTokenCallbackInstance.invoke();
        }*/
    }

}