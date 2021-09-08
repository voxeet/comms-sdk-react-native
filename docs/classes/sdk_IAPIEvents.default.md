[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [sdk/IAPIEvents](../modules/sdk_IAPIEvents.md) / default

# Class: default

[sdk/IAPIEvents](../modules/sdk_IAPIEvents.md).default

## Table of contents

### Constructors

- [constructor](sdk_IAPIEvents.default.md#constructor)

### Methods

- [addListener](sdk_IAPIEvents.default.md#addlistener)

## Constructors

### constructor

• **new default**()

## Methods

### addListener

▸ **addListener**<`K`\>(`type`, `listener`): [`UnregisterCallback`](../interfaces/sdk_models_UnregisterCallback.UnregisterCallback.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof `EventMap` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `K` |
| `listener` | (`event`: `EventMap`[`K`]) => `void` |

#### Returns

[`UnregisterCallback`](../interfaces/sdk_models_UnregisterCallback.UnregisterCallback.md)
