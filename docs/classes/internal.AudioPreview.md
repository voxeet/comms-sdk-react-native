# Class: AudioPreview

[internal](../modules/internal.md).AudioPreview

The AudioPreview model allows the local participant to test different capture modes and voice fonts before a conference. The model is supported only in SDK 3.10 and later.

## Table of contents

### Constructors

- [constructor](internal.AudioPreview.md#constructor)

### Methods

- [status](internal.AudioPreview.md#status)
- [getCaptureMode](internal.AudioPreview.md#getcapturemode)
- [setCaptureMode](internal.AudioPreview.md#setcapturemode)
- [play](internal.AudioPreview.md#play)
- [record](internal.AudioPreview.md#record)
- [stop](internal.AudioPreview.md#stop)
- [release](internal.AudioPreview.md#release)
- [onStatusChanged](internal.AudioPreview.md#onstatuschanged)

## Constructors

### constructor

• **new AudioPreview**()

## Methods

### status

▸ **status**(): `Promise`<[`AudioPreviewStatus`](../enums/internal.AudioPreviewStatus.md)\>

Gets the recording status.

#### Returns

`Promise`<[`AudioPreviewStatus`](../enums/internal.AudioPreviewStatus.md)\>

___

### getCaptureMode

▸ **getCaptureMode**(): `Promise`<[`AudioCaptureModeOptions`](../interfaces/internal.AudioCaptureModeOptions.md)\>

Gets an audio capture mode for the audio preview.

#### Returns

`Promise`<[`AudioCaptureModeOptions`](../interfaces/internal.AudioCaptureModeOptions.md)\>

___

### setCaptureMode

▸ **setCaptureMode**(`captureMode`): `Promise`<`void`\>

Sets an audio capture mode for the audio preview.

#### Parameters

| Name | Type |
| :------ | :------ |
| `captureMode` | [`AudioCaptureModeOptions`](../interfaces/internal.AudioCaptureModeOptions.md) |

#### Returns

`Promise`<`void`\>

___

### play

▸ **play**(`loop`): `Promise`<`void`\>

Plays back the recorded audio sample. To test how your audio sounds while using different capture modes and voice fonts, set the captureMode to a preferred setting before using the method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `loop` | `boolean` | A boolean that indicates wether the SDK should play the recorded audio in a loop. |

#### Returns

`Promise`<`void`\>

___

### record

▸ **record**(`duration`): `Promise`<`void`\>

Starts recording an audio sample if no recording is in progress.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `duration` | `number` | The preferred recording duration, in seconds. |

#### Returns

`Promise`<`void`\>

___

### stop

▸ **stop**(): `Promise`<`boolean`\>

Stops recording or playing an audio sample.

#### Returns

`Promise`<`boolean`\>

___

### release

▸ **release**(): `Promise`<`void`\>

Releases the internal memory and restarts the audio session configuration.

#### Returns

`Promise`<`void`\>

___

### onStatusChanged

▸ **onStatusChanged**(`handler`): [`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | (`data`: [`AudioPreviewStatusChangedEventType`](../interfaces/internal.AudioPreviewStatusChangedEventType.md)) => `void` |

#### Returns

[`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)
