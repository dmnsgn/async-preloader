# async-preloader

[![npm version](https://img.shields.io/npm/v/async-preloader)](https://www.npmjs.com/package/async-preloader)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://www.npmjs.com/package/async-preloader)
[![npm minzipped size](https://img.shields.io/bundlephobia/minzip/async-preloader)](https://bundlephobia.com/package/async-preloader)
[![dependencies](https://img.shields.io/librariesio/release/npm/async-preloader)](https://github.com/dmnsgn/async-preloader/blob/main/package.json)
[![types](https://img.shields.io/npm/types/async-preloader)](https://github.com/microsoft/TypeScript)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-fa6673.svg)](https://conventionalcommits.org)
[![styled with prettier](https://img.shields.io/badge/styled_with-Prettier-f8bc45.svg?logo=prettier)](https://github.com/prettier/prettier)
[![linted with eslint](https://img.shields.io/badge/linted_with-ES_Lint-4B32C3.svg?logo=eslint)](https://github.com/eslint/eslint)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![license](https://img.shields.io/github/license/dmnsgn/async-preloader)](https://github.com/dmnsgn/async-preloader/blob/main/LICENSE.md)

Assets preloader using ES2017 async/await and fetch.

[![paypal](https://img.shields.io/badge/donate-paypal-informational?logo=paypal)](https://paypal.me/dmnsgn)
[![coinbase](https://img.shields.io/badge/donate-coinbase-informational?logo=coinbase)](https://commerce.coinbase.com/checkout/56cbdf28-e323-48d8-9c98-7019e72c97f3)
[![twitter](https://img.shields.io/twitter/follow/dmnsgn?style=social)](https://twitter.com/dmnsgn)

## Install

```bash
npm install --save async-preloader
```

## Documentation

- [AsyncPreloader class](https://dmnsgn.github.io/async-preloader/classes/index.asyncpreloader.html)
- [AsyncPreloader types](https://dmnsgn.github.io/async-preloader/modules/types.html)

## Quick start

This section covers the basic usage of `AsyncPreloader`. For more informations about async/await, see [Async functions - making promises friendly](https://developers.google.com/web/fundamentals/primers/async-functions). Usage in Node.js environment is limited to its capacity to handle `fetch` requests. Polyfills like [`node-fetch`](https://www.npmjs.com/package/node-fetch) and [`xmldom`](https://www.npmjs.com/package/xmldom) might come handy.

### Preload items and retrieve them

```javascript
import AsyncPreloader from "async-preloader";

const items = [
  { id: "myDefaultFile", src: "assets/default" },
  { id: "myTextFile", src: "assets/text.txt" },
  { id: "myJsonFile", src: "assets/json.json" },
  { id: "myImageFile", src: "assets/image.jpg" },
  { id: "myVideoFile", src: "assets/video.mp4" },
  { id: "myAudioFile", src: "assets/audio.mp3" },
  { id: "myXmlFile", src: "assets/xml.xml" },
  { id: "mySvgFile", src: "assets/xml.svg" },
  { id: "myHtmlFile", src: "assets/xml.html" },
  { id: "myDefaultXmlFile", src: "assets/xml", loader: "Xml" },
  { id: "myFont", src: `assets/font.ttf` },
  { id: "Space Regular", loader: "Font", fontOptions: { timeout: 10000 } },
  // Can be retrieved with the src property eg. AsyncPreloader.items.get("assets/fileWithoutId")
  { src: "assets/fileWithoutId" },
];

// Pass an array of LoadItem
//
// Returns a Promise with an array of LoadedValue
const pItems = AsyncPreloader.loadItems(items);

pItems
  .then((items) => {
    const element = AsyncPreloader.items.get("myVideoFile");
    document.body.appendChild(element);
  })
  .catch((error) => console.error("Error loading items", error));
```

---

Note: Font loader is will try to detect the font in the page using [FontFaceObserver](https://github.com/dmnsgn/fontfaceobserver) when no src is specified.

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
const pItems = AsyncPreloader.loadManifest(
  "assets/manifest.json",
  "data.preloader.items"
);

pItems
  .then((items) => useLoadedItemsFromManifest(items)) // or AsyncPreloader.items.get("src or id")
  .catch((error) => console.error("Error loading items", error));
```

## Advanced usage

This section takes a closer look at the options of `AsyncPreloader`.

### Load a single item by using the [loaders](https://github.com/dmnsgn/async-preloader/blob/master/src/index.ts#L40) directly

```javascript
import AsyncPreloader from "async-preloader";

// Pass a LoadItem
//
// Returns a Promise with the LoadedValue
const pItem = AsyncPreloader.loadJson({ src: "assets/json.json" });

pItem
  .then((item) => useLoadedItem(item))
  .catch((error) => console.error("Error loading item", error));
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
const pItem = AsyncPreloader.loadAudio({
  src: "assets/audio.mp3",
  body: "arrayBuffer",
});

pItem
  .then((item) => audioContext.decodeAudioData(item))
  .then((decodedData) => useDecodedData(decodedData))
  .catch((error) => console.error("Error decoding audio", error));
```

### Getting the progress

Since `fetch` doesn't support `Progress events` yet, you might want to get a per file progress.

```javascript
import AsyncPreloader from "async-preloader";

const items = [
  { id: "myDefaultFile", src: "assets/default" }, // ...
];

let loadedCount = 0;

async function preload() {
  await Promise.all(
    items.map(async (item) => {
      const data = await AsyncPreloader.loadItem(item);
      loadedCount++;
      console.log(`Progress: ${(100 * loadedCount) / items.length}%`);
    })
  );
}

await preload();
```

### Abort one or more loadItem(s) request(s)

To abort a loadItem(s) call, you can create an `AbortController` instance and pass its signal to options.

```javascript
const controller = new AbortController();

const timeoutId = setTimeout(() => {
  controller.abort();
}, 150);

try {
  await AsyncPreloader.loadItems(
    items.map((item) => ({
      ...item,
      options: { ...(item.options || {}), signal: controller.signal },
    }))
  );
} catch (error) {
  if (error.name === "AbortError") console.log("Request was aborted");
} finally {
  clearTimeout(timeoutId);
}
```

---

Note: the example above uses the async functions (which is the core of this module). You'll need to transpile it if you are targeting older browsers (namely IE11). See support [here](https://caniuse.com/#feat=async-functions).

## License

MIT © [Damien Seguin](https://github.com/dmnsgn)
