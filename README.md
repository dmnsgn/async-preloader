# async-preloader

[![Build Status](https://travis-ci.org/dmnsgn/async-preloader.svg?branch=master)](https://travis-ci.org/dmnsgn/async-preloader)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)


> Assets preloader using ES2017 async/await and fetch.

## Install

```
$ npm install --save async-preloader
```


## API

### LoadItem

```js
interface LoadItem {
  id?: string;
  src: string;
  loader?: string;
}
```

|Key|Description
|:---------|:---------|
|**id**|Optional id to retrieve the file using `AsyncPreloader.items.get(id)`|
|**src**|Input for the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)|
|**loader**|Optional string from one of the [LOADERS Map](https://github.com/dmnsgn/async-preloader/blob/master/src/index.js#L20). It needs to be specified for Font and Audio (webm|off). Otherwise the loader is inferred from the file extension or default to `Response.text()` if there is no extension.|


### AsyncPreloader.loadItems(items: LoadItem[])

#### Arguments

`items` (*Array*): Array of `LoadItem`s

#### Returns

(*Promise*): A [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that resolves with the loaded items.

#### Example

```js
import AsyncPreloader from "async-preloader";

const pItems = AsyncPreloader.loadItems([
  { "id": "myDefaultFile", "src": "assets/default"   },
  { "id": "myTextFile",    "src": "assets/text.txt"  },
  { "id": "myJsonFile",    "src": "assets/json.json" },
  { "id": "myImageFile",   "src": "assets/image.jpg" },
  { "id": "myVideoFile",   "src": "assets/video.mp4" },
  { "id": "myAudioFile",   "src": "assets/audio.mp3" },
  { "id": "myXmlFile",     "src": "assets/xml.xml"   },
  { "id": "mySvgFile",     "src": "assets/xml.svg"   },
  { "id": "myHtmlFile",    "src": "assets/xml.html"  },
  { "id": "myFont",        "src": "Open Sans Regular", "loader": "Font" }
]);

pItems
  .then(items => {
    const element = AsyncPreloader.items.get("myVideoFile");
    document.body.appendChild(element);
  })
  .catch(error => console.error("Error loading items", error));
```

---
Note: Font loader is using [FontFaceObserver](https://github.com/bramstein/fontfaceobserver)


### AsyncPreloader.loadManifest(src: string)

You can also load a manifest file. It works in a similar fashion as createjs's [PreloadJS](http://www.createjs.com/docs/preloadjs/classes/LoadQueue.html).

#### Arguments

`src` (*String*): Input for the Fetch API. It will load the file using the `JsonLoader` and look for an `"items"` key containing an array of `LoadItem`s.

#### Returns

(*Promise*): A [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that resolves with the loaded items.

#### Example

```js
import AsyncPreloader from "async-preloader";

const pItems = AsyncPreloader.loadItems('assets/manifest.json');

pItems
  .then(items => useLoadedItemsFromManifest(items)) // or AsyncPreloader.items.get(pathOrId)
  .catch(error => console.error("Error loading items", error));
```


### AsyncPreloader.loadJson(item: LoadItem)

It is also possible to use the [LOADERS](https://github.com/dmnsgn/async-preloader/blob/master/src/index.js#L20) individually.

#### Arguments

`item` (*LoadItem*): a `LoadItem`.

#### Returns

(*Promise*): A [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that resolves with the loaded item.

#### Example

```js
import AsyncPreloader from "async-preloader";

const pItem = AsyncPreloader.loadJson('assets/json.json');

pItem
  .then(item => useLoadedItemFromManifest(item))
  .catch(error => console.error("Error loading item", error));
```


## License

MIT © [Damien Seguin](https://github.com/dmnsgn)
