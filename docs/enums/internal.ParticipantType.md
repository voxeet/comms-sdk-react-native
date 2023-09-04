# Enumeration: ParticipantType

[internal](../modules/internal.md).ParticipantType

The ParticipantTypes enum gathers the possible types of conference participants.

## Table of contents

### Enumeration Members

- [LISTENER](internal.ParticipantType.md#listener)
- [USER](internal.ParticipantType.md#user)
- [MIXER\_MIX](internal.ParticipantType.md#mixer_mix)
- [UNKNOWN](internal.ParticipantType.md#unknown)

## Enumeration Members

### LISTENER

• **LISTENER** = ``"LISTENER"``

A participant who cannot send any audio or video stream during a conference.

___

### USER

• **USER** = ``"USER"``

A participant who can send and receive audio and video during the conference.

___

### MIXER\_MIX

• **MIXER\_MIX** = ``"MIXER_MIX"``

A special participant responsible for mixing video and sending one mixed video stream from a conference to each participant who joined the conference as a mixed listener. This type is available in SDK 3.11 and later.

___

### UNKNOWN

• **UNKNOWN** = ``"UNKNOWN"``

Any other type that is unsupported in react-native.
