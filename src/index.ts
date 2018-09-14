import * as FontFaceObserver from "fontfaceobserver-es";
import get from "lodash-es/get";

import {
	BodyMethod,
	LoadItem,
	LoadedValue,
	LoadedXMLValue,
	LoaderKey,
	LoaderValue
} from "./types";

/**
 * AsyncPreloader: assets preloader using ES2017 async/await and fetch.
 *
 * It exports an instance of itself as default so you can:
 *
 * ```js
 * import Preloader from "async-preloader";
 *
 * await Preloader.loadItems([]);
 * ```
 *
 * to use directly as a singleton or
 *
 * ```js
 * import { AsyncPreloader as Preloader } from "async-preloader";
 *
 * const preloader = new Preloader();
 * await preloader.loadItems([]);
 * ```
 * if you need more than one instance.
 */
class AsyncPreloader {
	// Properties
	/**
	 * Object that contains the loaded items
	 */
	public items: Map<string, LoadedValue> = new Map();

	/**
	 * Default body method to be called on the Response from fetch if no body option is specified on the LoadItem
	 */
	public defaultBodyMethod: BodyMethod = "blob";

	/**
	 * Default loader to use if no loader key is specified in the [[LoadItem]] or if the extension doesn't match any of the [[AsyncPreloader.loaders]] extensions
	 */
	public defaultLoader: LoaderKey = LoaderKey.Text;

	/**
	 * Loader types and the extensions they handle
	 *
	 * Allows the omission of the loader key in a [[LoadItem.loader]] for some generic extensions
	 */
	private static loaders: Map<LoaderKey, LoaderValue> = new Map()
		.set(LoaderKey.Text, { extensions: ["txt"] })
		.set(LoaderKey.Json, { extensions: ["json"] })
		.set(LoaderKey.Image, { extensions: ["jpeg", "jpg", "gif", "png", "webp"] })
		.set(LoaderKey.Video, { extensions: ["webm", "ogg", "mp4"] })
		.set(LoaderKey.Audio, { extensions: ["webm", "ogg", "mp3", "wav", "flac"] })
		.set(LoaderKey.Xml, {
			extensions: ["xml", "svg", "html"],
			mimeType: {
				xml: "application/xml",
				svg: "image/svg+xml",
				html: "text/html"
			},
			defaultMimeType: "xml"
		})
		.set(LoaderKey.Font, {
			extensions: ["woff2", "woff", "ttf", "otf", "eot"]
		});

	/**
	 * DOMParser instance for the XML loader
	 */
	private static domParser = new DOMParser();

	// API
	/**
	 * Load the specified manifest (array of items)
	 *
	 * @param {LoadItem[]} items Items to load
	 * @returns {Promise<LoadedValue[]>} Resolve when all items are loaded, reject for any error
	 */
	public loadItems = async (items: LoadItem[]): Promise<LoadedValue[]> => {
		return await Promise.all(items.map(this.loadItem));
	};

	/**
	 * Load a single item
	 *
	 * @param {LoadItem} item Item to load
	 * @returns {Promise<LoadedValue>} Resolve when item is loaded, reject for any error
	 */
	public loadItem = async (item: LoadItem): Promise<LoadedValue> => {
		const extension: string = AsyncPreloader.getFileExtension(item.src);
		const loaderKey: LoaderKey =
			item.loader || AsyncPreloader.getLoaderKey(extension);

		const loadedItem: LoadedValue = await this[`load` + loaderKey](item);

		this.items.set(item.id || item.src, loadedItem);

		return loadedItem;
	};

	// Special loaders
	/**
	 * Load a manifest of items
	 *
	 * @param {string} src Manifest src url
	 * @param {string} [key="items"] Manifest key in the JSON object containing the array of LoadItem. Used by [lodash.get](https://lodash.com/docs/4.17.5#get).
	 * @returns {Promise<LoadedValue[]>}
	 */
	public loadManifest = async (
		src: string,
		key: string = "items"
	): Promise<LoadedValue[]> => {
		const loadedManifest: LoadedValue = await this.loadJson({
			src
		});
		const items: LoadItem[] = get(loadedManifest, key);

		return await this.loadItems(items);
	};

	// Text loaders
	/**
	 * Load an item and parse the Response as text
	 *
	 * @param {LoadItem} item Item to load
	 * @returns {Promise<LoadedValue>} Fulfilled value of parsed Response
	 */
	public loadText = async (item: LoadItem): Promise<LoadedValue> => {
		const response: Response = await AsyncPreloader.fetchItem(item);
		return await response.text();
	};

	/**
	 * Load an item and parse the Response as json
	 *
	 * @param {LoadItem} item Item to load
	 * @returns {Promise<LoadedValue>} Fulfilled value of parsed Response
	 */
	public loadJson = async (item: LoadItem): Promise<LoadedValue> => {
		const response: Response = await AsyncPreloader.fetchItem(item);
		return await response.json();
	};

	/**
	 * Load an item and parse the Response as arrayBuffer
	 *
	 * @param {LoadItem} item Item to load
	 * @returns {Promise<LoadedValue>} Fulfilled value of parsed Response
	 */
	public loadArrayBuffer = async (item: LoadItem): Promise<LoadedValue> => {
		const response: Response = await AsyncPreloader.fetchItem(item);
		return await response.arrayBuffer();
	};

	/**
	 * Load an item and parse the Response as blob
	 *
	 * @param {LoadItem} item Item to load
	 * @returns {Promise<LoadedValue>} Fulfilled value of parsed Response
	 */
	public loadBlob = async (item: LoadItem): Promise<LoadedValue> => {
		const response: Response = await AsyncPreloader.fetchItem(item);
		return await response.blob();
	};

	/**
	 * Load an item and parse the Response as formData
	 *
	 * @param {LoadItem} item Item to load
	 * @returns {Promise<LoadedValue>} Fulfilled value of parsed Response
	 */
	public loadFormData = async (item: LoadItem): Promise<LoadedValue> => {
		const response: Response = await AsyncPreloader.fetchItem(item);
		return await response.formData();
	};

	// Custom loaders
	/**
	 * Load an item in one of the following cases:
	 * - item's "loader" option set as "Image"
	 * - item's "src" option extensions matching the loaders Map
	 * - direct call of the method
	 *
	 * @param {LoadItem} item Item to load
	 * @returns {Promise<LoadedValue>} Fulfilled value of parsed Response according to the "body" option. Defaults to an HTMLImageElement with a blob as src.
	 */
	public loadImage = async (item: LoadItem): Promise<LoadedValue> => {
		const response: Response = await AsyncPreloader.fetchItem(item);
		const data: LoadedValue = await response[
			item.body || this.defaultBodyMethod
		]();

		if (item.body && item.body !== this.defaultBodyMethod) {
			return data;
		}

		const image = new Image();

		return await new Promise<HTMLImageElement>((resolve, reject) => {
			image.addEventListener("load", () => resolve(image), false);
			image.addEventListener("error", reject, false);
			image.src = URL.createObjectURL(data);
		});
	};

	/**
	 * Load an item in one of the following cases:
	 * - item's "loader" option set as "Video"
	 * - item's "src" option extensions matching the loaders Map
	 * - direct call of the method
	 *
	 * @param {LoadItem} item Item to load
	 * @returns {Promise<LoadedValue>} Fulfilled value of parsed Response according to the "body" option. Defaults to an HTMLVideoElement with a blob as src.
	 */
	public loadVideo = async (item: LoadItem): Promise<LoadedValue> => {
		const response: Response = await AsyncPreloader.fetchItem(item);
		const data: LoadedValue = await response[
			item.body || this.defaultBodyMethod
		]();

		if (item.body && item.body !== this.defaultBodyMethod) {
			return data;
		}

		const video = document.createElement("video");

		return await new Promise<HTMLVideoElement>((resolve, reject) => {
			video.addEventListener("canplaythrough", () => resolve(video), false);
			video.addEventListener("error", reject, false);
			video.src = URL.createObjectURL(data);
		});
	};

	/**
	 * Load an item in one of the following cases:
	 * - item's "loader" option set as "Audio"
	 * - item's "src" option extensions matching the loaders Map
	 * - direct call of the method
	 *
	 * @param {LoadItem} item Item to load
	 * @returns {Promise<LoadedValue>} Fulfilled value of parsed Response according to the "body" option. Defaults to an HTMLAudioElement with a blob as src.
	 */
	public loadAudio = async (item: LoadItem): Promise<LoadedValue> => {
		const response: Response = await AsyncPreloader.fetchItem(item);
		const data: LoadedValue = await response[
			item.body || this.defaultBodyMethod
		]();

		if (item.body && item.body !== this.defaultBodyMethod) {
			return data;
		}

		const audio = document.createElement("audio");
		audio.autoplay = false;
		audio.preload = "auto";
		audio.src = URL.createObjectURL(data);

		return await new Promise<HTMLAudioElement>((resolve, reject) => {
			audio.addEventListener("canplaythrough", () => resolve(audio), false);
			audio.addEventListener("error", reject, false);
		});
	};

	/**
	 * Load an item in one of the following cases:
	 * - item's "loader" option set as "Xml"
	 * - item's "src" option extensions matching the loaders Map
	 * - direct call of the method
	 *
	 * @param {LoadItem} item Item to load (need a mimeType specified or default to "application/xml")
	 * @returns {Promise<LoadedXMLValue>} Result of Response parsed as a document.
	 */
	public loadXml = async (item: LoadItem): Promise<LoadedXMLValue> => {
		if (!item.mimeType) {
			const extension: string = AsyncPreloader.getFileExtension(item.src);
			item = {
				...item,
				mimeType: AsyncPreloader.getMimeType(LoaderKey.Xml, extension)
			};
		}

		const response: Response = await AsyncPreloader.fetchItem(item);
		const data: LoadedValue = await response.text();

		return AsyncPreloader.domParser.parseFromString(data, item.mimeType);
	};

	/**
	 * Load a font via a FontFaceObserver instance
	 *
	 * @param {LoadItem} item Item to load (id correspond to the fontName).
	 * @returns {Promise<string>} Fulfilled value with fontName initial id.
	 */
	public loadFont = async (item: LoadItem): Promise<string> => {
		const fontName = item.id;
		const font = new FontFaceObserver(fontName, item.options || {});
		await font.load();

		return fontName;
	};

	// Utils
	/**
	 * Fetch wrapper for LoadItem
	 *
	 * @param {LoadItem} item Item to fetch
	 * @returns {Promise<Response>} Fetch response
	 */
	private static fetchItem(item: LoadItem): Promise<Response> {
		return fetch(item.src, item.options || {});
	}

	/**
	 * Get file extension from path
	 *
	 * @param {(RequestInfo | USVString)} path
	 * @returns {string}
	 */
	private static getFileExtension(path: RequestInfo | USVString): string {
		return ((path as string).match(/[^\\\/]\.([^.\\\/]+)$/) || [null]).pop();
	}

	/**
	 * Get file name from path
	 *
	 * @param {any} path
	 * @returns {string}
	 */
	private static getFileName(path): string {
		return path
			.replace(/^.*[\\\/]/, "")
			.split(".")
			.shift();
	}

	/**
	 * Retrieve loader key from extension (when the loader option isn't specified in the LoadItem)
	 *
	 * @param {string} extension
	 * @returns {LoaderKey}
	 */
	private static getLoaderKey(extension: string): LoaderKey {
		const loader = Array.from(AsyncPreloader.loaders).find(loader =>
			loader[1].extensions.includes(extension)
		);
		return loader ? loader[0] : LoaderKey.Text;
	}

	/**
	 * Retrieve mime type from extension
	 *
	 * @param {LoaderKey} loaderKey
	 * @param {string} extension
	 * @returns {string}
	 */
	private static getMimeType(loaderKey: LoaderKey, extension: string): string {
		const loader: LoaderValue = AsyncPreloader.loaders.get(loaderKey);
		return loader.mimeType[extension] || loader.defaultMimeType;
	}
}

export { AsyncPreloader };

const AsyncPreloaderInstance = new AsyncPreloader();
export default AsyncPreloaderInstance;
