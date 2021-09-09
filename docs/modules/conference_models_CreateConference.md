[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / conference/models/CreateConference

# Module: conference/models/CreateConference

## Table of contents

### Enumerations

- [Codec](../enums/conference_models_CreateConference.Codec.md)
- [Mode](../enums/conference_models_CreateConference.Mode.md)
- [RTCPMode](../enums/conference_models_CreateConference.RTCPMode.md)

### Type aliases

- [CreateOptions](conference_models_CreateConference.md#createoptions)
- [CreateParameters](conference_models_CreateConference.md#createparameters)

## Type aliases

### CreateOptions

Ƭ **CreateOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `alias?` | `string` |
| `params?` | [`CreateParameters`](conference_models_CreateConference.md#createparameters) |

___

### CreateParameters

Ƭ **CreateParameters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dolbyVoice?` | `boolean` |
| `liveRecording?` | `boolean` |
| `mode?` | [`Mode`](../enums/conference_models_CreateConference.Mode.md) |
| `rtcpMode?` | [`RTCPMode`](../enums/conference_models_CreateConference.RTCPMode.md) |
| `simulcast?` | `boolean` |
| `ttl?` | `number` |
| `videoCodec?` | [`Codec`](../enums/conference_models_CreateConference.Codec.md) |
