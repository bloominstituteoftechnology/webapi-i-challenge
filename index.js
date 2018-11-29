// implement your API here
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./data/db.js');
const PORT = 3000;

const server = express();
server.use(bodyParser.json());

server.post('/api/users', (req, res) => {
    db.insert();
})

server.get('/api/users', (req, res) => {
    db.find()
        .then((users) => {
            res.json(users);
        })
        .catch(err => {
            res.status(500)
                .json({ message: "The users information could not be retrieved." })
        })    
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then((user) => {
            if(user) {
                res.json(user);
            } else {
                res.status(404)
                    .json({ message: "The user with the specified ID does not exist"})
            }

        })
        .catch(err => {
            res.status(500)
                .json({ message: "The user information could not be retreived" })
        })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(user => {
            if(!user) {
                res.status(404)
                    .json({ message: "The user with the specified ID does not exist." })
            } else {
                res.json("User deleted")
            }
        })
        .catch(err => {
            res.status(500)
                .json({ message: "The user could not be removed." })
        })
})

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});