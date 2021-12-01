# Class: SessionService

[internal](../modules/internal.md).SessionService

The SessionService allows opening and closing sessions. Opening a session is
mandatory before interacting with any service.

## Table of contents

### Constructors

- [constructor](internal.SessionService.md#constructor)

### Methods

- [close](internal.SessionService.md#close)
- [getCurrentUser](internal.SessionService.md#getcurrentuser)
- [isOpen](internal.SessionService.md#isopen)
- [open](internal.SessionService.md#open)

## Constructors

### constructor

• **new SessionService**()

## Methods

### close

▸ **close**(): `Promise`<`void`\>

Closes the current session.

#### Returns

`Promise`<`void`\>

___

### getCurrentUser

▸ **getCurrentUser**(): `Promise`<[`User`](../interfaces/internal.User.md)\>

Gets object of local user

#### Returns

`Promise`<[`User`](../interfaces/internal.User.md)\>

___

### isOpen

▸ **isOpen**(): `Promise`<`Boolean`\>

Checks whether there is an open session that connects SDK with backend.

#### Returns

`Promise`<`Boolean`\>

___

### open

▸ **open**(`participantInfo?`): `Promise`<`void`\>

Opens a new session.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participantInfo` | [`ParticipantInfo`](../interfaces/internal.ParticipantInfo.md) | The optional information about the local participant. |

#### Returns

`Promise`<`void`\>
