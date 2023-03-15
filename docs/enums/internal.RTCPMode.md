# Enumeration: RTCPMode

[internal](../modules/internal.md).RTCPMode

The RTCPMode enum gathers the possible bitrate adaptation modes for video transmission.

## Enumeration Members

### AVERAGE

• **AVERAGE** = ``"average"``

Averages the available bandwidth of all receivers and adjusts the transmission bitrate to this value.

___

### BEST

• **BEST** = ``"best"``

Does not adjust the transmission bitrate to the receiver’s bandwidth.

___

### WORST

• **WORST** = ``"worst"``

Adjusts the transmission bitrate to the receiver who has the worst network conditions.
