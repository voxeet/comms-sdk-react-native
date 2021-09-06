[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [services/AudioService](../modules/services_AudioService.md) / default

# Class: default

[services/AudioService](../modules/services_AudioService.md).default

## Hierarchy

- [`default`](services_AbstractService.default.md)

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](services_AudioService.default.md#constructor)

### Properties

- [#emitter](services_AudioService.default.md##emitter)
- [events](services_AudioService.default.md#events)

### Methods

- [abandonAudioFocusRequest](services_AudioService.default.md#abandonaudiofocusrequest)
- [checkOutputRoute](services_AudioService.default.md#checkoutputroute)
- [connect](services_AudioService.default.md#connect)
- [currentMediaDevice](services_AudioService.default.md#currentmediadevice)
- [disconnect](services_AudioService.default.md#disconnect)
- [enumerateDevices](services_AudioService.default.md#enumeratedevices)
- [registerUpdateDevices](services_AudioService.default.md#registerupdatedevices)
- [requestAudioFocus](services_AudioService.default.md#requestaudiofocus)

## Constructors

### constructor

• **new default**()

#### Overrides

[default](services_AbstractService.default.md).[constructor](services_AbstractService.default.md#constructor)

## Properties

### #emitter

• `Private` **#emitter**: `EventEmitter2`

___

### events

• `Protected` **events**: `any`

#### Inherited from

[default](services_AbstractService.default.md).[events](services_AbstractService.default.md#events)

## Methods

### abandonAudioFocusRequest

▸ **abandonAudioFocusRequest**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### checkOutputRoute

▸ **checkOutputRoute**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

___

### connect

▸ **connect**(`mediaDevice`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mediaDevice` | [`default`](../interfaces/services_audio_MediaDevice.default.md) |

#### Returns

`Promise`<`boolean`\>

___

### currentMediaDevice

▸ **currentMediaDevice**(): `Promise`<[`default`](../interfaces/services_audio_MediaDevice.default.md)\>

#### Returns

`Promise`<[`default`](../interfaces/services_audio_MediaDevice.default.md)\>

___

### disconnect

▸ **disconnect**(`mediaDevice`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mediaDevice` | [`default`](../interfaces/services_audio_MediaDevice.default.md) |

#### Returns

`Promise`<`boolean`\>

___

### enumerateDevices

▸ **enumerateDevices**(): `Promise`<[`default`](../interfaces/services_audio_MediaDevice.default.md)[]\>

#### Returns

`Promise`<[`default`](../interfaces/services_audio_MediaDevice.default.md)[]\>

___

### registerUpdateDevices

▸ **registerUpdateDevices**(`callback`): `Promise`<[`UnregisterCallback`](../interfaces/types_UnregisterCallback.UnregisterCallback.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | [`UpdateDeviceCallback`](../interfaces/services_AudioService.UpdateDeviceCallback.md) |

#### Returns

`Promise`<[`UnregisterCallback`](../interfaces/types_UnregisterCallback.UnregisterCallback.md)\>

___

### requestAudioFocus

▸ **requestAudioFocus**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>
