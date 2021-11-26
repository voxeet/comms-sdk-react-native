[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / StringConstructor

# Interface: StringConstructor

[<internal>](../modules/_internal_.md).StringConstructor

## Callable

### StringConstructor

▸ **StringConstructor**(`value?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `any` |

#### Returns

`string`

## Table of contents

### Constructors

- [constructor](_internal_.StringConstructor.md#constructor)

### Properties

- [prototype](_internal_.StringConstructor.md#prototype)

### Methods

- [fromCharCode](_internal_.StringConstructor.md#fromcharcode)
- [fromCodePoint](_internal_.StringConstructor.md#fromcodepoint)
- [raw](_internal_.StringConstructor.md#raw)

## Constructors

### constructor

• **new StringConstructor**(`value?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `any` |

## Properties

### prototype

• `Readonly` **prototype**: [`String`](../modules/_internal_.md#string)

## Methods

### fromCharCode

▸ **fromCharCode**(...`codes`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...codes` | `number`[] |

#### Returns

`string`

___

### fromCodePoint

▸ **fromCodePoint**(...`codePoints`): `string`

Return the String value whose elements are, in order, the elements in the List elements.
If length is 0, the empty string is returned.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...codePoints` | `number`[] |

#### Returns

`string`

___

### raw

▸ **raw**(`template`, ...`substitutions`): `string`

String.raw is usually used as a tag function of a Tagged Template String. When called as
such, the first argument will be a well formed template call site object and the rest
parameter will contain the substitution values. It can also be called directly, for example,
to interleave strings and values from your own tag function, and in this case the only thing
it needs from the first argument is the raw property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `template` | `Object` | A well-formed template string call site representation. |
| `template.raw` | readonly `string`[] \| [`ArrayLike`](_internal_.ArrayLike.md)<`string`\> | - |
| `...substitutions` | `any`[] | A set of substitution values. |

#### Returns

`string`
