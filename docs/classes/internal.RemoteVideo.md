# Class: RemoteVideo

[internal](../modules/internal.md).RemoteVideo

The RemoteVideo model allows the local participant to locally mute and unmute remote participants.

This model is supported only in SDK 3.7 and later.

## Table of contents

### Constructors

- [constructor](internal.RemoteVideo.md#constructor)

### Methods

- [start](internal.RemoteVideo.md#start)
- [stop](internal.RemoteVideo.md#stop)

## Constructors

### constructor

• **new RemoteVideo**()

## Methods

### start

▸ **start**(`participant`): `Promise`<`void`\>

If the local participant used the stop method to stop receiving video streams from selected remote participants, the start method allows the participant to start receiving video streams from these participants. The start method does not impact the video transmission between remote participants and a conference and does not allow the local participant to force sending remote participants’ streams to the conference or to the local participant.

The start method requires a few seconds to become effective.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/internal.Participant.md) | The selected remote participant who is locally muted through the stop method. |

#### Returns

`Promise`<`void`\>

___

### stop

▸ **stop**(`participant`): `Promise`<`void`\>

Allows the local participant to stop receiving video from specific remote participants. This method does not impact audio transmission between remote participants and a conference and does not allow the local participant to stop sending remote participants’ streams to the conference.

The stop method requires a few seconds to become effective.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/internal.Participant.md) | The selected remote participant who should be locally muted. |

#### Returns

`Promise`<`void`\>
