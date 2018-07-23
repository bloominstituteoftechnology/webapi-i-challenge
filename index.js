const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data/db.js');

const server = express();

server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.get('/hobbits', (req, res) => {
    const hobbits = [
        {
            id: 1,
            name: 'Samwise Gamgee',
        },
        {
            id: 2,
            name: 'Frodo Baggins',
        },
    ];

    res.status(200).json(hobbits);
});

server.get('/api/users', (req, res) => {
    data
        .find()
        .then(response => {
            res
                .status(200)
                .json(response)
        })
        .catch(err => console.log(`ERR: ${err}`));
});

server.post('/api/users', (req, res) => {
    const name = req.body.name;
    const bio = req.body.bio;
    const object = {
        name,
        bio,
    }
    console.log(`Request: ${req}`);
    console.log(`Body: ${req.body}`);
    console.log(`Name: ${name}`);
    if(!name || !bio) {
        res
            .status(400)
            .json({ errorMessage: "Please provide name and bio for the user." });
            return;
    }
    data
        .insert(object)
        .then(response => {
            console.log(`RESPONSE: ${JSON.stringify(response)}`);
                data.findById(response.id)
                    .then(response => {
                        res
                        .status(200)
                        .json(response);
                        return;
                    }) 
                    .catch(err => console.log(`ERR: ${err}`))
        })
        .catch(err => console.log(`ERR: ${err}`));
});

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    data.findById(id)
        .then(response => {
            if(!response[0]) {
                res
                    .status(404)
                    .json({ message: "The user with the specified ID does not exist." });
                    return;
            } else {
                res
                .status(200)
                .json(response);
                return;
            }
        })
        .catch(err => {
            console.log(`ERR: ${err}`);
            res
                .status(500)
                .json({ error: "The user information could not be retrieved." });
                return;
        });
});

server.delete("/api/delete/:id", (req, res) => {

})

server.listen(8000, () => console.log('API running on port 8000'));