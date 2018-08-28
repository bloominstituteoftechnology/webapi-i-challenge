const express = require('express');
const db = require('./data/db.js');


const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('hello homies');
});

server.get('/users', (req,res)=> {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.error('error', err);
            
            res.status(500).json({message: 'error getting the data'})
        });
});

server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(user => user.length ? res.status(200).json(user) : res.status(404)
            .json({message: 'the user with the specified id is not found'}))
        .catch(err => {
            console.error('error', err);
            res.status(500).json({message: 'the user information could not be retrieved'});
        })
})

server.post('/users', async (req, res)=> {
    const user = await req.body;
    if (user.name && user.bio) {
        try {
            const response = await db.insert(user);
            res.status(201).json({message: 'User created succesfully'});
        } catch(err) {
            res.status(500).json({message: 'error adding the user'});
        }
    } else {
        res.status(422).json({message: 'A user needs both a name and a bio'})
    }
    
});

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(count=> {
            if (count) {
                res.status(204).end()
            } else {
                res.status(404).json({message: 'No user with specified id found'})
            }
        })
        .catch(err => res.status(500).json(err));
});

server.put('/users/:id', (req, res) => {
    db.update(req.params.id, req.body)
        .then(users=> {
            if(users.length) {
                res.status(200).json(users)
            } else {
                res.status(404).json({message: 'No user with specified id to update'})
            }
        })
        .catch(err => res.status(500).json({message: 'update failed'}))
});

server.listen(9000, ()=> console.log(`\n==API on port 9k ==\n`));