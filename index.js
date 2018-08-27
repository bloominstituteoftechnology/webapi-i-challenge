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
    let id = req.params.id;{
    db.findById(id)
        .then(user => user.length ? res.status(200).json(user) : res.status(404)
            .json({message: 'the user with the specified id is not found'}))
        .catch(err => {
            console.error('error', err);
            res.status(500).json({message: 'the user information could not be retrieved'});
        })
    }
})

server.listen(9000, ()=> console.log(`\n==API on port 9k ==\n`));