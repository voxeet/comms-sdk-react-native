# Class: FilePresentationService

[internal](../modules/internal.md).FilePresentationService

The FilePresentationService allows presenting files during a conference. The Dolby.io Communications APIs service converts provided files into multiple images that are accessible through the image method.

## Table of contents

### Constructors

- [constructor](internal.FilePresentationService.md#constructor)

### Methods

- [convert](internal.FilePresentationService.md#convert)
- [getCurrent](internal.FilePresentationService.md#getcurrent)
- [getImage](internal.FilePresentationService.md#getimage)
- [getThumbnail](internal.FilePresentationService.md#getthumbnail)
- [onFileConverted](internal.FilePresentationService.md#onfileconverted)
- [onFilePresentationChange](internal.FilePresentationService.md#onfilepresentationchange)
- [setPage](internal.FilePresentationService.md#setpage)
- [start](internal.FilePresentationService.md#start)
- [stop](internal.FilePresentationService.md#stop)

## Constructors

### constructor

• **new FilePresentationService**()

## Methods

### convert

▸ **convert**(`file`): `Promise`<[`FileConverted`](../interfaces/internal.FileConverted.md)\>

Converts a provided file into multiple images. The file is uploaded as FormData.

The supported file formats are:
- doc/docx (Microsoft Word)
- ppt/pptx
- pdf

After the conversion, the files are broken into individual images with maximum 2560x1600 resolution.

When a file is converted and ready to be presented, the application receives the [converted](#converted) event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](../interfaces/internal.File.md) | The file that a presenter wants to share during a conference. |

#### Returns

`Promise`<[`FileConverted`](../interfaces/internal.FileConverted.md)\>

___

### getCurrent

▸ **getCurrent**(): `Promise`<[`FilePresentation`](../interfaces/internal.FilePresentation.md)\>

Returns information about the current state of the file presentation.

#### Returns

`Promise`<[`FilePresentation`](../interfaces/internal.FilePresentation.md)\>

___

### getImage

▸ **getImage**(`page`): `Promise`<`string`\>

Downloads and displays locally the presented file by retrieving URLs of the individual images.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `page` | `number` | The number of the presented page. Files that do not have any pages, for example, jpg images, require setting the page value to 0. |

#### Returns

`Promise`<`string`\>

___

### getThumbnail

▸ **getThumbnail**(`page`): `Promise`<`string`\>

Provides the URL of a thumbnail that refers to a specific page of the presented file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `page` | `number` | The number of the presented page. Files that do not contain any pages, for example, jpg images, require setting the value of this parameter to 0. |

#### Returns

`Promise`<`string`\>

___

### onFileConverted

▸ **onFileConverted**(`handler`): [`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Adds a listener to the file converted event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`FileConvertedEventType`](../interfaces/internal.FileConvertedEventType.md)) => `void` | An event callback function. |

#### Returns

[`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

A function that unsubscribes from event listeners.

___

### onFilePresentationChange

▸ **onFilePresentationChange**(`handler`): [`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Adds a listener to the file presentation changed event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`FilePresentationChangedEventType`](../interfaces/internal.FilePresentationChangedEventType.md), `type?`: [`FilePresentationStarted`](../modules/internal.md#filepresentationstarted) \| [`FilePresentationStopped`](../modules/internal.md#filepresentationstopped) \| [`FilePresentationUpdated`](../modules/internal.md#filepresentationupdated)) => `void` | An event callback function. |

#### Returns

[`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

A function that unsubscribes from event listeners.

___

### setPage

▸ **setPage**(`page`): `Promise`<`void`\>

Informs the service to send the updated page number to conference participants.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `page` | `number` | The page number that corresponds to the required page. |

#### Returns

`Promise`<`void`\>

___

### start

▸ **start**(`file`): `Promise`<`void`\>

Starts a file presentation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`FileConverted`](../interfaces/internal.FileConverted.md) | The converted file that the presenter wants to share during the conference. |

#### Returns

`Promise`<`void`\>

___

### stop

▸ **stop**(): `Promise`<`void`\>

Stops a file presentation.

#### Returns

`Promise`<`void`\>
