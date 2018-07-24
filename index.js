const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const db = require('./data/db.js');

server.use(express.json());

const user = {
    name: '',
    bio: ''
}

let nextId = 2;


server.get('/', (req, res) => {
    res.send('API running');
})

server.get('/api/users', (req, res) => {
    db.find()
    .then (response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500);
        res.json({error: 'The users information could not be retrieved.'})
    }) 
});

server.get('/api/users/:id', (req, res) => {
    if (!id) {
        res.status(404);
        res.json({error: 'The user with the specified ID does not exist'});
    }
    db.findById(id)
    .then (response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500);
        res.json({error: 'The user information could not be retrieved.'})
    }) 
});

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    const user = req.body;

    if (!name || !bio) {
        res.status(400);
        res.json({error: 'Please provide name and bio for the user.'})
    }
    db.insert(user)
    .then (response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500);
        res.json({error: 'There was an error while saving the user to the database.'})
    }) 

    
});

server.delete('/api/users/:id', (req, res) => {
    if (!id) {
        res.status(404);
        res.json({error: 'The user with the specified ID does not exist'});
    }
    db.remove(id)
    .then (response => {
        res.status(200).send('The user has been removed.');
    })
    .catch(err => {
        res.status(500);
        res.json({error: 'The user information could not be removed.'})
    }) 
});

server.put('/api/users/:id', (req, res) => {
    const requestId = req.params.id;
    const { name, bio } = req.body;
    const user = req.body;

    if (!requestId) {
        res.status(404);
        res.json({error: 'The user with the specified ID does not exist'});
    }
    if (!name || !bio) {
        res.status(400);
        res.json({error: 'Please provide name and bio for the user.'})
    }
    db.update(requestId, user)
    .then (response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500);
        res.json({error: 'The user information could not be modified.'})
    }) 
});


server.listen(8000, () => console.log('API running'))