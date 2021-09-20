[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / DolbyIoIAPI

# Class: DolbyIoIAPI

## Table of contents

### Constructors

- [constructor](DolbyIoIAPI.md#constructor)

### Properties

- [%23refreshAccessTokenInBackground](DolbyIoIAPI.md##refreshaccesstokeninbackground)
- [conference](DolbyIoIAPI.md#conference)
- [session](DolbyIoIAPI.md#session)

### Methods

- [initialize](DolbyIoIAPI.md#initialize)
- [initializeToken](DolbyIoIAPI.md#initializetoken)

## Constructors

### constructor

• **new DolbyIoIAPI**()

## Properties

### #refreshAccessTokenInBackground

• `Private` `Optional` **#refreshAccessTokenInBackground**: ``null`` \| [`RefreshAccessTokenInBackgroundType`](../modules/_internal_.md#refreshaccesstokeninbackgroundtype) = `null`

___

### conference

• **conference**: [`ConferenceService`](_internal_.ConferenceService.md)

___

### session

• **session**: [`SessionService`](_internal_.SessionService.md)

## Methods

### initialize

▸ **initialize**(`consumerKey`, `consumerSecret`): [`Promise`](../modules/_internal_.md#promise)<`boolean`\>

Initializes the SDK using the customer key and secret.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `consumerKey` | `string` | The customer key. |
| `consumerSecret` | `string` | The customer secret. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`boolean`\>

___

### initializeToken

▸ **initializeToken**(`accessToken`, `refreshAccessToken`): [`Promise`](../modules/_internal_.md#promise)<`boolean`\>

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
| `refreshAccessToken` | [`RefreshAccessTokenType`](../modules/_internal_.md#refreshaccesstokentype) | A callback that returns a promise when the access token needs to be refreshed. The callback parameter takes the isExpired boolean parameter to check if the previous token has expired. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`boolean`\>
