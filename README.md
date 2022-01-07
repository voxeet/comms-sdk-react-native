# This project is still a work in progress and not yet ready for production. Please stay tuned.

# Dolby.io Communications SDK for React Native

This guide explains how to create a basic audio video conference application for mobile with React Native. It starts with importing the Dolby.io Communications SDK for React Native and guides you through the steps to launch a conference call.

## Requirements

Make sure that you have:

- A Dolby.io account
- An iOS or Android device to run the application on, or the device emulator
- React Native 0.66+

For reference, see the [GitHub sample repository](https://github.com/dolbyio-samples/comms-sdk-react-native-getting-started).
### iOS

- Xcode 12 with the iOS 14 support
- iOS 11.0+ for the target deployment
### Android

- Android 25+ for the target deployment
## Create a new project

**1.** Create a new React Native project:

```bash
npx react-native init DolbyIoGettingStarted
```

It will take a minute or two to download the template and install the different components needed for the project to run.

**2.** Once the project is created, go to the newly created folder:

```bash
cd DolbyIoGettingStarted
```

## Installation

**1.** Install the Dolby.io Communications SDK for React Native using `npm` or `yarn`:

```bash
npm install @dolbyio/comms-sdk-react-native --save
```

```bash
yarn add @dolbyio/comms-sdk-react-native
```

**2.** Complete the installation:

For iOS, iOS, install native dependencies via CocoaPods:

```bash
pod install --repo-update --project-directory=ios/
```

For Android, add the following line to your `android/build.gradle` file, in the `allprojects`, `repositories` section:

```
maven { url("http://android-sdk.voxeet.com/release") }
```

and also add following lines to your `android/app/build.gradle` file:

```
packagingOptions {
  pickFirst '**/armeabi-v7a/libc++_shared.so'
  pickFirst '**/x86/libc++_shared.so'
  pickFirst '**/arm64-v8a/libc++_shared.so'
  pickFirst '**/x86_64/libc++_shared.so'
}
```
## Getting started

Replace the content of your `App.js` with the following:

```javascript
import React, { useRef, useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Button,
    TextInput,
} from 'react-native';
 
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
 
 
const Section = ({children, title}) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.sectionContainer}>
          <Text
              style={[
                  styles.sectionTitle,
                  {
                      color: isDarkMode ? Colors.white : Colors.black,
                  },
              ]}>
              {title}
          </Text>
          <Text
              style={[
                  styles.sectionDescription,
                  {
                      color: isDarkMode ? Colors.light : Colors.dark,
                  },
              ]}>
              {children}
          </Text>
        </View>
    );
};
 
const App = () => {
    const [conferenceAlias, setConferenceAlias] = useState("react-native");
    const [videoElements, setVideoElements] = useState({});

    useEffect(() => {

    }, []);

    const getVideoElements = () => {
        const result = [];

        for (var key in videoElements) {
            result.push(videoElements[key]);
        }

        return result;
    };

    const joinConference = async () => {
    };
 
    const isDarkMode = useColorScheme() === 'dark';
 
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
 
    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                <View
                    style={{
                        backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    }}>
                    <Section title="Conference">
                        <Text>Alias:</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={setConferenceAlias}
                            value={conferenceAlias} />
                        <Button onPress={joinConference} title="Join the conference" />
                    </Section>
            
                    <Section title="Videos" style={{backgroundColor: 'black'}}>
                        {getVideoElements()}
                    </Section>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
 
const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    textInput: {
        height: Platform.OS == 'android' ? 40 : 20,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        lineHeight: 14,
    },
});
 
export default App;
```
### Permissions

For Android, the application must request permissions to access the microphone and camera. When the application component loads, we will request the permissions. In the `const App = () => { };` add the following code:

```javascript
const requestPermissions = async () => {
    try {
        const cameraGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "Camera Permission",
                message:"This App needs access to your camera",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );

        if (cameraGranted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera");
        } else {
            console.log("Camera permission denied");
        }

        const micGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title: "Microphone Permission",
                message: "This App needs access to your microphone so you can talk to people.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );

        if (micGranted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the microphone");
        } else {
            console.log("Camera permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
};

useEffect(async () => {
    if (Platform.OS === 'android') {
        // Request the permissions to access the camera and the microphone
        // required for Android only
        await requestPermissions();
    }
}, []);
```
### Initialization

Import the SDK to the application by adding the following line at the top of the `App.js` file:

```js
import CommsAPI from '@dolbyio/comms-sdk-react-native';
```

Initialize the SDK with the Dolby.io credentials found in your dashboard. Replace the `APP_KEY` and the `APP_SECRET` with your application key and secret. Insert the following code after requesting the permissions for the microphone and camera:

```javascript
// WARNING: It is best practice to use the initializeToken function to initialize the SDK.
// Please read the documentation at:
// https://docs.dolby.io/communications-apis/docs/rn-client-sdk-classes-commsapi#initializetoken
await CommsAPI.initialize(APP_KEY, APP_SECRET);
```

Add the following code after the SDK initialization to automatically open a session after initializing the SDK. The session will open with a random user name.

```javascript
const rand = Math.round(Math.random() * 10000);
await CommsAPI.session.open({ name: `user-${rand}` });
```

### Create and join a conference

Locate the function `joinConference` in the code and replace it with the following to add a button to create and join a conference:

```javascript
const joinConference = async () => {
    try {
        const conferenceOptions = {
            alias: conferenceAlias,
            params: {},
        };

        // Create the conference
        const conference = await CommsAPI.conference.create(conferenceOptions);
        console.log(`Conference ${conference.id} created`);

        const joinOptions = {
            constraints: {
                audio: true,
                video: true,
            }
        };
        
        // Join the conference with Audio and Video on
        await CommsAPI.conference.join(conference, joinOptions);
        console.log('Conference joined');
    } catch (error) {
        console.error(error);
    }
};
```
## Integrate video

Use the `onStreamsChange` event handler provided by the conference object of the SDK to integrate video into your application. This event is triggered when a participant video stream changes, for example, a new video stream coming in or the video is stopped. Add the following code to create `VideoView` objects and insert them into the `videoElements` dictionary. The `videoElements` dictionary is used to generate the UI within the function `getVideoElements`.

```javascript
CommsAPI.conference.onStreamsChange(async (data, eventType) => {
    try {
        if (data.mediaStream && data.mediaStream.videoTracks.length > 0) {
            if (!videoElements[participant.id]) {
                const videoElement = <VideoView
                    key={`video-${data.participant.id}`}
                    style={{ height: 200, width: 180 }}
                    ref={async (element) => { await element.attach(data.participant, data.mediaStream); }} />;

                videoElements[participant.id] = videoElement;
                setVideoElements(videoElements);
            }
        } else {
            videoElements[participant.id] = null;
            setVideoElements(videoElements);

            /*if (await videoView.current.isAttached()) {
                console.log('about to detach video stream');
                await videoView.current.detach();
            }*/
        }
    } catch (error) {
        console.error(error);
    }
});
```

## Run the application

On Android, run the application:

```bash
npx react-native run-android
```

On iOS, run the application:

```bash
npx react-native run-ios
```

## Documentation

A complete list of available services in SDK along with method documentation

[CommsAPI](classes/CommsAPI.md)
is the main module that allows the application to interact with DolbyIo services. The SDK is asynchronous and uses promise at its core.

[CommandService](classes/internal.CommandService.md)
allows the application to send text messages or notifications to all conference participants. The service also emits an received event to inform the application about received messages.

[ConferenceService](classes/internal.ConferenceService.md)
allows the application to manage the conference life-cycle and interact with the conference.

[FilePresentationService](classes/internal.FilePresentationService.md)
allows the application to manage the conference life-cycle and interact with the conference.

[MediaDeviceService](classes/internal.MediaDeviceService.md)
allows the application to manage media devices that are used during conferences.

[NotificationService](classes/internal.NotificationService.md)
enables inviting participants to a conference.

[RecordingService](classes/internal.RecordingService.md)
allows an application to record conferences by using the start and stop
methods that turn the recording on and off.

[SessionService](classes/internal.SessionService.md)
allows opening and closing sessions. Opening a session is mandatory before interacting with any service.

[VideoPresentationService](classes/internal.VideoPresentationService.md)
allows sharing videos during a conference.

## License

```
   Copyright 2021 - Dolby

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
```

## SDK 3.3 License agreement

Before using the latest version of the @dolbyio/react-native-comms-sdk, please review and accept the [Dolby Software License Agreement](https://github.com/voxeet/voxeet-sdk-android/blob/main/LICENSE).

## Third Party licenses

Direct licenses can be found [here](./LICENSES.json)

© Dolby, 2021
