const express = require("express");
const Db = require("./data/db");
const server = express();
server.use(express.json());
const port = 8001;
server.listen(port, () => console.log("API Running"));

//GET Test
server.get("/", (request, response) => {
  response.send("TEST RESPONSE!");
});

//Get Users
server.get("/api/users", (request, response) => {
  Db.find()
    .then(users => {
      response.status(200).json(users);
    })
    .catch(error => {
      response
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

//POST User
// server.post()
