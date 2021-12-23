package com.example.reactnativedolbyiosdk;

import io.dolby.sdk.comms.reactnative.android.activities.CommsAPISDKAppCompatActivity;

public class MainActivity extends CommsAPISDKAppCompatActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "CommsSDKExample";
  }
}
