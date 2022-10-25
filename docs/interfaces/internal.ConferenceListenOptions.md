# Interface: ConferenceListenOptions

[internal](../modules/internal.md).ConferenceListenOptions

The ConferenceListenOptions interface defines how the application expects to join a conference using the listen method.

## Table of contents

### Properties

- [conferenceAccessToken](internal.ConferenceListenOptions.md#conferenceaccesstoken)
- [maxVideoForwarding](internal.ConferenceListenOptions.md#maxvideoforwarding)
- [spatialAudio](internal.ConferenceListenOptions.md#spatialaudio)
- [videoForwardingStrategy](internal.ConferenceListenOptions.md#videoforwardingstrategy)

## Properties

### conferenceAccessToken

• `Optional` **conferenceAccessToken**: `string`

The conference access token that is required to join a protected conference if the conference is created using the [create](ref:create-conference) REST API. If the conference is created using the create method, the token is managed by the SDK and is not visible to the application users. For more information, see the [Enhanced Conference Access Control](doc:guides-enhanced-conference-access-control) document.

___

### maxVideoForwarding

• `Optional` **maxVideoForwarding**: `number`

Sets the maximum number of video streams that may be transmitted to the joining participant. The valid parameter values are between 0 and 4 for mobile browsers, with 4 set as the default value.

___

### spatialAudio

• `Optional` **spatialAudio**: `boolean`

Enables spatial audio for the local participant who joins a Dolby Voice conference. By default, this parameter is set to false. When set to true in a conference that uses the individual [spatial audio style](doc:rn-client-sdk-enums-spatialaudiostyle), the application must place remote participants in a 3D space using the [setSpatialPosition](doc:rn-client-sdk-references-conferenceservice#setspatialposition) method.
[block:callout]
{
"type": "danger",
"title": "Warning",
"body": "In the individual spatial audio style, remote participants' audio is disabled until the participants are assigned to specific locations. We recommend calling [setSpatialPosition](doc:rn-client-sdk-references-conferenceservice#setspatialposition) from the [participantAdded](doc:rn-client-sdk-modules#participantadded) event to ensure that all participants are assigned to specific positions."
}
[/block]

___

### videoForwardingStrategy

• `Optional` **videoForwardingStrategy**: [`VideoForwardingStrategy`](../enums/internal.VideoForwardingStrategy.md)

Changes the video forwarding strategy for the local participant. This option is available only in SDK 3.6 and later.
