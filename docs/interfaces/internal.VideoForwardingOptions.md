# Interface: VideoForwardingOptions

[internal](../modules/internal.md).VideoForwardingOptions

The VideoForwardingOptions model allows configuring the Video Forwarding functionality that allows:

- Setting the maximum number of video streams that may be transmitted to the local participant
- Prioritizing specific participants' video streams that need to be transmitted to the local participant
- Changing the video forwarding strategy that defines how the SDK should select conference participants whose videos will be received by the local participant

## Table of contents

### Properties

- [max](internal.VideoForwardingOptions.md#max)
- [participants](internal.VideoForwardingOptions.md#participants)
- [strategy](internal.VideoForwardingOptions.md#strategy)

## Properties

### max

• `Optional` **max**: `number`

The maximum number of video streams that may be transmitted to the local participant. The valid values are between 0 and 25. The default value is 4. In the case of providing a value smaller than 0 or greater than 25, SDK triggers an error.

___

### participants

• `Optional` **participants**: [`Participant`](internal.Participant.md)[]

The list of participants whose video streams should be always transmitted to the local participant.

___

### strategy

• `Optional` **strategy**: [`VideoForwardingStrategy`](../enums/internal.VideoForwardingStrategy.md)

The strategy that defines how the SDK should select conference participants whose videos will be transmitted to the local participant. The selection can be either based on the participants' audio volume or the distance from the local participant.
