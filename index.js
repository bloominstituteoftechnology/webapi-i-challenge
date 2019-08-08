// implement your API here
const express = require('express');

const db = require('./data/db')

const server = express();

//middleware
server.use(express.json());

// request handlers
server.get('/', (req, res) => {
    res.send("Hello, I'm working!");
});

server.get('/api/users', (req, res) => {
    db.find()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'The users information could not be retrieved.'
        })
    })
});

server.post('/api/users', (req, res) => {
    const newUser = req.body;
    db.insert(newUser)
    .then(data => {
        res.status(201).json(data);
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'There was an error while saving the user to the database'
        })
    })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
    .then(deletedUser => {
        if (deletedUser) {
            res.json(deletedUser);
        } else {
            res.status(404).json({
                message: 'The user with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'The user could not be removed'
        })
    })
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body
    db.update(id, changes)
    .then(updated => {
        if (updated) {
            res.json(updated);
        } else {
            res.status(404).json({
                message: 'The user with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'The user information could not be modified.'
        })
    })
})

server.get('/api/users/:id' , (req, res) => {
    const { id } = req.params;
    db.findById(id)
    .then(found => {
        if (found) {
            res.json(found);
        } else {
            res.status(404).json({
                message: 'The user with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'The user information could not be retrieved.'
        })
    })
})






server.listen(4000, () => {
    console.log('Server is running on port 4000...')
});