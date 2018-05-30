const express = require("express");
const db = require('./data/db');
const port = 5555;
const server = express();
server.use(express.json());

const sendError = (statusCode, message, res) => {
    res.status(statusCode).json({ errorMessage: message});
    return;
}

server.get('/', (req, res) => {
    res.send('Hello from express');
})

server.get('/api/users', (req,res) => {
    db.find().then(users => {
        res.json({ users });
    })
    .catch(error => {
        sendError(500, 'The users information could no tbe retrieved', res)
        return;
    })
})

server.post('/api/users', (req,res) => {
    const { name, bio } = req.body;
    if(!name || !bio){
        sendError(400, 'Must provide name and bio', res);
        return;
    }
    db.insert({ name, bio })
    .then(response => {
        res.status(201).send(response)
    })
    .catch(error => {
        sendError(400, error, res);
        return;
    })
})


server.get("/api/users/:id", (req, res) => {
  const { id } = req.params; // pull id off of req.params;
  db
    .findById(id) // invoke proper db.method(id) passing it the id.
    .then(user => {
        if(user.length === 0) {
            sendError(404, `User with that id could not found`, res);
            return;
        }
      res.json({ user });
    })
    .catch(error => {
        sendError(500, 'Error looking up user', res);
        return;
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db
    .remove(id)
    .then(user => {
    if(response === 0) {
        sendError(404, `User with that id could not found`, res);
        return;
    }
      res.json({ user });
    })
    .catch(error => {
        sendError(500, "Error looking up user", res);        
        return;
    });
});


server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body
  if (!name || !bio) {
    sendError(400, "Must provide name and bio", res);
    return;
  }
  db.update(id, { name, bio })
    .then(user => {
      res.status(201).json({ user });
    })
    .catch(message => {
       sendError(400, error, res);
       return;
    });
});



server.listen(port, () => console.log(`Server running on port ${port}`));
