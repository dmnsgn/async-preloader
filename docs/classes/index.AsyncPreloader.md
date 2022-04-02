[async-preloader](../README.md) / [Modules](../modules.md) / [index](../modules/index.md) / AsyncPreloader

# Class: AsyncPreloader

[index](../modules/index.md).AsyncPreloader

AsyncPreloader: assets preloader using ES2017 async/await and fetch.

It exports an instance of itself as default so you can:

```js
import Preloader from "async-preloader";

await Preloader.loadItems([]);
```

to use directly as a singleton or

```js
import { AsyncPreloader as Preloader } from "async-preloader";

const preloader = new Preloader();
await preloader.loadItems([]);
```
if you need more than one instance.

## Table of contents

### Constructors

- [constructor](index.AsyncPreloader.md#constructor)

### Properties

- [defaultBodyMethod](index.AsyncPreloader.md#defaultbodymethod)
- [defaultLoader](index.AsyncPreloader.md#defaultloader)
- [items](index.AsyncPreloader.md#items)
- [domParser](index.AsyncPreloader.md#domparser)
- [loaders](index.AsyncPreloader.md#loaders)

### Methods

- [loadArrayBuffer](index.AsyncPreloader.md#loadarraybuffer)
- [loadAudio](index.AsyncPreloader.md#loadaudio)
- [loadBlob](index.AsyncPreloader.md#loadblob)
- [loadFont](index.AsyncPreloader.md#loadfont)
- [loadFormData](index.AsyncPreloader.md#loadformdata)
- [loadImage](index.AsyncPreloader.md#loadimage)
- [loadItem](index.AsyncPreloader.md#loaditem)
- [loadItems](index.AsyncPreloader.md#loaditems)
- [loadJson](index.AsyncPreloader.md#loadjson)
- [loadManifest](index.AsyncPreloader.md#loadmanifest)
- [loadText](index.AsyncPreloader.md#loadtext)
- [loadVideo](index.AsyncPreloader.md#loadvideo)
- [loadXml](index.AsyncPreloader.md#loadxml)
- [fetchItem](index.AsyncPreloader.md#fetchitem)
- [getFileBaseName](index.AsyncPreloader.md#getfilebasename)
- [getFileExtension](index.AsyncPreloader.md#getfileextension)
- [getFileName](index.AsyncPreloader.md#getfilename)
- [getLoaderKey](index.AsyncPreloader.md#getloaderkey)
- [getMimeType](index.AsyncPreloader.md#getmimetype)
- [getProp](index.AsyncPreloader.md#getprop)

## Constructors

### constructor

• **new AsyncPreloader**()

## Properties

### defaultBodyMethod

• **defaultBodyMethod**: [`BodyMethod`](../modules/types.md#bodymethod) = `"blob"`

Default body method to be called on the Response from fetch if no body option is specified on the LoadItem

#### Defined in

[index.ts:49](https://github.com/dmnsgn/async-preloader/blob/be46c7d/src/index.ts#L49)

___

### defaultLoader

• **defaultLoader**: [`LoaderKey`](../enums/types.LoaderKey.md) = `LoaderKey.Text`

Default loader to use if no loader key is specified in the [LoadItem](../interfaces/types.LoadItem.md) or if the extension doesn't match any of the [AsyncPreloader.loaders](index.AsyncPreloader.md#loaders) extensions

#### Defined in

[index.ts:54](https://github.com/dmnsgn/async-preloader/blob/be46c7d/src/index.ts#L54)

___

### items

• **items**: `Map`<`string`, [`LoadedValue`](../modules/types.md#loadedvalue)\>

Object that contains the loaded items

#### Defined in

[index.ts:44](https://github.com/dmnsgn/async-preloader/blob/be46c7d/src/index.ts#L44)

___

### domParser

▪ `Static` `Private` **domParser**: `DOMParser`

DOMParser instance for the XML loader

#### Defined in

[index.ts:83](https://github.com/dmnsgn/async-preloader/blob/be46c7d/src/index.ts#L83)

___

### loaders

▪ `Static` `Private` **loaders**: `Map`<[`LoaderKey`](../enums/types.LoaderKey.md), [`LoaderValue`](../interfaces/types.LoaderValue.md)\>

Loader types and the extensions they handle

Allows the omission of the loader key in a [LoadItem.loader](../interfaces/types.LoadItem.md#loader) for some generic extensions

#### Defined in

[index.ts:61](https://github.com/dmnsgn/async-preloader/blob/be46c7d/src/index.ts#L61)

## Methods

### loadArrayBuffer

▸ **loadArrayBuffer**(`item`): `Promise`<`ArrayBuffer`\>

Load an item and parse the Response as arrayBuffer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | [`LoadItem`](../interfaces/types.LoadItem.md) | Item to load |

#### Returns

`Promise`<`ArrayBuffer`\>

Fulfilled value of parsed Response

#### Defined in

[index.ts:166](https://github.com/dmnsgn/async-preloader/blob/be46c7d/src/index.ts#L166)

___

### loadAudio

▸ **loadAudio**(`item`): `Promise`<[`LoadedValue`](../modules/types.md#loadedvalue)\>

Load an item in one of the following cases:
- item's "loader" option set as "Audio"
- item's "src" option extensions matching the loaders Map
- direct call of the method

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | [`LoadItem`](../interfaces/types.LoadItem.md) | Item to load |

#### Returns

`Promise`<[`LoadedValue`](../modules/types.md#loadedvalue)\>

Fulfilled value of parsed Response according to the "body" option. Defaults to an HTMLAudioElement with a blob as srcObject or src.

#### Defined in

[index.ts:275](https://github.com/dmnsgn/async-preloader/blob/be46c7d/src/index.ts#L275)

___

### loadBlob

▸ **loadBlob**(`item`): `Promise`<`Blob`\>

Load an item and parse the Response as blob

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | [`LoadItem`](../interfaces/types.LoadItem.md) | Item to load |

#### Returns

`Promise`<`Blob`\>

Fulfilled value of parsed Response

#### Defined in

[index.ts:177](https://github.com/dmnsgn/async-preloader/blob/be46c7d/src/index.ts#L177)

___

### loadFont

▸ **loadFont**(`item`): `Promise`<`string` \| `FontFace`\>

Load a font via FontFace or check a font is loaded via FontFaceObserver instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | [`LoadItem`](../interfaces/types.LoadItem.md) | Item to load (id correspond to the font family name). |

#### Returns

`Promise`<`string` \| `FontFace`\>

Fulfilled value with FontFace instance or initial id if no src provided.

#### Defined in

[index.ts:340](https://github.com/dmnsgn/async-preloader/blob/be46c7d/src/index.ts#L340)

___

### loadFormData

▸ **loadFormData**(`item`): `Promise`<`FormData`\>

Load an item and parse the Response as formData

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | [`LoadItem`](../interfaces/types.LoadItem.md) | Item to load |

#### Returns

`Promise`<`FormData`\>

Fulfilled value of parsed Response

#### Defined in

[index.ts:188](https://github.com/dmnsgn/async-preloader/blob/be46c7d/src/index.ts#L188)

___

### loadImage

▸ **loadImage**(`item`): `Promise`<[`LoadedValue`](../modules/types.md#loadedvalue)\>

Load an item in one of the following cases:
- item's "loader" option set as "Image"
- item's "src" option extensions matching the loaders Map
- direct call of the method

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | [`LoadItem`](../interfaces/types.LoadItem.md) | Item to load |

#### Returns

`Promise`<[`LoadedValue`](../modules/types.md#loadedvalue)\>

Fulfilled value of parsed Response according to the "body" option. Defaults to an HTMLImageElement with a blob as srcObject or src.

#### Defined in

[index.ts:203](https://github.com/dmnsgn/async-preloader/blob/be46c7d/src/index.ts#L203)

___

### loadItem

▸ **loadItem**(`item`): `Promise`<[`LoadedValue`](../modules/types.md#loadedvalue)\>

Load a single item

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | [`LoadItem`](../interfaces/types.LoadItem.md) | Item to load |

#### Returns

`Promise`<[`LoadedValue`](../modules/types.md#loadedvalue)\>

Resolve when item is loaded, reject for any error

#### Defined in

[index.ts:103](https://github.com/dmnsgn/async-preloader/blob/be46c7d/src/index.ts#L103)

___

### loadItems

▸ **loadItems**(`items`): `Promise`<[`LoadedValue`](../modules/types.md#loadedvalue)[]\>

Load the specified manifest (array of items)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | [`LoadItem`](../interfaces/types.LoadItem.md)[] | Items to load |

#### Returns

`Promise`<[`LoadedValue`](../modules/types.md#loadedvalue)[]\>

Resolve when all items are loaded, reject for any error

#### Defined in

[index.ts:93](https://github.com/dmnsgn/async-preloader/blob/be46c7d/src/index.ts#L93)

___

### loadJson

▸ **loadJson**(`item`): `Promise`<`JSON`\>

Load an item and parse the Response as json

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | [`LoadItem`](../interfaces/types.LoadItem.md) | Item to load |

#### Returns

`Promise`<`JSON`\>

Fulfilled value of parsed Response

#### Defined in

[index.ts:155](https://github.com/dmnsgn/async-preloader/blob/be46c7d/src/index.ts#L155)

___

### loadManifest

▸ **loadManifest**(`src`, `key?`): `Promise`<[`LoadedValue`](../modules/types.md#loadedvalue)[]\>

Load a manifest of items

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `src` | `string` | `undefined` | Manifest src url |
| `key` | `string` | `"items"` | - |

#### Returns

`Promise`<[`LoadedValue`](../modules/types.md#loadedvalue)[]\>

#### Defined in

[index.ts:125](https://github.com/dmnsgn/async-preloader/blob/be46c7d/src/index.ts#L125)

___

### loadText

▸ **loadText**(`item`): `Promise`<`string`\>

Load an item and parse the Response as text

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | [`LoadItem`](../interfaces/types.LoadItem.md) | Item to load |

#### Returns

`Promise`<`string`\>

Fulfilled value of parsed Response

#### Defined in

[index.ts:144](https://github.com/dmnsgn/async-preloader/blob/be46c7d/src/index.ts#L144)

___

### loadVideo

▸ **loadVideo**(`item`): `Promise`<[`LoadedValue`](../modules/types.md#loadedvalue)\>

Load an item in one of the following cases:
- item's "loader" option set as "Video"
- item's "src" option extensions matching the loaders Map
- direct call of the method

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | [`LoadItem`](../interfaces/types.LoadItem.md) | Item to load |

#### Returns

`Promise`<[`LoadedValue`](../modules/types.md#loadedvalue)\>

Fulfilled value of parsed Response according to the "body" option. Defaults to an HTMLVideoElement with a blob as src.

#### Defined in

[index.ts:235](https://github.com/dmnsgn/async-preloader/blob/be46c7d/src/index.ts#L235)

___

### loadXml

▸ **loadXml**(`item`): `Promise`<[`LoadedXMLValue`](../modules/types.md#loadedxmlvalue)\>

Load an item in one of the following cases:
- item's "loader" option set as "Xml"
- item's "src" option extensions matching the loaders Map
- direct call of the method

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | [`LoadItem`](../interfaces/types.LoadItem.md) | Item to load (need a mimeType specified or default to "application/xml") |

#### Returns

`Promise`<[`LoadedXMLValue`](../modules/types.md#loadedxmlvalue)\>

Result of Response parsed as a document.

#### Defined in

[index.ts:317](https://github.com/dmnsgn/async-preloader/blob/be46c7d/src/index.ts#L317)

___

### fetchItem

▸ `Static` `Private` **fetchItem**(`item`): `Promise`<`Response`\>

Fetch wrapper for LoadItem

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | [`LoadItem`](../interfaces/types.LoadItem.md) | Item to fetch |

#### Returns

`Promise`<`Response`\>

Fetch response

#### Defined in

[index.ts:375](https://github.com/dmnsgn/async-preloader/blob/be46c7d/src/index.ts#L375)

___

### getFileBaseName

▸ `Static` `Private` **getFileBaseName**(`path`): `string`

Get file base name

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`string`

#### Defined in

[index.ts:413](https://github.com/dmnsgn/async-preloader/blob/be46c7d/src/index.ts#L413)

___

### getFileExtension

▸ `Static` `Private` **getFileExtension**(`path`): `string`

Get file extension

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`string`

#### Defined in

[index.ts:403](https://github.com/dmnsgn/async-preloader/blob/be46c7d/src/index.ts#L403)

___

### getFileName

▸ `Static` `Private` **getFileName**(`path`): `string`

Get file name

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`string`

#### Defined in

[index.ts:423](https://github.com/dmnsgn/async-preloader/blob/be46c7d/src/index.ts#L423)

___

### getLoaderKey

▸ `Static` `Private` **getLoaderKey**(`extension`): [`LoaderKey`](../enums/types.LoaderKey.md)

Retrieve loader key from extension (when the loader option isn't specified in the LoadItem)

#### Parameters

| Name | Type |
| :------ | :------ |
| `extension` | `string` |

#### Returns

[`LoaderKey`](../enums/types.LoaderKey.md)

#### Defined in

[index.ts:436](https://github.com/dmnsgn/async-preloader/blob/be46c7d/src/index.ts#L436)

___

### getMimeType

▸ `Static` `Private` **getMimeType**(`loaderKey`, `extension`): `DOMParserSupportedType`

Retrieve mime type from extension

#### Parameters

| Name | Type |
| :------ | :------ |
| `loaderKey` | [`LoaderKey`](../enums/types.LoaderKey.md) |
| `extension` | `string` |

#### Returns

`DOMParserSupportedType`

#### Defined in

[index.ts:450](https://github.com/dmnsgn/async-preloader/blob/be46c7d/src/index.ts#L450)

___

### getProp

▸ `Static` `Private` **getProp**(`object`, `path`): `any`

Get an object property by its path in the form 'a[0].b.c' or ['a', '0', 'b', 'c'].
Similar to [lodash.get](https://lodash.com/docs/4.17.5#get).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `unknown` | Object with nested properties |
| `path` | `string` \| `string`[] | Path to the desired property |

#### Returns

`any`

The returned object property

#### Defined in

[index.ts:387](https://github.com/dmnsgn/async-preloader/blob/be46c7d/src/index.ts#L387)
