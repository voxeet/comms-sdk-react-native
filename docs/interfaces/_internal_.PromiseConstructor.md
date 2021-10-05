[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / PromiseConstructor

# Interface: PromiseConstructor

[<internal>](../modules/_internal_.md).PromiseConstructor

## Table of contents

### Constructors

- [constructor](_internal_.PromiseConstructor.md#constructor)

### Properties

- [%5Bspecies%5D](_internal_.PromiseConstructor.md#[species])
- [prototype](_internal_.PromiseConstructor.md#prototype)

### Methods

- [all](_internal_.PromiseConstructor.md#all)
- [allSettled](_internal_.PromiseConstructor.md#allsettled)
- [any](_internal_.PromiseConstructor.md#any)
- [race](_internal_.PromiseConstructor.md#race)
- [reject](_internal_.PromiseConstructor.md#reject)
- [resolve](_internal_.PromiseConstructor.md#resolve)

## Constructors

### constructor

• **new PromiseConstructor**<`T`\>(`executor`)

Creates a new Promise.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `executor` | (`resolve`: (`value`: `T` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T`\>) => `void`, `reject`: (`reason?`: `any`) => `void`) => `void` | A callback used to initialize the promise. This callback is passed two arguments: a resolve callback used to resolve the promise with a value or the result of another promise, and a reject callback used to reject the promise with a provided reason or error. |

## Properties

### [species]

• `Readonly` **[species]**: [`PromiseConstructor`](_internal_.PromiseConstructor.md)

___

### prototype

• `Readonly` **prototype**: [`Promise`](../modules/_internal_.md#promise)<`any`\>

A reference to the prototype.

## Methods

### all

▸ **all**<`T`\>(`values`): [`Promise`](../modules/_internal_.md#promise)<`T`[]\>

Creates a Promise that is resolved with an array of results when all of the provided Promises
resolve, or rejected when any Promise is rejected.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | [`Iterable`](_internal_.Iterable.md)<`T` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T`\>\> | An iterable of Promises. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`T`[]\>

A new Promise.

▸ **all**<`T1`, `T2`, `T3`, `T4`, `T5`, `T6`, `T7`, `T8`, `T9`, `T10`\>(`values`): [`Promise`](../modules/_internal_.md#promise)<[`T1`, `T2`, `T3`, `T4`, `T5`, `T6`, `T7`, `T8`, `T9`, `T10`]\>

Creates a Promise that is resolved with an array of results when all of the provided Promises
resolve, or rejected when any Promise is rejected.

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |
| `T3` |
| `T4` |
| `T5` |
| `T6` |
| `T7` |
| `T8` |
| `T9` |
| `T10` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | readonly [`T1` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T1`\>, `T2` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T2`\>, `T3` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T3`\>, `T4` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T4`\>, `T5` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T5`\>, `T6` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T6`\>, `T7` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T7`\>, `T8` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T8`\>, `T9` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T9`\>, `T10` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T10`\>] | An array of Promises. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`T1`, `T2`, `T3`, `T4`, `T5`, `T6`, `T7`, `T8`, `T9`, `T10`]\>

A new Promise.

▸ **all**<`T1`, `T2`, `T3`, `T4`, `T5`, `T6`, `T7`, `T8`, `T9`\>(`values`): [`Promise`](../modules/_internal_.md#promise)<[`T1`, `T2`, `T3`, `T4`, `T5`, `T6`, `T7`, `T8`, `T9`]\>

Creates a Promise that is resolved with an array of results when all of the provided Promises
resolve, or rejected when any Promise is rejected.

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |
| `T3` |
| `T4` |
| `T5` |
| `T6` |
| `T7` |
| `T8` |
| `T9` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | readonly [`T1` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T1`\>, `T2` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T2`\>, `T3` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T3`\>, `T4` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T4`\>, `T5` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T5`\>, `T6` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T6`\>, `T7` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T7`\>, `T8` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T8`\>, `T9` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T9`\>] | An array of Promises. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`T1`, `T2`, `T3`, `T4`, `T5`, `T6`, `T7`, `T8`, `T9`]\>

A new Promise.

▸ **all**<`T1`, `T2`, `T3`, `T4`, `T5`, `T6`, `T7`, `T8`\>(`values`): [`Promise`](../modules/_internal_.md#promise)<[`T1`, `T2`, `T3`, `T4`, `T5`, `T6`, `T7`, `T8`]\>

Creates a Promise that is resolved with an array of results when all of the provided Promises
resolve, or rejected when any Promise is rejected.

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |
| `T3` |
| `T4` |
| `T5` |
| `T6` |
| `T7` |
| `T8` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | readonly [`T1` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T1`\>, `T2` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T2`\>, `T3` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T3`\>, `T4` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T4`\>, `T5` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T5`\>, `T6` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T6`\>, `T7` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T7`\>, `T8` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T8`\>] | An array of Promises. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`T1`, `T2`, `T3`, `T4`, `T5`, `T6`, `T7`, `T8`]\>

A new Promise.

▸ **all**<`T1`, `T2`, `T3`, `T4`, `T5`, `T6`, `T7`\>(`values`): [`Promise`](../modules/_internal_.md#promise)<[`T1`, `T2`, `T3`, `T4`, `T5`, `T6`, `T7`]\>

Creates a Promise that is resolved with an array of results when all of the provided Promises
resolve, or rejected when any Promise is rejected.

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |
| `T3` |
| `T4` |
| `T5` |
| `T6` |
| `T7` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | readonly [`T1` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T1`\>, `T2` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T2`\>, `T3` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T3`\>, `T4` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T4`\>, `T5` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T5`\>, `T6` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T6`\>, `T7` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T7`\>] | An array of Promises. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`T1`, `T2`, `T3`, `T4`, `T5`, `T6`, `T7`]\>

A new Promise.

▸ **all**<`T1`, `T2`, `T3`, `T4`, `T5`, `T6`\>(`values`): [`Promise`](../modules/_internal_.md#promise)<[`T1`, `T2`, `T3`, `T4`, `T5`, `T6`]\>

Creates a Promise that is resolved with an array of results when all of the provided Promises
resolve, or rejected when any Promise is rejected.

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |
| `T3` |
| `T4` |
| `T5` |
| `T6` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | readonly [`T1` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T1`\>, `T2` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T2`\>, `T3` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T3`\>, `T4` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T4`\>, `T5` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T5`\>, `T6` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T6`\>] | An array of Promises. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`T1`, `T2`, `T3`, `T4`, `T5`, `T6`]\>

A new Promise.

▸ **all**<`T1`, `T2`, `T3`, `T4`, `T5`\>(`values`): [`Promise`](../modules/_internal_.md#promise)<[`T1`, `T2`, `T3`, `T4`, `T5`]\>

Creates a Promise that is resolved with an array of results when all of the provided Promises
resolve, or rejected when any Promise is rejected.

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |
| `T3` |
| `T4` |
| `T5` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | readonly [`T1` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T1`\>, `T2` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T2`\>, `T3` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T3`\>, `T4` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T4`\>, `T5` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T5`\>] | An array of Promises. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`T1`, `T2`, `T3`, `T4`, `T5`]\>

A new Promise.

▸ **all**<`T1`, `T2`, `T3`, `T4`\>(`values`): [`Promise`](../modules/_internal_.md#promise)<[`T1`, `T2`, `T3`, `T4`]\>

Creates a Promise that is resolved with an array of results when all of the provided Promises
resolve, or rejected when any Promise is rejected.

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |
| `T3` |
| `T4` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | readonly [`T1` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T1`\>, `T2` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T2`\>, `T3` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T3`\>, `T4` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T4`\>] | An array of Promises. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`T1`, `T2`, `T3`, `T4`]\>

A new Promise.

▸ **all**<`T1`, `T2`, `T3`\>(`values`): [`Promise`](../modules/_internal_.md#promise)<[`T1`, `T2`, `T3`]\>

Creates a Promise that is resolved with an array of results when all of the provided Promises
resolve, or rejected when any Promise is rejected.

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |
| `T3` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | readonly [`T1` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T1`\>, `T2` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T2`\>, `T3` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T3`\>] | An array of Promises. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`T1`, `T2`, `T3`]\>

A new Promise.

▸ **all**<`T1`, `T2`\>(`values`): [`Promise`](../modules/_internal_.md#promise)<[`T1`, `T2`]\>

Creates a Promise that is resolved with an array of results when all of the provided Promises
resolve, or rejected when any Promise is rejected.

#### Type parameters

| Name |
| :------ |
| `T1` |
| `T2` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | readonly [`T1` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T1`\>, `T2` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T2`\>] | An array of Promises. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`T1`, `T2`]\>

A new Promise.

▸ **all**<`T`\>(`values`): [`Promise`](../modules/_internal_.md#promise)<`T`[]\>

Creates a Promise that is resolved with an array of results when all of the provided Promises
resolve, or rejected when any Promise is rejected.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | readonly (`T` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T`\>)[] | An array of Promises. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`T`[]\>

A new Promise.

___

### allSettled

▸ **allSettled**<`T`\>(`values`): [`Promise`](../modules/_internal_.md#promise)<{ -readonly [P in string \| number \| symbol]: PromiseSettledResult<T[P] extends PromiseLike<U\> ? U : T[P]\> }\>

Creates a Promise that is resolved with an array of results when all
of the provided Promises resolve or reject.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends readonly `unknown`[] \| readonly [`unknown`] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | `T` | An array of Promises. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<{ -readonly [P in string \| number \| symbol]: PromiseSettledResult<T[P] extends PromiseLike<U\> ? U : T[P]\> }\>

A new Promise.

▸ **allSettled**<`T`\>(`values`): [`Promise`](../modules/_internal_.md#promise)<[`PromiseSettledResult`](../modules/_internal_.md#promisesettledresult)<`T` extends [`PromiseLike`](_internal_.PromiseLike.md)<`U`\> ? `U` : `T`\>[]\>

Creates a Promise that is resolved with an array of results when all
of the provided Promises resolve or reject.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | [`Iterable`](_internal_.Iterable.md)<`T`\> | An array of Promises. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<[`PromiseSettledResult`](../modules/_internal_.md#promisesettledresult)<`T` extends [`PromiseLike`](_internal_.PromiseLike.md)<`U`\> ? `U` : `T`\>[]\>

A new Promise.

___

### any

▸ **any**<`T`\>(`values`): [`Promise`](../modules/_internal_.md#promise)<`T`\>

The any function returns a promise that is fulfilled by the first given promise to be fulfilled, or rejected with an AggregateError containing an array of rejection reasons if all of the given promises are rejected. It resolves all elements of the passed iterable to promises as it runs this algorithm.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | (`T` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T`\>)[] \| [`Iterable`](_internal_.Iterable.md)<`T` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T`\>\> | An array or iterable of Promises. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`T`\>

A new Promise.

___

### race

▸ **race**<`T`\>(`values`): [`Promise`](../modules/_internal_.md#promise)<`T` extends [`PromiseLike`](_internal_.PromiseLike.md)<`U`\> ? `U` : `T`\>

Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
or rejected.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | [`Iterable`](_internal_.Iterable.md)<`T`\> | An iterable of Promises. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`T` extends [`PromiseLike`](_internal_.PromiseLike.md)<`U`\> ? `U` : `T`\>

A new Promise.

▸ **race**<`T`\>(`values`): [`Promise`](../modules/_internal_.md#promise)<`T`\>

Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
or rejected.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | [`Iterable`](_internal_.Iterable.md)<`T` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T`\>\> | An iterable of Promises. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`T`\>

A new Promise.

▸ **race**<`T`\>(`values`): [`Promise`](../modules/_internal_.md#promise)<`T` extends [`PromiseLike`](_internal_.PromiseLike.md)<`U`\> ? `U` : `T`\>

Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
or rejected.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | readonly `T`[] | An array of Promises. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`T` extends [`PromiseLike`](_internal_.PromiseLike.md)<`U`\> ? `U` : `T`\>

A new Promise.

___

### reject

▸ **reject**<`T`\>(`reason?`): [`Promise`](../modules/_internal_.md#promise)<`T`\>

Creates a new rejected promise for the provided reason.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `never` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reason?` | `any` | The reason the promise was rejected. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`T`\>

A new rejected Promise.

___

### resolve

▸ **resolve**(): [`Promise`](../modules/_internal_.md#promise)<`void`\>

Creates a new resolved promise.

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`void`\>

A resolved promise.

▸ **resolve**<`T`\>(`value`): [`Promise`](../modules/_internal_.md#promise)<`T`\>

Creates a new resolved promise for the provided value.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` \| [`PromiseLike`](_internal_.PromiseLike.md)<`T`\> | A promise. |

#### Returns

[`Promise`](../modules/_internal_.md#promise)<`T`\>

A promise whose internal state matches the provided promise.
