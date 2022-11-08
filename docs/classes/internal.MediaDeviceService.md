# Class: MediaDeviceService

[internal](../modules/internal.md).MediaDeviceService

The MediaDeviceService allows an application to manage media devices that are used during a conference.

## Table of contents

### Constructors

- [constructor](internal.MediaDeviceService.md#constructor)

### Methods

- [getComfortNoiseLevel](internal.MediaDeviceService.md#getcomfortnoiselevel)
- [isFrontCamera](internal.MediaDeviceService.md#isfrontcamera)
- [setComfortNoiseLevel](internal.MediaDeviceService.md#setcomfortnoiselevel)
- [switchCamera](internal.MediaDeviceService.md#switchcamera)
- [switchSpeaker](internal.MediaDeviceService.md#switchspeaker)

## Constructors

### constructor

• **new MediaDeviceService**()

## Methods

### getComfortNoiseLevel

▸ **getComfortNoiseLevel**(): `Promise`<[`ComfortNoiseLevel`](../enums/internal.ComfortNoiseLevel.md)\>

**Note**: This method is deprecated in SDK 3.7 and replaced with the [getComfortNoiseLevel](doc:rn-client-sdk-model-localaudio#getcomfortnoiselevel) method available in the [LocalAudio](doc:rn-client-sdk-model-localaudio) model

Retrieves the comfort noise level setting for output devices in Dolby Voice conferences.

#### Returns

`Promise`<[`ComfortNoiseLevel`](../enums/internal.ComfortNoiseLevel.md)\>

___

### isFrontCamera

▸ **isFrontCamera**(): `Promise`<`boolean`\>

Checks whether an application uses the front-facing (true) or back-facing camera (false).

#### Returns

`Promise`<`boolean`\>

___

### setComfortNoiseLevel

▸ **setComfortNoiseLevel**(`noiseLevel`): `Promise`<`void`\>

**Note**: This method is deprecated in SDK 3.7 and replaced with the [setComfortNoiseLevel](doc:rn-client-sdk-model-localaudio#setcomfortnoiselevel) method available in the [LocalAudio](doc:rn-client-sdk-model-localaudio) model.

Configures the comfort noise level for output devices in Dolby Voice conferences.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `noiseLevel` | [`ComfortNoiseLevel`](../enums/internal.ComfortNoiseLevel.md) | The selected comfort noise level. |

#### Returns

`Promise`<`void`\>

___

### switchCamera

▸ **switchCamera**(): `Promise`<`void`\>

Switches the current camera to another available camera that is connected to a device.

#### Returns

`Promise`<`void`\>

___

### switchSpeaker

▸ **switchSpeaker**(): `Promise`<`void`\>

Switches the current speaker to another available speaker that is connected to a device.

#### Returns

`Promise`<`void`\>
