// implement your API here
const express = require('express');
const db = require('./data/db');

const server = express();
const PORT = 4000;



server.get('/', (req, res) => {
    res.send('Hello World')
});

server.get('/hobbits', (req, res) => {
    const hobbits = [
        {
            id: 1,
            name: 'samwize Gamgee'
        },
        {
            id: 2,
            name: 'frodo Baggins'
        }
    ];

    // res.status(200).send(hobbits);
    res.status(200).json(hobbits);
});

server.get('/stuff', (req, res) => {
    res.send(200, { message: 'request received'});
});

server.get('/greet/:name', (req, res) => {
    const name = req.params.name;
    res.send(`Hello There ${name}!`);
});

server.get('/api/users/:id', (req, res) => {
    // const theId = req.params.id;
    // res.status(200).json(`${theId}`);
})

server.get('/api/users', (req, res) => {
    // res.status(200).json(dbs.find())
    // res.json();
    db.find()
        .then( users => {
            console.log(`users ${users}`);
        })
        .catch(`error`, (req, res) => {

        });
    const hobbits = [
        {
            id: 1,
            name: 'samwize Gamgee'
        },
        {
            id: 2,
            name: 'frodo Baggins'
        }
    ];

    // res.status(200).send(hobbits);
    res.status(200).json(hobbits);
});

// server.post()


// res.send([
//     ...props.hobbitsList
// ]));

server.listen(8000, () => console.log('API Running on 
 8000'));