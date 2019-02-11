// implement your API here

const express = require("express");

const db = require("./data/db");

const server = express();

// middleware
server.use(express.json());

server.get("/", (req, res) => {
  res.send("<h2>Hello From Local Host</h2>");
});

// GET
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(201).json({ success: true, users });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "There was an error while saving the user to the database"
      });
      res.end();
    });
});

server.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;

  

  db.findById(userId)
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .json({ error: "The user with the specified ID does not exist" });
      } else {
        res.status(201).json({ success: true, user })
      }
      
    })
    .catch(err => {
      res.status(500).json({ success: false, error: "The user information could not be retrieved." })
    });
});

// POST
server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  const newUser = req.body;
  if (!name || !bio) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }

  db.insert(newUser)
    .then(user => {
      res.status(201).json({ success: true, user });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "There was an error while saving the user to the database"
      });
    });
});

server.listen(4000, () => {
  console.log("\n*** Running on port 4000 ***\n");
});
