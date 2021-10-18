[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / NotificationService

# Class: NotificationService

[<internal>](../modules/_internal_.md).NotificationService

## Table of contents

### Constructors

- [constructor](_internal_.NotificationService.md#constructor)

### Methods

- [decline](_internal_.NotificationService.md#decline)
- [invite](_internal_.NotificationService.md#invite)
- [onInvitationReceived](_internal_.NotificationService.md#oninvitationreceived)

## Constructors

### constructor

• **new NotificationService**()

## Methods

### decline

▸ **decline**(`conference`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Declines the conference invitation.

#### Parameters

| Name | Type |
| :------ | :------ |
| `conference` | [`Conference`](../interfaces/_internal_.Conference.md) |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### invite

▸ **invite**(`conference`, `participants`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Notifies conference participants about a conference invitation.

#### Parameters

| Name | Type |
| :------ | :------ |
| `conference` | [`Conference`](../interfaces/_internal_.Conference.md) |
| `participants` | [`ParticipantInvited`](../interfaces/_internal_.ParticipantInvited.md)[] |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### onInvitationReceived

▸ **onInvitationReceived**(`handler`): [`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Add a handler for invitation received

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | (`data`: [`InvitationReceivedEventType`](../interfaces/_internal_.InvitationReceivedEventType.md)) => `void` |

#### Returns

[`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Function that removes handler
