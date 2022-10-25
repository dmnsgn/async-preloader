/**
 * Methods that can be called on a Request (object returned by fetch and that implements the [Body](https://developer.mozilla.org/en-US/docs/Web/API/Response/body) interface)
 */
export type BodyMethod = "arrayBuffer" | "blob" | "formData" | "json" | "text";

/**
 * Types that can be returned by all the {@link BodyMethod}
 */
export type BodyResolveValue = ArrayBuffer | Blob | FormData | JSON | string;

/**
 * Types that can be returned by the Xml loader. See the {@link LoadItem.mimeType}.
 */
export type LoadedXMLValue = Document | XMLDocument;

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
  src: RequestInfo | string;
  /**
   * Optional key.
   *
   * Used to retrieve the {@link LoadedValue} using `AsyncPreloader.items.get(id)`
   */
  id?: unknown;
  /**
   * Optional {@link LoaderKey}.
   *
   * If none specified, the loader is inferred from the file extension.
   * Default to `Text` if the extension doesn't match any of the extensions specified in {@link AsyncPreloader.loaders}.
   *
   * Note: It needs to be specified for Font and Audio (webm, ogg).
   */
  loader?: LoaderKey;
  /**
   * Optional `RequestInit` object to pass to the [fetch method](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch).
   */
  options?: RequestInit;
  /**
   * Font options used by FontFace and FontFaceObserver
   */
  fontOptions?: FontOptions;
  /**
   * Optional{@link BodyMethod} used to handle the Response.
   *
   * Default to `blob` for Image, Video and Audio. See {@link AsyncPreloader.defaultBodyMethod}.
   */
  body?: BodyMethod;
  /**
   * Optional mimeType used to handle the Response.
   *
   * Note: Only used to parse the document in the Xml Loader.
   */
  mimeType?: DOMParserSupportedType;
  /**
   * Optional disable [image decoding](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decode).
   *
   * Note: Only used for loadImage.
   */
  noDecode?: boolean;
}

/**
 * Keys used for the {@link AsyncPreloader.loaders}
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
  Font = "Font",
}

/**
 * Font options used by FontFace and FontFaceObserver
 */
export interface FontOptions {
  /**
   * [FontFace constructor descriptors](https://developer.mozilla.org/en-US/docs/Web/API/FontFace/FontFace)
   */
  descriptors?: FontFaceDescriptors;
  /**
   * FontFaceObserver.FontVariant
   */
  variant?: FontFaceObserver.FontVariant;
  /**
   * Argument for [FontFace.load](https://developer.mozilla.org/en-US/docs/Web/API/FontFace/load)
   */
  testString?: string;
  /**
   * Argument for [FontFace.load](https://developer.mozilla.org/en-US/docs/Web/API/FontFace/load)
   */
  timeout?: number;
}

/**
 * Values used for the {@link AsyncPreloader.loaders}
 */
export interface LoaderValue {
  /**
   * {@link LoadItem} with no loader key specified will use the following array to find which loader should be used.
   */
  extensions: string[];
  /**
   * Optional mimeType used to handle the Response.
   *
   * Note: Only used to parse the document in the Xml Loader.
   */
  mimeType?: { [key: string]: DOMParserSupportedType };
  /**
   * Optional defaultMimeType used to handle the Response.
   *
   * Note: Only used to parse the document in the Xml Loader.
   */
  defaultMimeType?: DOMParserSupportedType;
}
