# Class: CommandService

[internal](../modules/internal.md).CommandService

The CommandService allows the application to send and receive text messages and notifications during a conference.

## Constructors

### constructor

• **new CommandService**()

## Methods

### send

▸ **send**(`message`): `Promise`<`void`\>

Sends a message to all conference participants.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | The message to send. |

#### Returns

`Promise`<`void`\>

___

### onMessageReceived

▸ **onMessageReceived**(`handler`): [`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Adds a listener to the event informing about new messages received.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`MessageReceivedEventType`](../interfaces/internal.MessageReceivedEventType.md)) => `void` | An event callback function. |

#### Returns

[`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

A function that unsubscribes from event listeners.
