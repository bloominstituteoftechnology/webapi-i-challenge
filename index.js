const express = require("express");
const Database = require("./data/db");
const server = express();
server.use(express.json());
const port = 8001;
server.listen(port, () => console.log("API Running"));

//GET Test
server.get("/", (request, response) => {
  response.send("TEST RESPONSE!");
});

// GET Users
server.get("/api/users", (request, response) => {
  Database.find()
    .then(users => {
      response.status(200).json(users);
    })
    .catch(error => {
      response
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

// GET User by ID
server.get("/api/users/:id", (request, response) => {
  const { id } = request.params;
  const databaseInformation = request.body;

  Database.findById(id, databaseInformation)
    .then(user => {
      if (user) {
        response.status(200).json(user);
      } else {
        response
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      response
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

// POST User
server.post("/api/users", (request, response) => {
  const databaseInformation = request.body;

  Database.insert(databaseInformation)
    .then(information => {
      if (databaseInformation.name && databaseInformation.bio) {
        response.status(201).json(information);
      } else {
        response
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." });
      }
    })
    .catch(error => {
      response.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    });
});

// DELETE User
server.delete("/api/users/:id", (request, response) => {
  const { id } = request.params;
  const databaseInformation = request.body;

  Database.remove(id, databaseInformation)
    .then(user => {
      if (user) {
        response.status(201).json(user);
      } else {
        response
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      response.status(500).json({ error: "The user could not be removed" });
    });
});

//PUT(Update) User
server.put("/api/users/:id", (request, response) => {
  const { id } = request.params;
  const databaseInformation = request.body;

  Database.update(id, databaseInformation)
    .then(information => {
      if (
        databaseInformation.name === undefined ||
        databaseInformation.bio === undefined
      ) {
        response.status(400).json({
          errorMessage: "Please provide name and bio for the user."
        });
      } else if (information) {
        response.status(200).json(information);
      } else {
        response.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      response
        .status(500)
        .json({ error: "The user information could not be modified." });
    });
});
