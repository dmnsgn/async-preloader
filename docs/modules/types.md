[async-preloader](../README.md) / [Modules](../modules.md) / types

# Module: types

## Table of contents

### Enumerations

- [LoaderKey](../enums/types.LoaderKey.md)

### Interfaces

- [FontOptions](../interfaces/types.FontOptions.md)
- [LoadItem](../interfaces/types.LoadItem.md)
- [LoaderValue](../interfaces/types.LoaderValue.md)

### Type aliases

- [BodyMethod](types.md#bodymethod)
- [BodyResolveValue](types.md#bodyresolvevalue)
- [LoadedValue](types.md#loadedvalue)
- [LoadedXMLValue](types.md#loadedxmlvalue)

## Type aliases

### BodyMethod

Ƭ **BodyMethod**: ``"arrayBuffer"`` \| ``"blob"`` \| ``"formData"`` \| ``"json"`` \| ``"text"``

Methods that can be called on a Request (object returned by fetch and that implements the [Body](https://developer.mozilla.org/en-US/docs/Web/API/Response/body) interface)

#### Defined in

[types.ts:4](https://github.com/dmnsgn/async-preloader/blob/6703830/src/types.ts#L4)

___

### BodyResolveValue

Ƭ **BodyResolveValue**: `ArrayBuffer` \| `Blob` \| `FormData` \| `JSON` \| `string`

Types that can be returned by all the [BodyMethod](types.md#bodymethod)

#### Defined in

[types.ts:9](https://github.com/dmnsgn/async-preloader/blob/6703830/src/types.ts#L9)

___

### LoadedValue

Ƭ **LoadedValue**: [`BodyResolveValue`](types.md#bodyresolvevalue) \| `HTMLImageElement` \| `HTMLVideoElement` \| `HTMLAudioElement` \| [`LoadedXMLValue`](types.md#loadedxmlvalue)

Types that can be returned by all the loaders.

#### Defined in

[types.ts:19](https://github.com/dmnsgn/async-preloader/blob/6703830/src/types.ts#L19)

___

### LoadedXMLValue

Ƭ **LoadedXMLValue**: `Document` \| `XMLDocument`

Types that can be returned by the Xml loader. See the [LoadItem.mimeType](../interfaces/types.LoadItem.md#mimetype).

#### Defined in

[types.ts:14](https://github.com/dmnsgn/async-preloader/blob/6703830/src/types.ts#L14)
