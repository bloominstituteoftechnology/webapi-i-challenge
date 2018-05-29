const express = require('express');
const db = require('./data/db');

const port = 5555;
const server = express();
server.use(express.json());


// API Methods

// Returns an array of all the user objects contained in the database.
server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json({ error });
        });
    res.json('testing get');
});

// Returns the user object with the specified id.
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, bio} = req.body;
    db
        .findById({ name, bio })
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json({ error });
        });
    res.json('Success!');
});

// Creates a user using the information sent inside the request body.
server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    db
        .insert({ name, bio })
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json({ error });
        });
    res.json('testing post');
});

// Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;
    db
        .update({ name, bio })
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json({ error });
        });
    console.log(req.body);
    res.send('Success!');
});

// Removes the user with the specified id and returns the deleted user.
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;
    db
        .remove({ name, bio })
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json({ error });
        });
    res.json('testing delete');
});


server.post('/api/users', (req, res) => {
    const { name, bio } = req.body; 
    console.log(db.insert({ name, bio }));
});

server.listen(port, () => console.log(`server running on port ${port}`));

// server.get('/', (req, res) => {
//     // get recieves 
//     // route where resource can be interacted with
//     // callback to deal with sending responses, and handling incoming
//     res.json('Hello from express');
// })