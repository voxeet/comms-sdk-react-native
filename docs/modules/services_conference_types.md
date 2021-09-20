[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / services/conference/types

# Module: services/conference/types

## Table of contents

### Enumerations

- [AudioProcessing](../enums/services_conference_types.AudioProcessing.md)
- [Codec](../enums/services_conference_types.Codec.md)
- [ConferencePermission](../enums/services_conference_types.ConferencePermission.md)
- [ConferenceServiceEventNames](../enums/services_conference_types.ConferenceServiceEventNames.md)
- [ConferenceStatus](../enums/services_conference_types.ConferenceStatus.md)
- [Mode](../enums/services_conference_types.Mode.md)
- [RTCPMode](../enums/services_conference_types.RTCPMode.md)

### Interfaces

- [ConferenceServiceEventMap](../interfaces/services_conference_types.ConferenceServiceEventMap.md)

### Type aliases

- [AudioProcessingOptions](services_conference_types.md#audioprocessingoptions)
- [AudioProcessingSenderOptions](services_conference_types.md#audioprocessingsenderoptions)
- [Conference](services_conference_types.md#conference)
- [ConferenceCreateOptions](services_conference_types.md#conferencecreateoptions)
- [ConferenceCreateParameters](services_conference_types.md#conferencecreateparameters)
- [ConferenceMixingOptions](services_conference_types.md#conferencemixingoptions)
- [ConferenceReplayOptions](services_conference_types.md#conferencereplayoptions)
- [ConferenceStatusUpdatedEventType](services_conference_types.md#conferencestatusupdatedeventtype)
- [Participant](services_conference_types.md#participant)
- [ParticipantAddedEventType](services_conference_types.md#participantaddedeventtype)
- [ParticipantRemovedEventType](services_conference_types.md#participantremovedeventtype)
- [ParticipantUpdatedEventType](services_conference_types.md#participantupdatedeventtype)
- [PermissionsUpdatedEventType](services_conference_types.md#permissionsupdatedeventtype)
- [StreamAddedEventType](services_conference_types.md#streamaddedeventtype)
- [StreamRemovedEventType](services_conference_types.md#streamremovedeventtype)
- [StreamUpdatedEventType](services_conference_types.md#streamupdatedeventtype)

## Type aliases

### AudioProcessingOptions

Ƭ **AudioProcessingOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `send?` | [`AudioProcessingSenderOptions`](services_conference_types.md#audioprocessingsenderoptions) |

___

### AudioProcessingSenderOptions

Ƭ **AudioProcessingSenderOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `audioProcessing?` | `boolean` |

___

### Conference

Ƭ **Conference**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `conferenceAlias?` | `string` |
| `conferenceId?` | `string` |
| `isNew?` | `boolean` |
| `participants` | [`Participant`](services_conference_types.md#participant)[] |
| `status` | [`ConferenceStatus`](../enums/services_conference_types.ConferenceStatus.md) |

___

### ConferenceCreateOptions

Ƭ **ConferenceCreateOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `alias?` | `string` |
| `params?` | [`ConferenceCreateParameters`](services_conference_types.md#conferencecreateparameters) |

___

### ConferenceCreateParameters

Ƭ **ConferenceCreateParameters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dolbyVoice?` | `boolean` |
| `liveRecording?` | `boolean` |
| `mode?` | [`Mode`](../enums/services_conference_types.Mode.md) |
| `rtcpMode?` | [`RTCPMode`](../enums/services_conference_types.RTCPMode.md) |
| `simulcast?` | `boolean` |
| `ttl?` | `number` |
| `videoCodec?` | [`Codec`](../enums/services_conference_types.Codec.md) |

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
