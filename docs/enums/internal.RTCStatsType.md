# Enumeration: RTCStatsType

[internal](../modules/internal.md).RTCStatsType

## Table of contents

### Enumeration members

- [candidate-pair](internal.RTCStatsType.md#candidate-pair)
- [certificate](internal.RTCStatsType.md#certificate)
- [codec](internal.RTCStatsType.md#codec)
- [csrc](internal.RTCStatsType.md#csrc)
- [data-channel](internal.RTCStatsType.md#data-channel)
- [ice-server](internal.RTCStatsType.md#ice-server)
- [inbound-rtp](internal.RTCStatsType.md#inbound-rtp)
- [local-candidate](internal.RTCStatsType.md#local-candidate)
- [media-source](internal.RTCStatsType.md#media-source)
- [outbound-rtp](internal.RTCStatsType.md#outbound-rtp)
- [peer-connection](internal.RTCStatsType.md#peer-connection)
- [receiver](internal.RTCStatsType.md#receiver)
- [remote-candidate](internal.RTCStatsType.md#remote-candidate)
- [remote-inbound-rtp](internal.RTCStatsType.md#remote-inbound-rtp)
- [remote-outbound-rtp](internal.RTCStatsType.md#remote-outbound-rtp)
- [sctp-transport](internal.RTCStatsType.md#sctp-transport)
- [sender](internal.RTCStatsType.md#sender)
- [stream](internal.RTCStatsType.md#stream)
- [track](internal.RTCStatsType.md#track)
- [transceiver](internal.RTCStatsType.md#transceiver)
- [transport](internal.RTCStatsType.md#transport)

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
