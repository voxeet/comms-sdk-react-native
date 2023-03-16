# Interface: ConferenceCreateOptions

[internal](../modules/internal.md).ConferenceCreateOptions

The ConferenceCreateOptions interface gathers information about a new conference.

## Table of contents

### Properties

- [alias](internal.ConferenceCreateOptions.md#alias)
- [params](internal.ConferenceCreateOptions.md#params)
- [pinCode](internal.ConferenceCreateOptions.md#pincode)
- [spatialAudioStyle](internal.ConferenceCreateOptions.md#spatialaudiostyle)

## Properties

### alias

• `Optional` **alias**: `string`

The conference alias. The alias needs to be a logical and unique string that consists of up to 250 characters, such as letters, digits, and symbols other than #. The alias is case insensitive, which means that using "foobar" and "FOObar" aliases refers to the same conference.

___

### params

• `Optional` **params**: [`ConferenceCreateParameters`](internal.ConferenceCreateParameters.md)

The conference parameters.

___

### pinCode

• `Optional` **pinCode**: `number`

The PIN code of a conference.

___

### spatialAudioStyle

• `Optional` **spatialAudioStyle**: [`SpatialAudioStyle`](../enums/internal.SpatialAudioStyle.md)

Defines how the spatial location should be communicated between the SDK and the Dolby.io server.

Setting the spatial audio style is supported only on SDK 3.6 and later. The earlier SDK versions support only the individual mode.
