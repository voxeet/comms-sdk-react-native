# Interface: ConferenceJoinOptions

[internal](../modules/internal.md).ConferenceJoinOptions

The ConferenceJoinOptions interface defines how an application expects to join a conference in terms of media preference.

## Table of contents

### Properties

- [conferenceAccessToken](internal.ConferenceJoinOptions.md#conferenceaccesstoken)
- [constraints](internal.ConferenceJoinOptions.md#constraints)
- [maxVideoForwarding](internal.ConferenceJoinOptions.md#maxvideoforwarding)
- [mixing](internal.ConferenceJoinOptions.md#mixing)
- [preferRecvMono](internal.ConferenceJoinOptions.md#preferrecvmono)
- [preferSendMono](internal.ConferenceJoinOptions.md#prefersendmono)
- [simulcast](internal.ConferenceJoinOptions.md#simulcast)
- [spatialAudio](internal.ConferenceJoinOptions.md#spatialaudio)
- [videoForwardingStrategy](internal.ConferenceJoinOptions.md#videoforwardingstrategy)

## Properties

### conferenceAccessToken

• `Optional` **conferenceAccessToken**: `string`

The conference access token that is required to join a protected conference if the conference is created using the [create](ref:create-conference) REST API. If the conference is created using the create method, the token is managed by the SDK and is not visible to the application users. For more information, see the [Enhanced Conference Access Control](doc:guides-enhanced-conference-access-control) document.

___

### constraints

• `Optional` **constraints**: [`ConferenceConstraints`](internal.ConferenceConstraints.md)

Sets the conference [WebRTC constraints](https://webrtc.org/getting-started/media-capture-and-constraints#constraints). By default, only audio is enabled: `{audio: true, video: false}`.

___

### maxVideoForwarding

• `Optional` **maxVideoForwarding**: `number`

Sets the maximum number of video streams that may be transmitted to the joining participant. The valid parameter values are between 0 and 4 for mobile browsers, with 4 set as the default value.

___

### mixing

• `Optional` **mixing**: [`ConferenceMixingOptions`](internal.ConferenceMixingOptions.md)

Allows joining conferences as a special participant called Mixer. For more information, see the [Recording Conferences](doc:guides-recording-conferences) article.

___

### preferRecvMono

• `Optional` **preferRecvMono**: `boolean`

Indicates whether a participant wants to receive mono sound. By default, participants receive stereo audio. This configuration is only applicable when using the Opus codec and is available in non-Dolby Voice and Dolby Voice conferences.

___

### preferSendMono

• `Optional` **preferSendMono**: `boolean`

Indicates whether a participant wants to send mono sound to a conference. By default, when using the Opus codec, participants' audio is sent as stereo. This configuration is only applicable when using the Opus codec and is available in non-Dolby Voice and Dolby Voice conferences.

___

### simulcast

• `Optional` **simulcast**: `boolean`

Enables sending the Simulcast video streams to other conference participants.

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
