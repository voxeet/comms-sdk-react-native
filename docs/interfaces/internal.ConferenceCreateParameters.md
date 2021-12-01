# Interface: ConferenceCreateParameters

[internal](../modules/internal.md).ConferenceCreateParameters

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

Enable Dolby Voice (Default value = true)

___

### liveRecording

• `Optional` **liveRecording**: `boolean`

Turns the live recording on and off.

___

### rtcpMode

• `Optional` **rtcpMode**: [`RTCPMode`](../enums/internal.RTCPMode.md)

The bitrate adaptation mode for the video transmission. The rtcpMode triggers the server to monitor the receivers’ available bandwidth. Based on the analyzed value, the server informs the video sender to automatically adjust the quality of the transmitted video streams.

___

### ttl

• `Optional` **ttl**: `number`

The time to live that enables customizing the waiting time (in seconds) and terminating empty conferences.
The Voxeet service terminates conferences after the established time if no one has joined the new conference or the last participant has left it. The default value is 0 seconds.

___

### videoCodec

• `Optional` **videoCodec**: [`Codec`](../enums/internal.Codec.md)

The preferred video codec that is used during conferences, either H264 or VP8. By default, the value is set to H264.
