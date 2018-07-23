const express = require('express');
const db = require('./data/db');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello World');
})

server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({error: 'The users information could not be retrieved.'});
        });
});

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    db
        .findById(id)
        .then(user => {
            if (user[0]) {
                res.status(200).json(user);
        }})
        .catch(err => {
            res.status(500).jason({error: 'The user information could not be retrieved.'})
        })

})

server.post('/api/users', (req, res) => {
    const { name, bio, created_at, updated_at } = req.body;
    if (!name && !bio) {
        return
            res
                .status(400, 'Please provide name and bio for the user.', res);
    }
    db
        .insert(
            { name, bio, created_at, updated_at }
        )
        .then(
            users => {
                res
                    .status(200)
                    .json(users)
            }
        )
        .catch(
            err => {
                res
                    .status(400, err, res)
            }
        );
})

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    db
        .remove(id)
        .then(user =>{
            if (user[0]) {
                res.status(200).json(user);
        }})
        .catch(err => res.status(500).json({error: 'The user could not be removed.'}));
})

server.listen(8000, () => console.log('API running on port 8000'));