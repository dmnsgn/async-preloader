/**
 * @jest-environment jsdom-latest
 */

import fs from "fs";
import path from "path";

import fetchMock from "fetch-mock";

import AsyncPreloader from "../src";

import { toArrayBuffer } from "./utils";

const mockFetch = jest.fn((filePath, type) => {
  const file = path.resolve("test", filePath);
  let response;

  if (type) {
    response = fs.readFileSync(file);
  } else {
    response = fs.readFileSync(file, { encoding: "utf-8" });
  }

  fetchMock.get("*", response);
});

const unMockFetch = jest.fn(fetchMock.restore);

describe("AsyncPreloader", () => {
  beforeEach(() => {});

  describe("File Loading", () => {
    beforeEach(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;
    });

    afterEach(() => {
      unMockFetch();
    });

    it("should load json and return Object", async () => {
      expect.assertions(1);

      const src = "assets/json.json";
      mockFetch(src);

      const data = await AsyncPreloader.loadItem({ src });
      expect(data).toBeInstanceOf(Object);
    });

    it("should load xml and return HTMLDocument", async () => {
      expect.assertions(1);

      const src = "assets/xml.xml";
      mockFetch(src);

      const data = await AsyncPreloader.loadItem({ src });
      expect(data).toBeInstanceOf(HTMLDocument);
    });

    it("should load text and return String", async () => {
      expect.assertions(1);

      const src = "assets/text.txt";
      mockFetch(src);

      const data = await AsyncPreloader.loadItem({ src });
      expect(data).toBe(`Test
`);
    });

    // it("should load audio and return HTMLMediaElement", async () => {
    //   expect.assertions(1);

    //   const src = "assets/audio.mp3";
    //   mockFetch(src, "audio/mpeg");

    //   const data = await AsyncPreloader.loadItem({ src });
    //   expect(data).toBeInstanceOf(HTMLMediaElement);
    // });

    // it("should load image and return HTMLMediaElement", async () => {
    //   expect.assertions(1);

    //   const src = "assets/image.png";
    //   mockFetch(src, "image/png");

    //   const data = await AsyncPreloader.loadItem({ src });
    //   expect(data).toBeInstanceOf(HTMLMediaElement);
    // });
  });
});
