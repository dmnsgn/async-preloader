import fetch from "node-fetch";
import { DOMParser } from "xmldom";

import { ArrayBufferToData } from "./utils";

global.DOMParser = DOMParser;
global.fetch = fetch;

URL.createObjectURL = blob => {
  let string;

  Object.getOwnPropertySymbols(blob).forEach(symbol => {
    if (blob[symbol].constructor === Buffer) {
      string = ArrayBufferToData.toBase64(blob[symbol]);
    }
  });

  return `blob:${string}`;
};
