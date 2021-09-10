[@dolbyio/react-native-iapi-sdk](../README.md) / [Modules](../modules.md) / [ConferenceService](../modules/ConferenceService.md) / ConferenceService

# Class: ConferenceService

[ConferenceService](../modules/ConferenceService.md).ConferenceService

## Table of contents

### Constructors

- [constructor](ConferenceService.ConferenceService-1.md#constructor)

### Methods

- [create](ConferenceService.ConferenceService-1.md#create)
- [current](ConferenceService.ConferenceService-1.md#current)
- [fetch](ConferenceService.ConferenceService-1.md#fetch)
- [join](ConferenceService.ConferenceService-1.md#join)
- [replay](ConferenceService.ConferenceService-1.md#replay)

## Constructors

### constructor

• **new ConferenceService**()

## Methods

### create

▸ **create**(`options`): `Promise`<`Conference`\>

Create a conference with ConferenceOptions

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `ConferenceCreateOptions` |

#### Returns

`Promise`<`Conference`\>

Promise with a Conference

___

### current

▸ **current**(): `Promise`<`Conference`\>

Returns information about the current conference.

#### Returns

`Promise`<`Conference`\>

Promise with a Conference

___

### fetch

▸ **fetch**(`conferenceId?`): `Promise`<`Conference`\>

Provides a Conference object that allows joining a conference. Without a param returns current Conference object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `conferenceId?` | `string` |

#### Returns

`Promise`<`Conference`\>

Promise with a Conference

___

### join

▸ **join**(): `void`

#### Returns

`void`

___

### replay

▸ **replay**(`conference`, `replayOptions?`, `mixingOptions?`): `Promise`<`Conference`\>

Replays a previously recorded conference.

#### Parameters

| Name | Type |
| :------ | :------ |
| `conference` | `Conference` |
| `replayOptions?` | `ConferenceReplayOptions` |
| `mixingOptions?` | `ConferenceMixingOptions` |

#### Returns

`Promise`<`Conference`\>

Promise with a Conference
