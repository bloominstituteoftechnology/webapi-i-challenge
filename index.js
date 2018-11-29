// implement your API here

const express = require('express');

const db = require('./data/db');

const server = express();
const PORT = 4000;

//endpoints

// server.get('/greet', (request, response) => {
//     // response.send({ message: 'request received'});
//     response.send('Hello there!');
// });

// server.get('/greet/:name', (request, response) => {
//     const name = request.params.name;
//     response.send(`Hello, ${name}!`);
// });

server.get('/api/users', (request, response) => {
    db.find()
        .then((users) => {
            response.json(users);
        })

        .catch(err => {
            response
                .status(500)
                .json({ error: "The users information could not be retrieved." });
        });
});

server.get('/api/users/:id', (request, response) => {
    const { id } = request.params;
    db.findById(id)
        .then(user => {
            if (user) {
                response.json(user);
            }
            else {
                response
                    .status(404)
                    .json({ message: "The user with the specified ID does not exist." });
            }
        })

        .catch(err => {
            response
                .status(500)
                .json({ error: "The users information could not be retrieved." });
        })
})
// listening

server.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}`);
});