[@dolbyio/react-native-iapi-sdk](../README.md) / [Modules](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / VideoPresentationService

# Class: VideoPresentationService

[<internal>](../modules/_internal_.md).VideoPresentationService

## Table of contents

### Constructors

- [constructor](_internal_.VideoPresentationService.md#constructor)

### Methods

- [current](_internal_.VideoPresentationService.md#current)
- [onVideoPresentationChange](_internal_.VideoPresentationService.md#onvideopresentationchange)
- [onVideoPresentationStopped](_internal_.VideoPresentationService.md#onvideopresentationstopped)
- [pause](_internal_.VideoPresentationService.md#pause)
- [play](_internal_.VideoPresentationService.md#play)
- [seek](_internal_.VideoPresentationService.md#seek)
- [start](_internal_.VideoPresentationService.md#start)
- [state](_internal_.VideoPresentationService.md#state)
- [stop](_internal_.VideoPresentationService.md#stop)

## Constructors

### constructor

• **new VideoPresentationService**()

## Methods

### current

▸ **current**(): [`Promise`](../modules/_internal_.md#promise)<``null`` \| [`VideoPresentation`](../interfaces/_internal_.VideoPresentation.md)\>

Returns information about the current video presentation. Use this accessor
if you wish to receive information that is available in the VideoPresentation
object, such as information about the participant who shares the video or the
URL of the presented video file.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<``null`` \| [`VideoPresentation`](../interfaces/_internal_.VideoPresentation.md)\>

___

### onVideoPresentationChange

▸ **onVideoPresentationChange**(`handler`): [`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Adds a listener for video presentation started, sought, paused and played events

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`VideoPresentationEventType`](../interfaces/_internal_.VideoPresentationEventType.md), `type?`: [`paused`](../modules/_internal_.md#paused) \| [`played`](../modules/_internal_.md#played) \| [`sought`](../modules/_internal_.md#sought) \| [`started`](../modules/_internal_.md#started)) => `void` | {(data: VideoPresentationEventType, type: VideoPresentationEventNames.started \| VideoPresentationEventNames.sought \| VideoPresentationEventNames.paused \| VideoPresentationEventNames.played) => void} Handling function |

#### Returns

[`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Function that unsubscribes from listeners

___

### onVideoPresentationStopped

▸ **onVideoPresentationStopped**(`handler`): [`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Adds a listener for video presentation stopped event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | () => `void` | Handling function |

#### Returns

[`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Function that unsubscribes from listeners

___

### pause

▸ **pause**(`timestamp`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Pauses the video presentation.

#### Parameters

| Name | Type |
| :------ | :------ |
| `timestamp` | `number` |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

void

___

### play

▸ **play**(): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Resumes the paused video presentation.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

void

___

### seek

▸ **seek**(`timestamp`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Allows the presenter to navigate to the specific section of the shared video.

#### Parameters

| Name | Type |
| :------ | :------ |
| `timestamp` | `number` |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

void

___

### start

▸ **start**(`url`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Starts the video presentation.

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

void

___

### state

▸ **state**(): [`Promise`](../modules/_internal_.md#promise)<[`VideoPresentationState`](../enums/_internal_.VideoPresentationState.md)\>

Provides the current state of the video presentation.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`VideoPresentationState`](../enums/_internal_.VideoPresentationState.md)\>

VideoPresentationState

___

### stop

▸ **stop**(): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Stops the video presentation.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

void
