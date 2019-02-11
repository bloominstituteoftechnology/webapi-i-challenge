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
        .catch(err => {
            res.status(err.code).json({success: false, message: err.message});
    });
});

server.post('/api/users', (req, res) => {
    const user = req.body;

    db.insert(user)
        .then(user =>
            res.status(201).json({success: true, user}))
        .catch(({code, message}) => {
            res.status(code).json({success: false, message})
        })
});

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    db.remove(userId)
        .then(deleted => {
            res.status(204).end();
        })
        .catch(({code, message}) => {
            res.status(code).json({success: false, message})
        });
});



server.put('/api/users/:id', (req, res) =>{
    const {id} = req.params;
    const changes = req.body;

    db
        .update(id, changes)
        .then(updated => {
            if(updated) {res.status(200).json({success: true, updated});
            } else {
                res.status(404).json({
                    success: false,
                    message: 'nope'
                })
            }
        })
        .catch(err => {
            res.status(err.code).json({success: false, message: err.message});
        });
});

server.listen(4000, () => {
    console.log('\n hobbits \n')
});

