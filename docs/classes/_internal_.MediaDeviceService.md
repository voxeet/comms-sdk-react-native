[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / MediaDeviceService

# Class: MediaDeviceService

[<internal>](../modules/_internal_.md).MediaDeviceService

MediaDeviceService allows the application to manage media devices that are
used during conferences.

## Table of contents

### Constructors

- [constructor](_internal_.MediaDeviceService.md#constructor)

### Methods

- [getComfortNoiseLevel](_internal_.MediaDeviceService.md#getcomfortnoiselevel)
- [isFrontCamera](_internal_.MediaDeviceService.md#isfrontcamera)
- [setComfortNoiseLevel](_internal_.MediaDeviceService.md#setcomfortnoiselevel)
- [switchCamera](_internal_.MediaDeviceService.md#switchcamera)
- [switchSpeaker](_internal_.MediaDeviceService.md#switchspeaker)

## Constructors

### constructor

• **new MediaDeviceService**()

## Methods

### getComfortNoiseLevel

▸ **getComfortNoiseLevel**(): [`Promise`](../modules/_internal_.md#promise)<[`ComfortNoiseLevel`](../enums/_internal_.ComfortNoiseLevel.md)\>

Retrieves the comfort noise level setting for output devices in Dolby Voice conferences.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`ComfortNoiseLevel`](../enums/_internal_.ComfortNoiseLevel.md)\>

___

### isFrontCamera

▸ **isFrontCamera**(): [`Promise`](../modules/_internal_.md#promise)<`boolean`\>

Checks if the application uses the front-facing (true) or back-facing camera (false).

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`boolean`\>

___

### setComfortNoiseLevel

▸ **setComfortNoiseLevel**(`noiseLevel`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Configures the comfort noise level for output devices in Dolby Voice conferences.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `noiseLevel` | [`ComfortNoiseLevel`](../enums/_internal_.ComfortNoiseLevel.md) | The selected comfort noise level. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### switchCamera

▸ **switchCamera**(): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Switches the current camera to another available camera that is connected to the device.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### switchSpeaker

▸ **switchSpeaker**(): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Switches the current speaker to another available speaker that is connected to the device.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>
