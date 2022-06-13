[async-preloader](../README.md) / [Modules](../modules.md) / [types](../modules/types.md) / LoadItem

# Interface: LoadItem

[types](../modules/types.md).LoadItem

Main interface representing an object to load. src is the only mandatory key.

## Table of contents

### Properties

- [body](types.LoadItem.md#body)
- [fontOptions](types.LoadItem.md#fontoptions)
- [id](types.LoadItem.md#id)
- [loader](types.LoadItem.md#loader)
- [mimeType](types.LoadItem.md#mimetype)
- [options](types.LoadItem.md#options)
- [src](types.LoadItem.md#src)

## Properties

### body

• `Optional` **body**: [`BodyMethod`](../modules/types.md#bodymethod)

Optional [BodyMethod](../modules/types.md#bodymethod) used to handle the Response.

Default to `blob` for Image, Video and Audio. See [AsyncPreloader.defaultBodyMethod](../classes/index.AsyncPreloader.md#defaultbodymethod).

#### Defined in

[types.ts:62](https://github.com/dmnsgn/async-preloader/blob/acf8770/src/types.ts#L62)

___

### fontOptions

• `Optional` **fontOptions**: [`FontOptions`](types.FontOptions.md)

Font options used by FontFace and FontFaceObserver

#### Defined in

[types.ts:56](https://github.com/dmnsgn/async-preloader/blob/acf8770/src/types.ts#L56)

___

### id

• `Optional` **id**: `unknown`

Optional key.

Used to retrieve the [LoadedValue](../modules/types.md#loadedvalue) using `AsyncPreloader.items.get(id)`

#### Defined in

[types.ts:39](https://github.com/dmnsgn/async-preloader/blob/acf8770/src/types.ts#L39)

___

### loader

• `Optional` **loader**: [`LoaderKey`](../enums/types.LoaderKey.md)

Optional [LoaderKey](../enums/types.LoaderKey.md).

If none specified, the loader is inferred from the file extension.
Default to `Text` if the extension doesn't match any of the extensions specified in [AsyncPreloader.loaders](../classes/index.AsyncPreloader.md#loaders).

Note: It needs to be specified for Font and Audio (webm, ogg).

#### Defined in

[types.ts:48](https://github.com/dmnsgn/async-preloader/blob/acf8770/src/types.ts#L48)

___

### mimeType

• `Optional` **mimeType**: `DOMParserSupportedType`

Optional mimeType used to handle the Response.

Note: Only used to parse the document in the Xml Loader.

#### Defined in

[types.ts:68](https://github.com/dmnsgn/async-preloader/blob/acf8770/src/types.ts#L68)

___

### options

• `Optional` **options**: `RequestInit`

Optional `RequestInit` object to pass to the [fetch method](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch).

#### Defined in

[types.ts:52](https://github.com/dmnsgn/async-preloader/blob/acf8770/src/types.ts#L52)

___

### src

• **src**: `RequestInfo`

Input for the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

#### Defined in

[types.ts:33](https://github.com/dmnsgn/async-preloader/blob/acf8770/src/types.ts#L33)
