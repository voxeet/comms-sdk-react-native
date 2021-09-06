[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [services/ConferenceService](../modules/services_ConferenceService.md) / default

# Class: default

[services/ConferenceService](../modules/services_ConferenceService.md).default

## Table of contents

### Constructors

- [constructor](services_ConferenceService.default.md#constructor)

### Methods

- [audioLevel](services_ConferenceService.default.md#audiolevel)
- [create](services_ConferenceService.default.md#create)
- [fetchConference](services_ConferenceService.default.md#fetchconference)
- [findParticipantById](services_ConferenceService.default.md#findparticipantbyid)
- [getAudioProcessing](services_ConferenceService.default.md#getaudioprocessing)
- [getConference](services_ConferenceService.default.md#getconference)
- [getConferenceStatus](services_ConferenceService.default.md#getconferencestatus)
- [getConferenceType](services_ConferenceService.default.md#getconferencetype)
- [getMaxVideoForwarding](services_ConferenceService.default.md#getmaxvideoforwarding)
- [getMixers](services_ConferenceService.default.md#getmixers)
- [getParticipants](services_ConferenceService.default.md#getparticipants)
- [hasParticipants](services_ConferenceService.default.md#hasparticipants)
- [isInConference](services_ConferenceService.default.md#isinconference)
- [isLive](services_ConferenceService.default.md#islive)
- [isMuted](services_ConferenceService.default.md#ismuted)
- [isOutputMuted](services_ConferenceService.default.md#isoutputmuted)
- [isSpeaking](services_ConferenceService.default.md#isspeaking)
- [join](services_ConferenceService.default.md#join)
- [kick](services_ConferenceService.default.md#kick)
- [leave](services_ConferenceService.default.md#leave)
- [mute](services_ConferenceService.default.md#mute)
- [muteOutput](services_ConferenceService.default.md#muteoutput)
- [replay](services_ConferenceService.default.md#replay)
- [setAudioProcessing](services_ConferenceService.default.md#setaudioprocessing)
- [simulcast](services_ConferenceService.default.md#simulcast)
- [startAudio](services_ConferenceService.default.md#startaudio)
- [startVideo](services_ConferenceService.default.md#startvideo)
- [stopAudio](services_ConferenceService.default.md#stopaudio)
- [stopVideo](services_ConferenceService.default.md#stopvideo)
- [updatePermissions](services_ConferenceService.default.md#updatepermissions)
- [videoForwarding](services_ConferenceService.default.md#videoforwarding)

## Constructors

### constructor

• **new default**()

## Methods

### audioLevel

▸ **audioLevel**(`participant?`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `participant?` | [`default`](services_conference_Participant.default.md) |

#### Returns

`Promise`<`number`\>

___

### create

▸ **create**(`options?`): `Promise`<[`Conference`](../interfaces/services_conference_Conference.Conference.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`CreateOptions`](../interfaces/services_conference_CreateConference.CreateOptions.md) |

#### Returns

`Promise`<[`Conference`](../interfaces/services_conference_Conference.Conference.md)\>

___

### fetchConference

▸ **fetchConference**(`conferenceId`): `Promise`<``null`` \| [`Conference`](../interfaces/services_conference_Conference.Conference.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conferenceId` | `string` |

#### Returns

`Promise`<``null`` \| [`Conference`](../interfaces/services_conference_Conference.Conference.md)\>

___

### findParticipantById

▸ **findParticipantById**(`participantId`): `Promise`<``null`` \| [`default`](services_conference_Participant.default.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `participantId` | `string` |

#### Returns

`Promise`<``null`` \| [`default`](services_conference_Participant.default.md)\>

___

### getAudioProcessing

▸ **getAudioProcessing**(): `Promise`<[`AudioProcessing`](../enums/services_conference_AudioProcessing.AudioProcessing.md)\>

#### Returns

`Promise`<[`AudioProcessing`](../enums/services_conference_AudioProcessing.AudioProcessing.md)\>

___

### getConference

▸ **getConference**(): `Promise`<``null`` \| [`Conference`](../interfaces/services_conference_Conference.Conference.md)\>

#### Returns

`Promise`<``null`` \| [`Conference`](../interfaces/services_conference_Conference.Conference.md)\>

___

### getConferenceStatus

▸ **getConferenceStatus**(`conferenceId`): `Promise`<[`ConferenceStatusResult`](../interfaces/services_conference_ConferenceStatusResult.ConferenceStatusResult.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conferenceId` | `string` |

#### Returns

`Promise`<[`ConferenceStatusResult`](../interfaces/services_conference_ConferenceStatusResult.ConferenceStatusResult.md)\>

___

### getConferenceType

▸ **getConferenceType**(): `Promise`<[`ConferenceType`](../enums/services_conference_ConferenceType.ConferenceType.md)\>

#### Returns

`Promise`<[`ConferenceType`](../enums/services_conference_ConferenceType.ConferenceType.md)\>

___

### getMaxVideoForwarding

▸ **getMaxVideoForwarding**(): `Promise`<``null`` \| `number`\>

#### Returns

`Promise`<``null`` \| `number`\>

___

### getMixers

▸ **getMixers**(`conference`): `Promise`<[`default`](services_conference_Participant.default.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conference` | [`Conference`](../interfaces/services_conference_Conference.Conference.md) |

#### Returns

`Promise`<[`default`](services_conference_Participant.default.md)[]\>

___

### getParticipants

▸ **getParticipants**(`conference`): `Promise`<[`default`](services_conference_Participant.default.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conference` | [`Conference`](../interfaces/services_conference_Conference.Conference.md) |

#### Returns

`Promise`<[`default`](services_conference_Participant.default.md)[]\>

___

### hasParticipants

▸ **hasParticipants**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

___

### isInConference

▸ **isInConference**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

___

### isLive

▸ **isLive**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

___

### isMuted

▸ **isMuted**(`participant?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `participant?` | [`default`](services_conference_Participant.default.md) |

#### Returns

`Promise`<`boolean`\>

___

### isOutputMuted

▸ **isOutputMuted**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

___

### isSpeaking

▸ **isSpeaking**(`participant?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `participant?` | [`default`](services_conference_Participant.default.md) |

#### Returns

`Promise`<`boolean`\>

___

### join

▸ **join**(`conference`, `options?`): `Promise`<[`Conference`](../interfaces/services_conference_Conference.Conference.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conference` | [`Conference`](../interfaces/services_conference_Conference.Conference.md) |
| `options?` | [`JoinOptions`](../interfaces/services_conference_JoinConference.JoinOptions.md) |

#### Returns

`Promise`<[`Conference`](../interfaces/services_conference_Conference.Conference.md)\>

___

### kick

▸ **kick**(`participant`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `participant` | [`default`](services_conference_Participant.default.md) |

#### Returns

`Promise`<`boolean`\>

___

### leave

▸ **leave**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

___

### mute

▸ **mute**(`mute`, `participant?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mute` | `boolean` |
| `participant?` | [`default`](services_conference_Participant.default.md) |

#### Returns

`Promise`<`boolean`\>

___

### muteOutput

▸ **muteOutput**(`mute`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mute` | `boolean` |

#### Returns

`Promise`<`boolean`\>

___

### replay

▸ **replay**(`conference`, `offset`): `Promise`<[`Conference`](../interfaces/services_conference_Conference.Conference.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conference` | [`Conference`](../interfaces/services_conference_Conference.Conference.md) |
| `offset` | `number` |

#### Returns

`Promise`<[`Conference`](../interfaces/services_conference_Conference.Conference.md)\>

___

### setAudioProcessing

▸ **setAudioProcessing**(`audioProcessing`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `audioProcessing` | [`AudioProcessing`](../enums/services_conference_AudioProcessing.AudioProcessing.md) |

#### Returns

`Promise`<`boolean`\>

___

### simulcast

▸ **simulcast**(`qualities`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `qualities` | [`ParticipantQuality`](../interfaces/services_conference_ParticipantQuality.ParticipantQuality.md)[] |

#### Returns

`Promise`<`boolean`\>

___

### startAudio

▸ **startAudio**(`participant?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `participant?` | [`default`](services_conference_Participant.default.md) |

#### Returns

`Promise`<`boolean`\>

___

### startVideo

▸ **startVideo**(`isFrontFacingOrParticipant?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `isFrontFacingOrParticipant?` | `boolean` \| [`default`](services_conference_Participant.default.md) |

#### Returns

`Promise`<`boolean`\>

___

### stopAudio

▸ **stopAudio**(`participant?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `participant?` | [`default`](services_conference_Participant.default.md) |

#### Returns

`Promise`<`boolean`\>

___

### stopVideo

▸ **stopVideo**(`participant?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `participant?` | [`default`](services_conference_Participant.default.md) |

#### Returns

`Promise`<`boolean`\>

___

### updatePermissions

▸ **updatePermissions**(`permissions`): `Promise`<[`Conference`](../interfaces/services_conference_Conference.Conference.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `permissions` | [`ParticipantPermission`](../interfaces/services_conference_ParticipantPermission.ParticipantPermission.md)[] |

#### Returns

`Promise`<[`Conference`](../interfaces/services_conference_Conference.Conference.md)\>

___

### videoForwarding

▸ **videoForwarding**(`max`, `participants?`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `max` | `number` |
| `participants?` | [`default`](services_conference_Participant.default.md)[] |

#### Returns

`Promise`<`boolean`\>
