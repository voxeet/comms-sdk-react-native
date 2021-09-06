[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [services/FilePresentationService](../modules/services_FilePresentationService.md) / default

# Class: default

[services/FilePresentationService](../modules/services_FilePresentationService.md).default

## Table of contents

### Constructors

- [constructor](services_FilePresentationService.default.md#constructor)

### Methods

- [convertFile](services_FilePresentationService.default.md#convertfile)
- [getImage](services_FilePresentationService.default.md#getimage)
- [getThumbnail](services_FilePresentationService.default.md#getthumbnail)
- [start](services_FilePresentationService.default.md#start)
- [stop](services_FilePresentationService.default.md#stop)
- [update](services_FilePresentationService.default.md#update)

## Constructors

### constructor

• **new default**()

## Methods

### convertFile

▸ **convertFile**(`filePath`): `Promise`<[`default`](../interfaces/services_presentation_FilePresentation.default.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filePath` | `string` |

#### Returns

`Promise`<[`default`](../interfaces/services_presentation_FilePresentation.default.md)\>

___

### getImage

▸ **getImage**(`fileId`, `pageNumber`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileId` | `string` |
| `pageNumber` | `number` |

#### Returns

`Promise`<`string`\>

___

### getThumbnail

▸ **getThumbnail**(`fileId`, `pageNumber`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fileId` | `string` |
| `pageNumber` | `number` |

#### Returns

`Promise`<`string`\>

___

### start

▸ **start**(`body`, `position?`): `Promise`<[`default`](../interfaces/services_presentation_FilePresentation.default.md)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `body` | [`FilePresentationConverted`](../interfaces/events_FilePresentationEvents.FilePresentationConverted.md) | `undefined` |
| `position` | `number` | `0` |

#### Returns

`Promise`<[`default`](../interfaces/services_presentation_FilePresentation.default.md)\>

___

### stop

▸ **stop**(`body`): `Promise`<[`default`](../interfaces/services_presentation_FilePresentation.default.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `body` | [`FilePresentationConverted`](../interfaces/events_FilePresentationEvents.FilePresentationConverted.md) |

#### Returns

`Promise`<[`default`](../interfaces/services_presentation_FilePresentation.default.md)\>

___

### update

▸ **update**(`filePresentation`, `position`): `Promise`<[`default`](../interfaces/services_presentation_FilePresentation.default.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filePresentation` | [`default`](../interfaces/services_presentation_FilePresentation.default.md) |
| `position` | `number` |

#### Returns

`Promise`<[`default`](../interfaces/services_presentation_FilePresentation.default.md)\>
