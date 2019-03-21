require("dotenv").config();
const express = require("express");
const server = express();
const morgan = require("morgan");
const port = process.env.PORT || 5000;
const db = require("./data/db");
server.use(express.json()).use(morgan("dev"));

//sets up server and shows it's running
server.get("/", (req, res) => {
  res.status(200).send("Hello");
});
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
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

// Returns an array of all the user objects contained in the database.
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

// Returns the user object with the specified id.
// When the client makes a GET request to /api/users/:id:
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.users
    .findById(id)
    //     If the user with the specified id is not found:
    //         return HTTP status code 404 (Not Found).
    //         return the following JSON object: { message: "The user with the specified ID does not exist." }
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    //     If there's an error in retrieving the user from the database:
    //         cancel the request.
    //         respond with HTTP status code 500.
    //         return the following JSON object: { error: "The user information could not be retrieved." }.
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

// Removes the user with the specified id and returns the deleted user.
// When the client makes a DELETE request to /api/users/:id:
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.users
    .remove(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        //     If the user with the specified id is not found:
        //         return HTTP status code 404 (Not Found).
        //         return the following JSON object: { message: "The user with the specified ID does not exist." }.
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    //     If there's an error in removing the user from the database:
    //         cancel the request.
    //         respond with HTTP status code 500.
    //         return the following JSON object: { error: "The user could not be removed" }.
    .catch(error => {
      res.status(500).json({ error: "The user could not be removed" });
    });
});

//Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.
// When the client makes a PUT request to /api/users/:id:
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  //     If the request body is missing the name or bio property:
  //         cancel the request.
  //         respond with HTTP status code 400 (Bad Request).
  //         return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.
  if (!changes.name || !changes.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
  db.users
    .update(id, changes)
    .then(updatedUser => {
      //     If the user is found and the new information is valid:
      //         update the user document in the database using the new information sent in the reques body.
      //         return HTTP status code 200 (OK).
      //         return the newly updated user document.
      if (updatedUser) {
        res.status(200).json(changes);

        //     If the user with the specified id is not found:
        //         return HTTP status code 404 (Not Found).
        //         return the following JSON object: { message: "The user with the specified ID does not exist." }
      } else {
        res
          .status(404)
          .json({ error: "The user information could not be modified." });
      }
    })

    //     If there's an error in retrieving the user from the database:
    //         cancel the request.
    //         respond with HTTP status code 500.
    //         return the following JSON object: { error: "The user information could not be retrieved." }.
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});
