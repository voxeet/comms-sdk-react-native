[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / %3Cinternal%3E

# Namespace: <internal\>

## Table of contents

### Enumerations

- [Codec](../enums/_internal_.Codec.md)
- [ConferencePermission](../enums/_internal_.ConferencePermission.md)
- [ConferenceStatus](../enums/_internal_.ConferenceStatus.md)
- [MediaStreamType](../enums/_internal_.MediaStreamType.md)
- [ParticipantStatus](../enums/_internal_.ParticipantStatus.md)
- [ParticipantType](../enums/_internal_.ParticipantType.md)
- [RTCPMode](../enums/_internal_.RTCPMode.md)
- [RTCStatsType](../enums/_internal_.RTCStatsType.md)

### Classes

- [CommandService](../classes/_internal_.CommandService.md)
- [ConferenceService](../classes/_internal_.ConferenceService.md)
- [FilePresentationService](../classes/_internal_.FilePresentationService.md)
- [NotificationService](../classes/_internal_.NotificationService.md)
- [RecordingService](../classes/_internal_.RecordingService.md)
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
- [ConferenceConstraints](../interfaces/_internal_.ConferenceConstraints.md)
- [ConferenceCreateOptions](../interfaces/_internal_.ConferenceCreateOptions.md)
- [ConferenceCreateParameters](../interfaces/_internal_.ConferenceCreateParameters.md)
- [ConferenceJoinOptions](../interfaces/_internal_.ConferenceJoinOptions.md)
- [ConferenceLeaveOptions](../interfaces/_internal_.ConferenceLeaveOptions.md)
- [ConferenceMixingOptions](../interfaces/_internal_.ConferenceMixingOptions.md)
- [ConferenceReplayOptions](../interfaces/_internal_.ConferenceReplayOptions.md)
- [ConferenceStatusUpdatedEventType](../interfaces/_internal_.ConferenceStatusUpdatedEventType.md)
- [File](../interfaces/_internal_.File.md)
- [FileConverted](../interfaces/_internal_.FileConverted.md)
- [FilePresentation](../interfaces/_internal_.FilePresentation.md)
- [InvitationReceivedEventType](../interfaces/_internal_.InvitationReceivedEventType.md)
- [Iterable](../interfaces/_internal_.Iterable.md)
- [IterableIterator](../interfaces/_internal_.IterableIterator.md)
- [Iterator](../interfaces/_internal_.Iterator.md)
- [IteratorReturnResult](../interfaces/_internal_.IteratorReturnResult.md)
- [IteratorYieldResult](../interfaces/_internal_.IteratorYieldResult.md)
- [MessageReceivedEventType](../interfaces/_internal_.MessageReceivedEventType.md)
- [Participant](../interfaces/_internal_.Participant.md)
- [ParticipantAddedEventType](../interfaces/_internal_.ParticipantAddedEventType.md)
- [ParticipantInfo](../interfaces/_internal_.ParticipantInfo.md)
- [ParticipantInvited](../interfaces/_internal_.ParticipantInvited.md)
- [ParticipantPermissions](../interfaces/_internal_.ParticipantPermissions.md)
- [ParticipantRemovedEventType](../interfaces/_internal_.ParticipantRemovedEventType.md)
- [ParticipantUpdatedEventType](../interfaces/_internal_.ParticipantUpdatedEventType.md)
- [PermissionsUpdatedEventType](../interfaces/_internal_.PermissionsUpdatedEventType.md)
- [Promise](../interfaces/_internal_.Promise.md)
- [PromiseConstructor](../interfaces/_internal_.PromiseConstructor.md)
- [PromiseFulfilledResult](../interfaces/_internal_.PromiseFulfilledResult.md)
- [PromiseLike](../interfaces/_internal_.PromiseLike.md)
- [PromiseRejectedResult](../interfaces/_internal_.PromiseRejectedResult.md)
- [ReadonlyArray](../interfaces/_internal_.ReadonlyArray.md)
- [Recording](../interfaces/_internal_.Recording.md)
- [RegExp](../interfaces/_internal_.RegExp.md)
- [RegExpConstructor](../interfaces/_internal_.RegExpConstructor.md)
- [RegExpExecArray](../interfaces/_internal_.RegExpExecArray.md)
- [RegExpMatchArray](../interfaces/_internal_.RegExpMatchArray.md)
- [RelativeIndexable](../interfaces/_internal_.RelativeIndexable.md)
- [StreamAddedEventType](../interfaces/_internal_.StreamAddedEventType.md)
- [StreamRemovedEventType](../interfaces/_internal_.StreamRemovedEventType.md)
- [StreamUpdatedEventType](../interfaces/_internal_.StreamUpdatedEventType.md)
- [String](../interfaces/_internal_.String.md)
- [StringConstructor](../interfaces/_internal_.StringConstructor.md)
- [User](../interfaces/_internal_.User.md)

### Type aliases

- [FlatArray](_internal_.md#flatarray)
- [IteratorResult](_internal_.md#iteratorresult)
- [PromiseSettledResult](_internal_.md#promisesettledresult)
- [RefreshAccessTokenInBackgroundType](_internal_.md#refreshaccesstokeninbackgroundtype)
- [RefreshAccessTokenType](_internal_.md#refreshaccesstokentype)
- [UnsubscribeFunction](_internal_.md#unsubscribefunction)

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

Ƭ **RefreshAccessTokenType**: () => [`Promise`](_internal_.md#promise)<`string`\>

#### Type declaration

▸ (): [`Promise`](_internal_.md#promise)<`string`\>

##### Returns

[`Promise`](_internal_.md#promise)<`string`\>

___

### UnsubscribeFunction

Ƭ **UnsubscribeFunction**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

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
