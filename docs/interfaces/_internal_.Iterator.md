[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / Iterator

# Interface: Iterator<T, TReturn, TNext\>

[<internal>](../modules/_internal_.md).Iterator

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `TReturn` | `any` |
| `TNext` | `undefined` |

## Hierarchy

- **`Iterator`**

  ↳ [`IterableIterator`](_internal_.IterableIterator.md)

## Table of contents

### Methods

- [next](_internal_.Iterator.md#next)
- [return](_internal_.Iterator.md#return)
- [throw](_internal_.Iterator.md#throw)

## Methods

### next

▸ **next**(...`args`): [`IteratorResult`](../modules/_internal_.md#iteratorresult)<`T`, `TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [] \| [`TNext`] |

#### Returns

[`IteratorResult`](../modules/_internal_.md#iteratorresult)<`T`, `TReturn`\>

___

### return

▸ `Optional` **return**(`value?`): [`IteratorResult`](../modules/_internal_.md#iteratorresult)<`T`, `TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `TReturn` |

#### Returns

[`IteratorResult`](../modules/_internal_.md#iteratorresult)<`T`, `TReturn`\>

___

### throw

▸ `Optional` **throw**(`e?`): [`IteratorResult`](../modules/_internal_.md#iteratorresult)<`T`, `TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `e?` | `any` |

#### Returns

[`IteratorResult`](../modules/_internal_.md#iteratorresult)<`T`, `TReturn`\>
