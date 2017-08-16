import fs from "fs";
import path from "path";

import fetchMock from "fetch-mock";

const bufferExtensions = [".jpg", ".mp4", ".mp3"];

const getResponse = filePath => {
  const absoluteFilePath = path.resolve("test", filePath);
  const extension = path.extname(filePath);
  const buffer = bufferExtensions.includes(extension);

  if (buffer) return fs.readFileSync(absoluteFilePath);

  return fs.readFileSync(absoluteFilePath, { encoding: "utf-8" });
};

export const mockFetch = jest.fn(filePath => {
  const response = getResponse(filePath);
  fetchMock.get(filePath, response);

  try {
    const items = JSON.parse(response).items;
    items.forEach(item => {
      if (item.loader !== "Font") {
        fetchMock.get(item.src, getResponse(item.src));
      }
    });
  } catch (e) {}
});

export const unmockFetch = jest.fn(fetchMock.restore);
