const express = require("express");
const server = express();
const morgan = require("morgan");
port = 8000;
const db = require("./data/db");
server.use(express.json()).use(morgan("dev"));

//sets up server and shows it's running
server.get("/", (req, res) => {
  res.status(200).send("Hello");
});
server.listen(port, () => {
  console.log("server is listening");
});

// Creates a user using the information sent inside the request body.
// When the client makes a POST request to /api/users:
server.post("/api/users", (req, res) => {
  const user = req.body;
  db.users
    .insert(user)
    //     If the information about the user is valid:
    //         save the new user the the database.
    //         return HTTP status code 201 (Created).
    //         return the newly created user document.
    .then(user => res.status(201).json({ user }))
    .catch(error => {
      //     If the request body is missing the name or bio property:
      //         cancel the request.
      //         respond with HTTP status code 400 (Bad Request).
      //         return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.
      if (user.name === undefined || user.bio === undefined) {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." });
      } else {
        //     If there's an error while saving the user:
        //         cancel the request.
        //         respond with HTTP status code 500 (Server Error).
        //         return the following JSON object: { error: "There was an error while saving the user to the database" }.
        res.status(500).json({
          error: "There was an error while saving the user to the database"
        });
      }
    });
});

// GET	/api/users	Returns an array of all the user objects contained in the database.
// When the client makes a GET request to /api/users:
server.get("/api/users", (req, res) => {
  db.users
    .find()
    .then(users => {
      res.status(200).json({ success: true, users });
    })
    //     If there's an error in retrieving the users from the database:
    //         cancel the request.
    //         respond with HTTP status code 500.
    //         return the following JSON object: { error: "The users information could not be retrieved." }.
    .catch(error => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

// GET	/api/users/:id	Returns the user object with the specified id.

// When the client makes a GET request to /api/users/:id:

//     If the user with the specified id is not found:
//         return HTTP status code 404 (Not Found).
//         return the following JSON object: { message: "The user with the specified ID does not exist." }.

//     If there's an error in retrieving the user from the database:
//         cancel the request.
//         respond with HTTP status code 500.
//         return the following JSON object: { error: "The user information could not be retrieved." }.
server.get("/api/users/:id", (req, res) => {
  db.users
    .findById(id)
    .then()
    .catch();
});

//TODO:

// DELETE	/api/users/:id	Removes the user with the specified id and returns the deleted user.
// PUT	/api/users/:id	Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.

// When the client makes a DELETE request to /api/users/:id:

//     If the user with the specified id is not found:
//         return HTTP status code 404 (Not Found).
//         return the following JSON object: { message: "The user with the specified ID does not exist." }.

//     If there's an error in removing the user from the database:
//         cancel the request.
//         respond with HTTP status code 500.
//         return the following JSON object: { error: "The user could not be removed" }.

// When the client makes a PUT request to /api/users/:id:

//     If the user with the specified id is not found:
//         return HTTP status code 404 (Not Found).
//         return the following JSON object: { message: "The user with the specified ID does not exist." }.

//     If the request body is missing the name or bio property:
//         cancel the request.
//         respond with HTTP status code 400 (Bad Request).
//         return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.

//     If there's an error when updating the user:
//         cancel the request.
//         respond with HTTP status code 500.
//         return the following JSON object: { error: "The user information could not be modified." }.

//     If the user is found and the new information is valid:
//         update the user document in the database using the new information sent in the reques body.
//         return HTTP status code 200 (OK).
//         return the newly updated user document.
