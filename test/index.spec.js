/**
 * @jest-environment jsdom-latest
 */

import fs from "fs";
import path from "path";

import fetchMock from "fetch-mock";

import AsyncPreloader from "../src";

import { toArrayBuffer } from "./utils";

// Mock
const mockFetch = jest.fn((filePath, type) => {
  const file = path.resolve("test", filePath);
  let response;

  if (type) {
    response = fs.readFileSync(file);
  } else {
    response = fs.readFileSync(file, { encoding: "utf-8" });
  }

  fetchMock.get(filePath, response);
});

const unMockFetch = jest.fn(fetchMock.restore);

// Data
const items = new Map()
  .set("default", { id: "myDefaultFile", src: "assets/default" })
  .set("txt", { id: "myTextFile", src: "assets/text.txt" })
  .set("json", { id: "myJsonFile", src: "assets/json.json" })
  .set("jpg", { id: "myImageFile", src: "assets/image.jpg" })
  .set("mp4", { id: "myVideoFile", src: "assets/video.mp4" })
  .set("mp3", { id: "myAudioFile", src: "assets/audio.mp3" })
  .set("xml", { id: "myXmlFile", src: "assets/xml.xml" })
  .set("svg", { id: "mySvgFile", src: "assets/xml.svg" })
  .set("html", { id: "myHtmlFile", src: "assets/xml.html" })
  .set("font", { id: "myFont", src: "Open Sans Regular", loader: "Font" });

// Suite
describe("AsyncPreloader", () => {
  beforeEach(() => {});

  describe("File Loading", () => {
    beforeEach(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;
    });

    afterEach(() => {
      unMockFetch();
    });

    it("should load array of items", async () => {
      expect.assertions(1);

      let itemsToLoad = Array.from(items.values());
      itemsToLoad.forEach(item => {
        if (item.loader !== "Font") mockFetch(item.src);
      });

      // TEMP: fix blob tests
      const excludes = ["jpg", "mp4", "mp3"];
      itemsToLoad = itemsToLoad.filter(item =>
        !excludes.includes(AsyncPreloader.getFileExtension(item.src))
      );

      const data = await AsyncPreloader.loadItems(itemsToLoad);
      expect(data).toBeInstanceOf(Array);
    });

    it("should load default and return text", async () => {
      expect.assertions(1);

      const item = items.get("default");
      mockFetch(item.src);

      const data = await AsyncPreloader.loadItem(item);
      expect(data).toBe(`Default test\n`);
    });

    it("should load json and return Object", async () => {
      expect.assertions(1);

      const item = items.get("json");
      mockFetch(item.src);

      const data = await AsyncPreloader.loadItem(item);
      expect(data).toBeInstanceOf(Object);
    });

    // it("should load image and return HTMLMediaElement", async () => {
    //   expect.assertions(1);

    //   const item = items.get("png");
    //   mockFetch(src, "image/item.src);

    //   const data = await AsyncPreloader.loadItem(item);
    //   expect(data).toBeInstanceOf(HTMLMediaElement);
    // });

    // it("should load video and return HTMLMediaElement", async () => {
    //   expect.assertions(1);

    //   const item = items.get("mp4");
    //   mockFetch(src, "video/item.src");

    //   const data = await AsyncPreloader.loadItem(item);
    //   expect(data).toBeInstanceOf(HTMLMediaElement);
    // });

    // it("should load audio and return HTMLMediaElement", async () => {
    //   expect.assertions(1);

    //   const item = items.get("mp3");
    //   mockFetch(src, "audio/item.src");

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
      expect(data).toBe(`Test\n`);
    });

    it("should check font is loaded with FontFaceObserver", async () => {
      expect.assertions(1);

      const item = items.get("font");
      const data = await AsyncPreloader.loadItem(item);
      expect(data).toBe("Open Sans Regular");
    });


    it("should load default without id and return text", async () => {
      expect.assertions(1);

      const item = items.get("default");
      mockFetch(item.src);

      const data = await AsyncPreloader.loadItem({ src: item.src });
      expect(data).toBe(`Default test\n`);
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
