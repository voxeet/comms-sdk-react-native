[@dolbyio/react-native-iapi-sdk](../README.md) / [Modules](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / FilePresentationService

# Class: FilePresentationService

[<internal>](../modules/_internal_.md).FilePresentationService

## Table of contents

### Constructors

- [constructor](_internal_.FilePresentationService.md#constructor)

### Methods

- [convert](_internal_.FilePresentationService.md#convert)
- [getCurrent](_internal_.FilePresentationService.md#getcurrent)
- [getImage](_internal_.FilePresentationService.md#getimage)
- [getThumbnail](_internal_.FilePresentationService.md#getthumbnail)
- [onFileConverted](_internal_.FilePresentationService.md#onfileconverted)
- [onFilePresentationChange](_internal_.FilePresentationService.md#onfilepresentationchange)
- [setPage](_internal_.FilePresentationService.md#setpage)
- [start](_internal_.FilePresentationService.md#start)
- [stop](_internal_.FilePresentationService.md#stop)

## Constructors

### constructor

• **new FilePresentationService**()

## Methods

### convert

▸ **convert**(`file`): [`Promise`](../modules/_internal_.md#promise)<[`FileConverted`](../interfaces/_internal_.FileConverted.md)\>

Returns information about the current recording. Use this accessor if you wish to receive information that is available in the Recording object, such as the ID of the participant who started the recording or the timestamp that informs when the recording was started.

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | [`File`](../interfaces/_internal_.File.md) |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`FileConverted`](../interfaces/_internal_.FileConverted.md)\>

Promise with the FileConverted object.

___

### getCurrent

▸ **getCurrent**(): [`Promise`](../modules/_internal_.md#promise)<[`FilePresentation`](../interfaces/_internal_.FilePresentation.md)\>

Gets current file presentation.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`FilePresentation`](../interfaces/_internal_.FilePresentation.md)\>

Promise with the FilePresentation object

___

### getImage

▸ **getImage**(`page`): [`Promise`](../modules/_internal_.md#promise)<`string`\>

Downloads and displays locally the presented file by retrieving URLs of the individual images.

#### Parameters

| Name | Type |
| :------ | :------ |
| `page` | `number` |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`string`\>

___

### getThumbnail

▸ **getThumbnail**(`page`): [`Promise`](../modules/_internal_.md#promise)<`string`\>

Provides the thumbnail's URL that refers to a specific page of the presented file.

#### Parameters

| Name | Type |
| :------ | :------ |
| `page` | `number` |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`string`\>

___

### onFileConverted

▸ **onFileConverted**(`handler`): [`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Add a handler for file converted

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | (`data`: [`FileConvertedEventType`](../interfaces/_internal_.FileConvertedEventType.md)) => `void` |

#### Returns

[`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Function that removes handler

___

### onFilePresentationChange

▸ **onFilePresentationChange**(`handler`): [`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Add a handler for file presentation changes

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | (`data`: [`FilePresentationChangedEventType`](../interfaces/_internal_.FilePresentationChangedEventType.md), `type?`: [`FilePresentationStarted`](../modules/_internal_.md#filepresentationstarted) \| [`FilePresentationStopped`](../modules/_internal_.md#filepresentationstopped) \| [`FilePresentationUpdated`](../modules/_internal_.md#filepresentationupdated)) => `void` |

#### Returns

[`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Function that removes handler

___

### setPage

▸ **setPage**(`page`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Informs the service to send the updated page number to the conference participants.

#### Parameters

| Name | Type |
| :------ | :------ |
| `page` | `number` |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### start

▸ **start**(`file`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Starts a file presentation.

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | [`FileConverted`](../interfaces/_internal_.FileConverted.md) |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### stop

▸ **stop**(): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Stops the file presentation.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>
