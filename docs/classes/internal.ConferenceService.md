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
- [listen](internal.ConferenceService.md#listen)
- [kick](internal.ConferenceService.md#kick)
- [leave](internal.ConferenceService.md#leave)
- [mute](internal.ConferenceService.md#mute)
- [replay](internal.ConferenceService.md#replay)
- [setAudioProcessing](internal.ConferenceService.md#setaudioprocessing)
- [setMaxVideoForwarding](internal.ConferenceService.md#setmaxvideoforwarding)
- [videoForwarding](internal.ConferenceService.md#videoforwarding)
- [startAudio](internal.ConferenceService.md#startaudio)
- [startScreenShare](internal.ConferenceService.md#startscreenshare)
- [startVideo](internal.ConferenceService.md#startvideo)
- [stopAudio](internal.ConferenceService.md#stopaudio)
- [stopScreenShare](internal.ConferenceService.md#stopscreenshare)
- [setSpatialDirection](internal.ConferenceService.md#setspatialdirection)
- [setSpatialEnvironment](internal.ConferenceService.md#setspatialenvironment)
- [setSpatialPosition](internal.ConferenceService.md#setspatialposition)
- [stopVideo](internal.ConferenceService.md#stopvideo)
- [updatePermissions](internal.ConferenceService.md#updatepermissions)
- [onStatusChange](internal.ConferenceService.md#onstatuschange)
- [onPermissionsChange](internal.ConferenceService.md#onpermissionschange)
- [onParticipantsChange](internal.ConferenceService.md#onparticipantschange)
- [onStreamsChange](internal.ConferenceService.md#onstreamschange)

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

Returns the maximum number of video streams that can be transmitted to the local participant.

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

### listen

▸ **listen**(`conference`, `options?`): `Promise`<[`Conference`](../interfaces/internal.Conference.md)\>

Joins the conference in the listener mode in which the conference participant can only receive video and audio and cannot transmit any media.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `conference` | [`Conference`](../interfaces/internal.Conference.md) | The Conference object. |
| `options?` | [`ConferenceListenOptions`](../interfaces/internal.ConferenceListenOptions.md) | The additional options for the joining participant. |

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

### replay

▸ **replay**(`conference`, `replayOptions?`): `Promise`<[`Conference`](../interfaces/internal.Conference.md)\>

Replays a previously recorded conference. For more information, see the [Recording Conferences](doc:guides-recording-conferences) article.

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

**Note**: This method is deprecated in SDK 3.7 and replaced with the [setCaptureMode](doc:rn-client-sdk-model-localaudio#setcapturemode) method.

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

This method is deprecated in SDK 3.6.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `max` | `number` | `4` | The maximum number of video streams that may be transmitted to the local participant. The valid parameter values are between 0 and 4. By default, the parameter is set to 4. |
| `prioritizedParticipants` | [`Participant`](../interfaces/internal.Participant.md)[] | `[]` | The list of the prioritized participants. This parameter allows using a pin option to prioritize specific participant's video streams and display their videos even when these participants do not talk. |

#### Returns

`Promise`<`any`\>

___

### videoForwarding

▸ **videoForwarding**(`options`): `Promise`<`any`\>

Sets the video forwarding functionality for the local participant. The method allows:

- Setting the maximum number of video streams that may be transmitted to the local participant
- Prioritizing specific participants' video streams that need to be transmitted to the local participant
- Changing the [video forwarding strategy](doc:rn-client-sdk-enums-videoforwardingstrategy) that defines how the SDK should select conference participants whose videos will be received by the local participant

This method is available only in SDK 3.6 and later.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`VideoForwardingOptions`](../interfaces/internal.VideoForwardingOptions.md) | The video forwarding options. |

#### Returns

`Promise`<`any`\>

___

### startAudio

▸ **startAudio**(`participant`): `Promise`<`void`\>

**Note**: This method is deprecated in SDK 3.7 and replaced with the **start** methods that are available in the [LocalAudio](doc:rn-client-sdk-model-localaudio) and [RemoteAudio](doc:rn-client-sdk-model-remoteaudio) models.

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

**Note**: This method is deprecated in SDK 3.7 and replaced with the **start** methods that are available in the [LocalVideo](doc:rn-client-sdk-model-localvideo) and [RemoteVideo](doc:rn-client-sdk-model-remotevideo) models.

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

**Note**: This method is deprecated in SDK 3.7 and replaced with the **stop** methods that are available in the [LocalAudio](doc:rn-client-sdk-model-localaudio) and [RemoteAudio](doc:rn-client-sdk-model-remoteaudio) models.

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

### setSpatialDirection

▸ **setSpatialDirection**(`direction`): `Promise`<`void`\>

Sets the direction the local participant is facing in space. The method is available only for the participant who:

- Joined a Dolby Voice conference with the [spatialAudio](doc:rn-client-sdk-models-conferencejoinoptions#spatialaudio) parameter enabled.
- Joined the conference as a [user](doc:rn-client-sdk-enums-participanttype#user), not as a [listener](doc:rn-client-sdk-enums-participanttype#listener). Setting the spatial direction for listeners is available only via the [Set Spatial Listeners Audio](ref:set-spatial-listeners-audio) REST API.

If the local participant hears audio from the position (0,0,0) facing down the Z-axis and locates a remote participant in the position (1,0,1), the local participant hears the remote participant from front-right. If the local participant chooses to change the direction and rotate +90 degrees about the Y-axis, then instead of hearing the speaker from the front-right position, the participant hears the speaker from the front-left position. The following video presents this example:

[block:html]
{
"html": "<div style=\"text-align:center\">\n<video controls width=\"289\">\n\n <source src=\"https://s3.us-west-1.amazonaws.com/static.dolby.link/videos/readme/communications/spatial/07_setSpatialDirection_v03_220131.mp4\"\n type=\"video/mp4\">\n\n Sorry, your browser doesn't support embedded videos.\n</video>\n\n</div>"
}
[/block]
For more information, see the [SpatialDirection](doc:rn-client-sdk-models-spatialdirection) model.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `direction` | [`SpatialDirection`](../interfaces/internal.SpatialDirection.md) | The direction the local participant is facing in space. |

#### Returns

`Promise`<`void`\>

___

### setSpatialEnvironment

▸ **setSpatialEnvironment**(`scale`, `forward`, `up`, `right`): `Promise`<`void`\>

Configures a spatial environment of an application, so the audio renderer understands which directions the application considers forward, up, and right and which units it uses for distance. The method is available only for the local participant who:

- Joined a Dolby Voice conference with the [spatialAudio](doc:rn-client-sdk-models-conferencejoinoptions#spatialaudio) parameter enabled.
- Joined the conference as a [user](doc:rn-client-sdk-enums-participanttype#user), not as a [listener](doc:rn-client-sdk-enums-participanttype#listener). Setting the spatial environment for listeners is available only via the [Set Spatial Listeners Audio](ref:set-spatial-listeners-audio) REST API.

If not called, the SDK uses the default spatial environment, which consists of the following values:

- `forward` = (0, 0, 1), where +Z axis is in front
- `up` = (0, 1, 0), where +Y axis is above
- `right` = (1, 0, 0), where +X axis is to the right
- `scale` = (1, 1, 1), where one unit on any axis is 1 meter

The default spatial environment is presented in the following diagram:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/e43475b-defaultEnv.png",
        "defaultEnv.png",
        1920,
        1080,
        "#163b58"
      ],
      "sizing": "full"
    }
  ]
}
[/block]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scale` | [`SpatialScale`](../interfaces/internal.SpatialScale.md) | A scale that defines how to convert units from the coordinate system of an application (pixels or centimeters) into meters used by the spatial audio coordinate system. For example, if SpatialScale is set to (100,100,100), it indicates that 100 of the applications units (cm) map to 1 meter for the audio coordinates. In such a case, if the listener's location is (0,0,0)cm and a remote participant's location is (200,200,200)cm, the listener has an impression of hearing the remote participant from the (2,2,2)m location. The scale value must be greater than 0. For more information, see the [Spatial Audio](doc:guides-integrating-individual-spatial-audio#configure-the-spatial-environment-scale) article. |
| `forward` | [`SpatialPosition`](../interfaces/internal.SpatialPosition.md) | A vector describing the direction the application considers as forward. The value can be either +1, 0, or -1 and must be orthogonal to up and right. |
| `up` | [`SpatialPosition`](../interfaces/internal.SpatialPosition.md) | A vector describing the direction the application considers as up. The value can be either +1, 0, or -1 and must be orthogonal to forward and right. |
| `right` | [`SpatialPosition`](../interfaces/internal.SpatialPosition.md) | A vector describing the direction the application considers as right. The value can be either +1, 0, or -1 and must be orthogonal to forward and up. |

#### Returns

`Promise`<`void`\>

___

### setSpatialPosition

▸ **setSpatialPosition**(`participant`, `position`): `Promise`<`void`\>

Sets a participant's position in space to enable the spatial audio experience during a conference. The method is available only for the participant who:

- Joined a Dolby Voice conference with the [spatialAudio](doc:rn-client-sdk-models-conferencejoinoptions#spatialaudio) parameter enabled.
- Joined the conference as a [user](doc:rn-client-sdk-enums-participanttype#user), not as a [listener](doc:rn-client-sdk-enums-participanttype#listener). Setting the spatial position for listeners is available only via the [Set Spatial Listeners Audio](ref:set-spatial-listeners-audio) REST API.

Depending on the specified participant in the `participant` parameter, the setSpatialPosition method impacts the location from which audio is heard or from which audio is rendered:

- When the specified participant is the local participant, setSpatialPosition sets the location from which the local participant listens to the conference. If this location is not provided, the participant hears audio from the default location (0, 0, 0).

- When the specified participant is a remote participant, setSpatialPosition ensures the remote participant's audio is rendered from the specified position in space. If the position of the remote participant is not provided, the participant does not have a default position and remains muted until a position is specified.

For example, if a local participant Eric, who does not have a set direction, calls setSpatialPosition(VoxeetSDK.session.participant, {x:3,y:0,z:0}), Eric hears audio from the position (3,0,0). If Eric also calls setSpatialPosition(Sophia, {x:7,y:1,z:2}), he hears Sophia from the position (7,1,2). In this case, Eric hears Sophia 4 meters to the right, 1 meter above, and 2 meters in front. The following graphic presents the participants' locations:

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/d4d9f7a-05_Axis_People_v04_220202.png",
        "05_Axis_People_v04_220202.png",
        1920,
        1080,
        "#264159"
      ],
      "sizing": "full"
    }
  ]
}
[/block]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/internal.Participant.md) | The selected participant, either local or remote. In a case of the local participant, the SDK sets the location from which the participant will hear a conference. In a case of a remote participant, the SDK sets the position from which the participant's audio will be rendered. |
| `position` | [`SpatialPosition`](../interfaces/internal.SpatialPosition.md) | The participant's audio location. |

#### Returns

`Promise`<`void`\>

___

### stopVideo

▸ **stopVideo**(`participant`): `Promise`<`void`\>

**Note**: This method is deprecated in SDK 3.7 and replaced with the **stop** methods that are available in the [LocalVideo](doc:rn-client-sdk-model-localvideo) and [RemoteVideo](doc:rn-client-sdk-model-remotevideo) models.

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
