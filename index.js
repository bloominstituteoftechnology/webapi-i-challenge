// set a port for the server
const port = "8000";
// import the db (data manager file)
const db = require("./data/db");
// imporer texpress in to the server api
const express = require("express");
// import cors to use local server and react connections
const cors = require("cors");

const server = express(); // instantiate an express server

server.use("cors");

/* 
  add new user
  ------------
  
  If the request body is missing the name or bio property:
    cancel the request.
    respond with HTTP status code 400 (Bad Request).
    return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.

  If the information about the user is valid:
    save the new user the the database.
    return HTTP status code 201 (Created).
    return the newly created user document.

  If there's an error while saving the user:
    cancel the request.
    respond with HTTP status code 500 (Server Error).
    return the following JSON object: { error: "There was an error while saving the user to the database" }.
*/
server.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
  db.insert(req.body)
    .then(users => res.status(201).json(users))
    .catch(err =>
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      })
    );
});

/*
  get all users
  -------------
  
  If there's an error in retrieving the users from the database:
    cancel the request.
    respond with HTTP status code 500.
    return the following JSON object: { error: "The users information could not be retrieved." }. 
*/
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => res.status(200).json(users))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." })
    );
});

// skeleton for get specific user based upon id TODO: add some status and error handling
server.get("/api/users/:id", (req, res) => {
  db.findById(req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(err =>
      res.json({ error: "The user information could not be retrieved." })
    );
});

// skeleton for delete user based upon id TODO: fill in logic
server.delete("/api/users/:id", (req, res) => {});

// listent to port using the server
server.listen(port, () =>
  console.log(`\n=== Server listening on port: ${port}`)
);
