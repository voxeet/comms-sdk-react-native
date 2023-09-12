# Enumeration: ListenType

[internal](../modules/internal.md).ListenType

The ListenType model gathers the possible types of listeners. This model is available in SDK 3.11 and later.

## Table of contents

### Enumeration Members

- [REGULAR](internal.ListenType.md#regular)
- [MIXED](internal.ListenType.md#mixed)

## Enumeration Members

### REGULAR

• **REGULAR** = ``"REGULAR"``

A regular listener who receives one mixed audio stream from a conference and one video stream from each participant who sends video to a conference.

___

### MIXED

• **MIXED** = ``"MIXED"``

A participant who receives one mixed audio stream and one mixed video stream from a conference, which increases the conference capacity. The platform can support up to 60,000 mixed listeners while maintaining under half a second of latency.
