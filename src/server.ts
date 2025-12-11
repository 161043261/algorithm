import { createServer, IncomingMessage, ServerResponse } from "http";

interface Message {
  message: string;
}

function middlewareCORS(
  handler: (req: IncomingMessage, res: ServerResponse) => void,
): (req: IncomingMessage, res: ServerResponse) => void {
  return (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS",
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

    if (req.method === "OPTIONS") {
      res.writeHead(200);
      res.end();
      return;
    }
    handler(req, res);
  };
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.url === "/api/v1/message") {
    const handler = middlewareCORS((_req, res) => {
      res.setHeader("Content-Type", "application/json");
      const message: Message = { message: "Hello, TypeScript!" };
      res.writeHead(200);
      res.end(JSON.stringify(message));
    });
    handler(req, res);
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("http://localhost:3000");
});
