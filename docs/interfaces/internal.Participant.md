# Interface: Participant

[internal](../modules/internal.md).Participant

The Participant interface gathers information about a conference participant.

## Table of contents

### Properties

- [id](internal.Participant.md#id)
- [info](internal.Participant.md#info)
- [status](internal.Participant.md#status)
- [streams](internal.Participant.md#streams)
- [type](internal.Participant.md#type)

## Properties

### id

• **id**: `string`

The participant's ID.

___

### info

• **info**: [`ParticipantInfo`](internal.ParticipantInfo.md)

Information about a conference participant.

___

### status

• `Optional` **status**: [`ParticipantStatus`](../enums/internal.ParticipantStatus.md)

The participant's status.

___

### streams

• `Optional` **streams**: [`MediaStream`](../modules/internal.md#mediastream)[]

The participant's streams.

___

### type

• `Optional` **type**: [`ParticipantType`](../enums/internal.ParticipantType.md)

The participant's type.
