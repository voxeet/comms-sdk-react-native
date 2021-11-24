[@dolbyio/react-native-iapi-sdk](../README.md) / [Modules](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / ConferenceService

# Class: ConferenceService

[<internal>](../modules/_internal_.md).ConferenceService

The ConferenceService allows the application to manage the conference
life-cycle and interact with the conference.

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
- [setSpatialDirection](_internal_.ConferenceService.md#setspatialdirection)
- [setSpatialEnvironment](_internal_.ConferenceService.md#setspatialenvironment)
- [setSpatialPosition](_internal_.ConferenceService.md#setspatialposition)
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

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ConferenceCreateOptions`](../interfaces/_internal_.ConferenceCreateOptions.md) | The conference options |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`Conference`](../interfaces/_internal_.Conference.md)\>

___

### current

▸ **current**(): [`Promise`](../modules/_internal_.md#promise)<[`Conference`](../interfaces/_internal_.Conference.md)\>

Provides information about the current conference.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`Conference`](../interfaces/_internal_.Conference.md)\>

___

### fetch

▸ **fetch**(`conferenceId?`): [`Promise`](../modules/_internal_.md#promise)<[`Conference`](../interfaces/_internal_.Conference.md)\>

Provides a Conference object that allows joining a conference. Without a param it returns current Conference object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `conferenceId?` | `string` | The conference ID. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`Conference`](../interfaces/_internal_.Conference.md)\>

___

### getAudioLevel

▸ **getAudioLevel**(`participant`): [`Promise`](../modules/_internal_.md#promise)<`number`\>

Gets the participant's audio level

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/_internal_.Participant.md) | The participant object. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`number`\>

___

### getLocalStats

▸ **getLocalStats**(): [`Promise`](../modules/_internal_.md#promise)<[`RTCStatsType`](../enums/_internal_.RTCStatsType.md)[]\>

Provides standard WebRTC statistics for the application.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`RTCStatsType`](../enums/_internal_.RTCStatsType.md)[]\>

___

### getMaxVideoForwarding

▸ **getMaxVideoForwarding**(): [`Promise`](../modules/_internal_.md#promise)<`number`\>

Provides the number of video streams that are transmitted to the local user.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`number`\>

___

### getParticipant

▸ **getParticipant**(`participantId`): [`Promise`](../modules/_internal_.md#promise)<[`Participant`](../interfaces/_internal_.Participant.md)\>

The participant's information.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participantId` | [`String`](../modules/_internal_.md#string) | ID of Participant. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`Participant`](../interfaces/_internal_.Participant.md)\>

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

___

### getStatus

▸ **getStatus**(`conference`): [`Promise`](../modules/_internal_.md#promise)<[`ConferenceStatus`](../enums/_internal_.ConferenceStatus.md)\>

Provides the conference status.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `conference` | [`Conference`](../interfaces/_internal_.Conference.md) | The Conference object. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`ConferenceStatus`](../enums/_internal_.ConferenceStatus.md)\>

___

### isMuted

▸ **isMuted**(): [`Promise`](../modules/_internal_.md#promise)<`boolean`\>

Gets the current mute state of the participant.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`boolean`\>

Information if the local participant is muted.

___

### isSpeaking

▸ **isSpeaking**(`participant`): [`Promise`](../modules/_internal_.md#promise)<`boolean`\>

Gets the participant's current speaking status for an active talker indicator.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/_internal_.Participant.md) | The Participant object. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`boolean`\>

___

### join

▸ **join**(`conference`, `options?`): [`Promise`](../modules/_internal_.md#promise)<[`Conference`](../interfaces/_internal_.Conference.md)\>

Joins the conference.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `conference` | [`Conference`](../interfaces/_internal_.Conference.md) | The Conference object. |
| `options?` | [`ConferenceJoinOptions`](../interfaces/_internal_.ConferenceJoinOptions.md) | The additional options for the joining participant. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`Conference`](../interfaces/_internal_.Conference.md)\>

___

### kick

▸ **kick**(`participant`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Allows the conference owner, or a participant with adequate permissions, to kick another participant from the conference by revoking the conference access token.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/_internal_.Participant.md) | The participant who needs to be kicked from the conference. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### leave

▸ **leave**(`options?`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Leaves the conference.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`ConferenceLeaveOptions`](../interfaces/_internal_.ConferenceLeaveOptions.md) | The additional options for the leaving participant. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### mute

▸ **mute**(`participant`, `isMuted`): [`Promise`](../modules/_internal_.md#promise)<`boolean`\>

Stops playing the specified remote participants' audio to the local participant or stops playing the local participant's audio to the conference.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/_internal_.Participant.md) | A remote participant |
| `isMuted` | `boolean` | A boolean, true indicates that the local participant is muted, false indicates that a participant is not muted |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`boolean`\>

Informs if the mute state has changed.

___

### onParticipantsChange

▸ **onParticipantsChange**(`handler`): [`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Adds a listener for participants changed event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`ParticipantChangedEventType`](../interfaces/_internal_.ParticipantChangedEventType.md), `type?`: [`ParticipantAdded`](../modules/_internal_.md#participantadded) \| [`ParticipantUpdated`](../modules/_internal_.md#participantupdated)) => `void` | Event callback function |

#### Returns

[`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Function that unsubscribes from listeners

___

### onPermissionsChange

▸ **onPermissionsChange**(`handler`): [`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Adds a listener for permissions changed event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`PermissionsUpdatedEventType`](../interfaces/_internal_.PermissionsUpdatedEventType.md)) => `void` | Event callback function |

#### Returns

[`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Function that unsubscribes from listeners

___

### onStatusChange

▸ **onStatusChange**(`handler`): [`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Adds a listener for conference status changed event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`ConferenceStatusUpdatedEventType`](../interfaces/_internal_.ConferenceStatusUpdatedEventType.md)) => `void` | Event callback function |

#### Returns

[`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Function that unsubscribes from listeners

___

### onStreamsChange

▸ **onStreamsChange**(`handler`): [`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Adds a listener for streams changed event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`StreamChangedEventType`](../interfaces/_internal_.StreamChangedEventType.md), `type?`: [`StreamAdded`](../modules/_internal_.md#streamadded) \| [`StreamUpdated`](../modules/_internal_.md#streamupdated) \| [`StreamRemoved`](../modules/_internal_.md#streamremoved)) => `void` | Event callback function |

#### Returns

[`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Function that unsubscribes from listeners

___

### replay

▸ **replay**(`conference`, `replayOptions?`): [`Promise`](../modules/_internal_.md#promise)<[`Conference`](../interfaces/_internal_.Conference.md)\>

Replays a previously recorded conference.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `conference` | [`Conference`](../interfaces/_internal_.Conference.md) | Conference object. |
| `replayOptions?` | [`ConferenceReplayOptions`](../interfaces/_internal_.ConferenceReplayOptions.md) | Replay options. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`Conference`](../interfaces/_internal_.Conference.md)\>

___

### setAudioProcessing

▸ **setAudioProcessing**(`options?`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Enables and disables audio processing for the conference participant.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`AudioProcessingOptions`](../interfaces/_internal_.AudioProcessingOptions.md) | The AudioProcessingOptions model includes the AudioProcessingSenderOptions model responsible for enabling and disabling audio processing. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### setMaxVideoForwarding

▸ **setMaxVideoForwarding**(`max?`, `prioritizedParticipants?`): [`Promise`](../modules/_internal_.md#promise)<`any`\>

Sets the maximum number of video streams that may be transmitted to the local participant.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `max` | `number` | `4` | The maximum number of video streams that may be transmitted to the local participant. The valid parameter's values are between 0 and 4 for mobile browsers with 4 as default value. |
| `prioritizedParticipants` | [`Participant`](../interfaces/_internal_.Participant.md)[] | `[]` | The list of the prioritized participants. This parameter allows using a pin option to prioritize specific participant's video streams and display their videos even when these participants do not talk. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`any`\>

___

### setSpatialDirection

▸ **setSpatialDirection**(`participant`, `direction`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Sets the direction a participant is facing in space.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/_internal_.Participant.md) | The selected remote participant. |
| `direction` | [`SpatialDirection`](../interfaces/_internal_.SpatialDirection.md) | The direction the local participant is facing in space. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### setSpatialEnvironment

▸ **setSpatialEnvironment**(`scale`, `forward`, `up`, `right`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Configures a spatial environment of an application, so the audio renderer understands which directions the application considers forward, up, and right and which units it uses for distance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scale` | [`SpatialScale`](../interfaces/_internal_.SpatialScale.md) | The application's distance units or scale in application units per one meter. The value must be greater than 0. |
| `forward` | [`SpatialPosition`](../interfaces/_internal_.SpatialPosition.md) | A vector describing the direction the application considers as forward. The value must be orthogonal to up and right. |
| `up` | [`SpatialPosition`](../interfaces/_internal_.SpatialPosition.md) | A vector describing the direction the application considers as up. The value must be orthogonal to forward and right. |
| `right` | [`SpatialPosition`](../interfaces/_internal_.SpatialPosition.md) | A vector describing the direction the application considers as right. The value must be orthogonal to forward and up. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### setSpatialPosition

▸ **setSpatialPosition**(`participant`, `position`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Sets a participant's position in space to enable the spatial audio experience during a Dolby Voice conference.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/_internal_.Participant.md) | The selected remote participant. |
| `position` | [`SpatialPosition`](../interfaces/_internal_.SpatialPosition.md) | The participant's audio location from which their audio will be rendered. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### startAudio

▸ **startAudio**(`participant`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Starts audio transmission between the local client and a conference.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/_internal_.Participant.md) | The participant whose stream should be sent to the local participant. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### startScreenShare

▸ **startScreenShare**(): [`Promise`](../modules/_internal_.md#promise)<`void`\>

	Starts a screen sharing session.
	The ScreenShare with iOS document (https://docs.dolby.io/communications-apis/docs/screenshare-with-ios) describes how to set up screen-share outside the application.

Instead of setting properties:
VoxeetSDK.shared.appGroup = "YOUR_APP_GROUP"
VoxeetSDK.shared.preferredExtension = "YOUR_BROADCAST_EXTENSION_BUNDLE_ID"
Setup keys in your Info.plist file:

Open your Info.plist file then:
- add a new DolbyioSdkAppGroupKey as a String type and enter the group name ("YOUR_APP_GROUP")
- add a new DolbyioSdkPreferredExtensionKey as a String type and enter the broadcast extension bundle id ("YOUR_BROADCAST_EXTENSION_BUNDLE_ID")

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### startVideo

▸ **startVideo**(`participant`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Notifies the server to either start sending the local participant's video stream to the conference or start sending a remote participant's video stream to the local participant.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/_internal_.Participant.md) | The Participant object. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### stopAudio

▸ **stopAudio**(`participant`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Stops audio transmission between the local client and a conference.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/_internal_.Participant.md) | The Participant object. |

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/_internal_.Participant.md) | The Participant object. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### updatePermissions

▸ **updatePermissions**(`participantPermissions`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Updates the participant's conference permissions.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participantPermissions` | [`ParticipantPermissions`](../interfaces/_internal_.ParticipantPermissions.md)[] | The set of participant's conference permissions. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>
