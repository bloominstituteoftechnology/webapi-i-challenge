const express = require("express");

const db = require("./data/db");

const server = express();

server.use(express.json());

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json({ success: true, users });
    })
    .catch(err => {
      res.status(errr.code).json({ success: false, message: err.message });
    });
});

server.listen(4000, () => {
  console.log("/n***Listening on port 4000***/n");
});
