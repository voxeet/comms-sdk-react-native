# Class: MediaDeviceService

[internal](../modules/internal.md).MediaDeviceService

The MediaDeviceService allows an application to manage media devices that are used during a conference.

## Table of contents

### Constructors

- [constructor](internal.MediaDeviceService.md#constructor)

### Methods

- [isFrontCamera](internal.MediaDeviceService.md#isfrontcamera)
- [switchCamera](internal.MediaDeviceService.md#switchcamera)
- [switchSpeaker](internal.MediaDeviceService.md#switchspeaker)

## Constructors

### constructor

• **new MediaDeviceService**()

## Methods

### isFrontCamera

▸ **isFrontCamera**(): `Promise`<`boolean`\>

Checks whether an application uses the front-facing (true) or back-facing camera (false).

#### Returns

`Promise`<`boolean`\>

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
