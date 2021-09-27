
package io.dolby.sdk.reactnative.services;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.voxeet.sdk.services.SessionService;

import org.jetbrains.annotations.NotNull;

import io.dolby.sdk.reactnative.mapper.ParticipantMapper;

public class RNSessionServiceModule extends ReactContextBaseJavaModule {

    private final SessionService sessionService;
    private final ParticipantMapper participantMapper;

    public RNSessionServiceModule(
            SessionService sessionService,
            ReactApplicationContext reactContext,
            ParticipantMapper participantMapper
    ) {
        super(reactContext);

        this.sessionService = sessionService;
        this.participantMapper = participantMapper;
    }

    @NotNull
    @Override
    public String getName() {
        return "DolbyIoIAPISessionServiceModule";
    }

    /**
     * Opens a session using information from the ParticipantInfo model.
     * @param participantInfo ParticipantInfo which should contain at least one participant name
     * @param promise returns true if session was opened successfully, false otherwise
     */
    @ReactMethod
    public void open(ReadableMap participantInfo, Promise promise) {
        sessionService.open(participantMapper.toParticipantInfo(participantInfo))
                .then(promise::resolve)
                .error(promise::reject);
    }
}
