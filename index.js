const express = require('express');
const server = express();
const db = require('./data/db');

server.use(express.json());

server.get('/users', (req, res) => {
    db.find()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(() => {
            res.status(500).json({ error: "The users information could not be retrieved."})
        })
});

server.get('/users/:id', (req, res) => {
    const id = req.params.id;
    // const {id} = req.params;
    db.findById(id)
    .then(response => {
        if (response.length < 1) {
            res.status(404).json({ message: "The user with the specified ID does not exist."})
        } else {
            res.json(response)
        }
    })
    .catch(() => {
        res.status(500).json({ error: "The user information could not be retrieved."})
    })
});

server.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    // const {id} = req.params
    db.remove(id)
    .then(erase => {
        if (erase > 0) {
            res.status(200).json(erase)
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist."})
        }
    })
    .catch(() => {
        res.status(500).json({ error: "The user could not be removed" })
    })
});

server.post('/users', (req, res) => {
    const user = req.body;
    if (user.name === null || user.bio === null) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        db.insert(user)
        .then(newuser => {
            res.status(201).json(newuser)
        })
        .catch(() => {
            res.status(500).json({ error: "There was an error while saving the user to the database" })
        })
    }
});

server.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = req.body;
    if ( !user.name || !user.bio ) {
      res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
      db.findById(id)
        .then((update) => {
          if (update.length < 1) {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
          } else {
            db.update(id, user)
              .then((user) => {
                res.status(200).json(user);
              });
          }
        })
      .catch(() => {
        res.status(500).json({ error: "The user information could not be modified." })
      })
    }
});

// server.post('/users/2', (req,res) => {
//     const user = { id: 2, name: 'GeekBot', bio: 'CS8 Student at Lambda School'};

//     users.push(user);

//     res.status(200).json(users);
// });



server.listen(8000, () => console.log("Server up on port 8000"))