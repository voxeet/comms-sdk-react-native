[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / RegExpMatchArray

# Interface: RegExpMatchArray

[<internal>](../modules/_internal_.md).RegExpMatchArray

## Hierarchy

- [`Array`](../modules/_internal_.md#array)<`string`\>

  ↳ **`RegExpMatchArray`**

## Table of contents

### Properties

- [groups](_internal_.RegExpMatchArray.md#groups)
- [index](_internal_.RegExpMatchArray.md#index)
- [input](_internal_.RegExpMatchArray.md#input)
- [length](_internal_.RegExpMatchArray.md#length)

### Methods

- [%5Biterator%5D](_internal_.RegExpMatchArray.md#[iterator])
- [%5Bunscopables%5D](_internal_.RegExpMatchArray.md#[unscopables])
- [at](_internal_.RegExpMatchArray.md#at)
- [concat](_internal_.RegExpMatchArray.md#concat)
- [copyWithin](_internal_.RegExpMatchArray.md#copywithin)
- [entries](_internal_.RegExpMatchArray.md#entries)
- [every](_internal_.RegExpMatchArray.md#every)
- [fill](_internal_.RegExpMatchArray.md#fill)
- [filter](_internal_.RegExpMatchArray.md#filter)
- [find](_internal_.RegExpMatchArray.md#find)
- [findIndex](_internal_.RegExpMatchArray.md#findindex)
- [flat](_internal_.RegExpMatchArray.md#flat)
- [flatMap](_internal_.RegExpMatchArray.md#flatmap)
- [forEach](_internal_.RegExpMatchArray.md#foreach)
- [includes](_internal_.RegExpMatchArray.md#includes)
- [indexOf](_internal_.RegExpMatchArray.md#indexof)
- [join](_internal_.RegExpMatchArray.md#join)
- [keys](_internal_.RegExpMatchArray.md#keys)
- [lastIndexOf](_internal_.RegExpMatchArray.md#lastindexof)
- [map](_internal_.RegExpMatchArray.md#map)
- [pop](_internal_.RegExpMatchArray.md#pop)
- [push](_internal_.RegExpMatchArray.md#push)
- [reduce](_internal_.RegExpMatchArray.md#reduce)
- [reduceRight](_internal_.RegExpMatchArray.md#reduceright)
- [reverse](_internal_.RegExpMatchArray.md#reverse)
- [shift](_internal_.RegExpMatchArray.md#shift)
- [slice](_internal_.RegExpMatchArray.md#slice)
- [some](_internal_.RegExpMatchArray.md#some)
- [sort](_internal_.RegExpMatchArray.md#sort)
- [splice](_internal_.RegExpMatchArray.md#splice)
- [toLocaleString](_internal_.RegExpMatchArray.md#tolocalestring)
- [toString](_internal_.RegExpMatchArray.md#tostring)
- [unshift](_internal_.RegExpMatchArray.md#unshift)
- [values](_internal_.RegExpMatchArray.md#values)

## Properties

### groups

• `Optional` **groups**: `Object`

#### Index signature

▪ [key: `string`]: `string`

___

### index

• `Optional` **index**: `number`

___

### input

• `Optional` **input**: `string`

___

### length

• **length**: `number`

Gets or sets the length of the array. This is a number one higher than the highest index in the array.

#### Inherited from

Array.length

## Methods

### [iterator]

▸ **[iterator]**(): [`IterableIterator`](_internal_.IterableIterator.md)<`string`\>

Iterator

#### Returns

[`IterableIterator`](_internal_.IterableIterator.md)<`string`\>

#### Inherited from

Array.\_\_@iterator@127

___

### [unscopables]

▸ **[unscopables]**(): `Object`

Returns an object whose properties have the value 'true'
when they will be absent when used in a 'with' statement.

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `copyWithin` | `boolean` |
| `entries` | `boolean` |
| `fill` | `boolean` |
| `find` | `boolean` |
| `findIndex` | `boolean` |
| `keys` | `boolean` |
| `values` | `boolean` |

#### Inherited from

Array.\_\_@unscopables@129

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

Array.at

___

### concat

▸ **concat**(...`items`): `string`[]

Combines two or more arrays.
This method returns a new array without modifying any existing arrays.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...items` | [`ConcatArray`](_internal_.ConcatArray.md)<`string`\>[] | Additional arrays and/or items to add to the end of the array. |

#### Returns

`string`[]

#### Inherited from

Array.concat

▸ **concat**(...`items`): `string`[]

Combines two or more arrays.
This method returns a new array without modifying any existing arrays.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...items` | (`string` \| [`ConcatArray`](_internal_.ConcatArray.md)<`string`\>)[] | Additional arrays and/or items to add to the end of the array. |

#### Returns

`string`[]

#### Inherited from

Array.concat

___

### copyWithin

▸ **copyWithin**(`target`, `start`, `end?`): [`RegExpMatchArray`](_internal_.RegExpMatchArray.md)

Returns the this object after copying a section of the array identified by start and end
to the same array starting at position target

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `number` | If target is negative, it is treated as length+target where length is the length of the array. |
| `start` | `number` | If start is negative, it is treated as length+start. If end is negative, it is treated as length+end. |
| `end?` | `number` | If not specified, length of the this object is used as its default value. |

#### Returns

[`RegExpMatchArray`](_internal_.RegExpMatchArray.md)

#### Inherited from

Array.copyWithin

___

### entries

▸ **entries**(): [`IterableIterator`](_internal_.IterableIterator.md)<[`number`, `string`]\>

Returns an iterable of key, value pairs for every entry in the array

#### Returns

[`IterableIterator`](_internal_.IterableIterator.md)<[`number`, `string`]\>

#### Inherited from

Array.entries

___

### every

▸ **every**<`S`\>(`predicate`, `thisArg?`): this is S[]

Determines whether all the members of an array satisfy the specified test.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`: `string`, `index`: `number`, `array`: `string`[]) => value is S | A function that accepts up to three arguments. The every method calls the predicate function for each element in the array until the predicate returns a value which is coercible to the Boolean value false, or until the end of the array. |
| `thisArg?` | `any` | An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value. |

#### Returns

this is S[]

#### Inherited from

Array.every

▸ **every**(`predicate`, `thisArg?`): `boolean`

Determines whether all the members of an array satisfy the specified test.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`: `string`, `index`: `number`, `array`: `string`[]) => `unknown` | A function that accepts up to three arguments. The every method calls the predicate function for each element in the array until the predicate returns a value which is coercible to the Boolean value false, or until the end of the array. |
| `thisArg?` | `any` | An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value. |

#### Returns

`boolean`

#### Inherited from

Array.every

___

### fill

▸ **fill**(`value`, `start?`, `end?`): [`RegExpMatchArray`](_internal_.RegExpMatchArray.md)

Changes all array elements from `start` to `end` index to a static `value` and returns the modified array

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | value to fill array section with |
| `start?` | `number` | index to start filling the array at. If start is negative, it is treated as length+start where length is the length of the array. |
| `end?` | `number` | index to stop filling the array at. If end is negative, it is treated as length+end. |

#### Returns

[`RegExpMatchArray`](_internal_.RegExpMatchArray.md)

#### Inherited from

Array.fill

___

### filter

▸ **filter**<`S`\>(`predicate`, `thisArg?`): `S`[]

Returns the elements of an array that meet the condition specified in a callback function.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`: `string`, `index`: `number`, `array`: `string`[]) => value is S | A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array. |
| `thisArg?` | `any` | An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value. |

#### Returns

`S`[]

#### Inherited from

Array.filter

▸ **filter**(`predicate`, `thisArg?`): `string`[]

Returns the elements of an array that meet the condition specified in a callback function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`: `string`, `index`: `number`, `array`: `string`[]) => `unknown` | A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array. |
| `thisArg?` | `any` | An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value. |

#### Returns

`string`[]

#### Inherited from

Array.filter

___

### find

▸ **find**<`S`\>(`predicate`, `thisArg?`): `undefined` \| `S`

Returns the value of the first element in the array where predicate is true, and undefined
otherwise.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`: `string`, `index`: `number`, `obj`: `string`[]) => value is S | find calls predicate once for each element of the array, in ascending order, until it finds one where predicate returns true. If such an element is found, find immediately returns that element value. Otherwise, find returns undefined. |
| `thisArg?` | `any` | If provided, it will be used as the this value for each invocation of predicate. If it is not provided, undefined is used instead. |

#### Returns

`undefined` \| `S`

#### Inherited from

Array.find

▸ **find**(`predicate`, `thisArg?`): `undefined` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `string`, `index`: `number`, `obj`: `string`[]) => `unknown` |
| `thisArg?` | `any` |

#### Returns

`undefined` \| `string`

#### Inherited from

Array.find

___

### findIndex

▸ **findIndex**(`predicate`, `thisArg?`): `number`

Returns the index of the first element in the array where predicate is true, and -1
otherwise.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`: `string`, `index`: `number`, `obj`: `string`[]) => `unknown` | find calls predicate once for each element of the array, in ascending order, until it finds one where predicate returns true. If such an element is found, findIndex immediately returns that element index. Otherwise, findIndex returns -1. |
| `thisArg?` | `any` | If provided, it will be used as the this value for each invocation of predicate. If it is not provided, undefined is used instead. |

#### Returns

`number`

#### Inherited from

Array.findIndex

___

### flat

▸ **flat**<`A`, `D`\>(`depth?`): [`FlatArray`](../modules/_internal_.md#flatarray)<`A`, `D`\>[]

Returns a new array with all sub-array elements concatenated into it recursively up to the
specified depth.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `A` |
| `D` | extends `number```1`` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `depth?` | `D` | The maximum recursion depth |

#### Returns

[`FlatArray`](../modules/_internal_.md#flatarray)<`A`, `D`\>[]

#### Inherited from

Array.flat

___

### flatMap

▸ **flatMap**<`U`, `This`\>(`callback`, `thisArg?`): `U`[]

Calls a defined callback function on each element of an array. Then, flattens the result into
a new array.
This is identical to a map followed by flat with depth 1.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `U` | `U` |
| `This` | `undefined` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`value`: `string`, `index`: `number`, `array`: `string`[]) => `U` \| readonly `U`[] | A function that accepts up to three arguments. The flatMap method calls the callback function one time for each element in the array. |
| `thisArg?` | `This` | An object to which the this keyword can refer in the callback function. If thisArg is omitted, undefined is used as the this value. |

#### Returns

`U`[]

#### Inherited from

Array.flatMap

___

### forEach

▸ **forEach**(`callbackfn`, `thisArg?`): `void`

Performs the specified action for each element in an array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`value`: `string`, `index`: `number`, `array`: `string`[]) => `void` | A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array. |
| `thisArg?` | `any` | An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value. |

#### Returns

`void`

#### Inherited from

Array.forEach

___

### includes

▸ **includes**(`searchElement`, `fromIndex?`): `boolean`

Determines whether an array includes a certain element, returning true or false as appropriate.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchElement` | `string` | The element to search for. |
| `fromIndex?` | `number` | The position in this array at which to begin searching for searchElement. |

#### Returns

`boolean`

#### Inherited from

Array.includes

___

### indexOf

▸ **indexOf**(`searchElement`, `fromIndex?`): `number`

Returns the index of the first occurrence of a value in an array, or -1 if it is not present.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchElement` | `string` | The value to locate in the array. |
| `fromIndex?` | `number` | The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0. |

#### Returns

`number`

#### Inherited from

Array.indexOf

___

### join

▸ **join**(`separator?`): `string`

Adds all the elements of an array into a string, separated by the specified separator string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `separator?` | `string` | A string used to separate one element of the array from the next in the resulting string. If omitted, the array elements are separated with a comma. |

#### Returns

`string`

#### Inherited from

Array.join

___

### keys

▸ **keys**(): [`IterableIterator`](_internal_.IterableIterator.md)<`number`\>

Returns an iterable of keys in the array

#### Returns

[`IterableIterator`](_internal_.IterableIterator.md)<`number`\>

#### Inherited from

Array.keys

___

### lastIndexOf

▸ **lastIndexOf**(`searchElement`, `fromIndex?`): `number`

Returns the index of the last occurrence of a specified value in an array, or -1 if it is not present.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchElement` | `string` | The value to locate in the array. |
| `fromIndex?` | `number` | The array index at which to begin searching backward. If fromIndex is omitted, the search starts at the last index in the array. |

#### Returns

`number`

#### Inherited from

Array.lastIndexOf

___

### map

▸ **map**<`U`\>(`callbackfn`, `thisArg?`): `U`[]

Calls a defined callback function on each element of an array, and returns an array that contains the results.

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`value`: `string`, `index`: `number`, `array`: `string`[]) => `U` | A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array. |
| `thisArg?` | `any` | An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value. |

#### Returns

`U`[]

#### Inherited from

Array.map

___

### pop

▸ **pop**(): `undefined` \| `string`

Removes the last element from an array and returns it.
If the array is empty, undefined is returned and the array is not modified.

#### Returns

`undefined` \| `string`

#### Inherited from

Array.pop

___

### push

▸ **push**(...`items`): `number`

Appends new elements to the end of an array, and returns the new length of the array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...items` | `string`[] | New elements to add to the array. |

#### Returns

`number`

#### Inherited from

Array.push

___

### reduce

▸ **reduce**(`callbackfn`): `string`

Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`previousValue`: `string`, `currentValue`: `string`, `currentIndex`: `number`, `array`: `string`[]) => `string` | A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array. |

#### Returns

`string`

#### Inherited from

Array.reduce

▸ **reduce**(`callbackfn`, `initialValue`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callbackfn` | (`previousValue`: `string`, `currentValue`: `string`, `currentIndex`: `number`, `array`: `string`[]) => `string` |
| `initialValue` | `string` |

#### Returns

`string`

#### Inherited from

Array.reduce

▸ **reduce**<`U`\>(`callbackfn`, `initialValue`): `U`

Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`previousValue`: `U`, `currentValue`: `string`, `currentIndex`: `number`, `array`: `string`[]) => `U` | A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array. |
| `initialValue` | `U` | If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value. |

#### Returns

`U`

#### Inherited from

Array.reduce

___

### reduceRight

▸ **reduceRight**(`callbackfn`): `string`

Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`previousValue`: `string`, `currentValue`: `string`, `currentIndex`: `number`, `array`: `string`[]) => `string` | A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array. |

#### Returns

`string`

#### Inherited from

Array.reduceRight

▸ **reduceRight**(`callbackfn`, `initialValue`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callbackfn` | (`previousValue`: `string`, `currentValue`: `string`, `currentIndex`: `number`, `array`: `string`[]) => `string` |
| `initialValue` | `string` |

#### Returns

`string`

#### Inherited from

Array.reduceRight

▸ **reduceRight**<`U`\>(`callbackfn`, `initialValue`): `U`

Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`previousValue`: `U`, `currentValue`: `string`, `currentIndex`: `number`, `array`: `string`[]) => `U` | A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array. |
| `initialValue` | `U` | If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value. |

#### Returns

`U`

#### Inherited from

Array.reduceRight

___

### reverse

▸ **reverse**(): `string`[]

Reverses the elements in an array in place.
This method mutates the array and returns a reference to the same array.

#### Returns

`string`[]

#### Inherited from

Array.reverse

___

### shift

▸ **shift**(): `undefined` \| `string`

Removes the first element from an array and returns it.
If the array is empty, undefined is returned and the array is not modified.

#### Returns

`undefined` \| `string`

#### Inherited from

Array.shift

___

### slice

▸ **slice**(`start?`, `end?`): `string`[]

Returns a copy of a section of an array.
For both start and end, a negative index can be used to indicate an offset from the end of the array.
For example, -2 refers to the second to last element of the array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start?` | `number` | The beginning index of the specified portion of the array. If start is undefined, then the slice begins at index 0. |
| `end?` | `number` | The end index of the specified portion of the array. This is exclusive of the element at the index 'end'. If end is undefined, then the slice extends to the end of the array. |

#### Returns

`string`[]

#### Inherited from

Array.slice

___

### some

▸ **some**(`predicate`, `thisArg?`): `boolean`

Determines whether the specified callback function returns true for any element of an array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`value`: `string`, `index`: `number`, `array`: `string`[]) => `unknown` | A function that accepts up to three arguments. The some method calls the predicate function for each element in the array until the predicate returns a value which is coercible to the Boolean value true, or until the end of the array. |
| `thisArg?` | `any` | An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value. |

#### Returns

`boolean`

#### Inherited from

Array.some

___

### sort

▸ **sort**(`compareFn?`): [`RegExpMatchArray`](_internal_.RegExpMatchArray.md)

Sorts an array in place.
This method mutates the array and returns a reference to the same array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `compareFn?` | (`a`: `string`, `b`: `string`) => `number` | Function used to determine the order of the elements. It is expected to return a negative value if first argument is less than second argument, zero if they're equal and a positive value otherwise. If omitted, the elements are sorted in ascending, ASCII character order. ```ts [11,2,22,1].sort((a, b) => a - b) ``` |

#### Returns

[`RegExpMatchArray`](_internal_.RegExpMatchArray.md)

#### Inherited from

Array.sort

___

### splice

▸ **splice**(`start`, `deleteCount?`): `string`[]

Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | `number` | The zero-based location in the array from which to start removing elements. |
| `deleteCount?` | `number` | The number of elements to remove. |

#### Returns

`string`[]

An array containing the elements that were deleted.

#### Inherited from

Array.splice

▸ **splice**(`start`, `deleteCount`, ...`items`): `string`[]

Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | `number` | The zero-based location in the array from which to start removing elements. |
| `deleteCount` | `number` | The number of elements to remove. |
| `...items` | `string`[] | Elements to insert into the array in place of the deleted elements. |

#### Returns

`string`[]

An array containing the elements that were deleted.

#### Inherited from

Array.splice

___

### toLocaleString

▸ **toLocaleString**(): `string`

Returns a string representation of an array. The elements are converted to string using their toLocaleString methods.

#### Returns

`string`

#### Inherited from

Array.toLocaleString

___

### toString

▸ **toString**(): `string`

Returns a string representation of an array.

#### Returns

`string`

#### Inherited from

Array.toString

___

### unshift

▸ **unshift**(...`items`): `number`

Inserts new elements at the start of an array, and returns the new length of the array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...items` | `string`[] | Elements to insert at the start of the array. |

#### Returns

`number`

#### Inherited from

Array.unshift

___

### values

▸ **values**(): [`IterableIterator`](_internal_.IterableIterator.md)<`string`\>

Returns an iterable of values in the array

#### Returns

[`IterableIterator`](_internal_.IterableIterator.md)<`string`\>

#### Inherited from

Array.values
