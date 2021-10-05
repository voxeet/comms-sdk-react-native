[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / RegExp

# Interface: RegExp

[<internal>](../modules/_internal_.md).RegExp

## Table of contents

### Properties

- [dotAll](_internal_.RegExp.md#dotall)
- [flags](_internal_.RegExp.md#flags)
- [global](_internal_.RegExp.md#global)
- [ignoreCase](_internal_.RegExp.md#ignorecase)
- [lastIndex](_internal_.RegExp.md#lastindex)
- [multiline](_internal_.RegExp.md#multiline)
- [source](_internal_.RegExp.md#source)
- [sticky](_internal_.RegExp.md#sticky)
- [unicode](_internal_.RegExp.md#unicode)

### Methods

- [%5BmatchAll%5D](_internal_.RegExp.md#[matchall])
- [%5Bmatch%5D](_internal_.RegExp.md#[match])
- [%5Breplace%5D](_internal_.RegExp.md#[replace])
- [%5Bsearch%5D](_internal_.RegExp.md#[search])
- [%5Bsplit%5D](_internal_.RegExp.md#[split])
- [compile](_internal_.RegExp.md#compile)
- [exec](_internal_.RegExp.md#exec)
- [test](_internal_.RegExp.md#test)

## Properties

### dotAll

• `Readonly` **dotAll**: `boolean`

Returns a Boolean value indicating the state of the dotAll flag (s) used with a regular expression.
Default is false. Read-only.

___

### flags

• `Readonly` **flags**: `string`

Returns a string indicating the flags of the regular expression in question. This field is read-only.
The characters in this string are sequenced and concatenated in the following order:

   - "g" for global
   - "i" for ignoreCase
   - "m" for multiline
   - "u" for unicode
   - "y" for sticky

If no flags are set, the value is the empty string.

___

### global

• `Readonly` **global**: `boolean`

Returns a Boolean value indicating the state of the global flag (g) used with a regular expression. Default is false. Read-only.

___

### ignoreCase

• `Readonly` **ignoreCase**: `boolean`

Returns a Boolean value indicating the state of the ignoreCase flag (i) used with a regular expression. Default is false. Read-only.

___

### lastIndex

• **lastIndex**: `number`

___

### multiline

• `Readonly` **multiline**: `boolean`

Returns a Boolean value indicating the state of the multiline flag (m) used with a regular expression. Default is false. Read-only.

___

### source

• `Readonly` **source**: `string`

Returns a copy of the text of the regular expression pattern. Read-only. The regExp argument is a Regular expression object. It can be a variable name or a literal.

___

### sticky

• `Readonly` **sticky**: `boolean`

Returns a Boolean value indicating the state of the sticky flag (y) used with a regular
expression. Default is false. Read-only.

___

### unicode

• `Readonly` **unicode**: `boolean`

Returns a Boolean value indicating the state of the Unicode flag (u) used with a regular
expression. Default is false. Read-only.

## Methods

### [matchAll]

▸ **[matchAll]**(`str`): [`IterableIterator`](_internal_.IterableIterator.md)<[`RegExpMatchArray`](_internal_.RegExpMatchArray.md)\>

Matches a string with this regular expression, and returns an iterable of matches
containing the results of that search.

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

[`IterableIterator`](_internal_.IterableIterator.md)<[`RegExpMatchArray`](_internal_.RegExpMatchArray.md)\>

___

### [match]

▸ **[match]**(`string`): ``null`` \| [`RegExpMatchArray`](_internal_.RegExpMatchArray.md)

Matches a string with this regular expression, and returns an array containing the results of
that search.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | A string to search within. |

#### Returns

``null`` \| [`RegExpMatchArray`](_internal_.RegExpMatchArray.md)

___

### [replace]

▸ **[replace]**(`string`, `replaceValue`): `string`

Replaces text in a string, using this regular expression.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | A String object or string literal whose contents matching against               this regular expression will be replaced |
| `replaceValue` | `string` | A String object or string literal containing the text to replace for every                     successful match of this regular expression. |

#### Returns

`string`

▸ **[replace]**(`string`, `replacer`): `string`

Replaces text in a string, using this regular expression.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | A String object or string literal whose contents matching against               this regular expression will be replaced |
| `replacer` | (`substring`: `string`, ...`args`: `any`[]) => `string` | A function that returns the replacement text. |

#### Returns

`string`

___

### [search]

▸ **[search]**(`string`): `number`

Finds the position beginning first substring match in a regular expression search
using this regular expression.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string to search within. |

#### Returns

`number`

___

### [split]

▸ **[split]**(`string`, `limit?`): `string`[]

Returns an array of substrings that were delimited by strings in the original input that
match against this regular expression.

If the regular expression contains capturing parentheses, then each time this
regular expression matches, the results (including any undefined results) of the
capturing parentheses are spliced.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | string value to split |
| `limit?` | `number` | if not undefined, the output array is truncated so that it contains no more than 'limit' elements. |

#### Returns

`string`[]

___

### compile

▸ **compile**(): [`RegExp`](../modules/_internal_.md#regexp)

#### Returns

[`RegExp`](../modules/_internal_.md#regexp)

___

### exec

▸ **exec**(`string`): ``null`` \| [`RegExpExecArray`](_internal_.RegExpExecArray.md)

Executes a search on a string using a regular expression pattern, and returns an array containing the results of that search.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The String object or string literal on which to perform the search. |

#### Returns

``null`` \| [`RegExpExecArray`](_internal_.RegExpExecArray.md)

___

### test

▸ **test**(`string`): `boolean`

Returns a Boolean value that indicates whether or not a pattern exists in a searched string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | String on which to perform the search. |

#### Returns

`boolean`
