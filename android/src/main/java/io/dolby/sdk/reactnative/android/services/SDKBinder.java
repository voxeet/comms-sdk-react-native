package io.dolby.sdk.reactnative.android.services;

import android.os.Binder;
import android.support.annotation.NonNull;

/**
 * This will be set inside the SDK in the future
 */
public abstract class SDKBinder<CLASS extends AbstractSDKService> extends Binder {

    @NonNull
    public abstract CLASS getService();
}
