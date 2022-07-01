# Interface: ConferenceCreateParameters

[internal](../modules/internal.md).ConferenceCreateParameters

The ConferenceCreateParameters interface gathers parameters settings for a requested conference.

## Table of contents

### Properties

- [dolbyVoice](internal.ConferenceCreateParameters.md#dolbyvoice)
- [liveRecording](internal.ConferenceCreateParameters.md#liverecording)
- [rtcpMode](internal.ConferenceCreateParameters.md#rtcpmode)
- [ttl](internal.ConferenceCreateParameters.md#ttl)
- [videoCodec](internal.ConferenceCreateParameters.md#videocodec)

## Properties

### dolbyVoice

• `Optional` **dolbyVoice**: `boolean`

A boolean that indicates whether an application wishes to create a conference with Dolby Voice enabled. For more information about Dolby Voice, see the [Dolby Voice](doc:guides-dolby-voice) article. By default, the parameter is set to `true`.

___

### liveRecording

• `Optional` **liveRecording**: `boolean`

A boolean that enables and disables live recording. Specify this parameter during the conference creation:
- When set to `true`, the recorded file is available at the end of the call and can be downloaded immediately.
- When set to `false`, the [remix API](ref:remix) must be called after the conference to generate and retrieve the recorded file.

This parameter does not start the recording; use the [start](doc:rn-client-sdk-references-recordingservice#start) method to turn it on. For more information, see the [Recording Conferences](doc:guides-recording-conferences) article.

___

### rtcpMode

• `Optional` **rtcpMode**: [`RTCPMode`](../enums/internal.RTCPMode.md)

The bitrate adaptation mode for video transmission. The parameter triggers a server to monitor the receivers’ available bandwidth. Based on the analyzed value, the server informs the video sender to automatically adjust the quality of the transmitted video streams.

___

### ttl

• `Optional` **ttl**: `number`

The time to live that allows customizing time after which the SDK terminates empty conferences (is seconds). The default ttl value is 0 seconds.

___

### videoCodec

• `Optional` **videoCodec**: [`Codec`](../enums/internal.Codec.md)

The preferred video codec that is used during a conference, either H264 or VP8. By default, the SDK uses the H264 codec.
