[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [sdk/Implementation](../modules/sdk_Implementation.md) / default

# Class: default

[sdk/Implementation](../modules/sdk_Implementation.md).default

## Table of contents

### Constructors

- [constructor](sdk_Implementation.default.md#constructor)

### Properties

- [refreshAccessTokenCallback](sdk_Implementation.default.md#refreshaccesstokencallback)

### Accessors

- [events](sdk_Implementation.default.md#events)

### Methods

- [initialize](sdk_Implementation.default.md#initialize)
- [initializeToken](sdk_Implementation.default.md#initializetoken)

## Constructors

### constructor

• **new default**()

## Properties

### refreshAccessTokenCallback

• **refreshAccessTokenCallback**: ``null`` \| [`RefreshCallback`](../interfaces/sdk_Implementation.RefreshCallback.md) = `null`

## Accessors

### events

• `get` **events**(): [`default`](sdk_IAPIEvents.default.md)

#### Returns

[`default`](sdk_IAPIEvents.default.md)

## Methods

### initialize

▸ **initialize**(`consumerKey`, `consumerSecret`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `consumerKey` | `string` |
| `consumerSecret` | `string` |

#### Returns

`Promise`<`any`\>

___

### initializeToken

▸ **initializeToken**(`accessToken`, `refreshToken`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `accessToken` | `undefined` \| `string` |
| `refreshToken` | [`TokenRefreshCallback`](../interfaces/sdk_Implementation.TokenRefreshCallback.md) |

#### Returns

`any`
