[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / VideoPresentationService

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

▸ **current**(): ``null`` \| [`VideoPresentation`](../interfaces/_internal_.VideoPresentation.md)

#### Returns

``null`` \| [`VideoPresentation`](../interfaces/_internal_.VideoPresentation.md)

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

▸ **pause**(`timestamp`): `void`

Pauses the video presentation.

#### Parameters

| Name | Type |
| :------ | :------ |
| `timestamp` | `number` |

#### Returns

`void`

void

___

### play

▸ **play**(): `void`

Resumes the paused video presentation.

#### Returns

`void`

void

___

### seek

▸ **seek**(`timestamp`): `void`

Allows the presenter to navigate to the specific section of the shared video.

#### Parameters

| Name | Type |
| :------ | :------ |
| `timestamp` | `number` |

#### Returns

`void`

void

___

### start

▸ **start**(`url`): `void`

Pauses the video presentation.

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`void`

void

___

### state

▸ **state**(): [`VideoPresentationState`](../enums/_internal_.VideoPresentationState.md)

#### Returns

[`VideoPresentationState`](../enums/_internal_.VideoPresentationState.md)

___

### stop

▸ **stop**(): `void`

Stops the video presentation.

#### Returns

`void`

void
