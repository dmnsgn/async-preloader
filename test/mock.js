import fs from "fs";
import path from "path";

import fetchMock from "fetch-mock";

export const mockFetch = jest.fn((filePath, type) => {
  let response;

  const absoluteFilePath = path.resolve("test", filePath);
  if (type == "blob") {
    response = new Blob([Uint8Array.from(fs.readFileSync(absoluteFilePath))]);
  } else if (type == "arrayBuffer") {
    response = Uint8Array.from(fs.readFileSync(absoluteFilePath)).buffer;
  } else {
    response = fs.readFileSync(absoluteFilePath, { encoding: "utf-8" });
  }

  fetchMock.get(filePath, {
    body: response,
    sendAsJson: false
  });
});

export const unmockFetch = jest.fn(fetchMock.restore);
