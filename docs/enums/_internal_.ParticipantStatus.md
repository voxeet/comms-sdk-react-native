[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / ParticipantStatus

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

• **CONNECTED** = `"Connected"`

A participant successfully connected to a conference.

___

### CONNECTING

• **CONNECTING** = `"Connecting"`

A participant received the conference invitation and is connecting to a conference.

___

### DECLINE

• **DECLINE** = `"Decline"`

An invited participant declined the conference invitation.

___

### ERROR

• **ERROR** = `"Error"`

A peer connection failed, and the participant cannot connect to a conference.

___

### INACTIVE

• **INACTIVE** = `"Inactive"`

A participant did not enable audio, video, or screen-share and, therefore, is not connected to any stream.

___

### KICKED

• **KICKED** = `"Kicked"`

A participant was kicked from the conference.

___

### LEFT

• **LEFT** = `"Left"`

A participant left the conference.

___

### RESERVED

• **RESERVED** = `"Reserved"`

A participant is invited to a conference and waits for an invitation.

___

### WARNING

• **WARNING** = `"Warning"`

A participant experiences a peer connection problem, which may result in the Error or Connected status.
