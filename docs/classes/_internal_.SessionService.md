[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / SessionService

# Class: SessionService

[<internal>](../modules/_internal_.md).SessionService

The SessionService allows opening and closing sessions. Opening a session is mandatory before interacting with any service.

## Table of contents

### Constructors

- [constructor](_internal_.SessionService.md#constructor)

### Methods

- [close](_internal_.SessionService.md#close)
- [open](_internal_.SessionService.md#open)

## Constructors

### constructor

• **new SessionService**()

## Methods

### close

▸ **close**(): [`Promise`](../modules/_internal_.md#promise)<`boolean`\>

Closes the current session.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`boolean`\>

___

### open

▸ **open**(`participantInfo`): [`Promise`](../modules/_internal_.md#promise)<`boolean`\>

Opens a new session.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participantInfo` | [`ParticipantInfo`](../interfaces/_internal_.ParticipantInfo.md) | The customer key. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`boolean`\>
