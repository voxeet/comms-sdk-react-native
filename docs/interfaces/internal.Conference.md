# Interface: Conference

[internal](../modules/internal.md).Conference

The Conference interface gathers information about a conference.

## Properties

### alias

• `Optional` **alias**: `string`

The conference alias. The alias is case insensitive, which means that using "foobar" and "FOObar" aliases results in joining the same conference.

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

___

### spatialAudioStyle

• `Optional` **spatialAudioStyle**: [`SpatialAudioStyle`](../enums/internal.SpatialAudioStyle.md)

The [spatial audio style](doc:rn-client-sdk-enums-spatialaudiostyle) that is used in the current conference.
