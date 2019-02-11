// implement your API here
const express = require('express');

const server = express();

const db = require('./data/db.js');

server.use(express.json());

server.get('/', (req, res) => {
    console.log('test')
})

server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.status(200).json({success: true, users})
        })
        .catch(() => {
            res.status(500).json({success: false, error: "The users information could not be retrieved."});
    });
});

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;

    db
        .findById(id)
        .then(users => {
            if(users){
                res.status(200).json({success: true, users})
            } else {
                res.status(404).json({
                    success: false,
                    error: "The user with the specified ID does not exist."
                })
            }
        })
        .catch(() => {
            res.status(500).json({success: false, error: "The user information could not be retrieved."});
    });
});

server.post('/api/users', (req, res) => {
    const user = req.body;

    console.log(user.name, user.bio);

    db.insert(user)
        .then(user =>{
            if (user.name !== undefined && user.bio !== undefined) {
                res.status(201).json({success: true, user})}
            else {
                res.status(400).json({success: false, error: "Please provide name and bio for the user."})
            }
        }
        )
        .catch(() => {
            res.status(500).json({success: false, error: "There was an error while saving the user to the database"})
        })
});

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;

    db.remove(id)
        .then(deleted => {
            if(deleted){
                res.status(204).end();
            } else {
                res.status(404).json({
                    success: false,
                    error: "The user with the specified ID does not exist."
                })
            }
            
        })
        .catch(() => {
            res.status(500).json({success: false, error: "The user could not be removed"})
        });
});

server.put('/api/users/:id', (req, res) =>{
    const {id} = req.params;
    const changes = req.body;

    db
        .update(id, changes)
        .then(updated => {

            if (changes.name == undefined || changes.bio === undefined) {
                res.status(400).json({success: false, error: "Please provide name and bio for the user."})
            }
            else if(updated) {res.status(200).json({success: true, updated});
            } else {
                res.status(404).json({
                    success: false,
                    error: "The user with the specified ID does not exist."
                })
            }
        })
        .catch(() => {
            res.status(500).json({success: false, error: "The user information could not be modified."});
        });
});

server.listen(4000, () => {
    console.log('\n hobbits \n')
});

