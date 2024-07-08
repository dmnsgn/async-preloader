/**
 * @jest-environment puppeteer
 */
import { jest } from "@jest/globals";
import "expect-puppeteer";
import pti from "puppeteer-to-istanbul";
import { getPortPromise } from "portfinder";

import { start } from "./server.js";
import { items, manifestSrc } from "./data.js";

jest.setTimeout(20000);

describe("Browser", () => {
  let server;
  let url;

  beforeAll(async () => {
    const port = await getPortPromise();
    server = await start({ port });

    url = `http://localhost:${port}`;

    await page.coverage.startJSCoverage();

    await page.goto(url);

    // page
    //   .on("console", async (message) => {
    //     if (message.text() !== "JSHandle@error") {
    //       console.log(
    //         `${message.type().substring(0, 3).toUpperCase()} ${message.text()}`,
    //       );
    //       return;
    //     }
    //     const messages = await Promise.all(
    //       message.args().map((arg) => arg.getProperty("message")),
    //     );
    //     console.log(
    //       `${message.type().substr(0, 3).toUpperCase()} error ${messages.filter(Boolean)}`,
    //     );
    //   })
    //   .on("pageerror", ({ message }) => console.log(message))
    //   .on("response", (response) =>
    //     console.log(`${response.status()} ${response.url()}`),
    //   )
    //   .on("requestfailed", (request) =>
    //     console.log(`${request.failure().errorText} ${request.url()}`),
    //   );
  });

  afterAll(async () => {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) return reject(error);
        resolve();
      });
    });

    const jsCoverage = await page.coverage.stopJSCoverage();
    pti.write(
      [...jsCoverage.filter((item) => item.url.startsWith(`${url}/lib`))],
      {
        includeHostname: false,
        storagePath: "./.nyc_output",
      },
    );
  });

  it("should load a LoadItem with Blob loader and return instanceof Blob", async () => {
    const result = await page.evaluate(async (item) => {
      const { default: Preloader } = await importShim("./lib/index.js");
      const data = await Preloader.loadBlob(item);
      return data.constructor.name;
    }, items.get("jpg"));

    expect(result).toEqual("Blob");
  });

  it("should load a LoadItem with Image loader and return HTMLImageElement", async () => {
    const result = await page.evaluate(async (item) => {
      const { default: Preloader } = await importShim("./lib/index.js");
      const data = await Preloader.loadItem(item);
      return data.constructor.name;
    }, items.get("jpg"));

    expect(result).toEqual("HTMLImageElement");
  });

  it("should load a LoadItem with Image loader and body Blob and return HTMLImageElement", async () => {
    const result = await page.evaluate(async (item) => {
      const { default: Preloader } = await importShim("./lib/index.js");
      const data = await Preloader.loadImage({ ...item, body: "blob" });
      return data.constructor.name;
    }, items.get("jpg"));

    expect(result).toEqual("HTMLImageElement");
  });

  it("should try to load a LoadItem (jpg) with Image loader and throw decode error", async () => {
    const result = await page.evaluate(async (item) => {
      const { default: Preloader } = await importShim("./lib/index.js");
      try {
        await Preloader.loadImage({
          ...item,
          src: item.src.replace(".jpg", "unknown.jpg"),
        });
      } catch (error) {
        return error.message;
      }
      return "Test didn't throw";
    }, items.get("jpg"));

    expect(result).toEqual("The source image cannot be decoded.");
  });

  it("should load a LoadItem with Image loader and body arrayBuffer and return ArrayBuffer", async () => {
    const result = await page.evaluate(async (item) => {
      const { default: Preloader } = await importShim("./lib/index.js");
      const data = await Preloader.loadImage({ ...item, body: "arrayBuffer" });
      return data.constructor.name;
    }, items.get("jpg"));

    expect(result).toEqual("ArrayBuffer");
  });

  it("should load a LoadItem with body = arrayBuffer with Image loader and return an ArrayBuffer", async () => {
    const result = await page.evaluate(async (item) => {
      const { default: Preloader } = await importShim("./lib/index.js");
      const data = await Preloader.loadItem({ ...item, body: "arrayBuffer" });
      return data.constructor.name;
    }, items.get("jpg"));

    expect(result).toEqual("ArrayBuffer");
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

  it("should load a LoadItem with body = arrayBuffer with Audio Loader and return an ArrayBuffer", async () => {
    const result = await page.evaluate(async (item) => {
      const { default: Preloader } = await importShim("./lib/index.js");
      const data = await Preloader.loadItem({ ...item, body: "arrayBuffer" });
      return data.constructor.name;
    }, items.get("mp3"));

    expect(result).toEqual("ArrayBuffer");
  });

  it("should load a LoadItem (xml) with Xml Loader and return Document", async () => {
    const result = await page.evaluate(async (item) => {
      const { default: Preloader } = await importShim("./lib/index.js");
      const data = await Preloader.loadItem(item);
      return {
        constructor: data.constructor.name,
      };
    }, items.get("xml"));

    expect(result.constructor).toEqual("XMLDocument");
    // expect(result.data).toEqual(expected.get("xml"));
  });

  it("should load a LoadItem (html) with Xml Loader and return Document", async () => {
    const result = await page.evaluate(async (item) => {
      const { default: Preloader } = await importShim("./lib/index.js");
      const data = await Preloader.loadItem(item);
      return {
        constructor: data.constructor.name,
      };
    }, items.get("html"));

    expect(result.constructor).toEqual("HTMLDocument");
    // expect(data).toEqual(expected.get("html"));
  });

  it("should load a LoadItem (svg) with Xml Loader and return Document", async () => {
    const result = await page.evaluate(async (item) => {
      const { default: Preloader } = await importShim("./lib/index.js");
      const data = await Preloader.loadItem(item);
      return {
        constructor: data.constructor.name,
      };
    }, items.get("svg"));

    expect(result.constructor).toEqual("XMLDocument");
    // expect(data).toEqual(expected.get("svg"));
  });

  it("should load a LoadItem (svg file with a special extension) with Xml Loader and return Document", async () => {
    const result = await page.evaluate(async (item) => {
      const { default: Preloader } = await importShim("./lib/index.js");
      const data = await Preloader.loadItem(item);
      return {
        constructor: data.constructor.name,
      };
    }, items.get("defaultXml"));

    expect(result.constructor).toEqual("XMLDocument");
    // expect(data).toEqual(expected.get("xml"));
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

  it("should load a LoadItem (ttf) by src only with Font Loader and return FontFace", async () => {
    const result = await page.evaluate(
      async (item) => {
        const { default: Preloader } = await importShim("./lib/index.js");
        const data = await Preloader.loadItem(item);
        return {
          constructor: data.constructor.name,
          family: data.family,
        };
      },
      { src: items.get("font").src },
    );

    expect(result.constructor).toEqual("FontFace");
    expect(result.family).toEqual("font");
  });

  it("should load a LoadItem (ttf buffer) with Font Loader and return FontFace", async () => {
    const result = await page.evaluate(async (item) => {
      const { default: Preloader } = await importShim("./lib/index.js");
      const data = await Preloader.loadItem({ ...item, body: "arrayBuffer" });
      return {
        constructor: data.constructor.name,
        family: data.family,
      };
    }, items.get("font"));

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

  it("should load a manifest, load its items and return an array of LoadedValue", async () => {
    const result = await page.evaluate(async (item) => {
      const { default: Preloader } = await importShim("./lib/index.js");
      const data = await Preloader.loadManifest(item);
      return data;
    }, `${url}/${manifestSrc}`);

    expect(result).toHaveLength(7);
    // expect(result).toEqual(
    //   expect.arrayContaining(Array.from(expected.values()))
    // );
  });

  it("should load a manifest with a specified data path, load its items and return an array of LoadedValue", async () => {
    const result = await page.evaluate(async (item) => {
      const { default: Preloader } = await importShim("./lib/index.js");
      const data = await Preloader.loadManifest(item, "custom.path");
      return data;
    }, `${url}/${manifestSrc}`);

    expect(result).toHaveLength(7);
    // expect(result).toEqual(
    //   expect.arrayContaining(Array.from(expected.values()))
    // );
  });

  it("should cancel loading an array of LoadItem and return an CancelLoading", async () => {
    let itemsToLoad = Array.from(items.values());

    const result = await page.evaluate(async (items) => {
      const { default: Preloader } = await importShim("./lib/index.js");

      const controller = new AbortController();
      const { signal } = controller;

      const load = async () => {
        try {
          await Preloader.loadItems(
            items.map((item) => ({
              ...item,
              options: {
                ...(item.options || {}),
                signal,
              },
            })),
          );
        } catch (error) {
          return error;
        }
        return "NoError";
      };

      const results = await Promise.allSettled([
        (async () => {
          controller.abort("CancelLoading");
        })(),
        load(),
      ]);

      return results[1].value;
    }, itemsToLoad);

    console.log("result", result);

    expect(result).toEqual("CancelLoading");
  });
});
