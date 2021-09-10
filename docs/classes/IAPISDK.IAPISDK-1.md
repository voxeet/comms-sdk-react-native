[@dolbyio/react-native-iapi-sdk](../README.md) / [Modules](../modules.md) / [IAPISDK](../modules/IAPISDK.md) / IAPISDK

# Class: IAPISDK

[IAPISDK](../modules/IAPISDK.md).IAPISDK

## Table of contents

### Constructors

- [constructor](IAPISDK.IAPISDK-1.md#constructor)

### Properties

- [#refreshAccessTokenInBackground](IAPISDK.IAPISDK-1.md##refreshaccesstokeninbackground)

### Methods

- [initialize](IAPISDK.IAPISDK-1.md#initialize)
- [initializeToken](IAPISDK.IAPISDK-1.md#initializetoken)

## Constructors

### constructor

• **new IAPISDK**()

## Properties

### #refreshAccessTokenInBackground

• `Private` `Optional` **#refreshAccessTokenInBackground**: ``null`` \| `RefreshAccessTokenInBackgroundType` = `null`

## Methods

### initialize

▸ **initialize**(`consumerKey`, `consumerSecret`): `Promise`<`boolean`\>

Initializes the SDK using the customer key and secret.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `consumerKey` | `string` | The customer key. |
| `consumerSecret` | `string` | The customer secret. |

#### Returns

`Promise`<`boolean`\>

___

### initializeToken

▸ **initializeToken**(`accessToken`, `refreshAccessToken`): `Promise`<`boolean`\>

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
| `refreshAccessToken` | `RefreshAccessTokenType` | A callback that returns a promise when the access token needs to be refreshed. The callback parameter takes the isExpired boolean parameter to check if the previous token has expired. |

#### Returns

`Promise`<`boolean`\>
