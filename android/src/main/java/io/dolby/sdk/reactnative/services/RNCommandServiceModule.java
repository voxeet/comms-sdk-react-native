package io.dolby.sdk.reactnative.services;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.voxeet.sdk.services.CommandService;

import org.jetbrains.annotations.NotNull;

/**
 * The RNCommandServiceModule allows the application to send {@link #send(String, String, Promise)} text messages to all other participants of a specific conference.
 */
public class RNCommandServiceModule extends ReactContextBaseJavaModule {

    @NotNull
    private final CommandService commandService;

    /**
     * Creates a bridge wrapper for {@link CommandService}.
     *
     * @param commandService {@link CommandService} from Android SDK
     * @param reactContext   react context
     */
    public RNCommandServiceModule(
            @NotNull CommandService commandService,
            @NotNull ReactApplicationContext reactContext
    ) {
        super(reactContext);
        this.commandService = commandService;
    }

    @NotNull
    @Override
    public String getName() {
        return "DolbyIoIAPICommandServiceModule";
    }

    /**
     * Sends the message to the conference. The message must be in the form of a string or a representation of strings (json or base64).
     *
     * @param conferenceId ID of the conference to which the message will be send
     * @param message      content of the message (any possible string)
     * @param promise      returns true if message was send, false otherwise
     */
    @ReactMethod
    public void send(@NotNull final String conferenceId, @NotNull final String message, @NotNull Promise promise) {
        commandService.send(conferenceId, message)
                .then(promise::resolve)
                .error(promise::reject);
    }
}
