// implement your API here

//this is how you import in express
const express = require("express");
const db = require("./data/db");

const server = express();
server.use(express.json());

//http is protocol that connects client and server
//send is a node function while get is http
server.get("/", (req, res) => {
  res.send("Hello World");
});

//GET 

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        res
          .status(404)
          .json({ message: "The users information could not be retrieved." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

//GET ID

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

//ADD

server.post("/api/users", (req, res) => {
  const user = req.body;

  db.insert(user)
    .then(user => {
      if (user.name && user.name) {
        res.status(201).json({ success: true, user });
      } else {
        res
          .status(400)
          .json({ error: "Please provide name and bio for the user." });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({
        success: false,
        message
      });
    });
});

//DEL

server.delete('/api/user/:id', (req, res) => {
  const id = req.params.id;
  db.remove(id)
  .then(user => {
    if (id) {
      res.status(200).json(user);
    } else {
      res.status(404)
      .json({message: 'The user with the specified ID does not exist.'})
    }
  })
  .catch(err => {
    res.status(500).json({message: 'error deleting user'})
  })
})


//UPDATE

server.put('/api/users/:id', (req, res) => {
  const id = req.params.id
  const user = req.body
  const name = req.body.name
  const bio = req.body.bio
  db.update(id, user)
  .then(change => {
    if (!id) {
      res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else if (!name || !bio) {
      res.status(400)
      .json({errorMessage: "Please provide name and bio for the user."})
    } else {
      res.status(200).json(user)
    }
  })
  .catch(err => {
    res.status(500).json({error: 'The user information could not be modified.'})
  })
})
server.listen(8000, () => console.log("API running on port 8000"));
