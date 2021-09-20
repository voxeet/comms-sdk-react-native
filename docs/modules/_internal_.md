[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / %3Cinternal%3E

# Namespace: <internal\>

## Table of contents

### Enumerations

- [AudioProcessing](../enums/_internal_.AudioProcessing.md)
- [Codec](../enums/_internal_.Codec.md)
- [ConferencePermission](../enums/_internal_.ConferencePermission.md)
- [ConferenceStatus](../enums/_internal_.ConferenceStatus.md)
- [Mode](../enums/_internal_.Mode.md)
- [RTCPMode](../enums/_internal_.RTCPMode.md)
- [UserType](../enums/_internal_.UserType.md)

### Classes

- [ConferenceService](../classes/_internal_.ConferenceService.md)
- [SessionService](../classes/_internal_.SessionService.md)

### Interfaces

- [Array](../interfaces/_internal_.Array.md)
- [ArrayConstructor](../interfaces/_internal_.ArrayConstructor.md)
- [ArrayLike](../interfaces/_internal_.ArrayLike.md)
- [AudioProcessingOptions](../interfaces/_internal_.AudioProcessingOptions.md)
- [AudioProcessingSenderOptions](../interfaces/_internal_.AudioProcessingSenderOptions.md)
- [CollatorOptions](../interfaces/_internal_.CollatorOptions.md)
- [ConcatArray](../interfaces/_internal_.ConcatArray.md)
- [Conference](../interfaces/_internal_.Conference.md)
- [ConferenceCreateOptions](../interfaces/_internal_.ConferenceCreateOptions.md)
- [ConferenceCreateParameters](../interfaces/_internal_.ConferenceCreateParameters.md)
- [ConferenceJoinOptions](../interfaces/_internal_.ConferenceJoinOptions.md)
- [ConferenceLeaveOptions](../interfaces/_internal_.ConferenceLeaveOptions.md)
- [ConferenceMixingOptions](../interfaces/_internal_.ConferenceMixingOptions.md)
- [ConferenceReplayOptions](../interfaces/_internal_.ConferenceReplayOptions.md)
- [Iterable](../interfaces/_internal_.Iterable.md)
- [IterableIterator](../interfaces/_internal_.IterableIterator.md)
- [Iterator](../interfaces/_internal_.Iterator.md)
- [IteratorReturnResult](../interfaces/_internal_.IteratorReturnResult.md)
- [IteratorYieldResult](../interfaces/_internal_.IteratorYieldResult.md)
- [JoinUserInfo](../interfaces/_internal_.JoinUserInfo.md)
- [Participant](../interfaces/_internal_.Participant.md)
- [ParticipantInfo](../interfaces/_internal_.ParticipantInfo.md)
- [ParticipantPermissions](../interfaces/_internal_.ParticipantPermissions.md)
- [Promise](../interfaces/_internal_.Promise.md)
- [PromiseConstructor](../interfaces/_internal_.PromiseConstructor.md)
- [PromiseFulfilledResult](../interfaces/_internal_.PromiseFulfilledResult.md)
- [PromiseLike](../interfaces/_internal_.PromiseLike.md)
- [PromiseRejectedResult](../interfaces/_internal_.PromiseRejectedResult.md)
- [ReadonlyArray](../interfaces/_internal_.ReadonlyArray.md)
- [RegExp](../interfaces/_internal_.RegExp.md)
- [RegExpConstructor](../interfaces/_internal_.RegExpConstructor.md)
- [RegExpExecArray](../interfaces/_internal_.RegExpExecArray.md)
- [RegExpMatchArray](../interfaces/_internal_.RegExpMatchArray.md)
- [RelativeIndexable](../interfaces/_internal_.RelativeIndexable.md)
- [String](../interfaces/_internal_.String.md)
- [StringConstructor](../interfaces/_internal_.StringConstructor.md)

### Type aliases

- [FlatArray](_internal_.md#flatarray)
- [IteratorResult](_internal_.md#iteratorresult)
- [PromiseSettledResult](_internal_.md#promisesettledresult)
- [RefreshAccessTokenInBackgroundType](_internal_.md#refreshaccesstokeninbackgroundtype)
- [RefreshAccessTokenType](_internal_.md#refreshaccesstokentype)

### Variables

- [Array](_internal_.md#array)
- [Promise](_internal_.md#promise)
- [RegExp](_internal_.md#regexp)
- [String](_internal_.md#string)

## Type aliases

### FlatArray

Ƭ **FlatArray**<`Arr`, `Depth`\>: { `done`: `Arr` ; `recur`: `Arr` extends [`ReadonlyArray`](../interfaces/_internal_.ReadonlyArray.md)<infer InnerArr\> ? [`FlatArray`](_internal_.md#flatarray)<`InnerArr`, [``-1``, ``0``, ``1``, ``2``, ``3``, ``4``, ``5``, ``6``, ``7``, ``8``, ``9``, ``10``, ``11``, ``12``, ``13``, ``14``, ``15``, ``16``, ``17``, ``18``, ``19``, ``20``][`Depth`]\> : `Arr`  }[`Depth` extends ``-1`` ? ``"done"`` : ``"recur"``]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Arr` | `Arr` |
| `Depth` | extends `number` |

___

### IteratorResult

Ƭ **IteratorResult**<`T`, `TReturn`\>: [`IteratorYieldResult`](../interfaces/_internal_.IteratorYieldResult.md)<`T`\> \| [`IteratorReturnResult`](../interfaces/_internal_.IteratorReturnResult.md)<`TReturn`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `TReturn` | `any` |

___

### PromiseSettledResult

Ƭ **PromiseSettledResult**<`T`\>: [`PromiseFulfilledResult`](../interfaces/_internal_.PromiseFulfilledResult.md)<`T`\> \| [`PromiseRejectedResult`](../interfaces/_internal_.PromiseRejectedResult.md)

#### Type parameters

| Name |
| :------ |
| `T` |

___

### RefreshAccessTokenInBackgroundType

Ƭ **RefreshAccessTokenInBackgroundType**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

___

### RefreshAccessTokenType

Ƭ **RefreshAccessTokenType**: () => `string`

#### Type declaration

▸ (): `string`

##### Returns

`string`

## Variables

### Array

• **Array**: [`ArrayConstructor`](../interfaces/_internal_.ArrayConstructor.md)

___

### Promise

• **Promise**: [`PromiseConstructor`](../interfaces/_internal_.PromiseConstructor.md)

___

### RegExp

• **RegExp**: [`RegExpConstructor`](../interfaces/_internal_.RegExpConstructor.md)

___

### String

• **String**: [`StringConstructor`](../interfaces/_internal_.StringConstructor.md)

Allows manipulation and formatting of text strings and determination and location of substrings within strings.
