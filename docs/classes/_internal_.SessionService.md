[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / SessionService

# Class: SessionService

[<internal>](../modules/_internal_.md).SessionService

The SessionService allows opening and closing sessions. Opening a session is
mandatory before interacting with any service.

## Table of contents

### Constructors

- [constructor](_internal_.SessionService.md#constructor)

### Methods

- [close](_internal_.SessionService.md#close)
- [getCurrentUser](_internal_.SessionService.md#getcurrentuser)
- [isOpen](_internal_.SessionService.md#isopen)
- [open](_internal_.SessionService.md#open)

## Constructors

### constructor

• **new SessionService**()

## Methods

### close

▸ **close**(): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Closes the current session.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### getCurrentUser

▸ **getCurrentUser**(): [`Promise`](../modules/_internal_.md#promise)<[`User`](../interfaces/_internal_.User.md)\>

Gets object of local user

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`User`](../interfaces/_internal_.User.md)\>

___

### isOpen

▸ **isOpen**(): [`Promise`](../modules/_internal_.md#promise)<[`Boolean`](../modules/_internal_.md#boolean)\>

Checks whether there is an open session that connects SDK with backend.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`Boolean`](../modules/_internal_.md#boolean)\>

___

### open

▸ **open**(`participantInfo?`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Opens a new session.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participantInfo` | [`ParticipantInfo`](../interfaces/_internal_.ParticipantInfo.md) | The optional information about the local participant. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>
