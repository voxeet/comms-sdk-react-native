# Interface: Conference

[internal](../modules/internal.md).Conference

The Conference interface gathers information about a conference.

## Table of contents

### Properties

- [alias](internal.Conference.md#alias)
- [id](internal.Conference.md#id)
- [isNew](internal.Conference.md#isnew)
- [participants](internal.Conference.md#participants)
- [status](internal.Conference.md#status)

## Properties

### alias

• `Optional` **alias**: `string`

The conference alias.

___

### id

• `Optional` **id**: `string`

The conference ID.

___

### isNew

• `Optional` **isNew**: `boolean`

A boolean indicating if a created conference is new.

___

### participants

• **participants**: [`Participant`](internal.Participant.md)[]

An array of conference participants.

___

### status

• **status**: [`ConferenceStatus`](../enums/internal.ConferenceStatus.md)

The current conference status.
