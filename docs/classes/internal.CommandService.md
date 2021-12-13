# Class: CommandService

[internal](../modules/internal.md).CommandService

The CommandService allows the application to send and receive text messages and notifications during a conference.

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

▸ **onMessageReceived**(`handler`): [`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Adds a listener to events informing about received messages.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`MessageReceivedEventType`](../interfaces/internal.MessageReceivedEventType.md)) => `void` | An event callback function. |

#### Returns

[`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

A function that unsubscribes from event listeners.

___

### send

▸ **send**(`message`): `Promise`<`void`\>

Sends a message to all conference participants. The message is in a form of a basic stream.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | The message to send. |

#### Returns

`Promise`<`void`\>
