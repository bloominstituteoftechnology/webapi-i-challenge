const express = require("express");
const db = require('./data/db');
const port = 5555;
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello from express');
})

server.post('/api/users', (req,res) => {
    const { name, bio } = req.body;
    db.insert({ name, bio })
    .then(response => {
        res.send(response)
    })
    .catch(error => {
        res.json({
          error: "Please provide name and bio for the user."
        });
    })
})

server.get('/api/users', (req,res) => {
    db.find().then(users => {
        res.json({ users });
    })
    .catch(error => {
        res.json({ error: "The users information could not be retrieved." })
    })
})

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params; // pull id off of req.params;
  db
    .findById(id) // invoke proper db.method(id) passing it the id.
    .then(user => {
      // handle the promise like
      res.json({ user });
    })
    .catch(error => {
      res.json({ error: "The users information could not be retrieved." });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db
    .remove(id)
    .then(user => {
      res.json({ user });
    })
    .catch(message => {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    });
});


server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body
  db
    .update(id, { name, bio })
    .then(user => {
      res.json({ user });
    })
    .catch(message => {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
    });
});



server.listen(port, () => console.log(`Server running on port ${port}`));
