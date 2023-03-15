# Interface: ParticipantInfo

[internal](../modules/internal.md).ParticipantInfo

The ParticipantInfo interface gathers information about a conference participant.

## Properties

### avatarUrl

• `Optional` **avatarUrl**: `string`

The URL of the participant's avatar.

___

### externalId

• `Optional` **externalId**: `string`

The external unique identifier that the customer's application can add to the participant while opening a session. If a participant uses the same external ID in conferences, the participant's ID also remains the same across all sessions. This property is required to invite participants to a conference.

___

### name

• `Optional` **name**: `string`

The participant's name.
