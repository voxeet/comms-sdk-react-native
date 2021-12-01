# Class: CommandService

[internal](../modules/internal.md).CommandService

The Command service allows the application to send text messages or notifications to all conference participants.
The service also emits an received event to inform the application about received messages.

## Table of contents

### Constructors

- [constructor](internal.CommandService.md#constructor)

### Methods

- [onMessageReceived](internal.CommandService.md#onmessagereceived)
- [send](internal.CommandService.md#send)

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
| `handler` | (`data`: [`MessageReceivedEventType`](../interfaces/internal.MessageReceivedEventType.md)) => `void` | Event callback function |

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

▸ **send**(`message`): `Promise`<`void`\>

Sends a message, in the form of a basic stream, to all conference participants.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | Message to send |

#### Returns

`Promise`<`void`\>
