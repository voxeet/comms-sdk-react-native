# Enumeration: VideoForwardingStrategy

[internal](../modules/internal.md).VideoForwardingStrategy

The VideoForwardingStrategy enum defines how the SDK should select conference participants whose videos will be transmitted to the local participant.
There are two possible values; the selection can be either based on the participants' audio volume or the distance from the local participant.

Selecting the video forwarding strategy is supported only on SDK 3.6 and later. On earlier SDK versions, the SDK supports only the LAST_SPEAKER.

By default, the SDK uses the LAST_SPEAKER strategy.

## Table of contents

### Enumeration members

- [LAST_SPEAKER](internal.VideoForwardingStrategy.md#last_speaker)
- [CLOSEST_USER](internal.VideoForwardingStrategy.md#closest_user)

## Enumeration members

### LAST\_SPEAKER

• **LAST\_SPEAKER** = `"LAST_SPEAKER"`

Selects participants based on their audio volume. This allows the local participant to receive video streams only from active speakers.

___

### CLOSEST\_USER

• **CLOSEST\_USER** = `"CLOSEST_USER"`

Selects participants based on their distance from the local participant. This allows the local participant to receive video streams only from the nearest participants. This strategy is available only for participants who enabled spatial audio.
