package io.dolby.sdk.reactnative.services;


import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.voxeet.VoxeetSDK;
import com.voxeet.sdk.authent.token.TokenCallback;

import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PowerMockIgnore;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.rule.PowerMockRule;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.annotation.Config;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

@PrepareForTest(VoxeetSDK.class)
@RunWith(RobolectricTestRunner.class)
@PowerMockIgnore({"org.powermock.*", "org.mockito.*", "org.robolectric.*", "android.*", "androidx.*"})
@Config(manifest = Config.NONE)
public class RNDolbyioIAPISdkModuleTest {

    @Rule
    public PowerMockRule rule = new PowerMockRule();

    @Mock
    private ReactApplicationContext mockedReactContext;
    @Mock
    private VoxeetSDK mockedVoxeetSDK;

    private RNDolbyioIAPISdkModule module;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        module = new RNDolbyioIAPISdkModule(mockedReactContext);

        PowerMockito.mockStatic(VoxeetSDK.class);
    }

    @After
    public void tearDown() {
        // no-op
    }

    @Test
    public void initialize_true() {
        // given
        Promise mockedPromise = mock(Promise.class);

        given(VoxeetSDK.instance()).willReturn(mockedVoxeetSDK);

        // when
        module.initialize("key", "secret", mockedPromise);

        // then
        verify(mockedPromise).resolve(true);
    }

    @Test
    public void initializeToken_true() {
        // given
        Promise mockedPromise = mock(Promise.class);

        given(VoxeetSDK.instance()).willReturn(mockedVoxeetSDK);

        // when
        module.initializeToken("accessToken", mockedPromise);

        // then
        verify(mockedPromise).resolve(true);
    }

    @Test
    public void onAccessTokenOk_tokenCallbackOk_true() {
        // given
        Promise mockedPromise = mock(Promise.class);
        TokenCallback mockedTokenCallback = mock(TokenCallback.class);

        String accessToken = "IamAccessToken";

        given(VoxeetSDK.instance()).willReturn(mockedVoxeetSDK);
        module.mAwaitingTokenCallback.add(mockedTokenCallback);

        // when
        module.onAccessTokenOk(accessToken, mockedPromise);

        // then
        verify(mockedPromise).resolve(true);
        verify(mockedTokenCallback).ok(accessToken);
    }

    @Test
    public void onAccessTokenKo_tokenCallbackError_true() {
        // given
        Promise mockedPromise = mock(Promise.class);
        TokenCallback mockedTokenCallback = mock(TokenCallback.class);

        given(VoxeetSDK.instance()).willReturn(mockedVoxeetSDK);
        module.mAwaitingTokenCallback.add(mockedTokenCallback);

        // when
        module.onAccessTokenKo("someReason", mockedPromise);

        // then
        verify(mockedPromise).resolve(true);
        verify(mockedTokenCallback).error(any());
    }
}
