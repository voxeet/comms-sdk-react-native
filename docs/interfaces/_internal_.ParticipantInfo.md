[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / ParticipantInfo

# Interface: ParticipantInfo

[<internal>](../modules/_internal_.md).ParticipantInfo

## Table of contents

### Properties

- [avatarUrl](_internal_.ParticipantInfo.md#avatarurl)
- [externalId](_internal_.ParticipantInfo.md#externalid)
- [name](_internal_.ParticipantInfo.md#name)

## Properties

### avatarUrl

• `Optional` **avatarUrl**: `string`

The URL of the Participant avatar.

___

### externalId

• `Optional` **externalId**: `string`

The external unique identifier that the customer's application can add to the participant while opening a session. If a participant uses the same external ID in conferences, the participant's ID also remains the same across all sessions. When a second participant joins a conference using the same external ID as another participant who has already joined the conference, the SDK removes the first participant who uses this external ID and emits the event

___

### name

• `Optional` **name**: `string`

The Participant name.
