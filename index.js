const express = require("express");
const server = express();
port = 8000;
const db = require("./data/db");

server.get("/", (req, res) => {
  res.status(200).send("Hello");
});
server.listen(port, () => {
  console.log("server is listening");
});

//TODO:
// Inside index.js add the code necessary to implement the following endpoints:
//
// Method	URL	Description
// POST	/api/users	Creates a user using the information sent inside the request body.
// GET	/api/users	Returns an array of all the user objects contained in the database.
// GET	/api/users/:id	Returns the user object with the specified id.
// DELETE	/api/users/:id	Removes the user with the specified id and returns the deleted user.
// PUT	/api/users/:id	Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.

server.get("/api/users", (req, res) => {
  db.users
    .find()
    .then(users => {
      res.status(200).json({ success: true, users });
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});
