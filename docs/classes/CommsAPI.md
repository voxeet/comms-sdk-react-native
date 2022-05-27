# Class: CommsAPI

## Table of contents

### Constructors

- [constructor](CommsAPI.md#constructor)

### Properties

- [command](CommsAPI.md#command)
- [conference](CommsAPI.md#conference)
- [filePresentation](CommsAPI.md#filepresentation)
- [mediaDevice](CommsAPI.md#mediadevice)
- [notification](CommsAPI.md#notification)
- [recording](CommsAPI.md#recording)
- [session](CommsAPI.md#session)
- [videoPresentation](CommsAPI.md#videopresentation)

### Methods

- [initialize](CommsAPI.md#initialize)
- [initializeToken](CommsAPI.md#initializetoken)

## Constructors

### constructor

• **new CommsAPI**()

## Properties

### command

• **command**: [`CommandService`](internal.CommandService.md)

Retrieves the CommandService instance that allows sending messages to conferences.

___

### conference

• **conference**: [`ConferenceService`](internal.ConferenceService.md)

Retrieves the ConferenceService instance that allows interacting with conferences.

___

### filePresentation

• **filePresentation**: [`FilePresentationService`](internal.FilePresentationService.md)

Retrieves the FilePresentationService instance that allows presenting files during conferences.

___

### mediaDevice

• **mediaDevice**: [`MediaDeviceService`](internal.MediaDeviceService.md)

Retrieves the MediaDeviceService instance that allows interacting with devices through the system.

___

### notification

• **notification**: [`NotificationService`](internal.NotificationService.md)

Retrieves the NotificationService instance that allows inviting participants to a conference.

___

### recording

• **recording**: [`RecordingService`](internal.RecordingService.md)

Retrieves the RecordingService instance that allows recording conferences.

___

### session

• **session**: [`SessionService`](internal.SessionService.md)

Retrieves the SessionService instance that allows using sessions.

___

### videoPresentation

• **videoPresentation**: [`VideoPresentationService`](internal.VideoPresentationService.md)

Retrieves the VideoPresentationService instance that allows presenting videos during conferences.

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
