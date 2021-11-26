[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / CommandService

# Class: CommandService

[<internal>](../modules/_internal_.md).CommandService

The Command service allows the application to send text messages or notifications to all conference participants.
The service also emits an received event to inform the application about received messages.

## Table of contents

### Constructors

- [constructor](_internal_.CommandService.md#constructor)

### Methods

- [onMessageReceived](_internal_.CommandService.md#onmessagereceived)
- [send](_internal_.CommandService.md#send)

## Constructors

### constructor

• **new CommandService**()

## Methods

### onMessageReceived

▸ **onMessageReceived**(`handler`): () => `void`

Adds a native listener for message received

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`MessageReceivedEventType`](../interfaces/_internal_.MessageReceivedEventType.md)) => `void` | Event callback function |

#### Returns

`fn`

Function that unsubscribes from listeners

▸ (): `void`

Adds a native listener for message received

##### Returns

`void`

Function that unsubscribes from listeners

___

### send

▸ **send**(`message`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Sends a message, in the form of a basic stream, to all conference participants.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | Message to send |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>
