[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [view/VideoView](../modules/view_VideoView.md) / default

# Class: default

[view/VideoView](../modules/view_VideoView.md).default

Composes `View`.

- isMirror: boolean
- scaleType: 'fit' | 'fill'

Public methods :

attach(participant: Participant, mediaStream: MediaStream): Promise<void>
unattach(): Promise<void>
isAttached(): Promise<boolean>
isScreenShare(): Promise<boolean>

## Hierarchy

- `Component`<[`Props`](../interfaces/view_VideoView.Props.md), [`State`](../interfaces/view_VideoView.State.md)\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](view_VideoView.default.md#constructor)

### Properties

- [\_UiManager](view_VideoView.default.md#_uimanager)
- [\_requestMap](view_VideoView.default.md#_requestmap)
- [\_videoView](view_VideoView.default.md#_videoview)
- [\_videoViewHandler](view_VideoView.default.md#_videoviewhandler)
- [context](view_VideoView.default.md#context)
- [onEventUnregister](view_VideoView.default.md#oneventunregister)
- [props](view_VideoView.default.md#props)
- [refs](view_VideoView.default.md#refs)
- [state](view_VideoView.default.md#state)
- [\_nextRequestId](view_VideoView.default.md#_nextrequestid)
- [contextType](view_VideoView.default.md#contexttype)
- [defaultProps](view_VideoView.default.md#defaultprops)

### Methods

- [UNSAFE\_componentWillMount](view_VideoView.default.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](view_VideoView.default.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](view_VideoView.default.md#unsafe_componentwillupdate)
- [\_onCallReturn](view_VideoView.default.md#_oncallreturn)
- [\_onEvent](view_VideoView.default.md#_onevent)
- [\_sendCallReturn](view_VideoView.default.md#_sendcallreturn)
- [attach](view_VideoView.default.md#attach)
- [componentDidCatch](view_VideoView.default.md#componentdidcatch)
- [componentDidMount](view_VideoView.default.md#componentdidmount)
- [componentDidUpdate](view_VideoView.default.md#componentdidupdate)
- [componentWillMount](view_VideoView.default.md#componentwillmount)
- [componentWillReceiveProps](view_VideoView.default.md#componentwillreceiveprops)
- [componentWillUnmount](view_VideoView.default.md#componentwillunmount)
- [componentWillUpdate](view_VideoView.default.md#componentwillupdate)
- [filteredProps](view_VideoView.default.md#filteredprops)
- [forceUpdate](view_VideoView.default.md#forceupdate)
- [getSnapshotBeforeUpdate](view_VideoView.default.md#getsnapshotbeforeupdate)
- [isAttached](view_VideoView.default.md#isattached)
- [isScreenShare](view_VideoView.default.md#isscreenshare)
- [render](view_VideoView.default.md#render)
- [setState](view_VideoView.default.md#setstate)
- [setVideoView](view_VideoView.default.md#setvideoview)
- [shouldComponentUpdate](view_VideoView.default.md#shouldcomponentupdate)
- [unattach](view_VideoView.default.md#unattach)

## Constructors

### constructor

• **new default**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`Props`](../interfaces/view_VideoView.Props.md) |

#### Overrides

Component&lt;Props, State\&gt;.constructor

## Properties

### \_UiManager

• `Private` **\_UiManager**: `any`

___

### \_requestMap

• `Private` **\_requestMap**: `Map`<`number`, [`Holder`](../interfaces/view_VideoView.Holder.md)\>

___

### \_videoView

• `Private` **\_videoView**: ``null`` \| `Component`<`Object`, `Object`, `any`\>

___

### \_videoViewHandler

• `Private` **\_videoViewHandler**: ``null`` \| `number`

___

### context

• **context**: `any`

If using the new style context, re-declare this in your class to be the
`React.ContextType` of your `static contextType`.
Should be used with type annotation or static contextType.

```ts
static contextType = MyContext
// For TS pre-3.7:
context!: React.ContextType<typeof MyContext>
// For TS 3.7 and above:
declare context: React.ContextType<typeof MyContext>
```

**`see`** https://reactjs.org/docs/context.html

#### Inherited from

Component.context

___

### onEventUnregister

• `Private` `Optional` **onEventUnregister**: [`UnregisterCallback`](../interfaces/sdk_models_UnregisterCallback.UnregisterCallback.md)

___

### props

• `Readonly` **props**: `Readonly`<[`Props`](../interfaces/view_VideoView.Props.md)\> & `Readonly`<`Object`\>

#### Inherited from

Component.props

___

### refs

• **refs**: `Object`

**`deprecated`**
https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Index signature

▪ [key: `string`]: `ReactInstance`

#### Inherited from

Component.refs

___

### state

• **state**: [`State`](../interfaces/view_VideoView.State.md) = `{}`

#### Overrides

Component.state

___

### \_nextRequestId

▪ `Static` `Private` **\_nextRequestId**: `number` = `1`

___

### contextType

▪ `Static` `Optional` **contextType**: `Context`<`any`\>

If set, `this.context` will be set at runtime to the current value of the given Context.

Usage:

```ts
type MyContext = number
const Ctx = React.createContext<MyContext>(0)

class Foo extends React.Component {
  static contextType = Ctx
  context!: React.ContextType<typeof Ctx>
  render () {
    return <>My context's value: {this.context}</>;
  }
}
```

**`see`** https://reactjs.org/docs/context.html#classcontexttype

#### Inherited from

Component.contextType

___

### defaultProps

▪ `Static` **defaultProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `hasFlip` | `boolean` |
| `isAutoUnAttach` | `boolean` |
| `isCircle` | `boolean` |
| `isMirror` | `boolean` |
| `scaleType` | `string` |

## Methods

### UNSAFE\_componentWillMount

▸ `Optional` **UNSAFE_componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Returns

`void`

#### Inherited from

Component.UNSAFE\_componentWillMount

___

### UNSAFE\_componentWillReceiveProps

▸ `Optional` **UNSAFE_componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use static getDerivedStateFromProps instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<[`Props`](../interfaces/view_VideoView.Props.md)\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

Component.UNSAFE\_componentWillReceiveProps

___

### UNSAFE\_componentWillUpdate

▸ `Optional` **UNSAFE_componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<[`Props`](../interfaces/view_VideoView.Props.md)\> |
| `nextState` | `Readonly`<[`State`](../interfaces/view_VideoView.State.md)\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

Component.UNSAFE\_componentWillUpdate

___

### \_onCallReturn

▸ **_onCallReturn**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `any` |

#### Returns

`void`

___

### \_onEvent

▸ **_onEvent**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `VideoViewAsyncCallResult` |

#### Returns

`void`

___

### \_sendCallReturn

▸ **_sendCallReturn**(`command`, `param1?`, `param2?`): `Promise`<`VideoViewAsyncCallResult`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `command` | `any` |
| `param1?` | `any` |
| `param2?` | `any` |

#### Returns

`Promise`<`VideoViewAsyncCallResult`\>

___

### attach

▸ **attach**(`participant`, `mediaStream`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `participant` | [`default`](services_conference_models_Participant.default.md) |
| `mediaStream` | [`default`](../interfaces/services_conference_models_MediaStream.default.md) |

#### Returns

`Promise`<`void`\>

___

### componentDidCatch

▸ `Optional` **componentDidCatch**(`error`, `errorInfo`): `void`

Catches exceptions generated in descendant components. Unhandled exceptions will cause
the entire component tree to unmount.

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |
| `errorInfo` | `ErrorInfo` |

#### Returns

`void`

#### Inherited from

Component.componentDidCatch

___

### componentDidMount

▸ **componentDidMount**(): `void`

#### Returns

`void`

#### Overrides

Component.componentDidMount

___

### componentDidUpdate

▸ `Optional` **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`<[`Props`](../interfaces/view_VideoView.Props.md)\> |
| `prevState` | `Readonly`<[`State`](../interfaces/view_VideoView.State.md)\> |
| `snapshot?` | `any` |

#### Returns

`void`

#### Inherited from

Component.componentDidUpdate

___

### componentWillMount

▸ `Optional` **componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Returns

`void`

#### Inherited from

Component.componentWillMount

___

### componentWillReceiveProps

▸ `Optional` **componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use static getDerivedStateFromProps instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<[`Props`](../interfaces/view_VideoView.Props.md)\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

Component.componentWillReceiveProps

___

### componentWillUnmount

▸ **componentWillUnmount**(): `void`

#### Returns

`void`

#### Overrides

Component.componentWillUnmount

___

### componentWillUpdate

▸ `Optional` **componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<[`Props`](../interfaces/view_VideoView.Props.md)\> |
| `nextState` | `Readonly`<[`State`](../interfaces/view_VideoView.State.md)\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

Component.componentWillUpdate

___

### filteredProps

▸ **filteredProps**(): `any`

#### Returns

`any`

___

### forceUpdate

▸ **forceUpdate**(`callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

Component.forceUpdate

___

### getSnapshotBeforeUpdate

▸ `Optional` **getSnapshotBeforeUpdate**(`prevProps`, `prevState`): `any`

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`<[`Props`](../interfaces/view_VideoView.Props.md)\> |
| `prevState` | `Readonly`<[`State`](../interfaces/view_VideoView.State.md)\> |

#### Returns

`any`

#### Inherited from

Component.getSnapshotBeforeUpdate

___

### isAttached

▸ **isAttached**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

___

### isScreenShare

▸ **isScreenShare**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

Component.render

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends ``"mediaStream"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | ``null`` \| [`State`](../interfaces/view_VideoView.State.md) \| (`prevState`: `Readonly`<[`State`](../interfaces/view_VideoView.State.md)\>, `props`: `Readonly`<[`Props`](../interfaces/view_VideoView.Props.md)\>) => ``null`` \| [`State`](../interfaces/view_VideoView.State.md) \| `Pick`<[`State`](../interfaces/view_VideoView.State.md), `K`\> \| `Pick`<[`State`](../interfaces/view_VideoView.State.md), `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

Component.setState

___

### setVideoView

▸ `Private` **setVideoView**(`v`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `undefined` \| ``null`` \| `Component`<`Object`, `Object`, `any`\> |

#### Returns

`void`

___

### shouldComponentUpdate

▸ `Optional` **shouldComponentUpdate**(`nextProps`, `nextState`, `nextContext`): `boolean`

Called to determine whether the change in props and state should trigger a re-render.

`Component` always returns true.
`PureComponent` implements a shallow comparison on props and state and returns true if any
props or states have changed.

If false is returned, `Component#render`, `componentWillUpdate`
and `componentDidUpdate` will not be called.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<[`Props`](../interfaces/view_VideoView.Props.md)\> |
| `nextState` | `Readonly`<[`State`](../interfaces/view_VideoView.State.md)\> |
| `nextContext` | `any` |

#### Returns

`boolean`

#### Inherited from

Component.shouldComponentUpdate

___

### unattach

▸ **unattach**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>
