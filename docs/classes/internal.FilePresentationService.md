# Class: FilePresentationService

[internal](../modules/internal.md).FilePresentationService

The FilePresentationService allows presenting files during a conference.
The Dolby.io Communications APIs service converts the user-provided file into
multiple pages, as images, accessible through the image method.

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

Returns information about the current recording. Use this accessor if you wish to receive information that is available in the Recording object, such as the ID of the participant who started the recording or the timestamp that informs when the recording was started.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | [`File`](../interfaces/internal.File.md) | The file that the presenter wants to share during the conference. |

#### Returns

`Promise`<[`FileConverted`](../interfaces/internal.FileConverted.md)\>

___

### getCurrent

▸ **getCurrent**(): `Promise`<[`FilePresentation`](../interfaces/internal.FilePresentation.md)\>

Gets current file presentation.

#### Returns

`Promise`<[`FilePresentation`](../interfaces/internal.FilePresentation.md)\>

___

### getImage

▸ **getImage**(`page`): `Promise`<`string`\>

Downloads and displays locally the presented file by retrieving URLs of the individual images.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `page` | `number` | The number of the presented page. Files that do not have any pages, for example jpg images, require setting the value of the page parameter to 0. |

#### Returns

`Promise`<`string`\>

___

### getThumbnail

▸ **getThumbnail**(`page`): `Promise`<`string`\>

Provides the thumbnail's URL that refers to a specific page of the presented file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `page` | `number` | The number of the presented page. Files that do not include any pages, for example jpg images, require setting the value of this parameter to 0. |

#### Returns

`Promise`<`string`\>

___

### onFileConverted

▸ **onFileConverted**(`handler`): [`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Adds a listener for file converted event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`FileConvertedEventType`](../interfaces/internal.FileConvertedEventType.md)) => `void` | Event callback function |

#### Returns

[`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Function that unsubscribes from listeners

___

### onFilePresentationChange

▸ **onFilePresentationChange**(`handler`): [`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Adds a listener for file presentation changed event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | (`data`: [`FilePresentationChangedEventType`](../interfaces/internal.FilePresentationChangedEventType.md), `type?`: [`FilePresentationStarted`](../modules/internal.md#filepresentationstarted) \| [`FilePresentationStopped`](../modules/internal.md#filepresentationstopped) \| [`FilePresentationUpdated`](../modules/internal.md#filepresentationupdated)) => `void` | Event callback function |

#### Returns

[`UnsubscribeFunction`](../modules/internal.md#unsubscribefunction)

Function that unsubscribes from listeners

___

### setPage

▸ **setPage**(`page`): `Promise`<`void`\>

Informs the service to send the updated page number to the conference participants.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `page` | `number` | The page number that corresponds to the page that should be presented. |

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

Stops the file presentation.

#### Returns

`Promise`<`void`\>
