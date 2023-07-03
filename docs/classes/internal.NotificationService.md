# Class: NotificationService

[internal](../modules/internal.md).NotificationService

The NotificationService allows inviting participants to a conference and subscribing to and unsubscribing from notifications.

## Table of contents

### Constructors

- [constructor](internal.NotificationService.md#constructor)

### Methods

- [subscribe](internal.NotificationService.md#subscribe)
- [unsubscribe](internal.NotificationService.md#unsubscribe)
- [decline](internal.NotificationService.md#decline)
- [invite](internal.NotificationService.md#invite)
- [onInvitationReceived](internal.NotificationService.md#oninvitationreceived)
- [onConferenceStatus](internal.NotificationService.md#onconferencestatus)
- [onConferenceCreated](internal.NotificationService.md#onconferencecreated)
- [onConferenceEnded](internal.NotificationService.md#onconferenceended)
- [onParticipantJoined](internal.NotificationService.md#onparticipantjoined)
- [onParticipantLeft](internal.NotificationService.md#onparticipantleft)
- [onActiveParticipants](internal.NotificationService.md#onactiveparticipants)

## Constructors

### constructor

• **new NotificationService**()

## Methods

### subscribe

▸ **subscribe**(`events`): `Promise`<`void`\>

Subscribes to the specified notifications. This method is supported in SDK 3.8 and later.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `events` | [`Subscription`](../interfaces/internal.Subscription.md)[] | An array of the subscribed subscription types. |

#### Returns

`Promise`<`void`\>

___

### unsubscribe

▸ **unsubscribe**(`events`): `Promise`<`void`\>

Unsubscribes from the specified notifications. This method is supported in SDK 3.8 and later.

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

___

### onConferenceStatus

▸ **onConferenceStatus**(`handler`): [`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Adds a listener to the conference status event. This API is supported in SDK 3.8 and later.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`ConferenceStatusEventType`](../interfaces/internal.ConferenceStatusEventType.md)) => `void` | An event callback function. |

#### Returns

[`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

A function that unsubscribes from event listeners.

___

### onConferenceCreated

▸ **onConferenceCreated**(`handler`): [`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Adds a listener to the conference created event. This API is supported in SDK 3.8 and later.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`ConferenceCreatedEventType`](../interfaces/internal.ConferenceCreatedEventType.md)) => `void` | An event callback function. |

#### Returns

[`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

A function that unsubscribes from event listeners.

___

### onConferenceEnded

▸ **onConferenceEnded**(`handler`): [`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Adds a listener to the conference ended event. This API is supported in SDK 3.8 and later.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`ConferenceEndedEventType`](../interfaces/internal.ConferenceEndedEventType.md)) => `void` | An event callback function. |

#### Returns

[`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

A function that unsubscribes from event listeners.

___

### onParticipantJoined

▸ **onParticipantJoined**(`handler`): [`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Adds a listener to the participant joined event. This API is supported in SDK 3.8 and later.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`ParticipantJoinedEventType`](../interfaces/internal.ParticipantJoinedEventType.md)) => `void` | An event callback function. |

#### Returns

[`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

A function that unsubscribes from event listeners.

___

### onParticipantLeft

▸ **onParticipantLeft**(`handler`): [`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Adds a listener to the participant left event. This API is supported in SDK 3.8 and later.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`ParticipantLeftEventType`](../interfaces/internal.ParticipantLeftEventType.md)) => `void` | An event callback function. |

#### Returns

[`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

A function that unsubscribes from event listeners.

___

### onActiveParticipants

▸ **onActiveParticipants**(`handler`): [`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Adds a listener to the participant active event. This API is supported in SDK 3.8 and later.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`ActiveParticipantsEventType`](../interfaces/internal.ActiveParticipantsEventType.md)) => `void` | An event callback function. |

#### Returns

[`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

A function that unsubscribes from event listeners.
