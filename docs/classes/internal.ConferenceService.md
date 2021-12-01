# Class: ConferenceService

[internal](../modules/internal.md).ConferenceService

The ConferenceService allows the application to manage the conference
life-cycle and interact with the conference.

## Table of contents

### Constructors

- [constructor](internal.ConferenceService.md#constructor)

### Methods

- [create](internal.ConferenceService.md#create)
- [current](internal.ConferenceService.md#current)
- [fetch](internal.ConferenceService.md#fetch)
- [getAudioLevel](internal.ConferenceService.md#getaudiolevel)
- [getLocalStats](internal.ConferenceService.md#getlocalstats)
- [getMaxVideoForwarding](internal.ConferenceService.md#getmaxvideoforwarding)
- [getParticipant](internal.ConferenceService.md#getparticipant)
- [getParticipants](internal.ConferenceService.md#getparticipants)
- [getStatus](internal.ConferenceService.md#getstatus)
- [isMuted](internal.ConferenceService.md#ismuted)
- [isOutputMuted](internal.ConferenceService.md#isoutputmuted)
- [isSpeaking](internal.ConferenceService.md#isspeaking)
- [join](internal.ConferenceService.md#join)
- [kick](internal.ConferenceService.md#kick)
- [leave](internal.ConferenceService.md#leave)
- [mute](internal.ConferenceService.md#mute)
- [onParticipantsChange](internal.ConferenceService.md#onparticipantschange)
- [onPermissionsChange](internal.ConferenceService.md#onpermissionschange)
- [onStatusChange](internal.ConferenceService.md#onstatuschange)
- [onStreamsChange](internal.ConferenceService.md#onstreamschange)
- [replay](internal.ConferenceService.md#replay)
- [setAudioProcessing](internal.ConferenceService.md#setaudioprocessing)
- [setMaxVideoForwarding](internal.ConferenceService.md#setmaxvideoforwarding)
- [setSpatialDirection](internal.ConferenceService.md#setspatialdirection)
- [setSpatialEnvironment](internal.ConferenceService.md#setspatialenvironment)
- [setSpatialPosition](internal.ConferenceService.md#setspatialposition)
- [startAudio](internal.ConferenceService.md#startaudio)
- [startScreenShare](internal.ConferenceService.md#startscreenshare)
- [startVideo](internal.ConferenceService.md#startvideo)
- [stopAudio](internal.ConferenceService.md#stopaudio)
- [stopScreenShare](internal.ConferenceService.md#stopscreenshare)
- [stopVideo](internal.ConferenceService.md#stopvideo)
- [updatePermissions](internal.ConferenceService.md#updatepermissions)

## Constructors

### constructor

• **new ConferenceService**()

## Methods

### create

▸ **create**(`options?`): `Promise`<[`Conference`](../interfaces/internal.Conference.md)\>

Create a conference with options

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ConferenceCreateOptions`](../interfaces/internal.ConferenceCreateOptions.md) | The conference options |

#### Returns

`Promise`<[`Conference`](../interfaces/internal.Conference.md)\>

___

### current

▸ **current**(): `Promise`<[`Conference`](../interfaces/internal.Conference.md)\>

Provides information about the current conference.

#### Returns

`Promise`<[`Conference`](../interfaces/internal.Conference.md)\>

___

### fetch

▸ **fetch**(`conferenceId?`): `Promise`<[`Conference`](../interfaces/internal.Conference.md)\>

Provides a Conference object that allows joining a conference. Without a param it returns current Conference object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `conferenceId?` | `string` | The conference ID. |

#### Returns

`Promise`<[`Conference`](../interfaces/internal.Conference.md)\>

___

### getAudioLevel

▸ **getAudioLevel**(`participant`): `Promise`<`number`\>

Gets the participant's audio level

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/internal.Participant.md) | The participant object. |

#### Returns

`Promise`<`number`\>

___

### getLocalStats

▸ **getLocalStats**(): `Promise`<[`RTCStatsType`](../enums/internal.RTCStatsType.md)[]\>

Provides standard WebRTC statistics for the application.

#### Returns

`Promise`<[`RTCStatsType`](../enums/internal.RTCStatsType.md)[]\>

___

### getMaxVideoForwarding

▸ **getMaxVideoForwarding**(): `Promise`<`number`\>

Provides the number of video streams that are transmitted to the local user.

#### Returns

`Promise`<`number`\>

___

### getParticipant

▸ **getParticipant**(`participantId`): `Promise`<[`Participant`](../interfaces/internal.Participant.md)\>

The participant's information.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participantId` | `String` | ID of Participant. |

#### Returns

`Promise`<[`Participant`](../interfaces/internal.Participant.md)\>

___

### getParticipants

▸ **getParticipants**(`conference`): `Promise`<[`Participant`](../interfaces/internal.Participant.md)[]\>

Gets a list of conference participants

#### Parameters

| Name | Type |
| :------ | :------ |
| `conference` | [`Conference`](../interfaces/internal.Conference.md) |

#### Returns

`Promise`<[`Participant`](../interfaces/internal.Participant.md)[]\>

___

### getStatus

▸ **getStatus**(`conference`): `Promise`<[`ConferenceStatus`](../enums/internal.ConferenceStatus.md)\>

Provides the conference status.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `conference` | [`Conference`](../interfaces/internal.Conference.md) | The Conference object. |

#### Returns

`Promise`<[`ConferenceStatus`](../enums/internal.ConferenceStatus.md)\>

___

### isMuted

▸ **isMuted**(): `Promise`<`boolean`\>

Gets the current mute state of the participant.

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

▸ **isSpeaking**(`participant`): `Promise`<`boolean`\>

Gets the participant's current speaking status for an active talker indicator.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/internal.Participant.md) | The Participant object. |

#### Returns

`Promise`<`boolean`\>

___

### join

▸ **join**(`conference`, `options?`): `Promise`<[`Conference`](../interfaces/internal.Conference.md)\>

Joins the conference.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `conference` | [`Conference`](../interfaces/internal.Conference.md) | The Conference object. |
| `options?` | [`ConferenceJoinOptions`](../interfaces/internal.ConferenceJoinOptions.md) | The additional options for the joining participant. |

#### Returns

`Promise`<[`Conference`](../interfaces/internal.Conference.md)\>

___

### kick

▸ **kick**(`participant`): `Promise`<`void`\>

Allows the conference owner, or a participant with adequate permissions, to kick another participant from the conference by revoking the conference access token.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/internal.Participant.md) | The participant who needs to be kicked from the conference. |

#### Returns

`Promise`<`void`\>

___

### leave

▸ **leave**(`options?`): `Promise`<`void`\>

Leaves the conference.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`ConferenceLeaveOptions`](../interfaces/internal.ConferenceLeaveOptions.md) | The additional options for the leaving participant. |

#### Returns

`Promise`<`void`\>

___

### mute

▸ **mute**(`participant`, `isMuted`): `Promise`<`boolean`\>

Stops playing the specified remote participants' audio to the local participant or stops playing the local participant's audio to the conference.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/internal.Participant.md) | A remote participant |
| `isMuted` | `boolean` | A boolean, true indicates that the local participant is muted, false indicates that a participant is not muted |

#### Returns

`Promise`<`boolean`\>

Informs if the mute state has changed.

___

### onParticipantsChange

▸ **onParticipantsChange**(`handler`): [`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Adds a listener for participants changed event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`ParticipantChangedEventType`](../interfaces/internal.ParticipantChangedEventType.md), `type?`: [`ParticipantAdded`](../modules/internal.md#participantadded) \| [`ParticipantUpdated`](../modules/internal.md#participantupdated)) => `void` | Event callback function |

#### Returns

[`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Function that unsubscribes from listeners

___

### onPermissionsChange

▸ **onPermissionsChange**(`handler`): [`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Adds a listener for permissions changed event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`PermissionsUpdatedEventType`](../interfaces/internal.PermissionsUpdatedEventType.md)) => `void` | Event callback function |

#### Returns

[`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Function that unsubscribes from listeners

___

### onStatusChange

▸ **onStatusChange**(`handler`): [`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Adds a listener for conference status changed event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`ConferenceStatusUpdatedEventType`](../interfaces/internal.ConferenceStatusUpdatedEventType.md)) => `void` | Event callback function |

#### Returns

[`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Function that unsubscribes from listeners

___

### onStreamsChange

▸ **onStreamsChange**(`handler`): [`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Adds a listener for streams changed event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`StreamChangedEventType`](../interfaces/internal.StreamChangedEventType.md), `type?`: [`StreamAdded`](../modules/internal.md#streamadded) \| [`StreamUpdated`](../modules/internal.md#streamupdated) \| [`StreamRemoved`](../modules/internal.md#streamremoved)) => `void` | Event callback function |

#### Returns

[`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Function that unsubscribes from listeners

___

### replay

▸ **replay**(`conference`, `replayOptions?`): `Promise`<[`Conference`](../interfaces/internal.Conference.md)\>

Replays a previously recorded conference.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `conference` | [`Conference`](../interfaces/internal.Conference.md) | Conference object. |
| `replayOptions?` | [`ConferenceReplayOptions`](../interfaces/internal.ConferenceReplayOptions.md) | Replay options. |

#### Returns

`Promise`<[`Conference`](../interfaces/internal.Conference.md)\>

___

### setAudioProcessing

▸ **setAudioProcessing**(`options?`): `Promise`<`void`\>

Enables and disables audio processing for the conference participant.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`AudioProcessingOptions`](../interfaces/internal.AudioProcessingOptions.md) | The AudioProcessingOptions model includes the AudioProcessingSenderOptions model responsible for enabling and disabling audio processing. |

#### Returns

`Promise`<`void`\>

___

### setMaxVideoForwarding

▸ **setMaxVideoForwarding**(`max?`, `prioritizedParticipants?`): `Promise`<`any`\>

Sets the maximum number of video streams that may be transmitted to the local participant.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `max` | `number` | `4` | The maximum number of video streams that may be transmitted to the local participant. The valid parameter's values are between 0 and 4 for mobile browsers with 4 as default value. |
| `prioritizedParticipants` | [`Participant`](../interfaces/internal.Participant.md)[] | `[]` | The list of the prioritized participants. This parameter allows using a pin option to prioritize specific participant's video streams and display their videos even when these participants do not talk. |

#### Returns

`Promise`<`any`\>

___

### setSpatialDirection

▸ **setSpatialDirection**(`participant`, `direction`): `Promise`<`void`\>

Sets the direction a participant is facing in space.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/internal.Participant.md) | The selected remote participant. |
| `direction` | [`SpatialDirection`](../interfaces/internal.SpatialDirection.md) | The direction the local participant is facing in space. |

#### Returns

`Promise`<`void`\>

___

### setSpatialEnvironment

▸ **setSpatialEnvironment**(`scale`, `forward`, `up`, `right`): `Promise`<`void`\>

Configures a spatial environment of an application, so the audio renderer understands which directions the application considers forward, up, and right and which units it uses for distance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scale` | [`SpatialScale`](../interfaces/internal.SpatialScale.md) | The application's distance units or scale in application units per one meter. The value must be greater than 0. |
| `forward` | [`SpatialPosition`](../interfaces/internal.SpatialPosition.md) | A vector describing the direction the application considers as forward. The value must be orthogonal to up and right. |
| `up` | [`SpatialPosition`](../interfaces/internal.SpatialPosition.md) | A vector describing the direction the application considers as up. The value must be orthogonal to forward and right. |
| `right` | [`SpatialPosition`](../interfaces/internal.SpatialPosition.md) | A vector describing the direction the application considers as right. The value must be orthogonal to forward and up. |

#### Returns

`Promise`<`void`\>

___

### setSpatialPosition

▸ **setSpatialPosition**(`participant`, `position`): `Promise`<`void`\>

Sets a participant's position in space to enable the spatial audio experience during a Dolby Voice conference.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/internal.Participant.md) | The selected remote participant. |
| `position` | [`SpatialPosition`](../interfaces/internal.SpatialPosition.md) | The participant's audio location from which their audio will be rendered. |

#### Returns

`Promise`<`void`\>

___

### startAudio

▸ **startAudio**(`participant`): `Promise`<`void`\>

Starts audio transmission between the local client and a conference.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/internal.Participant.md) | The participant whose stream should be sent to the local participant. |

#### Returns

`Promise`<`void`\>

___

### startScreenShare

▸ **startScreenShare**(): `Promise`<`void`\>

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

`Promise`<`void`\>

___

### startVideo

▸ **startVideo**(`participant`): `Promise`<`void`\>

Notifies the server to either start sending the local participant's video stream to the conference or start sending a remote participant's video stream to the local participant.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/internal.Participant.md) | The Participant object. |

#### Returns

`Promise`<`void`\>

___

### stopAudio

▸ **stopAudio**(`participant`): `Promise`<`void`\>

Stops audio transmission between the local client and a conference.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/internal.Participant.md) | The Participant object. |

#### Returns

`Promise`<`void`\>

___

### stopScreenShare

▸ **stopScreenShare**(): `Promise`<`void`\>

Stops a screen sharing session.

#### Returns

`Promise`<`void`\>

___

### stopVideo

▸ **stopVideo**(`participant`): `Promise`<`void`\>

Notifies the server to either stop sending the local participant's video stream to the conference or stop sending a remote participant's video stream to the local participant.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/internal.Participant.md) | The Participant object. |

#### Returns

`Promise`<`void`\>

___

### updatePermissions

▸ **updatePermissions**(`participantPermissions`): `Promise`<`void`\>

Updates the participant's conference permissions.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participantPermissions` | [`ParticipantPermissions`](../interfaces/internal.ParticipantPermissions.md)[] | The set of participant's conference permissions. |

#### Returns

`Promise`<`void`\>
