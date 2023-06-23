# Interface: ParticipantInfo

[internal](../modules/internal.md).ParticipantInfo

The ParticipantInfo interface gathers information about a conference participant.

## Table of contents

### Properties

- [avatarUrl](internal.ParticipantInfo.md#avatarurl)
- [externalId](internal.ParticipantInfo.md#externalid)
- [name](internal.ParticipantInfo.md#name)

## Properties

### avatarUrl

• `Optional` **avatarUrl**: `string`

The URL of the participant's avatar.

___

### externalId

• `Optional` **externalId**: `string`

The external unique identifier that a customer's application can add to a participant when applying for a [client access token](ref:get-client-access-token). Setting the external ID via the [open](doc:rn-client-sdk-references-sessionservice#open) method is no longer supported.
If a participant uses the same external ID in conferences, the participant's ID also remains the same across all sessions.

___

### name

• `Optional` **name**: `string`

The participant's name.
