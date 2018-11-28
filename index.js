// implement your API here

// console.log('foo');

const express = require('express');
const server = express();
const PORT = 4000;
const db = require('./data/db')

// endpoints

server.get('/api/users', (req, res) => {
    db.find()
        .then((users) => {
            res.json(users)
        })
        .catch(err => {
            res.status(500)
            res.json('I failed to get users')
        })
    })

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    db.findById(id)
    .then(user => {
        if(user) {
            res.json(user);
        } else {
            status(404)
            res.json(`I don't know that user yet`)
        }
    })
    .catch(err => {
        res.status(500)
        res.json('failed to get individual user')
    })
    })


server.get('/', (req, res) => {
    res.send(
        'hi there from our regular get function!'
    )
})

server.get('/greet/:name', (req, res) => {
    const name = req.params.name
    res.send(
        // objects, data (arrays, objects), HTMl, or strings
        `hi there, ${name}!`
    )
    // req notes: body -- when someone does a POST req, they'll send parameters
})

// listening

server.listen(PORT, () => {
    console.log(`server is alive on port ${PORT}`);
});