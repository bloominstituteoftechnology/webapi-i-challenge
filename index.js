const data = require("./data/db");

const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.send("Hello Worldd");
});

server.get("/api/users", (req, res) => {
  data
    .find()
    .then(response => res.status(200).json(response))
    .catch(err =>
      res
        .status(500)
        .json({
          error:
            "The users information could not be retrieved"
        })
    );
});

server.post("/api/users", (req, res) => {
  data.find();
});

server.listen(8000, () =>
  console.log("API is running on port 8000")
);
