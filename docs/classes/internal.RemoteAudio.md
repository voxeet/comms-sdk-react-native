# Class: RemoteAudio

[internal](../modules/internal.md).RemoteAudio

The RemoteAudio model allows the local participant to locally mute and unmute remote participants.

This model is supported only in SDK 3.7 and later.

## Table of contents

### Constructors

- [constructor](internal.RemoteAudio.md#constructor)

### Methods

- [start](internal.RemoteAudio.md#start)
- [stop](internal.RemoteAudio.md#stop)

## Constructors

### constructor

• **new RemoteAudio**()

## Methods

### start

▸ **start**(`participant`): `Promise`<`void`\>

Allows the local participant to unmute a specific remote participant who is locally muted through the stop method. The start method does not impact audio transmission between remote participants and a conference and does not allow the local participant to force sending remote participants’ streams to the conference or to the local participant. This method is not available for listeners in Dolby Voice conferences.

The start method requires up to a few seconds to become effective.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/internal.Participant.md) | The selected remote participant who is locally muted through the stop method. |

#### Returns

`Promise`<`void`\>

___

### stop

▸ **stop**(`participant`): `Promise`<`void`\>

Allows the local participant to locally mute specific remote participants. This method does not impact audio transmission between remote participants and a conference and does not allow the local participant to stop sending remote participants’ streams to the conference. This method is not available for listeners in Dolby Voice conferences.

The stop method requires up to a few seconds to become effective.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/internal.Participant.md) | The selected remote participant who should be locally muted. |

#### Returns

`Promise`<`void`\>
