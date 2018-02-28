/**
 * Methods that can be called on a Request (object returned by fetch and that implements the [Body](https://developer.mozilla.org/en-US/docs/Web/API/Body) interface)
 */
export type BodyMethod = "arrayBuffer" | "blob" | "formData" | "json" | "text";

/**
 * Types that can be returned by all the [[BodyMethod]]
 */
export type BodyResolveValue = ArrayBuffer | Blob | FormData | JSON | USVString;

/**
 * Types that can be returned by the Xml loader. See the [[LoadItem.mimeType]].
 */
export type LoadedXMLValue = Document | HTMLDocument | XMLDocument;

/**
 * Types that can be returned by all the loaders.
 */
export type LoadedValue =
	| BodyResolveValue
	| HTMLImageElement
	| HTMLVideoElement
	| HTMLAudioElement
	| LoadedXMLValue;

/**
 * Main interface representing an object to load. src is the only mandatory key.
 */
export interface LoadItem {
	/**
	 * Input for the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
	 */
	src: RequestInfo | USVString;
	/**
	 * Optional key.
	 *
	 * Used to retrieve the [[LoadedValue]] using `AsyncPreloader.items.get(id)`
	 */
	id?: any;
	/**
	 * Optional [[LoaderKey]].
	 *
	 * If none specified, the loader is inferred from the file extension.
	 * Default to `Text` if the extension doesn't match any of the extensions specified in [[AsyncPreloader.loaders]].
	 *
	 * Note: It needs to be specified for Font and Audio (webm, ogg).
	*/
	loader?: LoaderKey;
	/**
	 * Optional `RequestInit` object to pass to the [fetch method](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch).
	*/
	options?: RequestInit;
	/**
	 * Optional [[BodyMethod]] used to handle the Response.
	 *
	 * Default to `blob` for Image, Video and Audio. See [[AsyncPreloader.defaultBodyMethod]].
	*/
	body?: BodyMethod;
	/**
	 * Optional mimeType used to handle the Response.
	 *
	 * Note: Only used to parse the document in the Xml Loader.
	*/
	mimeType?: string;
}

/**
 * Keys used for the [[AsyncPreloader.loaders]]
 */
export enum LoaderKey {
	Json = "Json",
	ArrayBuffer = "ArrayBuffer",
	Blob = "Blob",
	FormData = "FormData",
	Text = "Text",

	Image = "Image",
	Video = "Video",
	Audio = "Audio",
	Xml = "Xml",
	Font = "Font"
}

/**
 * Values used for the [[AsyncPreloader.loaders]]
 */
export interface LoaderValue {
	/**
	 * [[LoadItem]] with no loader key specified will use the following array to find which loader should be used.
	*/
	extensions: string[];
	/**
	 * Optional mimeType used to handle the Response.
	 *
	 * Note: Only used to parse the document in the Xml Loader.
	*/
	mimeType?: { [key: string]: string };
};
