# Class: DolbyIoIAPI

## Table of contents

### Constructors

- [constructor](DolbyIoIAPI.md#constructor)

### Properties

- [command](DolbyIoIAPI.md#command)
- [conference](DolbyIoIAPI.md#conference)
- [filePresentation](DolbyIoIAPI.md#filepresentation)
- [mediaDevice](DolbyIoIAPI.md#mediadevice)
- [notification](DolbyIoIAPI.md#notification)
- [recording](DolbyIoIAPI.md#recording)
- [session](DolbyIoIAPI.md#session)
- [videoPresentation](DolbyIoIAPI.md#videopresentation)

### Methods

- [initialize](DolbyIoIAPI.md#initialize)
- [initializeToken](DolbyIoIAPI.md#initializetoken)

## Constructors

### constructor

• **new DolbyIoIAPI**()

## Properties

### command

• **command**: [`CommandService`](internal.CommandService.md)

___

### conference

• **conference**: [`ConferenceService`](internal.ConferenceService.md)

___

### filePresentation

• **filePresentation**: [`FilePresentationService`](internal.FilePresentationService.md)

___

### mediaDevice

• **mediaDevice**: [`MediaDeviceService`](internal.MediaDeviceService.md)

___

### notification

• **notification**: [`NotificationService`](internal.NotificationService.md)

___

### recording

• **recording**: [`RecordingService`](internal.RecordingService.md)

___

### session

• **session**: [`SessionService`](internal.SessionService.md)

___

### videoPresentation

• **videoPresentation**: [`VideoPresentationService`](internal.VideoPresentationService.md)

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

Initialize the SDK with an access token that is provided by the customer backend communicating with Dolby.io servers. The token allows securing the customer key and secret.
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
The access token has a limited period of validity and needs to be refreshed for security reasons. In such case,
The IAPI SDK will call the callback provided to initializeToken. The callback must return a Promise
containing the refreshed access token by calling the customer backend, as presented in the following diagram:

```
Client          Customer Server       Dolby Server
|      callback      |  /oauth2/token (2) |
|------------------->|------------------->|
|    Access Token    |    Access Token    |
|<-------------------|<-------------------|
```
Where (1) and (2) are two REST API endpoints available on Dolby.io servers and documented on the developer portal.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `accessToken` | ``null`` \| `string` | The access token provided by the customer's backend.. |
| `refreshAccessToken` | [`RefreshAccessTokenType`](../modules/internal.md#refreshaccesstokentype) | A callback that returns a promise when the access token needs to be refreshed. The callback parameter takes the isExpired boolean parameter to check if the previous token has expired. |

#### Returns

`Promise`<``null``\>
