package io.dolby.sdk.reactnative.android.services;

import android.support.annotation.Nullable;

import io.dolby.sdk.reactnative.android.activities.VoxeetSDKAppCompatActivity;

/**
 * This will be set inside the SDK in the future
 */
public class SystemServiceFactory {

    private static Class<? extends AbstractSDKService> sdk_service_klass;

    @Nullable
    private static Class<? extends VoxeetSDKAppCompatActivity> klass;

    @Nullable
    private static Class<? extends VoxeetSDKAppCompatActivity> forcedKlass;

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
    public static Class<? extends VoxeetSDKAppCompatActivity> getAppCompatActivity() {
        if (null != forcedKlass) return forcedKlass;
        return klass;
    }

    public static void setForcedAppCompatActivity(@Nullable Class<? extends VoxeetSDKAppCompatActivity> forcedKlass) {
        SystemServiceFactory.forcedKlass = forcedKlass;
    }

    public static void setLastAppCompatActivity(@Nullable Class<? extends VoxeetSDKAppCompatActivity> klass) {
        SystemServiceFactory.klass = klass;
    }
}
