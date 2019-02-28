const util = require("util");

// implement your API here
const express = require("express");
const cors = require("cors");

const server = express();
server.use(express.json());
server.use(cors());
const port = 8000;

const userRoutes = require("./routes/users");
//all routes in userRoutes will be prefixed with `/api/users`
server.use("/api/users", userRoutes);

const WebSocketServer = require("ws").Server;
let wss = new WebSocketServer({ port: 40510, protocol: "nole-chat-protocol" });

const messageTypes = {
  connection: {},
  disconnect: {},
  chatMessage: {}
};

wss.on("connection", function connection(ws, req) {
  const ip = req.connection.remoteAddress;
  console.log(ip);

  ws.on("message", function incoming(msg) {
    console.log("received: %s", msg);
    const message = JSON.parse(msg);

    wss.clients.forEach(client => {
      client.OPEN
        ? client.send(
            JSON.stringify({
              ...message
            })
          )
        : null;
    });
  });

  // setInterval(() => {
  //   wss.clients.forEach(client => {
  //     client.OPEN
  //       ? ws.send(
  //           JSON.stringify({
  //             type: "interval",
  //             payload: {
  //               time: Date.now().toString()
  //             }
  //           })
  //         )
  //       : null;
  //   });
  // }, 1000);
});

// if (client !== ws && client.readyState === WebSocket.OPEN) {
//
// }

wss.on("close", function close() {
  console.log("disconnected");
});
wss.on("error", () => console.log("errored"));

//query string notes
server.get("/hobbits", (req, res) => {
  // query string parameters get added to req.query
  console.log(req.query); //localhost:8000/hobbits?sortby=name {sortby:name}
  const sortField = req.query.sortby || "id";
  const hobbits = [
    {
      id: 1,
      name: "Samwise Gamgee"
    },
    {
      id: 2,
      name: "Frodo Baggins"
    }
  ];

  // apply the sorting
  const response = hobbits.sort((a, b) =>
    a[sortField] < b[sortField] ? -1 : 1
  );

  res.status(200).json(response);
});

server.listen(port, () => {
  console.log(`starting server on ${port}`);
});
