[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / ArrayConstructor

# Interface: ArrayConstructor

[<internal>](../modules/_internal_.md).ArrayConstructor

## Callable

### ArrayConstructor

▸ **ArrayConstructor**(`arrayLength?`): `any`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `arrayLength?` | `number` |

#### Returns

`any`[]

### ArrayConstructor

▸ **ArrayConstructor**<`T`\>(`arrayLength`): `T`[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arrayLength` | `number` |

#### Returns

`T`[]

### ArrayConstructor

▸ **ArrayConstructor**<`T`\>(...`items`): `T`[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...items` | `T`[] |

#### Returns

`T`[]

## Table of contents

### Constructors

- [constructor](_internal_.ArrayConstructor.md#constructor)

### Properties

- [%5Bspecies%5D](_internal_.ArrayConstructor.md#[species])
- [prototype](_internal_.ArrayConstructor.md#prototype)

### Methods

- [from](_internal_.ArrayConstructor.md#from)
- [isArray](_internal_.ArrayConstructor.md#isarray)
- [of](_internal_.ArrayConstructor.md#of)

## Constructors

### constructor

• **new ArrayConstructor**(`arrayLength?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `arrayLength?` | `number` |

• **new ArrayConstructor**<`T`\>(`arrayLength`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arrayLength` | `number` |

• **new ArrayConstructor**<`T`\>(...`items`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...items` | `T`[] |

## Properties

### [species]

• `Readonly` **[species]**: [`ArrayConstructor`](_internal_.ArrayConstructor.md)

___

### prototype

• `Readonly` **prototype**: `any`[]

## Methods

### from

▸ **from**<`T`\>(`arrayLike`): `T`[]

Creates an array from an array-like object.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arrayLike` | [`ArrayLike`](_internal_.ArrayLike.md)<`T`\> | An array-like object to convert to an array. |

#### Returns

`T`[]

▸ **from**<`T`, `U`\>(`arrayLike`, `mapfn`, `thisArg?`): `U`[]

Creates an array from an iterable object.

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arrayLike` | [`ArrayLike`](_internal_.ArrayLike.md)<`T`\> | An array-like object to convert to an array. |
| `mapfn` | (`v`: `T`, `k`: `number`) => `U` | A mapping function to call on every element of the array. |
| `thisArg?` | `any` | Value of 'this' used to invoke the mapfn. |

#### Returns

`U`[]

▸ **from**<`T`\>(`iterable`): `T`[]

Creates an array from an iterable object.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `iterable` | [`Iterable`](_internal_.Iterable.md)<`T`\> \| [`ArrayLike`](_internal_.ArrayLike.md)<`T`\> | An iterable object to convert to an array. |

#### Returns

`T`[]

▸ **from**<`T`, `U`\>(`iterable`, `mapfn`, `thisArg?`): `U`[]

Creates an array from an iterable object.

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `iterable` | [`Iterable`](_internal_.Iterable.md)<`T`\> \| [`ArrayLike`](_internal_.ArrayLike.md)<`T`\> | An iterable object to convert to an array. |
| `mapfn` | (`v`: `T`, `k`: `number`) => `U` | A mapping function to call on every element of the array. |
| `thisArg?` | `any` | Value of 'this' used to invoke the mapfn. |

#### Returns

`U`[]

___

### isArray

▸ **isArray**(`arg`): arg is any[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `any` |

#### Returns

arg is any[]

___

### of

▸ **of**<`T`\>(...`items`): `T`[]

Returns a new array from a set of elements.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...items` | `T`[] | A set of elements to include in the new array object. |

#### Returns

`T`[]
