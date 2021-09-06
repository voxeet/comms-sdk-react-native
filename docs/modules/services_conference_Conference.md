[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / services/conference/Conference

# Module: services/conference/Conference

## Table of contents

### Interfaces

- [Conference](../interfaces/services_conference_Conference.Conference.md)

### Functions

- [conferenceToMap](services_conference_Conference.md#conferencetomap)
- [mapToConference](services_conference_Conference.md#maptoconference)

## Functions

### conferenceToMap

▸ **conferenceToMap**(`conference`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `conference` | [`Conference`](../interfaces/services_conference_Conference.Conference.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `conferenceAlias?` | `string` |
| `conferenceId?` | `string` |
| `isNew?` | `boolean` |
| `participants` | [`default`](../classes/services_conference_Participant.default.md)[] |
| `status` | [`ConferenceStatus`](../enums/services_conference_ConferenceStatus.ConferenceStatus.md) |

___

### mapToConference

▸ **mapToConference**(`conference`): [`Conference`](../interfaces/services_conference_Conference.Conference.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `conference` | `any` |

#### Returns

[`Conference`](../interfaces/services_conference_Conference.Conference.md)
