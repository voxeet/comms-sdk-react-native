[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / ConferenceCreateParameters

# Interface: ConferenceCreateParameters

[<internal>](../modules/_internal_.md).ConferenceCreateParameters

## Table of contents

### Properties

- [dolbyVoice](_internal_.ConferenceCreateParameters.md#dolbyvoice)
- [liveRecording](_internal_.ConferenceCreateParameters.md#liverecording)
- [mode](_internal_.ConferenceCreateParameters.md#mode)
- [rtcpMode](_internal_.ConferenceCreateParameters.md#rtcpmode)
- [simulcast](_internal_.ConferenceCreateParameters.md#simulcast)
- [ttl](_internal_.ConferenceCreateParameters.md#ttl)
- [videoCodec](_internal_.ConferenceCreateParameters.md#videocodec)

## Properties

### dolbyVoice

• `Optional` **dolbyVoice**: `boolean`

Enable Dolby Voice

___

### liveRecording

• `Optional` **liveRecording**: `boolean`

Turns the live recording on and off.

___

### mode

• `Optional` **mode**: [`Mode`](../enums/_internal_.Mode.md)

___

### rtcpMode

• `Optional` **rtcpMode**: [`RTCPMode`](../enums/_internal_.RTCPMode.md)

The bitrate adaptation mode for the video transmission. The rtcpMode triggers the server to monitor the receivers’ available bandwidth. Based on the analyzed value, the server informs the video sender to automatically adjust the quality of the transmitted video streams.

___

### simulcast

• `Optional` **simulcast**: `boolean`

Turns the simulcast on and off.

___

### ttl

• `Optional` **ttl**: `number`

The time to live that enables customizing the waiting time (in seconds) and terminating empty conferences.
The Voxeet service terminates conferences after the established time if no one has joined the new conference or the last participant has left it. The default value is 0 seconds.

___

### videoCodec

• `Optional` **videoCodec**: [`Codec`](../enums/_internal_.Codec.md)

The preferred video codec that is used during conferences, either H264 or VP8. By default, the value is set to H264.
