# Class: VideoPresentationService

[internal](../modules/internal.md).VideoPresentationService

The VideoPresentationService allows sharing videos during a conference. To present a video, a conference participant needs to provide a URL that defines the video location. We recommend sharing files in the MPEG-4 Part 14 or MP4 video format.

**The video presentation workflow:**

**1.** The presenter calls the [start](#start) method to start a video presentation. This method automatically starts playing the shared video file.

**2.** All participants receive [information](doc:rn-client-sdk-interfaces-videopresentationeventtype) about the converted file via the [onVideoPresentationChange](#onvideopresentationchange) listener.

**3.** The presenter can call the [pause](#pause) method to pause the shared video. In such a situation, all conference participants receive [information](doc:rn-client-sdk-interfaces-videopresentationeventtype) about paused file via the [onVideoPresentationChange](#onvideopresentationchange) listener.

**4.** The presenter can call the [play](#play) method to resume the paused video. In such a situation, all conference participants receive [information](doc:rn-client-sdk-interfaces-videopresentationeventtype) about the resumed file via the [onVideoPresentationChange](#onvideopresentationchange) listener.

**5.** The presenter can call the [seek](#seek) method to navigate to a specific section of the shared video. After calling the seek method, all conference participants receive [information](doc:rn-client-sdk-interfaces-videopresentationeventtype) about the updated timestamp via the [onVideoPresentationChange](#onvideopresentationchange) listener.

**6.** The presenter calls the [stop](#stop) method to stop the video presentation. In such a situation, all conference participants receive this information via the [onVideoPresentationStopped](#onvideopresentationstopped) listener.

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

Returns information about the current video presentation.

#### Returns

`Promise`<``null`` \| [`VideoPresentation`](../interfaces/internal.VideoPresentation.md)\>

___

### onVideoPresentationChange

▸ **onVideoPresentationChange**(`handler`): [`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Adds a listener to the video presentation started, sought, paused, and played events.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`VideoPresentationEventType`](../interfaces/internal.VideoPresentationEventType.md), `type?`: [`paused`](../modules/internal.md#paused) \| [`played`](../modules/internal.md#played) \| [`sought`](../modules/internal.md#sought) \| [`started`](../modules/internal.md#started)) => `void` | An event callback function. |

#### Returns

[`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

A function that unsubscribes from event listeners.

___

### onVideoPresentationStopped

▸ **onVideoPresentationStopped**(`handler`): [`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Adds a listener to the video presentation stopped event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | () => `void` | Event callback function |

#### Returns

[`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

___

### pause

▸ **pause**(`timestamp`): `Promise`<`void`\>

Pauses a video presentation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timestamp` | `number` | The timestamp that informs when the video needs to be paused, in milliseconds. |

#### Returns

`Promise`<`void`\>

___

### play

▸ **play**(): `Promise`<`void`\>

Resumes the paused video.

#### Returns

`Promise`<`void`\>

___

### seek

▸ **seek**(`timestamp`): `Promise`<`void`\>

Allows a presenter to navigate to the specific section of the shared video.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timestamp` | `number` | The timestamp the presenter wants to start playing the video from, in milliseconds. |

#### Returns

`Promise`<`void`\>

___

### start

▸ **start**(`url`): `Promise`<`void`\>

Starts a video presentation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL that specifies the video file location. |

#### Returns

`Promise`<`void`\>

___

### state

▸ **state**(): `Promise`<[`VideoPresentationState`](../enums/internal.VideoPresentationState.md)\>

Provides the current state of a video presentation.

#### Returns

`Promise`<[`VideoPresentationState`](../enums/internal.VideoPresentationState.md)\>

___

### stop

▸ **stop**(): `Promise`<`void`\>

Stops a video presentation.

#### Returns

`Promise`<`void`\>
