const express = require('express');
const db = require('./data/db')

const port = 5555;
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    // 1st arg route where our reasour can be commnnicated with
    // 2nd arg callback to deal with sending responses
    res.send('Hello from ExP');
});

server.post('/api/users', (req, res) => {
    // console.log(req.body);
    if (req.body.name === undefined || req.body.bio === undefined) {
        res.status(400).send({ errorMessage: "Please provide name and bio for the user." });
    } else {
        db
            .insert(req.body)
            .then(UserRes => {
                res.status(201).send(UserRes)
            })
            .catch (e => {
            res.status(500).send({ error: "There was an error while saving the user to the database" });
        })
    }
});



server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(users => {
            if (!users) {
                res.status(404).json({
                    error: "The user with the specified ID does not exist."
                });
            } else {
                res.json({ users });
            }
        })
    
        .catch(e => {
            res.json({
                error: "The user with the specified ID does not exist"
            });
        });
})
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(user => {
            if (user === 0) {
                res.status(404).json({
                    error: "The user with the specified ID does not exist."
                })
            } else {
                res.json({ user });
            }
        })
        .catch(error => {
            res.status(500).json({
                error: "The user could not be removed"
            });
        });
});

server.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;
    if (!name || !bio) {
        res.status(400).json({
            error: "Please provide name and bio for the user."
        });
        return;
    }
    db.update(id, { name, bio })
        .then(user => {
            if (user === 0) {
                res.status(404).json({
                    error: "The user with the specified ID does not exist."
                })
                return;
            } else {
                res.json({ user });
            }
        })
        .catch(error => {
            res.status(500).send({ error: "The user information could not be modified." });
        });
});

server.listen(port, () => console.log(`Server running on port ${port}`));




