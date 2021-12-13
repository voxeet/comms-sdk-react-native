# Class: RecordingService

[internal](../modules/internal.md).RecordingService

The RecordingService is responsible for recording conferences. For more information about the recording function, see the [Recording](doc:recording-javascript) and [Recording Mechanisms](doc:guides-recording-mechanisms) documents.

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

Returns information about the current recording.

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
