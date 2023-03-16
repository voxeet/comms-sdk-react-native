# Class: LocalVideo

[internal](../modules/internal.md).LocalVideo

The LocalVideo model allows enabling and disabling the local participant's video.

This model is supported only in SDK 3.7 and later.

## Table of contents

### Constructors

- [constructor](internal.LocalVideo.md#constructor)

### Methods

- [start](internal.LocalVideo.md#start)
- [stop](internal.LocalVideo.md#stop)

## Constructors

### constructor

• **new LocalVideo**()

## Methods

### start

▸ **start**(): `Promise`<`void`\>

Enables the local participant's video and sends the video to a conference.

#### Returns

`Promise`<`void`\>

___

### stop

▸ **stop**(): `Promise`<`void`\>

Disables the local participant's video and stops sending the video to a conference.
Use this method only when the current participant is at the conference.

#### Returns

`Promise`<`void`\>
