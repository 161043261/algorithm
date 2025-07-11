// const http = require("http");
// const fs = require("fs");
// const path = require("path");
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const server = http.createServer((req, res) => {
  let filePath = "." + req.url;
  if (filePath === "./") {
    filePath = "./index.html";
  }
  const extname = path.extname(filePath);
  const contentTypeMap = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".mp4": "video/mp4",
    ".mp3": "video/mp3",
  };
  const contentType = contentTypeMap[extname] || "application/octet-stream";
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === "ENOENT") {
        res.writeHead(404);
        res.end("404 Not Found");
      } else {
        res.writeHead(500);
        res.end("500 Internal Server Error" + error.code);
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });
});

const port = 3333;
server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}/`);
});
