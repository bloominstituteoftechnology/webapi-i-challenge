const express = require("express");

const server = express();

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

//configure routing/endpoints
server.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

server.get("/hobbits", (req, res) => {
  res.send(hobbits);
  res.status(200).json(hobbits);
});

server.get("/hobbits", (req, res) => {});

server.listen(8000, () => console.log("API RUNNING ON PORT 8000..."));
