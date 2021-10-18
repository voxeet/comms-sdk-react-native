[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / RTCStatsType

# Enumeration: RTCStatsType

[<internal>](../modules/_internal_.md).RTCStatsType

## Table of contents

### Enumeration members

- [candidate-pair](_internal_.RTCStatsType.md#candidate-pair)
- [certificate](_internal_.RTCStatsType.md#certificate)
- [codec](_internal_.RTCStatsType.md#codec)
- [csrc](_internal_.RTCStatsType.md#csrc)
- [data-channel](_internal_.RTCStatsType.md#data-channel)
- [ice-server](_internal_.RTCStatsType.md#ice-server)
- [inbound-rtp](_internal_.RTCStatsType.md#inbound-rtp)
- [local-candidate](_internal_.RTCStatsType.md#local-candidate)
- [media-source](_internal_.RTCStatsType.md#media-source)
- [outbound-rtp](_internal_.RTCStatsType.md#outbound-rtp)
- [peer-connection](_internal_.RTCStatsType.md#peer-connection)
- [receiver](_internal_.RTCStatsType.md#receiver)
- [remote-candidate](_internal_.RTCStatsType.md#remote-candidate)
- [remote-inbound-rtp](_internal_.RTCStatsType.md#remote-inbound-rtp)
- [remote-outbound-rtp](_internal_.RTCStatsType.md#remote-outbound-rtp)
- [sctp-transport](_internal_.RTCStatsType.md#sctp-transport)
- [sender](_internal_.RTCStatsType.md#sender)
- [stream](_internal_.RTCStatsType.md#stream)
- [track](_internal_.RTCStatsType.md#track)
- [transceiver](_internal_.RTCStatsType.md#transceiver)
- [transport](_internal_.RTCStatsType.md#transport)

## Enumeration members

### candidate-pair

• **candidate-pair** = `16`

ICE candidate pair statistics related to the RTCIceTransport objects.

___

### certificate

• **certificate** = `19`

Information about a certificate used by an RTCIceTransport.

___

### codec

• **codec** = `0`

Statistics for a codec that is currently being used by RTP streams being sent or received by this RTCPeerConnection object. It is accessed by the RTCCodecStats.

___

### csrc

• **csrc** = `6`

Statistics for a contributing source (CSRC) that contributed to an inbound RTP stream.

___

### data-channel

• **data-channel** = `8`

Statistics related to each RTCDataChannel id.

___

### ice-server

• **ice-server** = `20`

Information about the connection to an ICE server (e.g. STUN or TURN).

___

### inbound-rtp

• **inbound-rtp** = `1`

Statistics for an inbound RTP stream that is currently received with this RTCPeerConnection object. It is accessed by the RTCInboundRtpStreamStats.

___

### local-candidate

• **local-candidate** = `17`

ICE local candidate statistics related to the RTCIceTransport objects.

___

### media-source

• **media-source** = `5`

Statistics for the media produced by a MediaStreamTrack that is currently attached to an RTCRtpSender.

___

### outbound-rtp

• **outbound-rtp** = `2`

Statistics for an outbound RTP stream that is currently sent with this RTCPeerConnection object. It is accessed by the RTCOutboundRtpStreamStats.

___

### peer-connection

• **peer-connection** = `7`

Statistics related to the RTCPeerConnection object.

___

### receiver

• **receiver** = `13`

Statistics related to a specific receiver and the corresponding media-level metrics.

___

### remote-candidate

• **remote-candidate** = `18`

ICE remote candidate statistics related to the RTCIceTransport objects.

___

### remote-inbound-rtp

• **remote-inbound-rtp** = `3`

Statistics for the remote endpoint's inbound RTP stream corresponding to an outbound stream that is currently sent with this RTCPeerConnection object.

___

### remote-outbound-rtp

• **remote-outbound-rtp** = `4`

Statistics for the remote endpoint's outbound RTP stream corresponding to an inbound stream that is currently received with this RTCPeerConnection object.

___

### sctp-transport

• **sctp-transport** = `15`

SCTP transport statistics related to an RTCSctpTransport object.

___

### sender

• **sender** = `12`

Statistics related to a specific RTCRtpSender and the corresponding media-level metrics.

___

### stream

• **stream** = `9`

Contains statistics related to a specific MediaStream.

___

### track

• **track** = `10`

Statistics related to a specific MediaStreamTrack's attachment to an RTCRtpSender and the corresponding media-level metrics.

___

### transceiver

• **transceiver** = `11`

Statistics related to a specific RTCRtpTransceiver.

___

### transport

• **transport** = `14`

Transport statistics related to the RTCPeerConnection object.
