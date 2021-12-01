# Class: VideoPresentationService

[internal](../modules/internal.md).VideoPresentationService

The VideoPresentationService allows sharing videos during a conference.
To present a video, the conference participant needs to provide the URL that
defines the video location. We recommend sharing files in the MPEG-4 Part 14 or MP4 video formats.

## Table of contents

### Constructors

- [constructor](internal.VideoPresentationService.md#constructor)

### Methods

- [current](internal.VideoPresentationService.md#current)
- [onVideoPresentationChange](internal.VideoPresentationService.md#onvideopresentationchange)
- [onVideoPresentationStopped](internal.VideoPresentationService.md#onvideopresentationstopped)
- [pause](internal.VideoPresentationService.md#pause)
- [play](internal.VideoPresentationService.md#play)
- [seek](internal.VideoPresentationService.md#seek)
- [start](internal.VideoPresentationService.md#start)
- [state](internal.VideoPresentationService.md#state)
- [stop](internal.VideoPresentationService.md#stop)

## Constructors

### constructor

• **new VideoPresentationService**()

## Methods

### current

▸ **current**(): `Promise`<``null`` \| [`VideoPresentation`](../interfaces/internal.VideoPresentation.md)\>

Returns information about the current video presentation. Use this accessor
if you wish to receive information that is available in the VideoPresentation
object, such as information about the participant who shares the video or the
URL of the presented video file.

#### Returns

`Promise`<``null`` \| [`VideoPresentation`](../interfaces/internal.VideoPresentation.md)\>

___

### onVideoPresentationChange

▸ **onVideoPresentationChange**(`handler`): [`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Adds a listener for video presentation started, sought, paused and played events

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`VideoPresentationEventType`](../interfaces/internal.VideoPresentationEventType.md), `type?`: [`paused`](../modules/internal.md#paused) \| [`played`](../modules/internal.md#played) \| [`sought`](../modules/internal.md#sought) \| [`started`](../modules/internal.md#started)) => `void` | Event callback function |

#### Returns

[`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Function that unsubscribes from listeners

___

### onVideoPresentationStopped

▸ **onVideoPresentationStopped**(`handler`): [`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Adds a listener for video presentation stopped event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | () => `void` | Event callback function |

#### Returns

[`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Function that unsubscribes from listeners

___

### pause

▸ **pause**(`timestamp`): `Promise`<`void`\>

Pauses the video presentation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timestamp` | `number` | The timestamp that informs when the video needs to be paused, in milliseconds. |

#### Returns

`Promise`<`void`\>

___

### play

▸ **play**(): `Promise`<`void`\>

Resumes the paused video presentation.

#### Returns

`Promise`<`void`\>

___

### seek

▸ **seek**(`timestamp`): `Promise`<`void`\>

Allows the presenter to navigate to the specific section of the shared video.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timestamp` | `number` | The timestamp the presenter wants to start playing the video from, in milliseconds. |

#### Returns

`Promise`<`void`\>

___

### start

▸ **start**(`url`): `Promise`<`void`\>

Starts the video presentation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL that specifies the video file location. |

#### Returns

`Promise`<`void`\>

___

### state

▸ **state**(): `Promise`<[`VideoPresentationState`](../enums/internal.VideoPresentationState.md)\>

Provides the current state of the video presentation.

#### Returns

`Promise`<[`VideoPresentationState`](../enums/internal.VideoPresentationState.md)\>

___

### stop

▸ **stop**(): `Promise`<`void`\>

Stops the video presentation.

#### Returns

`Promise`<`void`\>
