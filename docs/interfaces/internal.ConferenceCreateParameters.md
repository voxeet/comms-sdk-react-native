# Interface: ConferenceCreateParameters

[internal](../modules/internal.md).ConferenceCreateParameters

The ConferenceCreateParameters interface gathers parameters settings for a requested conference.

## Table of contents

### Properties

- [ttl](internal.ConferenceCreateParameters.md#ttl)
- [rtcpMode](internal.ConferenceCreateParameters.md#rtcpmode)
- [videoCodec](internal.ConferenceCreateParameters.md#videocodec)
- [liveRecording](internal.ConferenceCreateParameters.md#liverecording)
- [dolbyVoice](internal.ConferenceCreateParameters.md#dolbyvoice)

## Properties

### ttl

• `Optional` **ttl**: `number`

The time to live that allows customizing time after which the SDK terminates empty conferences (is seconds). The default ttl value is 0 seconds.

___

### rtcpMode

• `Optional` **rtcpMode**: [`RTCPMode`](../enums/internal.RTCPMode.md)

The bitrate adaptation mode for video transmission. The parameter triggers a server to monitor the receivers’ available bandwidth. Based on the analyzed value, the server informs the video sender to automatically adjust the quality of the transmitted video streams.

___

### videoCodec

• `Optional` **videoCodec**: [`Codec`](../enums/internal.Codec.md)

The preferred video codec that is used during a conference, either H264 or VP8. By default, the SDK uses the H264 codec.

___

### liveRecording

• `Optional` **liveRecording**: `boolean`

A boolean that enables and disables live recording. Specify this parameter during the conference creation:
- When set to `true`, the recorded file is available at the end of the call and can be downloaded immediately.
- When set to `false`, the [remix API](ref:remix) must be called after the conference to generate and retrieve the recorded file.

This parameter does not start the recording; use the [start](doc:js-client-sdk-recordingservice#start) method to turn it on. For more information, see the [Recording Mechanisms](doc:guides-recording-mechanisms#recording-types) article.

___

### dolbyVoice

• `Optional` **dolbyVoice**: `boolean`

A boolean that indicates whether an application wishes to create a conference with Dolby Voice enabled. For more information about Dolby Voice, see the [Dolby Voice](doc:guides-dolby-voice) article. By default, the parameter is set to `true`.
