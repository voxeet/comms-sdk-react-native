[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [services/NotificationService](../modules/services_NotificationService.md) / default

# Class: default

[services/NotificationService](../modules/services_NotificationService.md).default

## Hierarchy

- [`default`](services_AbstractService.default.md)

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](services_NotificationService.default.md#constructor)

### Properties

- [#emitter](services_NotificationService.default.md##emitter)
- [events](services_NotificationService.default.md#events)

### Methods

- [addListener](services_NotificationService.default.md#addlistener)
- [decline](services_NotificationService.default.md#decline)
- [invite](services_NotificationService.default.md#invite)
- [inviteWithPermissions](services_NotificationService.default.md#invitewithpermissions)
- [subscribe](services_NotificationService.default.md#subscribe)
- [unsubscribe](services_NotificationService.default.md#unsubscribe)

## Constructors

### constructor

• **new default**()

#### Overrides

[default](services_AbstractService.default.md).[constructor](services_AbstractService.default.md#constructor)

## Properties

### #emitter

• `Private` **#emitter**: `EventEmitter2`

___

### events

• `Protected` **events**: `any`

#### Inherited from

[default](services_AbstractService.default.md).[events](services_AbstractService.default.md#events)

## Methods

### addListener

▸ **addListener**<`K`\>(`type`, `listener`): [`UnregisterCallback`](../interfaces/types_UnregisterCallback.UnregisterCallback.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`SubscriptionMapping`](../interfaces/services_notification_Subscriptions.SubscriptionMapping.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `K` |
| `listener` | (`event`: [`SubscriptionMapping`](../interfaces/services_notification_Subscriptions.SubscriptionMapping.md)[`K`]) => `void` |

#### Returns

[`UnregisterCallback`](../interfaces/types_UnregisterCallback.UnregisterCallback.md)

___

### decline

▸ **decline**(`conference`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conference` | [`Conference`](../interfaces/services_conference_Conference.Conference.md) |

#### Returns

`Promise`<`boolean`\>

___

### invite

▸ **invite**(`conference`, `participants`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conference` | [`Conference`](../interfaces/services_conference_Conference.Conference.md) |
| `participants` | [`ParticipantInfo`](../interfaces/services_conference_ConferenceParticipant.ParticipantInfo.md)[] |

#### Returns

`Promise`<`boolean`\>

___

### inviteWithPermissions

▸ **inviteWithPermissions**(`conference`, `participants`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conference` | [`Conference`](../interfaces/services_conference_Conference.Conference.md) |
| `participants` | [`default`](../interfaces/services_notification_ParticipantInvited.default.md)[] |

#### Returns

`Promise`<`boolean`\>

___

### subscribe

▸ **subscribe**(`subscriptions`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subscriptions` | [`Subscription`](../interfaces/services_notification_Subscriptions.Subscription.md)[] |

#### Returns

`Promise`<`boolean`\>

___

### unsubscribe

▸ **unsubscribe**(`subscriptions`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subscriptions` | [`Subscription`](../interfaces/services_notification_Subscriptions.Subscription.md)[] |

#### Returns

`Promise`<`boolean`\>
