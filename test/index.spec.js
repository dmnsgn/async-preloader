import { getPortPromise } from "portfinder";

import Preloader, { AsyncPreloader } from "../src";
import {
  items as dataItems,
  expectedNode,
  getNodeSupportedItems,
} from "./data.js";
import { start } from "./server.js";

// Suite
describe("AsyncPreloader", () => {
  let server;
  let url;
  let items;

  beforeAll(async () => {
    const port = await getPortPromise();
    server = await start({ port });

    url = `http://localhost:${port}`;

    items = new Map(
      Array.from(dataItems, ([key, value]) => [
        key,
        { ...value, src: `${url}/${value.src}` },
      ])
    );
  });

  afterAll(async () => {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) return reject(error);
        resolve();
      });
    });
  });

  describe("Loader", () => {
    afterEach(() => {
      Preloader.items.clear();
    });

    describe("for several items", () => {
      it("should load an array of LoadItem and return an array of LoadedValue", async () => {
        expect.assertions(3);

        const itemsToLoad = getNodeSupportedItems(items);
        const data = await Preloader.loadItems(itemsToLoad);

        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(itemsToLoad.length);
        expect(data).toEqual(
          expect.arrayContaining(Array.from(expectedNode.values()))
        );
      });
      it("should load an array of strings and return an array of LoadedValue", async () => {
        expect.assertions(3);

        const itemsToLoad = getNodeSupportedItems(items);
        const data = await Preloader.loadItems(
          itemsToLoad.map(({ src }) => src)
        );

        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(itemsToLoad.length);
        expect(data).toEqual(
          expect.arrayContaining(Array.from(expectedNode.values()))
        );
      });
    });

    describe("for default fetch methods", () => {
      it("should load a LoadItem with Json loader and return the JSON Object", async () => {
        expect.assertions(1);

        const item = items.get("json");

        const data = await Preloader.loadJson(item);
        expect(data).toEqual(expectedNode.get("json"));
      });

      it("should load a LoadItem with Text loader and return the string", async () => {
        expect.assertions(1);

        const item = items.get("txt");

        const data = await Preloader.loadText(item);
        expect(data).toBe(expectedNode.get("string"));
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

      it.skip("should load a LoadItem with FormData loader and return instanceof FormData", async () => {
        expect.assertions(1);

        const formData = new FormData();
        formData.set("greeting", "Hello, world!");

        const item = {
          src: "https://httpbin.org/post",
          options: {
            method: "POST",
            body: new URLSearchParams(formData),
          },
        };

        const data = await Preloader.loadFormData(item);

        expect(data.constructor.name).toEqual(FormData.name);
      });
    });

    describe("for a single item", () => {
      it("should load a LoadItem with Default loader and return a string", async () => {
        expect.assertions(1);

        const item = items.get("default");

        const data = await Preloader.loadItem(item);
        expect(data).toBe(expectedNode.get("string"));
      });

      it("should load a LoadItem with Json loader and return the JSON Object", async () => {
        expect.assertions(1);

        const item = items.get("json");

        const data = await Preloader.loadItem(item);
        expect(data).toEqual(expectedNode.get("json"));
      });

      it("should load a LoadItem with body = arrayBuffer with Audio Loader and return an ArrayBuffer", async () => {
        expect.assertions(1);

        const item = items.get("mp3");
        item.body = "arrayBuffer";

        const data = await Preloader.loadItem(item);
        expect(data.constructor.name).toEqual(ArrayBuffer.name);
      });
      it("should load a LoadItem with Text Loader and return String", async () => {
        expect.assertions(1);

        const item = items.get("txt");

        const data = await Preloader.loadItem(item);
        expect(data).toBe(expectedNode.get("string"));
      });

      it("should try to load a LoadItem (ttf) with FontFace Loader and throw", async () => {
        expect.assertions(1);

        await expect(Preloader.loadItem(items.get("font"))).rejects.toThrow(
          "FontFace is not defined"
        );
      });
    });

    describe("for edge cases", () => {
      it("should load a LoadItem without id with Default loader and return a string", async () => {
        expect.assertions(1);

        const item = items.get("default");

        const data = await Preloader.loadItem({ src: item.src });
        expect(data).toBe(expectedNode.get("string"));
      });

      it("should load an array of LoadItem and update a loadedCount variable", async () => {
        expect.assertions(1);

        const itemsToLoad = getNodeSupportedItems(items);

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
        expect(loadedCount).toEqual(itemsToLoad.length);
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
