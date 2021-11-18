[@dolbyio/react-native-iapi-sdk](../README.md) / [Modules](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / ParticipantStatus

# Enumeration: ParticipantStatus

[<internal>](../modules/_internal_.md).ParticipantStatus

## Table of contents

### Enumeration members

- [CONNECTED](_internal_.ParticipantStatus.md#connected)
- [CONNECTING](_internal_.ParticipantStatus.md#connecting)
- [DECLINE](_internal_.ParticipantStatus.md#decline)
- [ERROR](_internal_.ParticipantStatus.md#error)
- [INACTIVE](_internal_.ParticipantStatus.md#inactive)
- [KICKED](_internal_.ParticipantStatus.md#kicked)
- [LEFT](_internal_.ParticipantStatus.md#left)
- [RESERVED](_internal_.ParticipantStatus.md#reserved)
- [WARNING](_internal_.ParticipantStatus.md#warning)

## Enumeration members

### CONNECTED

• **CONNECTED** = `"CONNECTED"`

A participant successfully connected to a conference.

___

### CONNECTING

• **CONNECTING** = `"CONNECTING"`

A participant received the conference invitation and is connecting to a conference.

___

### DECLINE

• **DECLINE** = `"DECLINE"`

An invited participant declined the conference invitation.

___

### ERROR

• **ERROR** = `"ERROR"`

A peer connection failed, and the participant cannot connect to a conference.

___

### INACTIVE

• **INACTIVE** = `"INACTIVE"`

A participant did not enable audio, video, or screen-share and, therefore, is not connected to any stream.

___

### KICKED

• **KICKED** = `"KICKED"`

A participant was kicked from the conference.

___

### LEFT

• **LEFT** = `"LEFT"`

A participant left the conference.

___

### RESERVED

• **RESERVED** = `"RESERVED"`

A participant is invited to a conference and waits for an invitation.

___

### WARNING

• **WARNING** = `"WARNING"`

A participant experiences a peer connection problem, which may result in the Error or Connected status.
