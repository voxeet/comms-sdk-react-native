[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / String

# Interface: String

[<internal>](../modules/_internal_.md).String

## Hierarchy

- [`RelativeIndexable`](_internal_.RelativeIndexable.md)<`string`\>

  ↳ **`String`**

## Indexable

▪ [index: `number`]: `string`

## Table of contents

### Properties

- [length](_internal_.String.md#length)

### Methods

- [%5Biterator%5D](_internal_.String.md#[iterator])
- [anchor](_internal_.String.md#anchor)
- [at](_internal_.String.md#at)
- [big](_internal_.String.md#big)
- [blink](_internal_.String.md#blink)
- [bold](_internal_.String.md#bold)
- [charAt](_internal_.String.md#charat)
- [charCodeAt](_internal_.String.md#charcodeat)
- [codePointAt](_internal_.String.md#codepointat)
- [concat](_internal_.String.md#concat)
- [endsWith](_internal_.String.md#endswith)
- [fixed](_internal_.String.md#fixed)
- [fontcolor](_internal_.String.md#fontcolor)
- [fontsize](_internal_.String.md#fontsize)
- [includes](_internal_.String.md#includes)
- [indexOf](_internal_.String.md#indexof)
- [italics](_internal_.String.md#italics)
- [lastIndexOf](_internal_.String.md#lastindexof)
- [link](_internal_.String.md#link)
- [localeCompare](_internal_.String.md#localecompare)
- [match](_internal_.String.md#match)
- [matchAll](_internal_.String.md#matchall)
- [normalize](_internal_.String.md#normalize)
- [padEnd](_internal_.String.md#padend)
- [padStart](_internal_.String.md#padstart)
- [repeat](_internal_.String.md#repeat)
- [replace](_internal_.String.md#replace)
- [replaceAll](_internal_.String.md#replaceall)
- [search](_internal_.String.md#search)
- [slice](_internal_.String.md#slice)
- [small](_internal_.String.md#small)
- [split](_internal_.String.md#split)
- [startsWith](_internal_.String.md#startswith)
- [strike](_internal_.String.md#strike)
- [sub](_internal_.String.md#sub)
- [substr](_internal_.String.md#substr)
- [substring](_internal_.String.md#substring)
- [sup](_internal_.String.md#sup)
- [toLocaleLowerCase](_internal_.String.md#tolocalelowercase)
- [toLocaleUpperCase](_internal_.String.md#tolocaleuppercase)
- [toLowerCase](_internal_.String.md#tolowercase)
- [toString](_internal_.String.md#tostring)
- [toUpperCase](_internal_.String.md#touppercase)
- [trim](_internal_.String.md#trim)
- [trimEnd](_internal_.String.md#trimend)
- [trimLeft](_internal_.String.md#trimleft)
- [trimRight](_internal_.String.md#trimright)
- [trimStart](_internal_.String.md#trimstart)
- [valueOf](_internal_.String.md#valueof)

## Properties

### length

• `Readonly` **length**: `number`

Returns the length of a String object.

## Methods

### [iterator]

▸ **[iterator]**(): [`IterableIterator`](_internal_.IterableIterator.md)<`string`\>

Iterator

#### Returns

[`IterableIterator`](_internal_.IterableIterator.md)<`string`\>

___

### anchor

▸ **anchor**(`name`): `string`

Returns an `<a>` HTML anchor element and sets the name attribute to the text value

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

___

### at

▸ **at**(`index`): `undefined` \| `string`

Takes an integer value and returns the item at that index,
allowing for positive and negative integers.
Negative integers count back from the last item in the array.

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`undefined` \| `string`

#### Inherited from

[RelativeIndexable](_internal_.RelativeIndexable.md).[at](_internal_.RelativeIndexable.md#at)

___

### big

▸ **big**(): `string`

Returns a `<big>` HTML element

#### Returns

`string`

___

### blink

▸ **blink**(): `string`

Returns a `<blink>` HTML element

#### Returns

`string`

___

### bold

▸ **bold**(): `string`

Returns a `<b>` HTML element

#### Returns

`string`

___

### charAt

▸ **charAt**(`pos`): `string`

Returns the character at the specified index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pos` | `number` | The zero-based index of the desired character. |

#### Returns

`string`

___

### charCodeAt

▸ **charCodeAt**(`index`): `number`

Returns the Unicode value of the character at the specified location.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The zero-based index of the desired character. If there is no character at the specified index, NaN is returned. |

#### Returns

`number`

___

### codePointAt

▸ **codePointAt**(`pos`): `undefined` \| `number`

Returns a nonnegative integer Number less than 1114112 (0x110000) that is the code point
value of the UTF-16 encoded code point starting at the string element at position pos in
the String resulting from converting this object to a String.
If there is no element at that position, the result is undefined.
If a valid UTF-16 surrogate pair does not begin at pos, the result is the code unit at pos.

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | `number` |

#### Returns

`undefined` \| `number`

___

### concat

▸ **concat**(...`strings`): `string`

Returns a string that contains the concatenation of two or more strings.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...strings` | `string`[] | The strings to append to the end of the string. |

#### Returns

`string`

___

### endsWith

▸ **endsWith**(`searchString`, `endPosition?`): `boolean`

Returns true if the sequence of elements of searchString converted to a String is the
same as the corresponding elements of this object (converted to a String) starting at
endPosition – length(this). Otherwise returns false.

#### Parameters

| Name | Type |
| :------ | :------ |
| `searchString` | `string` |
| `endPosition?` | `number` |

#### Returns

`boolean`

___

### fixed

▸ **fixed**(): `string`

Returns a `<tt>` HTML element

#### Returns

`string`

___

### fontcolor

▸ **fontcolor**(`color`): `string`

Returns a `<font>` HTML element and sets the color attribute value

#### Parameters

| Name | Type |
| :------ | :------ |
| `color` | `string` |

#### Returns

`string`

___

### fontsize

▸ **fontsize**(`size`): `string`

Returns a `<font>` HTML element and sets the size attribute value

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number` |

#### Returns

`string`

▸ **fontsize**(`size`): `string`

Returns a `<font>` HTML element and sets the size attribute value

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `string` |

#### Returns

`string`

___

### includes

▸ **includes**(`searchString`, `position?`): `boolean`

Returns true if searchString appears as a substring of the result of converting this
object to a String, at one or more positions that are
greater than or equal to position; otherwise, returns false.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchString` | `string` | search string |
| `position?` | `number` | If position is undefined, 0 is assumed, so as to search all of the String. |

#### Returns

`boolean`

___

### indexOf

▸ **indexOf**(`searchString`, `position?`): `number`

Returns the position of the first occurrence of a substring.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchString` | `string` | The substring to search for in the string |
| `position?` | `number` | The index at which to begin searching the String object. If omitted, search starts at the beginning of the string. |

#### Returns

`number`

___

### italics

▸ **italics**(): `string`

Returns an `<i>` HTML element

#### Returns

`string`

___

### lastIndexOf

▸ **lastIndexOf**(`searchString`, `position?`): `number`

Returns the last occurrence of a substring in the string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchString` | `string` | The substring to search for. |
| `position?` | `number` | The index at which to begin searching. If omitted, the search begins at the end of the string. |

#### Returns

`number`

___

### link

▸ **link**(`url`): `string`

Returns an `<a>` HTML element and sets the href attribute value

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`string`

___

### localeCompare

▸ **localeCompare**(`that`): `number`

Determines whether two strings are equivalent in the current locale.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `that` | `string` | String to compare to target string |

#### Returns

`number`

▸ **localeCompare**(`that`, `locales?`, `options?`): `number`

Determines whether two strings are equivalent in the current or specified locale.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `that` | `string` | String to compare to target string |
| `locales?` | `string` \| `string`[] | A locale string or array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used. This parameter must conform to BCP 47 standards; see the Intl.Collator object for details. |
| `options?` | [`CollatorOptions`](_internal_.CollatorOptions.md) | An object that contains one or more properties that specify comparison options. see the Intl.Collator object for details. |

#### Returns

`number`

___

### match

▸ **match**(`regexp`): ``null`` \| [`RegExpMatchArray`](_internal_.RegExpMatchArray.md)

Matches a string with a regular expression, and returns an array containing the results of that search.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `regexp` | `string` \| [`RegExp`](../modules/_internal_.md#regexp) | A variable name or string literal containing the regular expression pattern and flags. |

#### Returns

``null`` \| [`RegExpMatchArray`](_internal_.RegExpMatchArray.md)

▸ **match**(`matcher`): ``null`` \| [`RegExpMatchArray`](_internal_.RegExpMatchArray.md)

Matches a string or an object that supports being matched against, and returns an array
containing the results of that search, or null if no matches are found.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `matcher` | `Object` | An object that supports being matched against. |
| `matcher.[match]` | (`string`: `string`) => ``null`` \| [`RegExpMatchArray`](_internal_.RegExpMatchArray.md) | - |

#### Returns

``null`` \| [`RegExpMatchArray`](_internal_.RegExpMatchArray.md)

___

### matchAll

▸ **matchAll**(`regexp`): [`IterableIterator`](_internal_.IterableIterator.md)<[`RegExpMatchArray`](_internal_.RegExpMatchArray.md)\>

Matches a string with a regular expression, and returns an iterable of matches
containing the results of that search.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `regexp` | [`RegExp`](../modules/_internal_.md#regexp) | A variable name or string literal containing the regular expression pattern and flags. |

#### Returns

[`IterableIterator`](_internal_.IterableIterator.md)<[`RegExpMatchArray`](_internal_.RegExpMatchArray.md)\>

___

### normalize

▸ **normalize**(`form`): `string`

Returns the String value result of normalizing the string into the normalization form
named by form as specified in Unicode Standard Annex #15, Unicode Normalization Forms.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `form` | ``"NFC"`` \| ``"NFD"`` \| ``"NFKC"`` \| ``"NFKD"`` | Applicable values: "NFC", "NFD", "NFKC", or "NFKD", If not specified default is "NFC" |

#### Returns

`string`

▸ **normalize**(`form?`): `string`

Returns the String value result of normalizing the string into the normalization form
named by form as specified in Unicode Standard Annex #15, Unicode Normalization Forms.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `form?` | `string` | Applicable values: "NFC", "NFD", "NFKC", or "NFKD", If not specified default is "NFC" |

#### Returns

`string`

___

### padEnd

▸ **padEnd**(`maxLength`, `fillString?`): `string`

Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length.
The padding is applied from the end (right) of the current string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `maxLength` | `number` | The length of the resulting string once the current string has been padded.        If this parameter is smaller than the current string's length, the current string will be returned as it is. |
| `fillString?` | `string` | The string to pad the current string with.        If this string is too long, it will be truncated and the left-most part will be applied.        The default value for this parameter is " " (U+0020). |

#### Returns

`string`

___

### padStart

▸ **padStart**(`maxLength`, `fillString?`): `string`

Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length.
The padding is applied from the start (left) of the current string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `maxLength` | `number` | The length of the resulting string once the current string has been padded.        If this parameter is smaller than the current string's length, the current string will be returned as it is. |
| `fillString?` | `string` | The string to pad the current string with.        If this string is too long, it will be truncated and the left-most part will be applied.        The default value for this parameter is " " (U+0020). |

#### Returns

`string`

___

### repeat

▸ **repeat**(`count`): `string`

Returns a String value that is made from count copies appended together. If count is 0,
the empty string is returned.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `count` | `number` | number of copies to append |

#### Returns

`string`

___

### replace

▸ **replace**(`searchValue`, `replaceValue`): `string`

Replaces text in a string, using a regular expression or search string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchValue` | `string` \| [`RegExp`](../modules/_internal_.md#regexp) | A string to search for. |
| `replaceValue` | `string` | A string containing the text to replace for every successful match of searchValue in this string. |

#### Returns

`string`

▸ **replace**(`searchValue`, `replacer`): `string`

Replaces text in a string, using a regular expression or search string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchValue` | `string` \| [`RegExp`](../modules/_internal_.md#regexp) | A string to search for. |
| `replacer` | (`substring`: `string`, ...`args`: `any`[]) => `string` | A function that returns the replacement text. |

#### Returns

`string`

▸ **replace**(`searchValue`, `replaceValue`): `string`

Replaces first match with string or all matches with RegExp.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchValue` | `Object` | A string or RegExp search value. |
| `searchValue.[replace]` | (`string`: `string`, `replaceValue`: `string`) => `string` | - |
| `replaceValue` | `string` | A string containing the text to replace for match. |

#### Returns

`string`

▸ **replace**(`searchValue`, `replacer`): `string`

Replaces text in a string, using an object that supports replacement within a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchValue` | `Object` | A object can search for and replace matches within a string. |
| `searchValue.[replace]` | (`string`: `string`, `replacer`: (`substring`: `string`, ...`args`: `any`[]) => `string`) => `string` | - |
| `replacer` | (`substring`: `string`, ...`args`: `any`[]) => `string` | A function that returns the replacement text. |

#### Returns

`string`

___

### replaceAll

▸ **replaceAll**(`searchValue`, `replaceValue`): `string`

Replace all instances of a substring in a string, using a regular expression or search string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchValue` | `string` \| [`RegExp`](../modules/_internal_.md#regexp) | A string to search for. |
| `replaceValue` | `string` | A string containing the text to replace for every successful match of searchValue in this string. |

#### Returns

`string`

▸ **replaceAll**(`searchValue`, `replacer`): `string`

Replace all instances of a substring in a string, using a regular expression or search string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchValue` | `string` \| [`RegExp`](../modules/_internal_.md#regexp) | A string to search for. |
| `replacer` | (`substring`: `string`, ...`args`: `any`[]) => `string` | A function that returns the replacement text. |

#### Returns

`string`

___

### search

▸ **search**(`regexp`): `number`

Finds the first substring match in a regular expression search.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `regexp` | `string` \| [`RegExp`](../modules/_internal_.md#regexp) | The regular expression pattern and applicable flags. |

#### Returns

`number`

▸ **search**(`searcher`): `number`

Finds the first substring match in a regular expression search.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searcher` | `Object` | An object which supports searching within a string. |
| `searcher.[search]` | (`string`: `string`) => `number` | - |

#### Returns

`number`

___

### slice

▸ **slice**(`start?`, `end?`): `string`

Returns a section of a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start?` | `number` | The index to the beginning of the specified portion of stringObj. |
| `end?` | `number` | The index to the end of the specified portion of stringObj. The substring includes the characters up to, but not including, the character indicated by end. If this value is not specified, the substring continues to the end of stringObj. |

#### Returns

`string`

___

### small

▸ **small**(): `string`

Returns a `<small>` HTML element

#### Returns

`string`

___

### split

▸ **split**(`separator`, `limit?`): `string`[]

Split a string into substrings using the specified separator and return them as an array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `separator` | `string` \| [`RegExp`](../modules/_internal_.md#regexp) | A string that identifies character or characters to use in separating the string. If omitted, a single-element array containing the entire string is returned. |
| `limit?` | `number` | A value used to limit the number of elements returned in the array. |

#### Returns

`string`[]

▸ **split**(`splitter`, `limit?`): `string`[]

Split a string into substrings using the specified separator and return them as an array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `splitter` | `Object` | An object that can split a string. |
| `splitter.[split]` | (`string`: `string`, `limit?`: `number`) => `string`[] | - |
| `limit?` | `number` | A value used to limit the number of elements returned in the array. |

#### Returns

`string`[]

___

### startsWith

▸ **startsWith**(`searchString`, `position?`): `boolean`

Returns true if the sequence of elements of searchString converted to a String is the
same as the corresponding elements of this object (converted to a String) starting at
position. Otherwise returns false.

#### Parameters

| Name | Type |
| :------ | :------ |
| `searchString` | `string` |
| `position?` | `number` |

#### Returns

`boolean`

___

### strike

▸ **strike**(): `string`

Returns a `<strike>` HTML element

#### Returns

`string`

___

### sub

▸ **sub**(): `string`

Returns a `<sub>` HTML element

#### Returns

`string`

___

### substr

▸ **substr**(`from`, `length?`): `string`

Gets a substring beginning at the specified location and having the specified length.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `from` | `number` | The starting position of the desired substring. The index of the first character in the string is zero. |
| `length?` | `number` | The number of characters to include in the returned substring. |

#### Returns

`string`

___

### substring

▸ **substring**(`start`, `end?`): `string`

Returns the substring at the specified location within a String object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | `number` | The zero-based index number indicating the beginning of the substring. |
| `end?` | `number` | Zero-based index number indicating the end of the substring. The substring includes the characters up to, but not including, the character indicated by end. If end is omitted, the characters from start through the end of the original string are returned. |

#### Returns

`string`

___

### sup

▸ **sup**(): `string`

Returns a `<sup>` HTML element

#### Returns

`string`

___

### toLocaleLowerCase

▸ **toLocaleLowerCase**(`locales?`): `string`

Converts all alphabetic characters to lowercase, taking into account the host environment's current locale.

#### Parameters

| Name | Type |
| :------ | :------ |
| `locales?` | `string` \| `string`[] |

#### Returns

`string`

___

### toLocaleUpperCase

▸ **toLocaleUpperCase**(`locales?`): `string`

Returns a string where all alphabetic characters have been converted to uppercase, taking into account the host environment's current locale.

#### Parameters

| Name | Type |
| :------ | :------ |
| `locales?` | `string` \| `string`[] |

#### Returns

`string`

___

### toLowerCase

▸ **toLowerCase**(): `string`

Converts all the alphabetic characters in a string to lowercase.

#### Returns

`string`

___

### toString

▸ **toString**(): `string`

Returns a string representation of a string.

#### Returns

`string`

___

### toUpperCase

▸ **toUpperCase**(): `string`

Converts all the alphabetic characters in a string to uppercase.

#### Returns

`string`

___

### trim

▸ **trim**(): `string`

Removes the leading and trailing white space and line terminator characters from a string.

#### Returns

`string`

___

### trimEnd

▸ **trimEnd**(): `string`

Removes the trailing white space and line terminator characters from a string.

#### Returns

`string`

___

### trimLeft

▸ **trimLeft**(): `string`

Removes the leading white space and line terminator characters from a string.

#### Returns

`string`

___

### trimRight

▸ **trimRight**(): `string`

Removes the trailing white space and line terminator characters from a string.

#### Returns

`string`

___

### trimStart

▸ **trimStart**(): `string`

Removes the leading white space and line terminator characters from a string.

#### Returns

`string`

___

### valueOf

▸ **valueOf**(): `string`

Returns the primitive value of the specified object.

#### Returns

`string`
