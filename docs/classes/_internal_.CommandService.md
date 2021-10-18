[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / CommandService

# Class: CommandService

[<internal>](../modules/_internal_.md).CommandService

## Table of contents

### Constructors

- [constructor](_internal_.CommandService.md#constructor)

### Properties

- [_nativeEvents](_internal_.CommandService.md#_nativeevents)

### Methods

- [onMessageReceived](_internal_.CommandService.md#onmessagereceived)
- [send](_internal_.CommandService.md#send)

## Constructors

### constructor

• **new CommandService**()

## Properties

### \_nativeEvents

• **\_nativeEvents**: `default`

## Methods

### onMessageReceived

▸ **onMessageReceived**(`handler`): () => `void`

Adds a native listener for message received

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | (`data`: [`MessageReceivedEventType`](../interfaces/_internal_.MessageReceivedEventType.md)) => `void` |

#### Returns

`fn`

Function that removes handler

▸ (): `void`

Adds a native listener for message received

##### Returns

`void`

Function that removes handler

___

### send

▸ **send**(`message`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Sends a message, in the form of a basic stream, to all conference participants.

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>
