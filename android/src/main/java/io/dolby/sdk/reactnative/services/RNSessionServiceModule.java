
package io.dolby.sdk.reactnative.services;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.voxeet.sdk.models.Participant;
import com.voxeet.sdk.services.SessionService;

import org.jetbrains.annotations.NotNull;

import io.dolby.sdk.reactnative.mapper.ParticipantMapper;

public class RNSessionServiceModule extends ReactContextBaseJavaModule {

    @NotNull
    private final SessionService sessionService;
    @NotNull
    private final ParticipantMapper participantMapper;

    /**
     * Creates a bridge wrapper for {@link SessionService}.
     *
     * @param sessionService    {@link SessionService} from Android SDK
     * @param reactContext      react context
     * @param participantMapper mapper for a {@link Participant} and {@link Participant}-related models
     */
    public RNSessionServiceModule(
            @NotNull SessionService sessionService,
            @NotNull ReactApplicationContext reactContext,
            @NotNull ParticipantMapper participantMapper
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
     *
     * @param participantInfo ParticipantInfo which should contain at least one participant name
     * @param promise         returns true if session was opened successfully, false otherwise
     */
    @ReactMethod
    public void open(@NotNull ReadableMap participantInfo, Promise promise) {
        sessionService.open(participantMapper.toParticipantInfo(participantInfo))
                .then(promise::resolve)
                .error(promise::reject);
    }
}
