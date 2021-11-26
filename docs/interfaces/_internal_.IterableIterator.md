[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / IterableIterator

# Interface: IterableIterator<T\>

[<internal>](../modules/_internal_.md).IterableIterator

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`Iterator`](_internal_.Iterator.md)<`T`\>

  ↳ **`IterableIterator`**

## Table of contents

### Methods

- [%5Biterator%5D](_internal_.IterableIterator.md#[iterator])
- [next](_internal_.IterableIterator.md#next)
- [return](_internal_.IterableIterator.md#return)
- [throw](_internal_.IterableIterator.md#throw)

## Methods

### [iterator]

▸ **[iterator]**(): [`IterableIterator`](_internal_.IterableIterator.md)<`T`\>

#### Returns

[`IterableIterator`](_internal_.IterableIterator.md)<`T`\>

___

### next

▸ **next**(...`args`): [`IteratorResult`](../modules/_internal_.md#iteratorresult)<`T`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] \| [`undefined`] |

#### Returns

[`IteratorResult`](../modules/_internal_.md#iteratorresult)<`T`, `any`\>

#### Inherited from

[Iterator](_internal_.Iterator.md).[next](_internal_.Iterator.md#next)

___

### return

▸ `Optional` **return**(`value?`): [`IteratorResult`](../modules/_internal_.md#iteratorresult)<`T`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `any` |

#### Returns

[`IteratorResult`](../modules/_internal_.md#iteratorresult)<`T`, `any`\>

#### Inherited from

[Iterator](_internal_.Iterator.md).[return](_internal_.Iterator.md#return)

___

### throw

▸ `Optional` **throw**(`e?`): [`IteratorResult`](../modules/_internal_.md#iteratorresult)<`T`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `e?` | `any` |

#### Returns

[`IteratorResult`](../modules/_internal_.md#iteratorresult)<`T`, `any`\>

#### Inherited from

[Iterator](_internal_.Iterator.md).[throw](_internal_.Iterator.md#throw)
