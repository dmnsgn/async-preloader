/**
 * @jest-environment jsdom-latest
 */
import Preloader, { AsyncPreloader } from "../src/";
import { items, expected, manifestSrc } from "./data";
import { mockFetch, unmockFetch } from "./mock";

const excludes = ["jpg", "mp4", "mp3"];

// Suite
describe("AsyncPreloader", () => {
  beforeEach(() => {});

  describe("Loader", () => {
    beforeEach(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;
    });

    afterEach(() => {
      Preloader.items.clear();
      unmockFetch();
    });

    describe("for several items", () => {
      it("should load an array of LoadItem and return an array of LoadedValue", async () => {
        expect.assertions(3);

        let itemsToLoad = Array.from(items.values()).filter(
          item => !excludes.includes(AsyncPreloader.getFileExtension(item.src))
        );
        itemsToLoad
          .filter(item => item.loader !== "Font")
          .forEach(item => mockFetch(item.src));

        const data = await Preloader.loadItems(itemsToLoad);
        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(items.size - excludes.length); // TEMP: fix blob tests
        expect(data).toEqual(
          expect.arrayContaining(Array.from(expected.values()))
        );
      });

      it("should load a manifest, load its items and return an array of LoadedValue", async () => {
        expect.assertions(3);

        mockFetch(manifestSrc);
        Array.from(items.values())
          .filter(
            item =>
              !excludes.includes(AsyncPreloader.getFileExtension(item.src))
          )
          .filter(item => item.loader !== "Font")
          .forEach(item => mockFetch(item.src));

        const data = await Preloader.loadManifest(manifestSrc);

        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(items.size - excludes.length); // TEMP: fix blob tests
        expect(data).toEqual(
          expect.arrayContaining(Array.from(expected.values()))
        );
      });

      it("should load a manifest with a specified data path, load its items and return an array of LoadedValue", async () => {
        expect.assertions(3);

        mockFetch(manifestSrc);
        Array.from(items.values())
          .filter(
            item =>
              !excludes.includes(AsyncPreloader.getFileExtension(item.src))
          )
          .filter(item => item.loader !== "Font")
          .forEach(item => mockFetch(item.src));

        const data = await Preloader.loadManifest(manifestSrc, "custom.path");
        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(items.size - excludes.length); // TEMP: fix blob tests
        expect(data).toEqual(
          expect.arrayContaining(Array.from(expected.values()))
        );
      });
    });

    describe("for default fetch methods", () => {
      it("should load a LoadItem with Json loader and return the JSON Object", async () => {
        expect.assertions(1);

        const item = items.get("json");
        mockFetch(item.src);

        const data = await Preloader.loadJson(item);
        expect(data).toEqual(expected.get("json"));
      });

      it("should load a LoadItem with Text loader and return the string", async () => {
        expect.assertions(1);

        const item = items.get("txt");
        mockFetch(item.src);

        const data = await Preloader.loadText(item);
        expect(data).toBe(expected.get("string"));
      });

      it("should load a LoadItem with ArrayBuffer loader and return instanceof ArrayBuffer", async () => {
        expect.assertions(1);

        const item = items.get("mp3");
        mockFetch(item.src, "arrayBuffer");

        const data = await Preloader.loadArrayBuffer(item);
        expect(data).toBeInstanceOf(ArrayBuffer);
      });

      it("should load a LoadItem with Blob loader and return instanceof Blob", async () => {
        expect.assertions(1);

        const item = items.get("jpg");
        mockFetch(item.src, "blob");

        const data = await Preloader.loadBlob(item);
        expect(data.constructor.name).toEqual(Blob.name);
        // TODO: expect(data).toBeInstanceOf(Blob);
      });
    });

    describe("for a single item", () => {
      it("should load a LoadItem with Default loader and return a string", async () => {
        expect.assertions(1);

        const item = items.get("default");
        mockFetch(item.src);

        const data = await Preloader.loadItem(item);
        expect(data).toBe(expected.get("string"));
      });

      it("should load a LoadItem with Json loader and return the JSON Object", async () => {
        expect.assertions(1);

        const item = items.get("json");
        mockFetch(item.src);

        const data = await Preloader.loadItem(item);
        expect(data).toEqual(expected.get("json"));
      });

      // it("should load a LoadItem with Image loader and return HTMLMediaElement", async () => {
      //   expect.assertions(1);

      //   const item = items.get("jpg");
      //   mockFetch(item.src, "blob");

      //   const data = await Preloader.loadItem(item);
      //   expect(data).toBeInstanceOf(HTMLMediaElement);
      // });

      // it("should load a LoadItem with Video loader and return HTMLMediaElement", async () => {
      //   expect.assertions(1);

      //   const item = items.get("mp4");
      //   mockFetch(item.src, "blob");

      //   const data = await Preloader.loadItem(item);
      //   expect(data).toBeInstanceOf(HTMLMediaElement);
      // });

      // it("should load a LoadItem with Audio loader and return HTMLMediaElement", async () => {
      //   expect.assertions(1);

      //   const item = items.get("mp3");
      //   mockFetch(item.src, "blob");

      //   const data = await Preloader.loadItem(item);
      //   expect(data).toBeInstanceOf(HTMLMediaElement);
      // });

      it("should load a LoadItem with body = arrayBuffer with Audio Loader and return an ArrayBuffer", async () => {
        expect.assertions(1);

        const item = items.get("mp3");
        mockFetch(item.src);
        item.body = "arrayBuffer";

        const data = await Preloader.loadItem(item);
        expect(data).toBeInstanceOf(ArrayBuffer);
      });

      it("should load a LoadItem with Xml Loader and return HTMLDocument", async () => {
        expect.assertions(1);

        const item = items.get("xml");
        mockFetch(item.src);

        const data = await Preloader.loadItem(item);
        expect(data).toBeInstanceOf(HTMLDocument);
      });

      it("should load a LoadItem with Text Loader and return String", async () => {
        expect.assertions(1);

        const item = items.get("txt");
        mockFetch(item.src);

        const data = await Preloader.loadItem(item);
        expect(data).toBe(expected.get("string"));
      });

      it("should check the font is loaded with FontFaceObserver", async () => {
        expect.assertions(1);

        const item = items.get("font");
        const data = await Preloader.loadItem(item);
        expect(data).toBe(expected.get("font"));
      });
    });

    describe("for edge cases", () => {
      it("should load a LoadItem without id with Default loader and return a string", async () => {
        expect.assertions(1);

        const item = items.get("default");
        mockFetch(item.src);

        const data = await Preloader.loadItem({ src: item.src });
        expect(data).toBe(expected.get("string"));
      });

      it("should load an array of LoadItem and update a loadedCount variable", async () => {
        expect.assertions(1);

        let itemsToLoad = Array.from(items.values()).filter(
          item => !excludes.includes(AsyncPreloader.getFileExtension(item.src))
        );
        itemsToLoad
          .filter(item => item.loader !== "Font")
          .forEach(item => mockFetch(item.src));

        let loadedCount = 0;
        async function preload() {
          await Promise.all(
            itemsToLoad.map(async item => {
              const data = await Preloader.loadItem(item);
              loadedCount++;
              // console.log(`Progress: ${100 * loadedCount / itemsToLoad.length}%`);
            })
          );
        }
        await preload();
        expect(loadedCount).toEqual(items.size - excludes.length); // TEMP: fix blob tests
      });
    });
  });

  describe("Static methods", () => {
    describe("Utils", () => {
      it("should return the file extension from file path", () => {
        const data = AsyncPreloader.getFileExtension("assets/json.json");
        expect(data).toBe("json");
      });

      it("should return null from file path with no extension", () => {
        const data = AsyncPreloader.getFileExtension("assets/default");
        expect(data).toBe(null);
      });

      it("should return file name from path", () => {
        const data = AsyncPreloader.getFileName("/rwrgw/Open Sans Regular");
        expect(data).toBe("Open Sans Regular");
      });
    });

    describe("Get loader key", () => {
      it("should return the loader from file extension", () => {
        const data = AsyncPreloader.getLoaderKey("json");
        expect(data).toBe("Json");
      });

      it("should return the default loader from null", () => {
        const data = AsyncPreloader.getLoaderKey(null);
        expect(data).toBe("Text");
      });
    });
  });
});
