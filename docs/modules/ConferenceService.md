[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / ConferenceService

# Module: ConferenceService

## Table of contents

### Enumerations

- [Codec](../enums/ConferenceService.Codec.md)
- [ConferenceServiceEventNames](../enums/ConferenceService.ConferenceServiceEventNames.md)
- [ConferenceStatus](../enums/ConferenceService.ConferenceStatus.md)
- [Mode](../enums/ConferenceService.Mode.md)
- [RTCPMode](../enums/ConferenceService.RTCPMode.md)

### Interfaces

- [ConferenceServiceEventMap](../interfaces/ConferenceService.ConferenceServiceEventMap.md)

### Type aliases

- [Conference](ConferenceService.md#conference)
- [ConferenceCreateOptions](ConferenceService.md#conferencecreateoptions)
- [ConferenceCreateParameters](ConferenceService.md#conferencecreateparameters)
- [ConferenceMixingOptions](ConferenceService.md#conferencemixingoptions)
- [ConferenceReplayOptions](ConferenceService.md#conferencereplayoptions)
- [ConferenceStatusUpdatedEventType](ConferenceService.md#conferencestatusupdatedeventtype)
- [Participant](ConferenceService.md#participant)
- [ParticipantAddedEventType](ConferenceService.md#participantaddedeventtype)
- [ParticipantRemovedEventType](ConferenceService.md#participantremovedeventtype)
- [ParticipantUpdatedEventType](ConferenceService.md#participantupdatedeventtype)
- [PermissionsUpdatedEventType](ConferenceService.md#permissionsupdatedeventtype)
- [StreamAddedEventType](ConferenceService.md#streamaddedeventtype)
- [StreamRemovedEventType](ConferenceService.md#streamremovedeventtype)
- [StreamUpdatedEventType](ConferenceService.md#streamupdatedeventtype)

## Type aliases

### Conference

Ƭ **Conference**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `conferenceAlias?` | `string` |
| `conferenceId?` | `string` |
| `isNew?` | `boolean` |
| `participants` | [`Participant`](ConferenceService.md#participant)[] |
| `status` | [`ConferenceStatus`](../enums/ConferenceService.ConferenceStatus.md) |

___

### ConferenceCreateOptions

Ƭ **ConferenceCreateOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `alias?` | `string` |
| `params?` | [`ConferenceCreateParameters`](ConferenceService.md#conferencecreateparameters) |

___

### ConferenceCreateParameters

Ƭ **ConferenceCreateParameters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dolbyVoice?` | `boolean` |
| `liveRecording?` | `boolean` |
| `mode?` | [`Mode`](../enums/ConferenceService.Mode.md) |
| `rtcpMode?` | [`RTCPMode`](../enums/ConferenceService.RTCPMode.md) |
| `simulcast?` | `boolean` |
| `ttl?` | `number` |
| `videoCodec?` | [`Codec`](../enums/ConferenceService.Codec.md) |

___

### ConferenceMixingOptions

Ƭ **ConferenceMixingOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

___

### ConferenceReplayOptions

Ƭ **ConferenceReplayOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `conferenceAccessToken?` | `string` |
| `offset` | `number` |

___

### ConferenceStatusUpdatedEventType

Ƭ **ConferenceStatusUpdatedEventType**: `Object`

___

### Participant

Ƭ **Participant**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `avatarUrl?` | `string` |
| `conferenceStatus?` | `string` |
| `externalId?` | `string` |
| `name?` | `string` |
| `participantId` | `string` |

___

### ParticipantAddedEventType

Ƭ **ParticipantAddedEventType**: `Object`

___

### ParticipantRemovedEventType

Ƭ **ParticipantRemovedEventType**: `Object`

___

### ParticipantUpdatedEventType

Ƭ **ParticipantUpdatedEventType**: `Object`

___

### PermissionsUpdatedEventType

Ƭ **PermissionsUpdatedEventType**: `Object`

___

### StreamAddedEventType

Ƭ **StreamAddedEventType**: `Object`

___

### StreamRemovedEventType

Ƭ **StreamRemovedEventType**: `Object`

___

### StreamUpdatedEventType

Ƭ **StreamUpdatedEventType**: `Object`
