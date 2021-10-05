[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / RecordingService

# Class: RecordingService

[<internal>](../modules/_internal_.md).RecordingService

The RecordingService allows an application to record conferences by using the start and stop methods that turn
the recording on and off.

## Table of contents

### Constructors

- [constructor](_internal_.RecordingService.md#constructor)

### Methods

- [current](_internal_.RecordingService.md#current)
- [start](_internal_.RecordingService.md#start)
- [stop](_internal_.RecordingService.md#stop)

## Constructors

### constructor

• **new RecordingService**()

## Methods

### current

▸ **current**(): [`Promise`](../modules/_internal_.md#promise)<``null`` \| [`Recording`](../interfaces/_internal_.Recording.md)\>

Returns information about the current recording. Use this accessor if you wish to receive information that is
available in the Recording object, such as the ID of the participant who started the recording or the timestamp
that informs when the recording was started.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<``null`` \| [`Recording`](../interfaces/_internal_.Recording.md)\>

Promise with the Recording or null

___

### start

▸ **start**(): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Starts recording a conference.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### stop

▸ **stop**(): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Stops recording a conference.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>
