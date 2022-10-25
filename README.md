# Dolby.io Communications SDK for React Native

This guide explains how to create a basic audio video conference application for mobile with React Native. It starts with importing the Dolby.io Communications SDK for React Native and guides you through the steps to launch a conference call.

## Prerequisites

Make sure that you have:

- A Dolby.io account
- An iOS or Android device to run the application on, or the device emulator
- React Native 0.66+ (including Expo projects)

For reference, see the [GitHub sample repository](https://github.com/dolbyio-samples/comms-sdk-react-native-getting-started).

Please review [Supported Environments](https://docs.dolby.io/communications-apis/docs/overview-supported-environments) for more information on iOS and Android requirements.

Please see the [documentation](https://docs.dolby.io/communications-apis/docs/react-native-overview) for a complete list of available services and methods.
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

For iOS, install native dependencies via CocoaPods:

```bash
pod install --repo-update --project-directory=ios/
```

For Android, add the following line to your `android/build.gradle` file, in the `allprojects`, `repositories` section:

```
maven { url("https://android-sdk.voxeet.com/release") }
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
import React, { useEffect, useState } from 'react';
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
    Platform,
    PermissionsAndroid,
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
    const [streamingUsers, setStreamingUsers] = useState([]);

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
                        {streamingUsers.map(({ participant, stream }) => (
                            <VideoView
                                key={`video-${participant.id}`}
                                style={{height: 200, width: 180, borderWidth: 1}}
                                ref={async element => {
                                    try {
                                        await element.attach(participant, stream);
                                    } catch (error) {
                                        console.error(error);
                                    }
                                }}
                            />
                        ))}
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

For iOS, establish privacy permissions by adding two new keys in `Info.plist`:

- Privacy - Microphone Usage Description.
- Privacy - Camera Usage Description.

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
    } catch (error) {
        console.warn(error);
    }
};

useEffect(async () => {
    async function initialize() {
        if (Platform.OS === 'android') {
            // Request the permissions to access the camera and the microphone
            // required for Android only
            await requestPermissions();
        }

        // Initialization of the SDK...
    }

    initialize();
}, []);
```

### Initialization

**1.** Import the SDK to the application by adding the following line at the top of the `App.js` file:

```js
import CommsAPI, { VideoView } from '@dolbyio/comms-sdk-react-native';
```

**2.** Initialize the SDK with the Dolby.io credentials found in your dashboard. Replace the `APP_KEY` and the `APP_SECRET` with your application key and secret. Insert the following code after requesting the permissions for the microphone and camera (look for `// Initialization of the SDK...`):

```javascript
// WARNING: It is best practice to use the initializeToken function to initialize the SDK.
// Please read the documentation at:
// https://docs.dolby.io/communications-apis/docs/rn-client-sdk-references-commsapi#initializetoken
await CommsAPI.initialize(APP_KEY, APP_SECRET);
```

**3.** Add the following code after the SDK initialization to automatically open a session after initializing the SDK. The session will open with a random user name.

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

**1.** Add the following import statement at the top of your document:

```javascript
import { VideoView } from '@dolbyio/comms-sdk-react-native';
```

**2.** Insert the following code in your App component:

```javascript
useEffect(() => {
    const unsubscribe = CommsAPI.conference.onStreamsChange((data, type) => {
        if (type === 'EVENT_CONFERENCE_STREAM_REMOVED') {
            // Remove the users without a video stream
            setStreamingUsers(usr => usr.filter(d => d.participant.id !== data.participant.id));
            return;
        }

        if (
            !streamingUsers
            .map(d => d.participant.id)
            .includes(data.participant.id) &&
            data?.stream?.videoTracks?.length > 0
        ) {
            setStreamingUsers(sp => [...sp, data]);
        }
    });

    return () => unsubscribe();
}, []);
```

## Run the application

On iOS, run the application:

```bash
npx react-native run-ios
```

On Android, run the application:

```bash
npx react-native run-android
```
## SDK License agreement

The Dolby.io Communications SDK for React Native and its repository are licensed under the MiT License.

Before using the latest version of the @dolbyio/comms-sdk-react-native, please review and accept the [Dolby Software License Agreement](./LICENSE).

## Third Party licenses

Direct licenses can be found [here](./LICENSES.json)

© Dolby, 2021
