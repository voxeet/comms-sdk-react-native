# Enumeration: ParticipantStatus

[internal](../modules/internal.md).ParticipantStatus

The ParticipantStatus enum gathers the possible statuses of conference participants.

## Table of contents

### Enumeration Members

- [CONNECTED](internal.ParticipantStatus.md#connected)
- [CONNECTING](internal.ParticipantStatus.md#connecting)
- [DECLINE](internal.ParticipantStatus.md#decline)
- [ERROR](internal.ParticipantStatus.md#error)
- [INACTIVE](internal.ParticipantStatus.md#inactive)
- [KICKED](internal.ParticipantStatus.md#kicked)
- [LEFT](internal.ParticipantStatus.md#left)
- [RESERVED](internal.ParticipantStatus.md#reserved)
- [WARNING](internal.ParticipantStatus.md#warning)

## Enumeration Members

### CONNECTED

• **CONNECTED** = ``"CONNECTED"``

A participant successfully connected to a conference.

___

### CONNECTING

• **CONNECTING** = ``"CONNECTING"``

A participant received a conference invitation and is connecting to a conference.

___

### DECLINE

• **DECLINE** = ``"DECLINE"``

An invited participant declined a conference invitation.

___

### ERROR

• **ERROR** = ``"ERROR"``

A peer connection failed and a participant cannot connect to a conference.

___

### INACTIVE

• **INACTIVE** = ``"INACTIVE"``

A participant did not enable audio, video, or screen-share and is not connected to any stream.

___

### KICKED

• **KICKED** = ``"KICKED"``

A participant was kicked from a conference.

___

### LEFT

• **LEFT** = ``"LEFT"``

A participant left a conference.

___

### RESERVED

• **RESERVED** = ``"RESERVED"``

A participant is invited to a conference and waits for an invitation.

___

### WARNING

• **WARNING** = ``"WARNING"``

A participant experiences a peer connection problem which may result in the Error or Connected status.
