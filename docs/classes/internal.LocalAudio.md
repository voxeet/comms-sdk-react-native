# Class: LocalAudio

[internal](../modules/internal.md).LocalAudio

The LocalAudio model allows enabling and disabling the local participant's audio as well as setting and checking the capture mode and comfort noise level.

This model is supported only in SDK 3.7 and later.

## Table of contents

### Constructors

- [constructor](internal.LocalAudio.md#constructor)

### Methods

- [getCaptureMode](internal.LocalAudio.md#getcapturemode)
- [setCaptureMode](internal.LocalAudio.md#setcapturemode)
- [getComfortNoiseLevel](internal.LocalAudio.md#getcomfortnoiselevel)
- [setComfortNoiseLevel](internal.LocalAudio.md#setcomfortnoiselevel)
- [start](internal.LocalAudio.md#start)
- [stop](internal.LocalAudio.md#stop)

## Constructors

### constructor

• **new LocalAudio**()

## Methods

### getCaptureMode

▸ **getCaptureMode**(): `Promise`<[`AudioCaptureModeOptions`](../interfaces/internal.AudioCaptureModeOptions.md)\>

Returns the local participant's audio capture mode in Dolby Voice conferences.

#### Returns

`Promise`<[`AudioCaptureModeOptions`](../interfaces/internal.AudioCaptureModeOptions.md)\>

___

### setCaptureMode

▸ **setCaptureMode**(`options`): `Promise`<`void`\>

Sets the local participant's audio capture mode in Dolby Voice conferences.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`AudioCaptureModeOptions`](../interfaces/internal.AudioCaptureModeOptions.md) |

#### Returns

`Promise`<`void`\>

___

### getComfortNoiseLevel

▸ **getComfortNoiseLevel**(): `Promise`<[`ComfortNoiseLevel`](../enums/internal.ComfortNoiseLevel.md)\>

Returns the comfort noise level setting for output devices in Dolby Voice conferences.

#### Returns

`Promise`<[`ComfortNoiseLevel`](../enums/internal.ComfortNoiseLevel.md)\>

___

### setComfortNoiseLevel

▸ **setComfortNoiseLevel**(`noiseLevel`): `Promise`<`void`\>

Configures the comfort noise level for output devices in Dolby Voice conferences.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `noiseLevel` | [`ComfortNoiseLevel`](../enums/internal.ComfortNoiseLevel.md) | The selected comfort noise level. |

#### Returns

`Promise`<`void`\>

___

### start

▸ **start**(): `Promise`<`void`\>

Starts sending the local participant’s audio streams from the local client to the conference.
This method is not available for listeners in Dolby Voice conferences.

The method requires up to a few seconds to become effective.

#### Returns

`Promise`<`void`\>

___

### stop

▸ **stop**(): `Promise`<`void`\>

Stops sending local participant’s audio from the local client to the conference.
This method is not available for listeners in Dolby Voice conferences.

The method requires up to a few seconds to become effective.

#### Returns

`Promise`<`void`\>
