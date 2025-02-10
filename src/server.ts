import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { WebSocketServer } from "ws";

const dev = process.env.NODE_ENV != "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT ?? 8000;

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  const wss = new WebSocketServer({ port:Number(process.env.WS_PORT as string) ?? 8080 });

  wss.on("connection", (ws) => {
    console.log("New WebSocket connection");

    ws.on("message", (message) => {
      console.log("Received:", message.toString());
      ws.send("Hello from server!");
    });
  });
//
  server.listen(port, () => {
    console.log(`✅ Ready on ${process.env.NEXT_PUBLIC_BASE_URL}:${port}`);
  });
});
