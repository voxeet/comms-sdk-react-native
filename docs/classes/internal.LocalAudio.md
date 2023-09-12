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
- [preview](internal.LocalAudio.md#preview)

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

Sets the local participant's audio capture mode. The following modes are available:

- Standard: The default mode that optimizes captured audio for speech by aggressively removing non-speech content, such as background noise. The mode is supported in SDK 3.7 and later.

- Unprocessed: Reduces latency that comes from audio processing and prevents over-processing audio in some scenarios. The mode is supported in SDK 3.7 and later.

Note: In SDK 3.8 and prior releases, this API is supported only in Dolby Voice conferences.

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

Starts sending the local participant’s audio stream to a conference. The method is available only to participants who joined a conference using the [join](doc:rn-client-sdk-conferenceservice#join) method; it is not available for listeners.

The method requires a few seconds to become effective.

#### Returns

`Promise`<`void`\>

___

### stop

▸ **stop**(): `Promise`<`void`\>

Stops sending local participant’s audio to a conference. The method is available only to participants who joined a conference using the [join](doc:rn-client-sdk-conferenceservice#join) method; it is not available for listeners.

The method requires up to a few seconds to become effective.

#### Returns

`Promise`<`void`\>

___

### preview

▸ **preview**(): [`AudioPreview`](internal.AudioPreview.md)

Allows the local participant to test different capture modes and voice fonts before a conference. The method sets a preview recorder that records the participant's audio and plays it back. Before playing the recorded audio, set the [captureMode](#setCaptureMode) to a preferred setting that you wish to try. The method is supported only in SDK 3.10 and later.

#### Returns

[`AudioPreview`](internal.AudioPreview.md)
