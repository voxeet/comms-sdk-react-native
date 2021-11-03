[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / ConferenceService

# Class: ConferenceService

[<internal>](../modules/_internal_.md).ConferenceService

## Table of contents

### Constructors

- [constructor](_internal_.ConferenceService.md#constructor)

### Methods

- [create](_internal_.ConferenceService.md#create)
- [current](_internal_.ConferenceService.md#current)
- [fetch](_internal_.ConferenceService.md#fetch)
- [getAudioLevel](_internal_.ConferenceService.md#getaudiolevel)
- [getLocalStats](_internal_.ConferenceService.md#getlocalstats)
- [getMaxVideoForwarding](_internal_.ConferenceService.md#getmaxvideoforwarding)
- [getParticipant](_internal_.ConferenceService.md#getparticipant)
- [getParticipants](_internal_.ConferenceService.md#getparticipants)
- [getStatus](_internal_.ConferenceService.md#getstatus)
- [isMuted](_internal_.ConferenceService.md#ismuted)
- [isOutputMuted](_internal_.ConferenceService.md#isoutputmuted)
- [isSpeaking](_internal_.ConferenceService.md#isspeaking)
- [join](_internal_.ConferenceService.md#join)
- [kick](_internal_.ConferenceService.md#kick)
- [leave](_internal_.ConferenceService.md#leave)
- [mute](_internal_.ConferenceService.md#mute)
- [onParticipantsChange](_internal_.ConferenceService.md#onparticipantschange)
- [onPermissionsChange](_internal_.ConferenceService.md#onpermissionschange)
- [onStatusChange](_internal_.ConferenceService.md#onstatuschange)
- [onStreamsChange](_internal_.ConferenceService.md#onstreamschange)
- [replay](_internal_.ConferenceService.md#replay)
- [setAudioProcessing](_internal_.ConferenceService.md#setaudioprocessing)
- [setMaxVideoForwarding](_internal_.ConferenceService.md#setmaxvideoforwarding)
- [startAudio](_internal_.ConferenceService.md#startaudio)
- [startScreenShare](_internal_.ConferenceService.md#startscreenshare)
- [startVideo](_internal_.ConferenceService.md#startvideo)
- [stopAudio](_internal_.ConferenceService.md#stopaudio)
- [stopScreenShare](_internal_.ConferenceService.md#stopscreenshare)
- [stopVideo](_internal_.ConferenceService.md#stopvideo)
- [updatePermissions](_internal_.ConferenceService.md#updatepermissions)

## Constructors

### constructor

• **new ConferenceService**()

## Methods

### create

▸ **create**(`options?`): [`Promise`](../modules/_internal_.md#promise)<[`Conference`](../interfaces/_internal_.Conference.md)\>

Create a conference with options

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ConferenceCreateOptions`](../interfaces/_internal_.ConferenceCreateOptions.md) |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`Conference`](../interfaces/_internal_.Conference.md)\>

Promise with a Conference object

___

### current

▸ **current**(): [`Promise`](../modules/_internal_.md#promise)<[`Conference`](../interfaces/_internal_.Conference.md)\>

Provides information about the current conference.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`Conference`](../interfaces/_internal_.Conference.md)\>

Promise with a Conference object

___

### fetch

▸ **fetch**(`conferenceId?`): [`Promise`](../modules/_internal_.md#promise)<[`Conference`](../interfaces/_internal_.Conference.md)\>

Provides a Conference object that allows joining a conference. Without a param it returns current Conference object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `conferenceId?` | `string` |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`Conference`](../interfaces/_internal_.Conference.md)\>

Promise with a Conference object

___

### getAudioLevel

▸ **getAudioLevel**(`participant`): [`Promise`](../modules/_internal_.md#promise)<`number`\>

Gets the participant's audio level

#### Parameters

| Name | Type |
| :------ | :------ |
| `participant` | [`Participant`](../interfaces/_internal_.Participant.md) |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`number`\>

Promise with AudioLevel

___

### getLocalStats

▸ **getLocalStats**(): [`Promise`](../modules/_internal_.md#promise)<[`RTCStatsType`](../enums/_internal_.RTCStatsType.md)[]\>

Provides standard WebRTC statistics for the application.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`RTCStatsType`](../enums/_internal_.RTCStatsType.md)[]\>

Promise with LocalStats

___

### getMaxVideoForwarding

▸ **getMaxVideoForwarding**(): [`Promise`](../modules/_internal_.md#promise)<`number`\>

Provides the number of video streams that are transmitted to the local user.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`number`\>

Promise with MaxVideoForwarding

___

### getParticipant

▸ **getParticipant**(`participantId`): [`Promise`](../modules/_internal_.md#promise)<[`Participant`](../interfaces/_internal_.Participant.md)\>

The participant's information.

#### Parameters

| Name | Type |
| :------ | :------ |
| `participantId` | [`String`](../modules/_internal_.md#string) |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`Participant`](../interfaces/_internal_.Participant.md)\>

Promise with Participant

___

### getParticipants

▸ **getParticipants**(`conference`): [`Promise`](../modules/_internal_.md#promise)<[`Participant`](../interfaces/_internal_.Participant.md)[]\>

Gets a list of conference participants

#### Parameters

| Name | Type |
| :------ | :------ |
| `conference` | [`Conference`](../interfaces/_internal_.Conference.md) |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`Participant`](../interfaces/_internal_.Participant.md)[]\>

Promise with array of Participants

___

### getStatus

▸ **getStatus**(`conference`): [`Promise`](../modules/_internal_.md#promise)<[`ConferenceStatus`](../enums/_internal_.ConferenceStatus.md)\>

Provides the conference status.

#### Parameters

| Name | Type |
| :------ | :------ |
| `conference` | [`Conference`](../interfaces/_internal_.Conference.md) |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`ConferenceStatus`](../enums/_internal_.ConferenceStatus.md)\>

Promise with a ConferenceStatus string

___

### isMuted

▸ **isMuted**(): [`Promise`](../modules/_internal_.md#promise)<`boolean`\>

Gets the current mute state of the participant.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`boolean`\>

Information if the local participant is muted.

___

### isOutputMuted

▸ **isOutputMuted**(): [`Promise`](../modules/_internal_.md#promise)<`boolean`\>

Informs whether the application plays the remote participants' audio to the local participant.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`boolean`\>

A boolean indicating whether the application plays the remote participants' audio to the local participant.

___

### isSpeaking

▸ **isSpeaking**(`participant`): [`Promise`](../modules/_internal_.md#promise)<`boolean`\>

Gets the participant's current speaking status for an active talker indicator.

#### Parameters

| Name | Type |
| :------ | :------ |
| `participant` | [`Participant`](../interfaces/_internal_.Participant.md) |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`boolean`\>

A boolean indicating whether the current participant is speaking.

___

### join

▸ **join**(`conference`, `options?`): [`Promise`](../modules/_internal_.md#promise)<[`Conference`](../interfaces/_internal_.Conference.md)\>

Joins the conference.

#### Parameters

| Name | Type |
| :------ | :------ |
| `conference` | [`Conference`](../interfaces/_internal_.Conference.md) |
| `options?` | [`ConferenceJoinOptions`](../interfaces/_internal_.ConferenceJoinOptions.md) |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`Conference`](../interfaces/_internal_.Conference.md)\>

Promise with the Conference

___

### kick

▸ **kick**(`participant`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Allows the conference owner, or a participant with adequate permissions, to kick another participant from the conference by revoking the conference access token.

#### Parameters

| Name | Type |
| :------ | :------ |
| `participant` | [`Participant`](../interfaces/_internal_.Participant.md) |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### leave

▸ **leave**(`options?`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Leaves the conference.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`ConferenceLeaveOptions`](../interfaces/_internal_.ConferenceLeaveOptions.md) |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### mute

▸ **mute**(`participant`, `isMuted`): [`Promise`](../modules/_internal_.md#promise)<`boolean`\>

Stops playing the specified remote participants' audio to the local participant or stops playing the local participant's audio to the conference.

#### Parameters

| Name | Type |
| :------ | :------ |
| `participant` | [`Participant`](../interfaces/_internal_.Participant.md) |
| `isMuted` | `boolean` |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`boolean`\>

Informs if the mute state has changed.

___

### onParticipantsChange

▸ **onParticipantsChange**(`handler`): [`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Add a handler for participants changes

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | (`data`: [`ParticipantChangedEventType`](../interfaces/_internal_.ParticipantChangedEventType.md), `type?`: [`ParticipantAdded`](../modules/_internal_.md#participantadded) \| [`ParticipantUpdated`](../modules/_internal_.md#participantupdated)) => `void` |

#### Returns

[`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Function that removes handler

___

### onPermissionsChange

▸ **onPermissionsChange**(`handler`): [`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Add a handler for permissions changes

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | (`data`: [`PermissionsUpdatedEventType`](../interfaces/_internal_.PermissionsUpdatedEventType.md)) => `void` |

#### Returns

[`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Function that removes handler

___

### onStatusChange

▸ **onStatusChange**(`handler`): [`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Add a handler for conference status changes

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | (`data`: [`ConferenceStatusUpdatedEventType`](../interfaces/_internal_.ConferenceStatusUpdatedEventType.md)) => `void` |

#### Returns

[`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Function that removes handler

___

### onStreamsChange

▸ **onStreamsChange**(`handler`): [`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Add a handler for streams changes

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | (`data`: [`StreamChangedEventType`](../interfaces/_internal_.StreamChangedEventType.md), `type?`: [`StreamAdded`](../modules/_internal_.md#streamadded) \| [`StreamUpdated`](../modules/_internal_.md#streamupdated) \| [`StreamRemoved`](../modules/_internal_.md#streamremoved)) => `void` |

#### Returns

[`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Function that removes handler

___

### replay

▸ **replay**(`conference`, `replayOptions?`): [`Promise`](../modules/_internal_.md#promise)<[`Conference`](../interfaces/_internal_.Conference.md)\>

Replays a previously recorded conference.

#### Parameters

| Name | Type |
| :------ | :------ |
| `conference` | [`Conference`](../interfaces/_internal_.Conference.md) |
| `replayOptions?` | [`ConferenceReplayOptions`](../interfaces/_internal_.ConferenceReplayOptions.md) |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`Conference`](../interfaces/_internal_.Conference.md)\>

Promise with a Conference object

___

### setAudioProcessing

▸ **setAudioProcessing**(`options?`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Enables and disables audio processing for the conference participant.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`AudioProcessingOptions`](../interfaces/_internal_.AudioProcessingOptions.md) |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### setMaxVideoForwarding

▸ **setMaxVideoForwarding**(`max?`, `prioritizedParticipants?`): [`Promise`](../modules/_internal_.md#promise)<`any`\>

Sets the maximum number of video streams that may be transmitted to the local participant.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `max` | `number` | `4` |
| `prioritizedParticipants` | [`Participant`](../interfaces/_internal_.Participant.md)[] | `[]` |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`any`\>

___

### startAudio

▸ **startAudio**(`participant`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Starts audio transmission between the local client and a conference.

#### Parameters

| Name | Type |
| :------ | :------ |
| `participant` | [`Participant`](../interfaces/_internal_.Participant.md) |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### startScreenShare

▸ **startScreenShare**(): [`Promise`](../modules/_internal_.md#promise)<`void`\>

	Starts a screen sharing session.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### startVideo

▸ **startVideo**(`participant`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Notifies the server to either start sending the local participant's video stream to the conference or start sending a remote participant's video stream to the local participant.

#### Parameters

| Name | Type |
| :------ | :------ |
| `participant` | [`Participant`](../interfaces/_internal_.Participant.md) |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### stopAudio

▸ **stopAudio**(`participant`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Stops audio transmission between the local client and a conference.

#### Parameters

| Name | Type |
| :------ | :------ |
| `participant` | [`Participant`](../interfaces/_internal_.Participant.md) |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### stopScreenShare

▸ **stopScreenShare**(): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Stops a screen sharing session.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### stopVideo

▸ **stopVideo**(`participant`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Notifies the server to either stop sending the local participant's video stream to the conference or stop sending a remote participant's video stream to the local participant.

#### Parameters

| Name | Type |
| :------ | :------ |
| `participant` | [`Participant`](../interfaces/_internal_.Participant.md) |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### updatePermissions

▸ **updatePermissions**(`participantPermissions`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Updates the participant's conference permissions.

#### Parameters

| Name | Type |
| :------ | :------ |
| `participantPermissions` | [`ParticipantPermissions`](../interfaces/_internal_.ParticipantPermissions.md)[] |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>
