package io.dolby.sdk.reactnative.android.services;

import androidx.annotation.Nullable;

import io.dolby.sdk.reactnative.android.activities.DolbyioIAPISDKAppCompatActivity;

/**
 * This will be set inside the SDK in the future
 */
public class SystemServiceFactory {

    private static Class<? extends AbstractSDKService> sdk_service_klass;

    @Nullable
    private static Class<? extends DolbyioIAPISDKAppCompatActivity> klass;

    @Nullable
    private static Class<? extends DolbyioIAPISDKAppCompatActivity> forcedKlass;

    private SystemServiceFactory() {

    }

    public static void registerSDKServiceClass(@Nullable Class<? extends AbstractSDKService> sdkServiceKlass) {
        sdk_service_klass = sdkServiceKlass;
    }

    public static boolean hasSDKServiceClass() {
        return null != sdk_service_klass;
    }

    @Nullable
    public static Class<? extends AbstractSDKService> getSDKServiceClass() {
        return sdk_service_klass;
    }

    @Nullable
    public static Class<? extends DolbyioIAPISDKAppCompatActivity> getAppCompatActivity() {
        if (null != forcedKlass) return forcedKlass;
        return klass;
    }

    public static void setForcedAppCompatActivity(@Nullable Class<? extends DolbyioIAPISDKAppCompatActivity> forcedKlass) {
        SystemServiceFactory.forcedKlass = forcedKlass;
    }

    public static void setLastAppCompatActivity(@Nullable Class<? extends DolbyioIAPISDKAppCompatActivity> klass) {
        SystemServiceFactory.klass = klass;
    }
}
