// implement your API here
const express = require('express');
const db = require('./data/db.js');
const server = express();
server.use(express.json());

// Fetch all Users

server.get('/', (req, res) => {
    res.json('Hello Database Afficionados!!');
});

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            if (users) {
                res.status(200).json({ users });
            }
            else {
                res.status(500).json({ message: "The users information could not be retrieved." })
            }
        })
        .catch(({code, message}) => {
            res.status(code).res.json({err: message})
        }) 
});

// Fetch a User 

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then(user => {
        if(user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch(({code, message}) => res.status(code).json({err: message}));
})

// Post a User

server.post('/api/users', (req, res) => {
    const user = req.body;
    
    db.insert(user)
    .then(idInfo => {
        if (user.name && user.bio) {
            db.findById(idInfo.id).then(user => {
                res.status(201).json(user);
            })
        }
        else {
            res.status(400).json({ message: "Please provide name and bio for the user." })
        }
    })
    .catch(({code, message}) => res.status(code).json({
        err: message
    }));
    
})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const newUser = req.body;
    db.update(id, newUser)
        .then(user => {
            if (user) {
                db.findById(id)
                    .then(foo => {
                        res.status(201).json(foo);
                        console.log('Item Updated');
                    })  
            }
            else {
                res.status(400).json({ message: 'The user could not be found' });
            }
        })
    
        .catch(({ code, message }) => {
            res.status(code).json({ err: message})
        });
});

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(user => {
            if (user) {
                res.json('Item deleted');
            }
            else {
                res.status(404).json({ message: 'The user could not be found' })
            }
        })
        .catch(({code, message}) => {
            res.status(code).json({ err: message })
        })
});

server.listen(8000, () => console.log('Api is running on port 8000'))