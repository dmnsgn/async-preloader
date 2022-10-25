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

[index.ts:48](https://github.com/dmnsgn/async-preloader/blob/dfdf759/src/index.ts#L48)

___

### defaultLoader

• **defaultLoader**: [`LoaderKey`](../enums/types.LoaderKey.md) = `LoaderKey.Text`

Default loader to use if no loader key is specified in the LoadItem or if the extension doesn't match any of the [loaders](index.AsyncPreloader.md#loaders) extensions

#### Defined in

[index.ts:53](https://github.com/dmnsgn/async-preloader/blob/dfdf759/src/index.ts#L53)

___

### items

• **items**: `Map`<`string`, [`LoadedValue`](../modules/types.md#loadedvalue)\>

Object that contains the loaded items

#### Defined in

[index.ts:43](https://github.com/dmnsgn/async-preloader/blob/dfdf759/src/index.ts#L43)

___

### domParser

▪ `Static` `Private` **domParser**: `DOMParser`

DOMParser instance for the XML loader

#### Defined in

[index.ts:82](https://github.com/dmnsgn/async-preloader/blob/dfdf759/src/index.ts#L82)

___

### loaders

▪ `Static` `Private` **loaders**: `Map`<[`LoaderKey`](../enums/types.LoaderKey.md), [`LoaderValue`](../interfaces/types.LoaderValue.md)\>

Loader types and the extensions they handle

Allows the omission of the loader key in a LoadItem.loader for some generic extensions

#### Defined in

[index.ts:60](https://github.com/dmnsgn/async-preloader/blob/dfdf759/src/index.ts#L60)

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

[index.ts:169](https://github.com/dmnsgn/async-preloader/blob/dfdf759/src/index.ts#L169)

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

[index.ts:284](https://github.com/dmnsgn/async-preloader/blob/dfdf759/src/index.ts#L284)

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

[index.ts:180](https://github.com/dmnsgn/async-preloader/blob/dfdf759/src/index.ts#L180)

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

[index.ts:353](https://github.com/dmnsgn/async-preloader/blob/dfdf759/src/index.ts#L353)

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

[index.ts:191](https://github.com/dmnsgn/async-preloader/blob/dfdf759/src/index.ts#L191)

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

Fulfilled value with a decoded HTMLImageElement instance of or a parsed Response according to the "body" option. Defaults to a decoded HTMLImageElement.

#### Defined in

[index.ts:206](https://github.com/dmnsgn/async-preloader/blob/dfdf759/src/index.ts#L206)

___

### loadItem

▸ **loadItem**(`item`): `Promise`<[`LoadedValue`](../modules/types.md#loadedvalue)\>

Load a single item

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | `string` \| [`LoadItem`](../interfaces/types.LoadItem.md) | Item to load |

#### Returns

`Promise`<[`LoadedValue`](../modules/types.md#loadedvalue)\>

Resolve when item is loaded, reject for any error

#### Defined in

[index.ts:104](https://github.com/dmnsgn/async-preloader/blob/dfdf759/src/index.ts#L104)

___

### loadItems

▸ **loadItems**(`items`): `Promise`<[`LoadedValue`](../modules/types.md#loadedvalue)[]\>

Load the specified manifest (array of items)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | `string`[] \| [`LoadItem`](../interfaces/types.LoadItem.md)[] | Items to load |

#### Returns

`Promise`<[`LoadedValue`](../modules/types.md#loadedvalue)[]\>

Resolve when all items are loaded, reject for any error

#### Defined in

[index.ts:92](https://github.com/dmnsgn/async-preloader/blob/dfdf759/src/index.ts#L92)

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

[index.ts:158](https://github.com/dmnsgn/async-preloader/blob/dfdf759/src/index.ts#L158)

___

### loadManifest

▸ **loadManifest**(`src`, `key?`): `Promise`<[`LoadedValue`](../modules/types.md#loadedvalue)[]\>

Load a manifest of items

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `src` | `string` | `undefined` | Manifest src url |
| `key?` | `string` | `"items"` | Manifest key in the JSON object containing the array of LoadItem. |

#### Returns

`Promise`<[`LoadedValue`](../modules/types.md#loadedvalue)[]\>

#### Defined in

[index.ts:128](https://github.com/dmnsgn/async-preloader/blob/dfdf759/src/index.ts#L128)

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

[index.ts:147](https://github.com/dmnsgn/async-preloader/blob/dfdf759/src/index.ts#L147)

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

Fulfilled value of parsed Response according to the "body" option. Defaults to an HTMLVideoElement with a blob as srcObject or src.

#### Defined in

[index.ts:244](https://github.com/dmnsgn/async-preloader/blob/dfdf759/src/index.ts#L244)

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

[index.ts:326](https://github.com/dmnsgn/async-preloader/blob/dfdf759/src/index.ts#L326)

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

[index.ts:388](https://github.com/dmnsgn/async-preloader/blob/dfdf759/src/index.ts#L388)

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

[index.ts:426](https://github.com/dmnsgn/async-preloader/blob/dfdf759/src/index.ts#L426)

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

[index.ts:416](https://github.com/dmnsgn/async-preloader/blob/dfdf759/src/index.ts#L416)

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

[index.ts:436](https://github.com/dmnsgn/async-preloader/blob/dfdf759/src/index.ts#L436)

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

[index.ts:449](https://github.com/dmnsgn/async-preloader/blob/dfdf759/src/index.ts#L449)

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

[index.ts:463](https://github.com/dmnsgn/async-preloader/blob/dfdf759/src/index.ts#L463)

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

[index.ts:400](https://github.com/dmnsgn/async-preloader/blob/dfdf759/src/index.ts#L400)
