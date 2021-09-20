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
- [getAudioLevel](ConferenceService.ConferenceService-1.md#getaudiolevel)
- [getAudioProcessing](ConferenceService.ConferenceService-1.md#getaudioprocessing)
- [getLocalStats](ConferenceService.ConferenceService-1.md#getlocalstats)
- [getMaxVideoForwarding](ConferenceService.ConferenceService-1.md#getmaxvideoforwarding)
- [getParticipant](ConferenceService.ConferenceService-1.md#getparticipant)
- [getParticipants](ConferenceService.ConferenceService-1.md#getparticipants)
- [getStatus](ConferenceService.ConferenceService-1.md#getstatus)
- [isMuted](ConferenceService.ConferenceService-1.md#ismuted)
- [isOutputMuted](ConferenceService.ConferenceService-1.md#isoutputmuted)
- [isSpeaking](ConferenceService.ConferenceService-1.md#isspeaking)
- [join](ConferenceService.ConferenceService-1.md#join)
- [mute](ConferenceService.ConferenceService-1.md#mute)
- [replay](ConferenceService.ConferenceService-1.md#replay)
- [setAudioProcessing](ConferenceService.ConferenceService-1.md#setaudioprocessing)
- [setMaxVideoForwarding](ConferenceService.ConferenceService-1.md#setmaxvideoforwarding)
- [updatePermissions](ConferenceService.ConferenceService-1.md#updatepermissions)

## Constructors

### constructor

• **new ConferenceService**()

## Methods

### create

▸ **create**(`options`): `Promise`<[`Conference`](../modules/services_conference_types.md#conference)\>

Create a conference with ConferenceOptions

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ConferenceCreateOptions`](../modules/services_conference_types.md#conferencecreateoptions) |

#### Returns

`Promise`<[`Conference`](../modules/services_conference_types.md#conference)\>

Promise with a Conference

___

### current

▸ **current**(): `Promise`<[`Conference`](../modules/services_conference_types.md#conference)\>

Returns information about the current conference.

#### Returns

`Promise`<[`Conference`](../modules/services_conference_types.md#conference)\>

Promise with a Conference

___

### fetch

▸ **fetch**(`conferenceId?`): `Promise`<[`Conference`](../modules/services_conference_types.md#conference)\>

Provides a Conference object that allows joining a conference. Without a param returns current Conference object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `conferenceId?` | `string` |

#### Returns

`Promise`<[`Conference`](../modules/services_conference_types.md#conference)\>

Promise with a Conference

___

### getAudioLevel

▸ **getAudioLevel**(`participant?`): `Promise`<`number`\>

Gets the participant's audio level

#### Parameters

| Name | Type |
| :------ | :------ |
| `participant?` | [`Participant`](../modules/services_conference_types.md#participant) |

#### Returns

`Promise`<`number`\>

Promise with number

___

### getAudioProcessing

▸ **getAudioProcessing**(`participant?`): `Promise`<[`AudioProcessing`](../enums/services_conference_types.AudioProcessing.md)\>

Gets the current audio processing state for a conference.

#### Parameters

| Name | Type |
| :------ | :------ |
| `participant?` | [`Participant`](../modules/services_conference_types.md#participant) |

#### Returns

`Promise`<[`AudioProcessing`](../enums/services_conference_types.AudioProcessing.md)\>

Promise with AudioProcessing

___

### getLocalStats

▸ **getLocalStats**(): `Promise`<`any`\>

Provides standard WebRTC statistics for the application.

#### Returns

`Promise`<`any`\>

Promise with LocalStats

___

### getMaxVideoForwarding

▸ **getMaxVideoForwarding**(): `Promise`<`number`\>

Provides the number of video streams that are transmitted to the local user.

#### Returns

`Promise`<`number`\>

Promise with Number

___

### getParticipant

▸ **getParticipant**(`participantId?`): `Promise`<[`Participant`](../modules/services_conference_types.md#participant)\>

The participant's information.

#### Parameters

| Name | Type |
| :------ | :------ |
| `participantId?` | `String` |

#### Returns

`Promise`<[`Participant`](../modules/services_conference_types.md#participant)\>

Promise with Participant

___

### getParticipants

▸ **getParticipants**(`conference?`): `Promise`<[`Participant`](../modules/services_conference_types.md#participant)[]\>

Gets a list of Conference participants

#### Parameters

| Name | Type |
| :------ | :------ |
| `conference?` | [`Conference`](../modules/services_conference_types.md#conference) |

#### Returns

`Promise`<[`Participant`](../modules/services_conference_types.md#participant)[]\>

Promise with array of Participants

___

### getStatus

▸ **getStatus**(`conference?`): `Promise`<[`ConferenceStatus`](../enums/services_conference_types.ConferenceStatus.md)\>

Provides the conference status.

#### Parameters

| Name | Type |
| :------ | :------ |
| `conference?` | [`Conference`](../modules/services_conference_types.md#conference) |

#### Returns

`Promise`<[`ConferenceStatus`](../enums/services_conference_types.ConferenceStatus.md)\>

Promise with a ConferenceStatus

___

### isMuted

▸ **isMuted**(`participant?`): `Promise`<`boolean`\>

Gets the current mute state of the participant.

#### Parameters

| Name | Type |
| :------ | :------ |
| `participant?` | [`Participant`](../modules/services_conference_types.md#participant) |

#### Returns

`Promise`<`boolean`\>

Information if the local participant is muted.

___

### isOutputMuted

▸ **isOutputMuted**(): `Promise`<`boolean`\>

Informs whether the application plays the remote participants' audio to the local participant.

#### Returns

`Promise`<`boolean`\>

A boolean indicating whether the application plays the remote participants' audio to the local participant.

___

### isSpeaking

▸ **isSpeaking**(`participant?`): `Promise`<`boolean`\>

Gets the participant's current speaking status for an active talker indicator.

#### Parameters

| Name | Type |
| :------ | :------ |
| `participant?` | [`Participant`](../modules/services_conference_types.md#participant) |

#### Returns

`Promise`<`boolean`\>

A boolean indicating whether the current participant is speaking.

___

### join

▸ **join**(): `void`

#### Returns

`void`

___

### mute

▸ **mute**(`isMuted`, `participant?`): `Promise`<`boolean`\>

Stops playing the specified remote participants' audio to the local participant or stops playing the local participant's audio to the conference.

#### Parameters

| Name | Type |
| :------ | :------ |
| `isMuted` | `boolean` |
| `participant?` | [`Participant`](../modules/services_conference_types.md#participant) |

#### Returns

`Promise`<`boolean`\>

Informs if the mute state has changed.

___

### replay

▸ **replay**(`conference`, `replayOptions?`, `mixingOptions?`): `Promise`<[`Conference`](../modules/services_conference_types.md#conference)\>

Replays a previously recorded conference.

#### Parameters

| Name | Type |
| :------ | :------ |
| `conference` | [`Conference`](../modules/services_conference_types.md#conference) |
| `replayOptions?` | [`ConferenceReplayOptions`](../modules/services_conference_types.md#conferencereplayoptions) |
| `mixingOptions?` | [`ConferenceMixingOptions`](../modules/services_conference_types.md#conferencemixingoptions) |

#### Returns

`Promise`<[`Conference`](../modules/services_conference_types.md#conference)\>

Promise with a Conference

___

### setAudioProcessing

▸ **setAudioProcessing**(`options`): `Promise`<`any`\>

Enables and disables audio processing for the conference participant.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`AudioProcessingOptions`](../modules/services_conference_types.md#audioprocessingoptions) |

#### Returns

`Promise`<`any`\>

___

### setMaxVideoForwarding

▸ **setMaxVideoForwarding**(): `Promise`<`any`\>

Sets the maximum number of video streams that may be transmitted to the local participant.

#### Returns

`Promise`<`any`\>

___

### updatePermissions

▸ **updatePermissions**(`participantPermissions`): `Promise`<`any`\>

Updates the participant's conference permissions.

#### Parameters

| Name | Type |
| :------ | :------ |
| `participantPermissions` | `ParticipantPermissions`[] |

#### Returns

`Promise`<`any`\>
