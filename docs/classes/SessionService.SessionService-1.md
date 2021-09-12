[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [SessionService](../modules/SessionService.md) / SessionService

# Class: SessionService

[SessionService](../modules/SessionService.md).SessionService

The SessionService allows opening and closing sessions. Opening a session is mandatory before interacting with any service.

## Table of contents

### Constructors

- [constructor](SessionService.SessionService-1.md#constructor)

### Methods

- [close](SessionService.SessionService-1.md#close)
- [open](SessionService.SessionService-1.md#open)

## Constructors

### constructor

• **new SessionService**()

## Methods

### close

▸ **close**(): `Promise`<`boolean`\>

Closes the current session.

#### Returns

`Promise`<`boolean`\>

___

### open

▸ **open**(`participantInfo`): `Promise`<`boolean`\>

Opens a new session.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participantInfo` | [`ParticipantInfo`](../modules/SessionService.md#participantinfo) | The customer key. |

#### Returns

`Promise`<`boolean`\>
