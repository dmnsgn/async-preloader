import { readFile } from "node:fs/promises";
import http from "node:http";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import mime from "mime-types";

const __dirname = dirname(fileURLToPath(import.meta.url));

const start = async ({ hostname = "localhost", port = 3000 } = {}) => {
  const server = http.createServer(async (req, res) => {
    if (req.url === "/") req.url = "/index.html";

    try {
      const data = await readFile(join(__dirname, "..", req.url));
      res.writeHead(200, { "Content-Type": mime.lookup(req.url) });
      res.end(data);
      return;
    } catch (error) {
      if (error) {
        res.writeHead(404);
        res.end(JSON.stringify(error));
        return;
      }
    }
  });

  return new Promise((resolve, reject) => {
    server.listen(port, hostname, (error) => {
      if (error) return reject(error);
      console.log(`Server running at http://${hostname}:${port}/`);
      resolve(server);
    });
  });
};

export { start };
