[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / SessionService

# Module: SessionService

## Table of contents

### Type aliases

- [ParticipantInfo](SessionService.md#participantinfo)

## Type aliases

### ParticipantInfo

Ƭ **ParticipantInfo**: `Object`

**`typeparam`** The URL of the participant's avatar.

**`typeparam`** The external unique identifier that the customer's application can add to the participant while opening a session. If a participant uses the same external ID in conferences, the participant's ID also remains the same across all sessions. When a second participant joins a conference using the same external ID as another participant who has already joined the conference, the SDK removes the first participant who uses this external ID and emits the switched event (SDK 2.2.3+).

**`typeparam`** The participant's name.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `avatarUrl?` | `string` |
| `externalId?` | `string` |
| `name?` | `string` |
