import "isomorphic-fetch";

import { ArrayBufferToData } from "./utils";

URL.createObjectURL = blob => {
  let string;

  Object.getOwnPropertySymbols(blob).forEach(symbol => {
    if (blob[symbol].constructor === Buffer) {
      string = ArrayBufferToData.toBase64(blob[symbol]);
    }
  });

  return `blob:${string}`;
};
