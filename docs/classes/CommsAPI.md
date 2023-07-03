# Class: CommsAPI

CommsAPI is a main object that allows an application to interact with Dolby.io services.

## Table of contents

### Constructors

- [constructor](CommsAPI.md#constructor)

### Properties

- [audio](CommsAPI.md#audio)
- [command](CommsAPI.md#command)
- [conference](CommsAPI.md#conference)
- [filePresentation](CommsAPI.md#filepresentation)
- [mediaDevice](CommsAPI.md#mediadevice)
- [notification](CommsAPI.md#notification)
- [recording](CommsAPI.md#recording)
- [session](CommsAPI.md#session)
- [videoPresentation](CommsAPI.md#videopresentation)
- [video](CommsAPI.md#video)

### Methods

- [initialize](CommsAPI.md#initialize)
- [initializeToken](CommsAPI.md#initializetoken)

## Constructors

### constructor

• **new CommsAPI**()

## Properties

### audio

• **audio**: [`AudioService`](internal.AudioService.md) = `AudioService`

Retrieves the AudioService instance that allows changing audio settings for the local and remote participants.

This API is available in SDK 3.7 and later.

___

### command

• **command**: [`CommandService`](internal.CommandService.md) = `CommandService`

Retrieves the CommandService instance that allows sending messages to conferences.

___

### conference

• **conference**: [`ConferenceService`](internal.ConferenceService.md) = `ConferenceService`

Retrieves the ConferenceService instance that allows interacting with conferences.

___

### filePresentation

• **filePresentation**: [`FilePresentationService`](internal.FilePresentationService.md) = `FilePresentationService`

Retrieves the FilePresentationService instance that allows presenting files during conferences.

___

### mediaDevice

• **mediaDevice**: [`MediaDeviceService`](internal.MediaDeviceService.md) = `MediaDeviceService`

Retrieves the MediaDeviceService instance that allows interacting with devices through the system.

___

### notification

• **notification**: [`NotificationService`](internal.NotificationService.md) = `NotificationService`

Retrieves the NotificationService instance that allows inviting participants to a conference.

___

### recording

• **recording**: [`RecordingService`](internal.RecordingService.md) = `RecordingService`

Retrieves the RecordingService instance that allows recording conferences.

___

### session

• **session**: [`SessionService`](internal.SessionService.md) = `SessionService`

Retrieves the SessionService instance that allows using sessions.

___

### videoPresentation

• **videoPresentation**: [`VideoPresentationService`](internal.VideoPresentationService.md) = `VideoPresentationService`

Retrieves the VideoPresentationService instance that allows presenting videos during conferences.

___

### video

• **video**: [`VideoService`](internal.VideoService.md) = `VideoService`

Retrieves the VideoService instance that allows enabling and disabling video for the local and remote participants.

This API is available in SDK 3.7 and later.

## Methods

### initialize

▸ **initialize**(`consumerKey`, `consumerSecret`): `Promise`<``null``\>

Initializes the SDK using the customer key and secret.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `consumerKey` | `string` | The customer key. |
| `consumerSecret` | `string` | The customer secret. |

#### Returns

`Promise`<``null``\>

___

### initializeToken

▸ **initializeToken**(`accessToken`, `refreshAccessToken`): `Promise`<``null``\>

Initializes the SDK with the client access token provided by the Dolby.io platform. The client access token protects customer's conferences from unauthorized access and can be generated only by the Dolby.io platform via an application's authentication server and the [client access token](ref:get-client-access-token) request.

The method requires providing two parameters - the **client access token** received from the Dolby.io platform and the **refresh access token** callback. The callback must be a function that requests a new token and returns a promise containing the refreshed client access token when the token is incorrect or needs to be refreshed. The refresh token callback uses an **isExpired** boolean parameter to inform whether the currently used client access token is expired.

For more information, see the [Accessing Dolby.io Platform](doc:guides-accessing-dolbyio-platform) guide.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `accessToken` | ``null`` \| `string` | The access token provided by the customer's backend. |
| `refreshAccessToken` | `RefreshAccessTokenType` | A callback that returns a promise when the access token needs to be refreshed. The callback parameter takes the isExpired boolean parameter to check if the previous token has expired. |

#### Returns

`Promise`<``null``\>
