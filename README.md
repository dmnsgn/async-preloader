# async-preloader

[![Build Status](https://travis-ci.org/dmnsgn/async-preloader.svg?branch=master)](https://travis-ci.org/dmnsgn/async-preloader)
[![npm version](https://badge.fury.io/js/async-preloader.svg)](https://www.npmjs.com/package/async-preloader)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest) 

> Assets preloader using ES2017 async/await and fetch.

## Install

```bash
npm install --save async-preloader
```

## Documentation

* [AsyncPreloader class](https://dmnsgn.github.io/async-preloader/classes/_index_.asyncpreloader.html)
* [AsyncPreloader types](https://dmnsgn.github.io/async-preloader/modules/_types_.html)

## Quick start

This section covers the basic usage of `AsyncPreloader`. For more informations about async/await, see [Async functions - making promises friendly](https://developers.google.com/web/fundamentals/primers/async-functions). Usage in Node.js environment is limited to its capacity to handle `fetch` requests. Polyfills like [`node-fetch`](https://www.npmjs.com/package/node-fetch) and [`xmldom`](https://www.npmjs.com/package/xmldom) might come handy.

### Preload items and retrieve them

```javascript
import AsyncPreloader from "async-preloader";

const items = [
  { "id": "myDefaultFile",    "src": "assets/default"   },
  { "id": "myTextFile",       "src": "assets/text.txt"  },
  { "id": "myJsonFile",       "src": "assets/json.json" },
  { "id": "myImageFile",      "src": "assets/image.jpg" },
  { "id": "myVideoFile",      "src": "assets/video.mp4" },
  { "id": "myAudioFile",      "src": "assets/audio.mp3" },
  { "id": "myXmlFile",        "src": "assets/xml.xml"   },
  { "id": "mySvgFile",        "src": "assets/xml.svg"   },
  { "id": "myHtmlFile",       "src": "assets/xml.html"  },
  { "id": "myDefaultXmlFile", "src": "assets/xml", "loader": "Xml"  },
  { "id": "myFont",           "loader": "Font" },
  { "src": "assets/fileWithoutId" } // Can be retrieved with the src property eg. AsyncPreloader.items.get("assets/fileWithoutId")
];

// Pass an array of LoadItem
//
// Returns a Promise with an array of LoadedValue
const pItems = AsyncPreloader.loadItems(items);

pItems
  .then(items => {
    const element = AsyncPreloader.items.get("myVideoFile");
    document.body.appendChild(element);
  })
  .catch(error => console.error("Error loading items", error));
```

---
Note: Font loader is using [FontFaceObserver](https://github.com/bramstein/fontfaceobserver)

### Load items from a manifest file

It works in a similar fashion as createjs's [PreloadJS](http://www.createjs.com/docs/preloadjs/classes/LoadQueue.html).

```javascript
import AsyncPreloader from "async-preloader";

// Pass the file url and an optional path of the property to get in the JSON file.
// It will load the file using the Json loader and look for the path key expecting an array of `LoadItem`s.
// Default path is "items" eg the default manifest would look like this:
// `{ "items": [ { "src": "assets/file1" }, { "src": "assets/file2" }] }`
//
// Returns a Promise with an array of LoadedValue
const pItems = AsyncPreloader.loadManifest("assets/manifest.json", "data.preloader.items");

pItems
  .then(items => useLoadedItemsFromManifest(items)) // or AsyncPreloader.items.get("src or id")
  .catch(error => console.error("Error loading items", error));
```

## Advanced usage

This section takes a closer look at the options of `AsyncPreloader`.

### Load a single item by using the [loaders](https://github.com/dmnsgn/async-preloader/blob/master/src/index.ts#L40) directly

```javascript
import AsyncPreloader from "async-preloader";

// Pass a LoadItem
//
// Returns a Promise with the LoadedValue
const pItem = AsyncPreloader.loadJson({ "src": "assets/json.json" });

pItem
  .then(item => useLoadedItem(item))
  .catch(error => console.error("Error loading item", error));
```

---
Note: Using the loaders directly won't add the item to the `items` Map.
Alternatively you could use `AsyncPreloader.loadItem` and rely on the file extension or add `{ loader: "Json"}` to the item.

### Get an `ArrayBuffer` instead of the default `Blob`

You can specify how the response is handle by using the `body` key in a `LoadItem`.

Typical use case: get an ArrayBuffer for the WebAudio API to decode the data with `baseAudioContext.decodeAudioData()`.

```javascript
import AsyncPreloader from "async-preloader";

const audioContext = new AudioContext();
const pItem = AsyncPreloader.loadAudio({ src: "assets/audio.mp3", body: "arrayBuffer" });

pItem
  .then(item => audioContext.decodeAudioData(item))
  .then(decodedData => useDecodedData(decodedData))
  .catch(error => console.error("Error decoding audio", error));
```

### Getting the progress

Since `fetch` doesn't support `Progress events` yet, you might want to get a per file progress.

```javascript
import AsyncPreloader from "async-preloader";

const items = [
  { "id": "myDefaultFile", "src": "assets/default" } // ...
];

(async () => {
  let loadedCount = 0;

  async function preload() {
    await Promise.all(
      items.map(async item => {
        const data = await AsyncPreloader.loadItem(item);
        loadedCount++;
        console.log(`Progress: ${100 * loadedCount / items.length}%`);
      })
    );
  }

  await preload();
})()
```

---
Note: the example above uses the async functions (which is the core of this module). You'll need to transpile it if you are targetting older browsers (namely IE11). See support [here](https://caniuse.com/#feat=async-functions).

## License

MIT © [Damien Seguin](https://github.com/dmnsgn)
