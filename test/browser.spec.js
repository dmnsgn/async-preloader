/**
 * @jest-environment puppeteer
 */
import { jest } from "@jest/globals";
import "expect-puppeteer";

import { start } from "./server.js";
import { items } from "./data.js";

jest.setTimeout(50000);

describe("Browser", () => {
  let server;

  beforeAll(async () => {
    server = await start();

    await page.goto("http://localhost:3000");

    // page
    //   .on("console", (message) =>
    //     console.log(
    //       `${message.type().substr(0, 3).toUpperCase()} ${message.text()}`
    //     )
    //   )
    //   .on("pageerror", ({ message }) => console.log(message))
    //   .on("response", (response) =>
    //     console.log(`${response.status()} ${response.url()}`)
    //   )
    //   .on("requestfailed", (request) =>
    //     console.log(`${request.failure().errorText} ${request.url()}`)
    //   );
  });

  afterAll((done) => {
    server.close(done);
  });

  it("should load a LoadItem with Image loader and return HTMLImageElement", async () => {
    const result = await page.evaluate(async (item) => {
      const { default: Preloader } = await importShim("./lib/index.js");
      const data = await Preloader.loadItem(item);
      return data.constructor.name;
    }, items.get("jpg"));

    expect(result).toEqual("HTMLImageElement");
  });

  it.skip("should load a LoadItem with Video loader and return HTMLVideoElement", async () => {
    const result = await page.evaluate(async (item) => {
      const { default: Preloader } = await importShim("./lib/index.js");
      const data = await Preloader.loadItem(item);
      return data.constructor.name;
    }, items.get("mp4"));

    expect(result).toEqual("HTMLVideoElement");
  });

  it("should load a LoadItem with Audio loader and return HTMLAudioElement", async () => {
    const result = await page.evaluate(async (item) => {
      const { default: Preloader } = await importShim("./lib/index.js");
      const data = await Preloader.loadItem(item);
      return data.constructor.name;
    }, items.get("mp3"));

    expect(result).toEqual("HTMLAudioElement");
  });

  it("should load a LoadItem (ttf) with Font Loader and return FontFace", async () => {
    const result = await page.evaluate(async (item) => {
      const { default: Preloader } = await importShim("./lib/index.js");
      const data = await Preloader.loadItem(item);
      return {
        constructor: data.constructor.name,
        family: data.family,
      };
    }, items.get("font"));

    expect(result.constructor).toEqual("FontFace");
    expect(result.family).toEqual("myFont");
  });

  it("should load a LoadItem (ttf buffer) with Font Loader and return FontFace", async () => {
    const result = await page.evaluate(
      async (item) => {
        const { default: Preloader } = await importShim("./lib/index.js");
        const data = await Preloader.loadItem(item);
        return {
          constructor: data.constructor.name,
          family: data.family,
        };
      },
      { ...items.get("font"), body: "arrayBuffer" }
    );

    expect(result.constructor).toEqual("FontFace");
    expect(result.family).toEqual("myFont");
  });

  it("should load a LoadItem (font observer) with Font Loader and return FontFace", async () => {
    const item = items.get("fontface");
    await page.addStyleTag({
      content: /* css */ `@font-face {
  font-family: '${item.id}';
  src: url(${items.get("font").src}) format('truetype');
}`,
    });

    const result = await page.evaluate(async (item) => {
      const { default: Preloader } = await importShim("./lib/index.js");
      const data = await Preloader.loadItem(item);
      return data;
    }, item);

    expect(result).toEqual(item.id);
  });

  it("should cancel loading an array of LoadItem and return an AbortError", async () => {
    let itemsToLoad = Array.from(items.values());

    const result = await page.evaluate(async (items) => {
      const { default: Preloader } = await importShim("./lib/index.js");
      const controller = new AbortController();

      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 10);

      try {
        await Preloader.loadItems(
          items.map((item) => ({
            ...item,
            options: { ...(item.options || {}), signal: controller.signal },
          }))
        );
      } catch (error) {
        return error.name;
      } finally {
        clearTimeout(timeoutId);
      }

      return "NoError";
    }, itemsToLoad);

    expect(result).toEqual("AbortError");
  });
});
