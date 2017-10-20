import FontFaceObserver from "fontfaceobserver";

/**
 * AsyncPreloader class
 *
 * Formed of static methods and properties only
 */
class AsyncPreloader {
  /**
   * Object that contains the loaded items
   * @type {Map}
   */
  static items = new Map();

  /**
   * Loader types and the extensions they handle
   * @type {Map}
   */
  // prettier-ignore
  static LOADERS = new Map()
    .set("Default", { extensions: ["txt"]   })
    .set("Json",    { extensions: ["json"]  })
    .set("Image",   { extensions: ["jpeg",  "jpg",  "gif",  "png", "webp"] })
    .set("Video",   { extensions: ["webm",  "ogg",  "mp4"]  })
    .set("Audio",   { extensions: ["webm",  "ogg",  "mp3"]  })
    .set("Xml",     { extensions: ["xml",   "svg",  "html"] })
    .set("Font",    { extensions: ["woff2", "woff", "ttf",  "otf", "eot"]  });

  // API
  /**
   * Load the specified manifest (array of items)
   * @param  {Array} data Items to load { src: String, id: String, loader: String, options: Object }
   * @return {Promise} Resolve when all items are loaded, reject for any error
   */
  static async loadItems(data) {
    return await Promise.all(data.map(AsyncPreloader.loadItem));
  }

  /**
   * Load a single item
   * @param  {{ src: String, id: String, loader: String, options: Object }} item Item to loade
   * @return {Promise} Resolve when item is loaded, reject for any error
   */
  static async loadItem(item) {
    const extension = AsyncPreloader.getFileExtension(item.src);
    const loader = item.loader || AsyncPreloader.getLoaderKey(extension);

    const loadedItem = await AsyncPreloader[`load` + loader](item, extension);

    AsyncPreloader.items.set(item.id || item.src, loadedItem);

    return loadedItem;
  }

  static async loadManifest(src) {
    const loadedManifest = await AsyncPreloader.loadJson({ src });
    const loadedItems = await AsyncPreloader.loadItems(loadedManifest.items);

    return loadedItems;
  }

  // Loaders
  static async loadDefault(item) {
    const response = await fetch(item.src, item.options || {});
    const data = await response.text();

    return data;
  }

  static async loadJson(item) {
    const response = await fetch(item.src, item.options || {});
    const data = await response.json();

    return data;
  }

  static async loadImage(item) {
    const response = await fetch(item.src, item.options || {});
    const data = await response[item.body || "blob"]();

    if (item.body === "arrayBuffer") {
      return data;
    }

    const image = new Image();
    image.src = URL.createObjectURL(data);

    return await new Promise((resolve, reject) => {
      image.addEventListener("load", () => resolve(image), false);
      image.addEventListener("error", reject, false);
    });
  }

  static async loadVideo(item) {
    const response = await fetch(item.src, item.options || {});
    const data = await response[item.body || "blob"]();

    if (item.body === "arrayBuffer") {
      return data;
    }

    const video = document.createElement("video");
    video.src = URL.createObjectURL(data);

    return await new Promise((resolve, reject) => {
      video.addEventListener("canplaythrough", () => resolve(video), false);
      video.addEventListener("error", reject, false);
    });
  }

  static async loadAudio(item) {
    const response = await fetch(item.src, item.options || {});
    const data = await response[item.body || "blob"]();

    if (item.body === "arrayBuffer") {
      return data;
    }

    const audio = document.createElement("audio");
    audio.autoplay = false;
    audio.preload = "none";
    audio.src = URL.createObjectURL(data);

    return await new Promise((resolve, reject) => {
      audio.addEventListener("canplaythrough", () => resolve(audio), false);
      audio.addEventListener("error", reject, false);
    });
  }

  static async loadXml(item, extension) {
    const response = await fetch(item.src, item.options || {});
    const data = await response.text();

    const type = {
      xml: "application/xml",
      svg: "image/svg+xml",
      html: "text/html"
    };
    const parser = new DOMParser();

    return parser.parseFromString(data, type[extension]);
  }

  static async loadFont(item) {
    const fontName = AsyncPreloader.getFileName(item.src);
    const font = new FontFaceObserver(fontName, item.options || {});
    const data = await font.load();

    return fontName;
  }

  // Utils
  static getFileExtension(path) {
    return (path.match(/[^\\\/]\.([^.\\\/]+)$/) || [null]).pop();
  }

  static getFileName(path) {
    return path.replace(/^.*[\\\/]/, "").split(".").shift();
  }

  static getLoaderKey(extension) {
    const loader = Array.from(AsyncPreloader.LOADERS).find(loader =>
      loader[1].extensions.includes(extension)
    );
    return loader ? loader[0] : "Default";
  }
}

export default AsyncPreloader;
