# async-preloader [![Build Status](https://travis-ci.org/dmnsgn/async-preloader.svg?branch=master)](https://travis-ci.org/dmnsgn/async-preloader) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)


> Assets preloader using ES2017 async/await and fetch.

## Install

```
$ npm install --save async-preloader
```


## Usage

```js
import AsyncPreloader from "async-preloader";

const pItems = AsyncPreloader.loadItems([
  { src: "/static/default" }, // A file without extension or loader specified uses `Response.text()`
  { id: "myTextFile", src: "/static/text.txt" },
  { id: "myJsonFile", src: "/static/json.json" },
  { id: "myImageFile", src: "/static/image.jpg" },
  { id: "myVideoFile", src: "/static/video.mp4" },
  { id: "myAudioFile", src: "/static/audio.mp3" },
  { id: "myXmlFile", src: "/static/xml.xml" },
  { id: "mySvgFile", src: "/static/xml.svg" },
  { id: "myHtmlFile", src: "/static/xml.html" },
  { loader: "Font", src: "Open Sans" } // src is the font name here https://github.com/bramstein/fontfaceobserver
]);

pItems
  .then(items => {
    console.log("All items loaded", items);

    const element = AsyncPreloader.items.get("myVideoFile");
    document.body.appendChild(element);
  })
  .catch(error => console.error("Error loading items", error));
```


## License

MIT © [Damien Seguin](https://github.com/dmnsgn)
