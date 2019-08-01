// implement your API here
const express = require("express");
const db = require("./data/db.js");

const server = express();

server.use(express.json());

//get

server.get("/api/users", (request, response) => {
  db.find()
    .then(hubs => {
      response.status(200).json(hubs);
    })
    .catch(err => {
      response.status(500).json({ success: false, err });
    });
});

server.get("/api/users/:id", (request, response) => {
  const { id } = request.params;

  db.findById(id)
    .then(user => {
      if (user) {
        response.status(201).json({ user });
      } else {
        response
          .status(400)
          .json({ error: "The user with the id ${id} does not exist." });
      }
    })
    .catch(err => {
      response
        .status(500)
        .json({ error: "An error occured getting the user info" });
    });
});

//post

server.post("/api/users", (request, response) => {
  const { name, bio } = request.body;
  if (!name || !bio) {
    return response
      .status(400)
      .json({ error: "Please provide name and bio for the user." });
  }
  db.insert({ name, bio })
    .then(res => {
      const { id } = res;
      db.findById(id).then(user => {
        response.status(201).json(user);
      });
    })
    .catch(err => {
      response
        .status(400)
        .json({ errorMessage: "Please provide the name and bio for the user" });
    });
});

// DELETE

server.delete("/api/users/:id", (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      if (count && count > 0) {
        res.status(200).json({
          message: "the user was deleted."
        });
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        errorStatus: "The user could not be removed"
      });
    });
});
// PUT

// server.put("/api/users/:id", (request, response) => {
//   const { id } = request.params;
//   const { name, bio } = request.body;
//   if (!name || !bio) {
//     return response
//       .status(400)
//       .json({ error: "Please provide name and bio for the user." });
//   }

//   db.update({ name, bio, id })
//     .then(user => {
//       if (user) {
//         response.status(201).json({ user });
//       } else {
//         response
//           .status(400)
//           .json({ error: `The user with the id ${id} does not exist.` });
//       }
//     })
//     .catch(err => {
//       response
//         .status(500)
//         .json({ error: "An error occured getting the user info" });
//     });
// });

server.put("/api/users/:id", (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status(400).json({
      errorStatus: "Please provide name and bio for the user."
    });
  } else {
    db.update(req.params.id, req.body)
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
          errorStatus: "The user information could not be modified."
        });
      });
  }
});

server.listen(8000, () => {
  console.log("server is running on port 8000");
});
