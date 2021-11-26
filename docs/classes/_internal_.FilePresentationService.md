[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / FilePresentationService

# Class: FilePresentationService

[<internal>](../modules/_internal_.md).FilePresentationService

The FilePresentationService allows presenting files during a conference.
The Dolby.io Communications APIs service converts the user-provided file into
multiple pages, as images, accessible through the image method.

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](../interfaces/_internal_.File.md) | The file that the presenter wants to share during the conference. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`FileConverted`](../interfaces/_internal_.FileConverted.md)\>

___

### getCurrent

▸ **getCurrent**(): [`Promise`](../modules/_internal_.md#promise)<[`FilePresentation`](../interfaces/_internal_.FilePresentation.md)\>

Gets current file presentation.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`FilePresentation`](../interfaces/_internal_.FilePresentation.md)\>

___

### getImage

▸ **getImage**(`page`): [`Promise`](../modules/_internal_.md#promise)<`string`\>

Downloads and displays locally the presented file by retrieving URLs of the individual images.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `page` | `number` | The number of the presented page. Files that do not have any pages, for example jpg images, require setting the value of the page parameter to 0. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`string`\>

___

### getThumbnail

▸ **getThumbnail**(`page`): [`Promise`](../modules/_internal_.md#promise)<`string`\>

Provides the thumbnail's URL that refers to a specific page of the presented file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `page` | `number` | The number of the presented page. Files that do not include any pages, for example jpg images, require setting the value of this parameter to 0. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`string`\>

___

### onFileConverted

▸ **onFileConverted**(`handler`): [`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Adds a listener for file converted event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`FileConvertedEventType`](../interfaces/_internal_.FileConvertedEventType.md)) => `void` | Event callback function |

#### Returns

[`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Function that unsubscribes from listeners

___

### onFilePresentationChange

▸ **onFilePresentationChange**(`handler`): [`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Adds a listener for file presentation changed event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`FilePresentationChangedEventType`](../interfaces/_internal_.FilePresentationChangedEventType.md), `type?`: [`FilePresentationStarted`](../modules/_internal_.md#filepresentationstarted) \| [`FilePresentationStopped`](../modules/_internal_.md#filepresentationstopped) \| [`FilePresentationUpdated`](../modules/_internal_.md#filepresentationupdated)) => `void` | Event callback function |

#### Returns

[`UnsubscribeFunction`](../modules/_internal_.md#unsubscribefunction)

Function that unsubscribes from listeners

___

### setPage

▸ **setPage**(`page`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Informs the service to send the updated page number to the conference participants.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `page` | `number` | The page number that corresponds to the page that should be presented. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### start

▸ **start**(`file`): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Starts a file presentation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`FileConverted`](../interfaces/_internal_.FileConverted.md) | The converted file that the presenter wants to share during the conference. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

___

### stop

▸ **stop**(): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Stops the file presentation.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>
