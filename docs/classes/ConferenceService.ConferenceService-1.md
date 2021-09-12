[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [ConferenceService](../modules/ConferenceService.md) / ConferenceService

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

▸ **create**(`options`): `Promise`<[`Conference`](../modules/ConferenceService.md#conference)\>

Create a conference with ConferenceOptions

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ConferenceCreateOptions`](../modules/ConferenceService.md#conferencecreateoptions) |

#### Returns

`Promise`<[`Conference`](../modules/ConferenceService.md#conference)\>

Promise with a Conference

___

### current

▸ **current**(): `Promise`<[`Conference`](../modules/ConferenceService.md#conference)\>

Returns information about the current conference.

#### Returns

`Promise`<[`Conference`](../modules/ConferenceService.md#conference)\>

Promise with a Conference

___

### fetch

▸ **fetch**(`conferenceId?`): `Promise`<[`Conference`](../modules/ConferenceService.md#conference)\>

Provides a Conference object that allows joining a conference. Without a param returns current Conference object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `conferenceId?` | `string` |

#### Returns

`Promise`<[`Conference`](../modules/ConferenceService.md#conference)\>

Promise with a Conference

___

### join

▸ **join**(): `void`

#### Returns

`void`

___

### replay

▸ **replay**(`conference`, `replayOptions?`, `mixingOptions?`): `Promise`<[`Conference`](../modules/ConferenceService.md#conference)\>

Replays a previously recorded conference.

#### Parameters

| Name | Type |
| :------ | :------ |
| `conference` | [`Conference`](../modules/ConferenceService.md#conference) |
| `replayOptions?` | [`ConferenceReplayOptions`](../modules/ConferenceService.md#conferencereplayoptions) |
| `mixingOptions?` | [`ConferenceMixingOptions`](../modules/ConferenceService.md#conferencemixingoptions) |

#### Returns

`Promise`<[`Conference`](../modules/ConferenceService.md#conference)\>

Promise with a Conference
