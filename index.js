const express = require('express');
const db = require('./data/db');

const server = express();

server.use(express.urlencoded({ extended: true }));

server.get('/', (req, res) => {
    res.send("Hello, world!");
});

server.get('/api/users', (req, res) => {
    db.find().then(value => {
        res.status(200).json(value);
    }).catch(reason => {
        res.status(500).json({ error: "The users information could not be retrieved." });
    })
});

server.post('/api/users', (req, res) => {
    if (req.body.name && req.body.bio) {
        db.insert(req.body).then(value => {
            db.findById(value.id).then(value => {
                res.status(201).json(value);
            })
        }).catch(error => {
            res.status(500).json({ error: "There was an error while saving the user to the database." });
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for user." });
    }
});

server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id).then(value => {
        if (value.name) {
            res.status(200).json(value);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
    }).catch(error => {
        res.status(500).json({ error: "The user information could not be retrieved." });
    });
});

server.delete('/api/users/:id', (req, res) => {
    db.remove(req.params.id).then(value => {
        if (value > 0) {
            res.status(200).json({ message: `Successfully removed ${value} records.` });
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
    }).catch(error => {
        res.status(500).json({ error: "The user could not be removed." });
    });
});

server.put('/api/users/:id', (req, res) => {
    if (req.body.name && req.body.bio) {
        db.update(req.params.id, req.body).then(value => {
            if (value === 1) {
                db.findById(req.params.id).then(value => {
                    res.status(200).json(value);
                });
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        }).catch(error => {
            res.status(500).json({ error: "The user could not be removed." });
        });
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for user." });
    }
});

server.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});