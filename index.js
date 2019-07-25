const express = require("express");
const Users = require("./data/db.js");
const server = express();

server.use(express.json());

//Server.Get users
server.get("/api/users", (req, res) => {
  /*
    If there's an error in retrieving the users from the database:
cancel the request.
respond with HTTP status code 500.
return the following JSON object: { error: "The users information could not be retrieved." }.
*/
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});

//Server.Get id
server.get("/api/users/:id", (req, res) => {
  /*
    If the user with the specified id is not found:

return HTTP status code 404 (Not Found).
return the following JSON object: { message: "The user with the specified ID does not exist." }.
If there's an error in retrieving the user from the database:

cancel the request.
respond with HTTP status code 500.
return the following JSON object: { error: "The user information could not be retrieved." }.
    */
  Users.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    });
});

//Server.post
server.post("/api/users", (req, res) => {
  if (name && bio) {
    /*
save the new user the the database.
return HTTP status code 201 (Created).
return the newly created user document.
*/
    Users.insert(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(() => {
        res.status(500).json({
          errorMessage:
            "There was an error while saving the user to the database"
        });
      });
  } else {
    /*cancel the request.
respond with HTTP status code 400 (Bad Request).
return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.

cancel the request.
respond with HTTP status code 500 (Server Error).
return the following JSON object: { error: "There was an error while saving the user to the database" }.
*/
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
});

//Server.put
server.put("/api/users/:id", (req, res) => {
  const { name, bio } = req.body;

  if (name && bio) {
    Users.update(req.params.id, req.body)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          errorMessage: "The user information could not be modified."
        });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
});

server.delete("/api/users/:id", (req, res) => {
  Users.remove(req.params.id)
    .then(count => {
      if (count && count > 0) {
        res.status(200).json({
          message: "the user was deleted."
        });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
});

server.listen(8000, () => console.log("API running on port 8000"));
