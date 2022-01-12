# This project is still a work in progress and not yet ready for production. Please stay tuned.

# Dolby.io Communications SDK for React Native

The Dolby.io Communications APIs provide a platform for unified communications and collaboration. You can combine voice, video, and messaging as an integrated solution for your own applications in a way that is cohesive to your end-users. This is in contrast to out-of-app communications where users must exit your application and turn to third-party stand-alone tools.

For example, with the Client SDKs you can build:

- A video conference application for your employee portal
- A broadcast webinar application for presentations to grow your audience
- A 1-on-1 help desk service for your specialized customers

## Requirements

### iOS

- Xcode 12 and iOS SDK 14
- iOS 11.0+ target deployment

### Android

- Minimum Android SDK version - 25

## Installation

1. Install module using `npm` or `yarn`:

   ```bash
   npm install @dolbyio/react-native-comms-sdk --save
   ```

   ```bash
   yarn add @dolbyio/react-native-comms-sdk
   ```

2. If you are using React Native version 0.60 or later:

- for IOS: install native dependencies via CocoaPods from your /ios directory:

  ```bash
  pod install --repo-update
  ```

- for Android: add following lines to your `android/build.grade` file:
  ```
   maven { url("http://android-sdk.voxeet.com/release") }
   maven { url("http://android-sdk.voxeet.com/beta") }
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

3. If you are using a React Native version prior to 0.60, link the native dependency:

   ```bash
   react-native link @dolbyio/react-native-comms-sdk
   ```

   Then, install from your /ios directory:

   ```bash
   pod install --repo-update
   ```

4. Follow the iOS and Android getting started pages to configure native projects.
   https://docs.dolby.io/communications-apis/docs/create-a-basic-audio-conference-application-for-ios
   https://docs.dolby.io/communications-apis/docs/android-create-basic-audio-conference

## Getting started

1. Import the SDK to your project.

```js
import CommsAPI from '@dolbyio/react-native-comms-sdk';
```

2. Initialize the SDK with your Dolby.io credentials.

```js
await CommsAPI.initialize(APP_ID, APP_SECRET);
```

3. Open a session.

```js
await CommsAPI.session.open({ name, externalId });
```

4. Create a conference.

```js
const conferenceOptions = {
  alias,
  params: {},
};

const createdConference = await CommsAPI.conference.create(
  conferenceOptions
);
```

4. Join the created conference.

```js
const joinedConference = await CommsAPI.conference.join(
  createdConference,
  {}
);
```

5. Import some additional services.

```js
import { Conference } from '@dolbyio/react-native-comms-sdk';
```

or

```js
import CommsAPI from '@dolbyio/react-native-comms-sdk';
const { Conference } = CommsAPI;
```

## Integrate video

1. Place the VideoView in your component.

```jsx
import { VideoView } from '@dolbyio/react-native-comms-sdk';
...
return (
...
  <VideoView
    style={{ flex: 1 }}
  />
```

2. Get a reference to your VideoView component.

```jsx
const videoView = useRef() as React.MutableRefObject<VideoView>;
...
return (
...
  <VideoView
    style={{ flex: 1 }}
    ref={videoView}
  />
```

3. Attach a stream to video.

```js
videoView.current.attach(
  participant,
  participant.streams[participant.streams.length - 1]
);
```

VideoView properties

| Name      | Type            | Description                                                                 |
| --------- | --------------- | --------------------------------------------------------------------------- |
| isMirror  | boolean         | It allows the image to be reflected horizontally                            |
| scaleType | 'fit' or 'fill' | It allows you to fit the image differently to the canvas                    |
| style     |                 | It allows you to style the video window according to React Native standards |

VideoView methods

| Name              | Arguments                                           | Returns          | Description                                                        |
| ----------------- | --------------------------------------------------- | ---------------- | ------------------------------------------------------------------ |
| attach()          | (participant: Participant,mediaStream: MediaStream) | Promise(boolean) | Allows displaying the stream of participant                        |
| detach()          | none                                                | Promise(boolean) | It allows you to finish displaying the stream                      |
| isAttached()      | none                                                | Promise(boolean) | Gets information about whether the stream is active                |
| isScreenSharing() | none                                                | Promise(boolean) | Gets information about whether the active stream is screen-sharing |

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

Before using the latest version of the @dolbyio/react-native-comms-sdk, please review and accept the [Dolby Software License Agreement](./LICENSE).

## Third Party licenses

Direct licenses can be found [here](./LICENSES.json)

© Dolby, 2021
