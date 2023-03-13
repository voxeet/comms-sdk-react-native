# Class: NotificationService

[internal](../modules/internal.md).NotificationService

The NotificationService allows inviting participants to a conference.

## Table of contents

### Constructors

- [constructor](internal.NotificationService.md#constructor)

### Methods

- [subscribe](internal.NotificationService.md#subscribe)
- [unsubscribe](internal.NotificationService.md#unsubscribe)
- [decline](internal.NotificationService.md#decline)
- [invite](internal.NotificationService.md#invite)
- [onInvitationReceived](internal.NotificationService.md#oninvitationreceived)

## Constructors

### constructor

• **new NotificationService**()

## Methods

### subscribe

▸ **subscribe**(`events`): `Promise`<`void`\>

Subscribes to the specified notifications.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `events` | [`Subscription`](../interfaces/internal.Subscription.md)[] | An array of the subscribed subscription types. |

#### Returns

`Promise`<`void`\>

___

### unsubscribe

▸ **unsubscribe**(`events`): `Promise`<`void`\>

Unsubscribes from the specified notifications.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `events` | [`Subscription`](../interfaces/internal.Subscription.md)[] | An array of the subscribed subscription types. |

#### Returns

`Promise`<`void`\>

___

### decline

▸ **decline**(`conference`): `Promise`<`void`\>

Declines the conference invitation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `conference` | [`Conference`](../interfaces/internal.Conference.md) | The conference object. |

#### Returns

`Promise`<`void`\>

___

### invite

▸ **invite**(`conference`, `participants`): `Promise`<`void`\>

Notifies conference participants about a conference invitation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `conference` | [`Conference`](../interfaces/internal.Conference.md) | The conference object. |
| `participants` | [`ParticipantInvited`](../interfaces/internal.ParticipantInvited.md)[] | Information about the invited application users. |

#### Returns

`Promise`<`void`\>

___

### onInvitationReceived

▸ **onInvitationReceived**(`handler`): [`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Adds a listener to the invitation received event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`InvitationReceivedEventType`](../interfaces/internal.InvitationReceivedEventType.md)) => `void` | An event callback function. |

#### Returns

[`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

A function that unsubscribes from event listeners.
