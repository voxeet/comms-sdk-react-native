[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [services/SessionService](../modules/services_SessionService.md) / default

# Class: default

[services/SessionService](../modules/services_SessionService.md).default

## Table of contents

### Constructors

- [constructor](services_SessionService.default.md#constructor)

### Methods

- [close](services_SessionService.default.md#close)
- [isLocalParticipant](services_SessionService.default.md#islocalparticipant)
- [isSocketOpen](services_SessionService.default.md#issocketopen)
- [open](services_SessionService.default.md#open)

## Constructors

### constructor

• **new default**()

## Methods

### close

▸ **close**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

___

### isLocalParticipant

▸ **isLocalParticipant**(`participant`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `participant` | [`default`](services_conference_Participant.default.md) |

#### Returns

`Promise`<`boolean`\>

___

### isSocketOpen

▸ **isSocketOpen**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

___

### open

▸ **open**(`participant`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `participant` | [`ParticipantInfo`](../interfaces/services_conference_ConferenceParticipant.ParticipantInfo.md) |

#### Returns

`Promise`<`boolean`\>
