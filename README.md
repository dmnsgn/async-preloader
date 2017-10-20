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
  options?: object;
  body?: "arrayBuffer" | "blob" | "formData" | "json" | "text"
}
```

|Key|Description
|:---------|:---------|
|**id**|Optional id to retrieve the file using `AsyncPreloader.items.get(id)`|
|**src**|Input for the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)|
|**loader**|Optional _string_ from one of the [LOADERS Map](https://github.com/dmnsgn/async-preloader/blob/master/src/index.js#L20). It needs to be specified for Font and Audio (webm|off). Otherwise the loader is inferred from the file extension or default to `Response.text()` if there is no extension.|
|**options**|Optional _object_ to pass to the [fetch method](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch).|
|**body**|Optional _string_ to define the [Body method](https://developer.mozilla.org/en-US/docs/Web/API/Body) to handle the Response. Default to `blob()` for Image, Video and Audio.|

### AsyncPreloader.items

A [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) object containing the loaded items (keys being `LoadItem.id` if specified or `LoadItem.src`).


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

const pItems = AsyncPreloader.loadItems("assets/manifest.json");

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

const pItem = AsyncPreloader.loadJson({ "src": "assets/json.json" });

pItem
  .then(item => useLoadedItem(item))
  .catch(error => console.error("Error loading item", error));
```


## Usage

### Getting the progress

Since `fetch` doesn't support `Progress events` yet, you might want to get a per file progress:

```js
import AsyncPreloader from "async-preloader";

let loadedCount = 0;
async function preload() {
  await Promise.all(
    itemsToLoad.map(async item => {
      const data = await AsyncPreloader.loadItem(item);
      loadedCount++;
      console.log(loadedCount / itemsToLoad.length);
    })
  );
}
await preload();
```

### Get an `ArrayBuffer` instead of a blob

You can specify how the response is handle by using the `body` key in a `LoadItem`.

Typical use case: use with the WebAudio API to decode the data with `baseAudioContext.decodeAudioData()`:

```js
import AsyncPreloader from "async-preloader";

const pItem = AsyncPreloader.loadAudio({ src: "assets/audio.mp3", body: "arrayBuffer" });

pItem
  .then(item => audioContext.decodeAudioData(item))
  .catch(error => console.error("Error decoding audio", error));
```


## License

MIT © [Damien Seguin](https://github.com/dmnsgn)
