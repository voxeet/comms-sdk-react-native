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
- [setParticipantVolume](internal.RemoteAudio.md#setparticipantvolume)
- [setAllParticipantsVolume](internal.RemoteAudio.md#setallparticipantsvolume)

## Constructors

### constructor

• **new RemoteAudio**()

## Methods

### start

▸ **start**(`participant`): `Promise`<`void`\>

Allows the local participant to start receiving audio from a specific remote participant. The start method does not impact audio transmission between remote participants and a conference and does not allow the local participant to force sending remote participants’ streams to the conference or to the local participant. The method requires a few seconds to become effective.

In Dolby Voice conferences and in the case of [mixed](doc:rn-client-sdk-enums-listentype#mixed) listeners, the method works as [mute](doc:rn-client-sdk-conferenceservice#mute), so it locally starts playing audio from a remote participant.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/internal.Participant.md) | The selected remote participant who is locally muted through the stop method. |

#### Returns

`Promise`<`void`\>

___

### stop

▸ **stop**(`participant`): `Promise`<`void`\>

Allows the local participant to stop receiving audio from specific remote participants. This method does not impact audio transmission between remote participants and a conference and does not allow the local participant to stop sending remote participants’ streams to the conference. The method requires up to a few seconds to become effective.

In Dolby Voice conferences and in the case of [mixed](doc:rn-client-sdk-enums-listentype#mixed) listeners, the method works as [mute](doc:rn-client-sdk-conferenceservice#mute), so it locally stops playing audio while the audio stream is still received.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/internal.Participant.md) | The selected remote participant who should be locally muted. |

#### Returns

`Promise`<`void`\>

___

### setParticipantVolume

▸ **setParticipantVolume**(`participant`, `volume`): `Promise`<`void`\>

Sets the volume of a selected participant in non-Dolby Voice conferences to a preferred value between 0 and 1.
Providing an unsupported number results in constraining the volume to either 0 or 1.
Using the method for a selected participant after calling setOutputVolume overwrites the participant's volume.

This method is supported in SDK 3.11 and later.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `participant` | [`Participant`](../interfaces/internal.Participant.md) | The selected remote participant. |
| `volume` | `number` | The preferred volume level between 0 (no audio) and 1 (full volume). |

#### Returns

`Promise`<`void`\>

___

### setAllParticipantsVolume

▸ **setAllParticipantsVolume**(`volume`): `Promise`<`void`\>

Sets the conference volume for the local participant. The method sets the volume of all remote participants to a preferred value between 0 and 1.
Providing an unsupported volume results in constraining volume to a either 0 or 1.

This method is supported in SDK 3.11 and later.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `volume` | `number` | The preferred volume level between 0 (no audio) and 1 (full volume). |

#### Returns

`Promise`<`void`\>
