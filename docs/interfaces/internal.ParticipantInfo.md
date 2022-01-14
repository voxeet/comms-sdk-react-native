# Interface: ParticipantInfo

[internal](../modules/internal.md).ParticipantInfo

The ParticipantInfo interface gathers information about a conference participant.

## Table of contents

### Properties

- [name](internal.ParticipantInfo.md#name)
- [avatarUrl](internal.ParticipantInfo.md#avatarurl)
- [externalId](internal.ParticipantInfo.md#externalid)

## Properties

### name

• `Optional` **name**: `string`

The participant's name.

___

### avatarUrl

• `Optional` **avatarUrl**: `string`

The URL of the participant's avatar.

___

### externalId

• `Optional` **externalId**: `string`

The external unique identifier that the customer's application can add to the participant while opening a session. If a participant uses the same external ID in conferences, the participant's ID also remains the same across all sessions. This property is required to invite participants to a conference.
