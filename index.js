const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.send("Hello Worldd");
});

server.listen(8000, () =>
  console.log("API is running on port 8000")
);
