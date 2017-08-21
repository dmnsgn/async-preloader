/**
 * @jest-environment jsdom-latest
 */
import AsyncPreloader from "../src";
import { items, expected, manifestSrc } from "./data";
import { mockFetch, unmockFetch } from "./mock";

// Suite
describe("AsyncPreloader", () => {
  beforeEach(() => {});

  describe("File Loading", () => {
    beforeEach(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;
    });

    afterEach(() => {
      AsyncPreloader.items.clear();
      unmockFetch();
    });

    it("should load array of items", async () => {
      expect.assertions(3);

      let itemsToLoad = Array.from(items.values());
      itemsToLoad.forEach(item => {
        if (item.loader !== "Font") mockFetch(item.src);
      });

      // TEMP: fix blob tests
      const excludes = ["jpg", "mp4", "mp3"];
      itemsToLoad = itemsToLoad.filter(
        item => !excludes.includes(AsyncPreloader.getFileExtension(item.src))
      );

      const data = await AsyncPreloader.loadItems(itemsToLoad);
      expect(data).toBeInstanceOf(Array);
      expect(data).toHaveLength(items.size - 3); // TEMP: fix blob tests
      expect(data).toEqual(
        expect.arrayContaining(Array.from(expected.values()))
      );
    });

    it("should load default and return text", async () => {
      expect.assertions(1);

      const item = items.get("default");
      mockFetch(item.src);

      const data = await AsyncPreloader.loadItem(item);
      expect(data).toBe(expected.get("string"));
    });

    it("should load json and return Object", async () => {
      expect.assertions(1);

      const item = items.get("json");
      mockFetch(item.src);

      const data = await AsyncPreloader.loadItem(item);
      expect(data).toEqual(expected.get("json"));
    });

    // it("should load image and return HTMLMediaElement", async () => {
    //   expect.assertions(1);

    //   const item = items.get("jpg");
    //   mockFetch(item.src);

    //   const data = await AsyncPreloader.loadItem(item);
    //   expect(data).toBeInstanceOf(HTMLMediaElement);
    // });

    // it("should load video and return HTMLMediaElement", async () => {
    //   expect.assertions(1);

    //   const item = items.get("mp4");
    //   mockFetch(item.src);

    //   const data = await AsyncPreloader.loadItem(item);
    //   expect(data).toBeInstanceOf(HTMLMediaElement);
    // });

    // it("should load audio and return HTMLMediaElement", async () => {
    //   expect.assertions(1);

    //   const item = items.get("mp3");
    //   mockFetch(item.src);

    //   const data = await AsyncPreloader.loadItem(item);
    //   expect(data).toBeInstanceOf(HTMLMediaElement);
    // });

    it("should load xml and return HTMLDocument", async () => {
      expect.assertions(1);

      const item = items.get("xml");
      mockFetch(item.src);

      const data = await AsyncPreloader.loadItem(item);
      expect(data).toBeInstanceOf(HTMLDocument);
    });

    it("should load text and return String", async () => {
      expect.assertions(1);

      const item = items.get("txt");
      mockFetch(item.src);

      const data = await AsyncPreloader.loadItem(item);
      expect(data).toBe(expected.get("string"));
    });

    it("should check font is loaded with FontFaceObserver", async () => {
      expect.assertions(1);

      const item = items.get("font");
      const data = await AsyncPreloader.loadItem(item);
      expect(data).toBe(expected.get("font"));
    });

    it("should load default without id and return text", async () => {
      expect.assertions(1);

      const item = items.get("default");
      mockFetch(item.src);

      const data = await AsyncPreloader.loadItem({ src: item.src });
      expect(data).toBe(expected.get("string"));
    });

    it("should load manifest, load its items and return the items", async () => {
      expect.assertions(3);

      mockFetch(manifestSrc);

      const data = await AsyncPreloader.loadManifest(manifestSrc);
      expect(data).toBeInstanceOf(Array);
      expect(data).toHaveLength(items.size - 3); // TEMP: fix blob tests
      expect(data).toEqual(
        expect.arrayContaining(Array.from(expected.values()))
      );
    });

    it("should load items and update a loadedCount variable", async () => {
      expect.assertions(1);

      let itemsToLoad = Array.from(items.values());
      itemsToLoad.forEach(item => {
        if (item.loader !== "Font") mockFetch(item.src);
      });

      // TEMP: fix blob tests
      const excludes = ["jpg", "mp4", "mp3"];
      itemsToLoad = itemsToLoad.filter(
        item => !excludes.includes(AsyncPreloader.getFileExtension(item.src))
      );

      let loadedCount = 0;
      async function preload() {
        await Promise.all(
          itemsToLoad.map(async item => {
            const data = await AsyncPreloader.loadItem(item);
            loadedCount++;
            console.log(loadedCount / itemsToLoad.length, data);
          })
        );
      }
      await preload();

      expect(loadedCount).toEqual(items.size - 3);
    });
  });

  describe("Utils functions", () => {
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
      expect(data).toBe("Default");
    });
  });
});
