# Class: CommsAPI

CommsAPI is a main object that allows an application to interact with Dolby.io services.

## Constructors

### constructor

• **new CommsAPI**()

## Properties

### audio

• **audio**: [`AudioService`](internal.AudioService.md) = `AudioService`

Retrieves the AudioService instance that allows changing audio settings for the local and remote participants.

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

Initializes the SDK with an access token that is provided by the customer backend communicating with Dolby.io servers. The token allows securing the App key and App secret.
The following diagram presents the authentication flow:
```
Client          Customer Server       Dolby Server
|                    |                    |
|  Get Access Token  |  /oauth2/token (1) |
|------------------->|------------------->|
|    Access Token    |    Access Token    |
|<-------------------|<-------------------|
|  initializeToken(accessToken, callback) |
|---------------------------------------->|
```
Where (1) is the REST API endpoint that is available on Dolby.io servers and documented on the developer portal.

The access token has a limited period of validity and needs to be refreshed for security reasons. In such case, the SDK calls the callback provided to initializeToken. The callback must return a promise containing the refreshed access token by calling the customer backend, as presented in the following diagram:

```
Client          Customer Server       Dolby Server
|      callback      |  /oauth2/token (2) |
|------------------->|------------------->|
|    Access Token    |    Access Token    |
|<-------------------|<-------------------|
```
Where (2) is the REST API endpoint that is available on Dolby.io servers and documented on the developer portal.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `accessToken` | ``null`` \| `string` | The access token provided by the customer's backend. |
| `refreshAccessToken` | `RefreshAccessTokenType` | A callback that returns a promise when the access token needs to be refreshed. The callback parameter takes the isExpired boolean parameter to check if the previous token has expired. |

#### Returns

`Promise`<``null``\>
