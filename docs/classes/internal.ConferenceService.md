# Class: ConferenceService

[internal](../modules/internal.md).ConferenceService

The ConferenceService allows an application to manage the conference life-cycle and interact with a conference. The service allows creating, joining, and leaving conferences and managing the audio, video, and screen-share streams.

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

Creates a conference and returns the Conference object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ConferenceCreateOptions`](../interfaces/internal.ConferenceCreateOptions.md) | The options for the conference creation. |

#### Returns

`Promise`<[`Conference`](../interfaces/internal.Conference.md)\>

___

### current

▸ **current**(): `Promise`<[`Conference`](../interfaces/internal.Conference.md)\>

Returns the Conference object for the current conference.

#### Returns

`Promise`<[`Conference`](../interfaces/internal.Conference.md)\>

___

### fetch

▸ **fetch**(`conferenceId?`): `Promise`<[`Conference`](../interfaces/internal.Conference.md)\>

Returns a Conference object that can be used to join the conference. If the conference ID is not provided, the method returns the current Conference object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `conferenceId?` | `string` | The conference ID. |

#### Returns

`Promise`<[`Conference`](../interfaces/internal.Conference.md)\>

___

### getAudioLevel

▸ **getAudioLevel**(`participant`): `Promise`<`number`\>

Returns the participant's audio level, in the range from 0.0 to 1.0.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/internal.Participant.md) | The Participant object. |

#### Returns

`Promise`<`number`\>

___

### getLocalStats

▸ **getLocalStats**(): `Promise`<`RTCStatsType`[]\>

Gets the [standard WebRTC statistics](https://www.w3.org/TR/webrtc-stats/#dom-rtcstatstype).

#### Returns

`Promise`<`RTCStatsType`[]\>

___

### getMaxVideoForwarding

▸ **getMaxVideoForwarding**(): `Promise`<`number`\>

Returns the maximum number of video streams that can be transmitted to the local user.

#### Returns

`Promise`<`number`\>

___

### getParticipant

▸ **getParticipant**(`participantId`): `Promise`<[`Participant`](../interfaces/internal.Participant.md)\>

Gets the Participant object for the specified ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participantId` | `String` | The participant ID. |

#### Returns

`Promise`<[`Participant`](../interfaces/internal.Participant.md)\>

___

### getParticipants

▸ **getParticipants**(`conference`): `Promise`<[`Participant`](../interfaces/internal.Participant.md)[]\>

Gets the list of conference participant objects.

#### Parameters

| Name | Type |
| :------ | :------ |
| `conference` | [`Conference`](../interfaces/internal.Conference.md) |

#### Returns

`Promise`<[`Participant`](../interfaces/internal.Participant.md)[]\>

___

### getStatus

▸ **getStatus**(`conference`): `Promise`<[`ConferenceStatus`](../enums/internal.ConferenceStatus.md)\>

Gets the conference status.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `conference` | [`Conference`](../interfaces/internal.Conference.md) | The Conference object. |

#### Returns

`Promise`<[`ConferenceStatus`](../enums/internal.ConferenceStatus.md)\>

___

### isMuted

▸ **isMuted**(): `Promise`<`boolean`\>

Returns the current mute state of the local participant.

#### Returns

`Promise`<`boolean`\>

___

### isSpeaking

▸ **isSpeaking**(`participant`): `Promise`<`boolean`\>

Returns the participant's current speaking status for an active talker indicator.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/internal.Participant.md) | The Participant object. |

#### Returns

`Promise`<`boolean`\>

___

### join

▸ **join**(`conference`, `options?`): `Promise`<[`Conference`](../interfaces/internal.Conference.md)\>

Joins a conference and returns the Conference object.

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

Kicks a participant out of the current conference. This actions requires you to be conference owner or to have the adequate permissions to kick a participant.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/internal.Participant.md) | The participant who needs to be kicked from a conference. |

#### Returns

`Promise`<`void`\>

___

### leave

▸ **leave**(`options?`): `Promise`<`void`\>

Leaves the current conference.

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
| `participant` | [`Participant`](../interfaces/internal.Participant.md) | A remote participant. |
| `isMuted` | `boolean` | The mute state, `true` indicates that a participant is muted, `false` indicates that a participant is not muted. |

#### Returns

`Promise`<`boolean`\>

___

### onParticipantsChange

▸ **onParticipantsChange**(`handler`): [`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Adds a listener to the participants changed event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`ParticipantChangedEventType`](../interfaces/internal.ParticipantChangedEventType.md), `type?`: [`ParticipantAdded`](../modules/internal.md#participantadded) \| [`ParticipantUpdated`](../modules/internal.md#participantupdated)) => `void` | An event callback function. |

#### Returns

[`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

A function that unsubscribes from event listeners.

___

### onPermissionsChange

▸ **onPermissionsChange**(`handler`): [`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Adds a listener to the permissions changed event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`PermissionsUpdatedEventType`](../interfaces/internal.PermissionsUpdatedEventType.md)) => `void` | An event callback function. |

#### Returns

[`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

A function that unsubscribes from event listeners.

___

### onStatusChange

▸ **onStatusChange**(`handler`): [`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Adds a listener to the conference status changed event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`ConferenceStatusUpdatedEventType`](../interfaces/internal.ConferenceStatusUpdatedEventType.md)) => `void` | An event callback function. |

#### Returns

[`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

A function that unsubscribes from event listeners.

___

### onStreamsChange

▸ **onStreamsChange**(`handler`): [`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Adds a listener to the streams changed event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`StreamChangedEventType`](../interfaces/internal.StreamChangedEventType.md), `type?`: [`StreamAdded`](../modules/internal.md#streamadded) \| [`StreamUpdated`](../modules/internal.md#streamupdated) \| [`StreamRemoved`](../modules/internal.md#streamremoved)) => `void` | An event callback function. |

#### Returns

[`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

A function that unsubscribes from event listeners.

___

### replay

▸ **replay**(`conference`, `replayOptions?`): `Promise`<[`Conference`](../interfaces/internal.Conference.md)\>

Replays a previously recorded conference. For more information, see the [Recording mechanisms](doc:guides-recording-mechanisms) article.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `conference` | [`Conference`](../interfaces/internal.Conference.md) | The Conference object. |
| `replayOptions?` | [`ConferenceReplayOptions`](../interfaces/internal.ConferenceReplayOptions.md) | The replay options. |

#### Returns

`Promise`<[`Conference`](../interfaces/internal.Conference.md)\>

___

### setAudioProcessing

▸ **setAudioProcessing**(`options?`): `Promise`<`void`\>

Enables and disables audio processing for a conference participant.

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
| `max` | `number` | `4` | The maximum number of video streams that may be transmitted to the local participant. The valid parameter values are between 0 and 4. By default, the parameter is set to 4. |
| `prioritizedParticipants` | [`Participant`](../interfaces/internal.Participant.md)[] | `[]` | The list of the prioritized participants. This parameter allows using a pin option to prioritize specific participant's video streams and display their videos even when these participants do not talk. |

#### Returns

`Promise`<`any`\>

___

### startAudio

▸ **startAudio**(`participant`): `Promise`<`void`\>

Starts audio transmission between the local client and a conference. The startAudio method impacts only the audio streams that the local participant sends and receives; the method does not impact the audio transmission between remote participants and a conference and does not allow the local participant to force sending remote participants’ streams to the conference or to the local participant. Depending on the specified participant in the `participant` parameter, the startAudio method starts the proper audio transmission:
- When the specified participant is the local participant, startAudio ensures sending local participant’s audio from the local client to the conference.
- When the specified participant is a remote participant, startAudio ensures sending remote participant’s audio from the conference to the local client. This allows the local participant to unmute remote participants who are locally muted through the [stopAudio](#stopaudio) method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/internal.Participant.md) | The selected participant. If you wish to transmit the local participant's audio stream to the conference, provide the local participant's object. If you wish to receive the specific remote participants' audio streams, provide these remote participants' objects. |

#### Returns

`Promise`<`void`\>

___

### startScreenShare

▸ **startScreenShare**(): `Promise`<`void`\>

Starts a screen sharing session.
The ScreenShare with iOS document (https://docs.dolby.io/communications-apis/docs/screenshare-with-ios) describes how to set up screen-share outside the application.
Instead of setting the following properties:
- CommsSDK.shared.appGroup = "YOUR_APP_GROUP"
- CommsSDK.shared.preferredExtension = "YOUR_BROADCAST_EXTENSION_BUNDLE_ID"
 Set up keys in your `Info.plist` file:
- Add a new `DolbyioSdkAppGroupKey` as a string type and enter the group name ("YOUR_APP_GROUP").
- Add a new `DolbyioSdkPreferredExtensionKey` as a string type and enter the broadcast extension bundle ID ("YOUR_BROADCAST_EXTENSION_BUNDLE_ID").

#### Returns

`Promise`<`void`\>

___

### startVideo

▸ **startVideo**(`participant`): `Promise`<`void`\>

Notifies the server to either start sending the local participant's video stream to the conference or start sending a remote participant's video stream to the local participant. The startVideo method does not control the remote participant's video stream; if a remote participant does not transmit any video stream, the local participant cannot change it using the startVideo method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/internal.Participant.md) | The participant who will receive the video stream, either remote or local. |

#### Returns

`Promise`<`void`\>

___

### stopAudio

▸ **stopAudio**(`participant`): `Promise`<`void`\>

Stops audio transmission between the local client and a conference. The stopAudio method impacts only the audio streams that the local participant sends and receives; the method does not impact the audio transmission between remote participants and a conference and does not allow the local participant to stop sending remote participants’ streams to the conference. Depending on the specified participant in the `participant` parameter, the stopAudio method stops the proper audio transmission:
- When the specified participant is the local participant, stopAudio stops sending local participant’s audio from the local client to the conference.
- When the specified participant is a remote participant, stopAudio stops sending remote participant’s audio from the conference to the local client. This allows the local participant to locally mute remote participants.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/internal.Participant.md) | The selected participant. If you wish to not transmit the local participant's audio stream to the conference, provide the local participant's object. If you wish to not receive the specific remote participants' audio streams, provide these remote participants' objects. |

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
| `participant` | [`Participant`](../interfaces/internal.Participant.md) | The participant who wants to stop receiving a video stream. |

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
