# Class: RecordingService

[internal](../modules/internal.md).RecordingService

The RecordingService is responsible for recording conferences. For more information about the recording function, see the [Recording Conferences](doc:guides-recording-conferences) document.

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

___

### onRecordingStatusUpdated

▸ **onRecordingStatusUpdated**(`handler`): [`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Adds a listener to the invitation received event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`RecordingStatusUpdatedEventType`](../interfaces/internal.RecordingStatusUpdatedEventType.md)) => `void` | An event callback function. |

#### Returns

[`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

A function that unsubscribes from event listeners.
