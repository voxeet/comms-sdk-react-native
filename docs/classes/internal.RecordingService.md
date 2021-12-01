# Class: RecordingService

[internal](../modules/internal.md).RecordingService

The RecordingService allows an application to record conferences by using the start and stop methods that turn
the recording on and off.

## Table of contents

### Constructors

- [constructor](internal.RecordingService.md#constructor)

### Methods

- [current](internal.RecordingService.md#current)
- [start](internal.RecordingService.md#start)
- [stop](internal.RecordingService.md#stop)

## Constructors

### constructor

• **new RecordingService**()

## Methods

### current

▸ **current**(): `Promise`<``null`` \| [`Recording`](../interfaces/internal.Recording.md)\>

Returns information about the current recording. Use this accessor if you wish to receive information that is
available in the Recording object, such as the ID of the participant who started the recording or the timestamp
that informs when the recording was started.

#### Returns

`Promise`<``null`` \| [`Recording`](../interfaces/internal.Recording.md)\>

___

### start

▸ **start**(): `Promise`<`void`\>

Starts recording a conference.

#### Returns

`Promise`<`void`\>

___

### stop

▸ **stop**(): `Promise`<`void`\>

Stops recording a conference.

#### Returns

`Promise`<`void`\>
