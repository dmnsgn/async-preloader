import Preloader, { AsyncPreloader } from "../src/";
import { items, expected, fontItem, manifestSrc } from "./data.js";

const excludes = ["jpg", "mp4", "mp3"];

// Suite
describe("AsyncPreloader", () => {
  describe("Loader", () => {
    afterEach(() => {
      Preloader.items.clear();
    });

    describe("for several items", () => {
      it("should load an array of LoadItem and return an array of LoadedValue", async () => {
        expect.assertions(3);

        let itemsToLoad = Array.from(items.values()).filter(
          (item) =>
            AsyncPreloader.getFileExtension(item.src) === null ||
            !excludes.includes(AsyncPreloader.getFileExtension(item.src))
        );

        const data = await Preloader.loadItems(itemsToLoad);

        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(items.size - excludes.length); // TEMP: fix blob tests
        expect(data).toEqual(
          expect.arrayContaining(Array.from(expected.values()))
        );
      });

      it("should load a manifest, load its items and return an array of LoadedValue", async () => {
        expect.assertions(3);

        const data = await Preloader.loadManifest(manifestSrc);

        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(items.size - excludes.length); // TEMP: fix blob tests
        expect(data).toEqual(
          expect.arrayContaining(Array.from(expected.values()))
        );
      });

      it("should load a manifest with a specified data path, load its items and return an array of LoadedValue", async () => {
        expect.assertions(3);

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

        const data = await Preloader.loadJson(item);
        expect(data).toEqual(expected.get("json"));
      });

      it("should load a LoadItem with Text loader and return the string", async () => {
        expect.assertions(1);

        const item = items.get("txt");

        const data = await Preloader.loadText(item);
        expect(data).toBe(expected.get("string"));
      });

      it("should load a LoadItem with ArrayBuffer loader and return instanceof ArrayBuffer", async () => {
        expect.assertions(1);

        const item = items.get("mp3");

        const data = await Preloader.loadArrayBuffer(item);
        expect(data.constructor.name).toEqual(ArrayBuffer.name);
      });

      it("should load a LoadItem with Blob loader and return instanceof Blob", async () => {
        expect.assertions(1);

        const item = items.get("jpg");

        const data = await Preloader.loadBlob(item);

        expect(data.constructor.name).toEqual(Blob.name);
      });

      // it("should load a LoadItem with FormData loader and return instanceof FormData", async () => {
      //   expect.assertions(1);

      //   const formData = new FormData();
      //   formData.set("greeting", "Hello, world!");

      //   const item = {
      //     src: "https://httpbin.org/post",
      //     options: {
      //       method: "POST",
      //       body: formData,
      //     },
      //   };

      //   const data = await Preloader.loadFormData(item);

      //   expect(data.constructor.name).toEqual(FormData.name);
      // });
    });

    describe("for a single item", () => {
      it("should load a LoadItem with Default loader and return a string", async () => {
        expect.assertions(1);

        const item = items.get("default");

        const data = await Preloader.loadItem(item);
        expect(data).toBe(expected.get("string"));
      });

      it("should load a LoadItem with Json loader and return the JSON Object", async () => {
        expect.assertions(1);

        const item = items.get("json");

        const data = await Preloader.loadItem(item);
        expect(data).toEqual(expected.get("json"));
      });

      // it("should load a LoadItem with Image loader and return HTMLMediaElement", async () => {
      //   expect.assertions(1);

      //   const item = items.get("jpg");

      //   const data = await Preloader.loadItem(item);
      //   // console.log(data.constructor)
      //   expect(data).toBeInstanceOf(HTMLMediaElement);
      // });

      // it("should load a LoadItem with Video loader and return HTMLMediaElement", async () => {
      //   expect.assertions(1);

      //   const item = items.get("mp4");

      //   const data = await Preloader.loadItem(item);
      //   expect(data).toBeInstanceOf(HTMLMediaElement);
      // });

      // it("should load a LoadItem with Audio loader and return HTMLMediaElement", async () => {
      //   expect.assertions(1);

      //   const item = items.get("mp3");

      //   const data = await Preloader.loadItem(item);
      //   expect(data).toBeInstanceOf(HTMLMediaElement);
      // });

      it("should load a LoadItem with body = arrayBuffer with Audio Loader and return an ArrayBuffer", async () => {
        expect.assertions(1);

        const item = items.get("mp3");
        item.body = "arrayBuffer";

        const data = await Preloader.loadItem(item);
        expect(data.constructor.name).toEqual(ArrayBuffer.name);
      });

      it("should load a LoadItem (xml) with Xml Loader and return Document", async () => {
        expect.assertions(2);

        const item = items.get("xml");

        const data = await Preloader.loadItem(item);
        expect(data.constructor.name).toEqual(Document.name);
        expect(data).toEqual(expected.get("xml"));
      });

      it("should load a LoadItem (html) with Xml Loader and return Document", async () => {
        expect.assertions(2);

        const item = items.get("html");

        const data = await Preloader.loadItem(item);
        expect(data.constructor.name).toEqual(Document.name);
        expect(data).toEqual(expected.get("html"));
      });

      it("should load a LoadItem (svg) with Xml Loader and return Document", async () => {
        expect.assertions(2);

        const item = items.get("svg");

        const data = await Preloader.loadItem(item);
        expect(data.constructor.name).toEqual(Document.name);
        expect(data).toEqual(expected.get("svg"));
      });

      it("should load a LoadItem (svg file with a special extension) with Xml Loader and return Document", async () => {
        expect.assertions(2);

        const item = items.get("defaultXml");

        const data = await Preloader.loadItem(item);
        expect(data.constructor.name).toEqual(Document.name);
        expect(data).toEqual(expected.get("xml"));
      });

      it("should load a LoadItem with Text Loader and return String", async () => {
        expect.assertions(1);

        const item = items.get("txt");

        const data = await Preloader.loadItem(item);
        expect(data).toBe(expected.get("string"));
      });

      it("should check the font with id, src, and loader, fails to load as it is not supported in Node", async () => {
        expect.assertions(1);

        await expect(Preloader.loadItem(fontItem)).rejects.toThrow(
          "3000ms timeout exceeded"
        );
      });
    });

    describe("for edge cases", () => {
      it("should load a LoadItem without id with Default loader and return a string", async () => {
        expect.assertions(1);

        const item = items.get("default");

        const data = await Preloader.loadItem({ src: item.src });
        expect(data).toBe(expected.get("string"));
      });

      it("should load an array of LoadItem and update a loadedCount variable", async () => {
        expect.assertions(1);

        let itemsToLoad = Array.from(items.values()).filter(
          (item) =>
            !excludes.includes(AsyncPreloader.getFileExtension(item.src))
        );
        itemsToLoad.filter((item) => item.loader !== "Font");

        let loadedCount = 0;
        async function preload() {
          await Promise.all(
            itemsToLoad.map(async (item) => {
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
