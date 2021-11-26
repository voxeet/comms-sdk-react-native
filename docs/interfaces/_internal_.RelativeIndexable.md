[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / RelativeIndexable

# Interface: RelativeIndexable<T\>

[<internal>](../modules/_internal_.md).RelativeIndexable

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- **`RelativeIndexable`**

  ↳ [`String`](_internal_.String.md)

  ↳ [`Array`](_internal_.Array.md)

## Table of contents

### Methods

- [at](_internal_.RelativeIndexable.md#at)

## Methods

### at

▸ **at**(`index`): `undefined` \| `T`

Takes an integer value and returns the item at that index,
allowing for positive and negative integers.
Negative integers count back from the last item in the array.

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`undefined` \| `T`
