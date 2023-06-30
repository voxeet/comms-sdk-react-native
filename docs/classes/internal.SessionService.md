# Class: SessionService

[internal](../modules/internal.md).SessionService

The SessionService allows opening and closing sessions. Opening a session is mandatory before interacting with any service.

## Table of contents

### Constructors

- [constructor](internal.SessionService.md#constructor)

### Methods

- [close](internal.SessionService.md#close)
- [getParticipant](internal.SessionService.md#getparticipant)
- [isOpen](internal.SessionService.md#isopen)
- [open](internal.SessionService.md#open)
- [updateParticipantInfo](internal.SessionService.md#updateparticipantinfo)

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

### getParticipant

▸ **getParticipant**(): `Promise`<[`Participant`](../interfaces/internal.Participant.md)\>

Provides the local participant object that belongs to the current session.

#### Returns

`Promise`<[`Participant`](../interfaces/internal.Participant.md)\>

___

### isOpen

▸ **isOpen**(): `Promise`<`Boolean`\>

Returns if a session that connects the SDK with the Dolby.io platform is opened or not.

#### Returns

`Promise`<`Boolean`\>

___

### open

▸ **open**(`participantInfo?`): `Promise`<`void`\>

Opens a new session. If you initialize the SDK with a [client access token](ref:get-client-access-token), provide the external ID in the REST API request, not in the open method. Otherwise, you may expect the platform to either ignore the external ID provided in the open method or receive an error if the provided ID is different from the one provided in the REST API request.
**Note**: The external ID field in this API has been deprecated; now you can provide the external ID only when requesting a [client access token](ref:get-client-access-token). If you provide to this API an external ID that is different from the one in your client access token, it will be rejected.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participantInfo` | [`ParticipantInfo`](../interfaces/internal.ParticipantInfo.md) | The optional information about the local participant. |

#### Returns

`Promise`<`void`\>

___

### updateParticipantInfo

▸ **updateParticipantInfo**(`name`, `avatarUrl`): `Promise`<`void`\>

Update actual participant name and avatarUrl.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `String` |
| `avatarUrl` | `String` |

#### Returns

`Promise`<`void`\>
