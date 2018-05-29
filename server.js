const express = require('express');
const db = require('./data/db')

const port = 5555;
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    // 1st arg route where our reasour can be commnnicated with
    // 2nd arg callback to deal with sending responses
    res.send('Hello from ExP');
});

server.post('/api/users', (req, res) => {
    // console.log(req.body);
    if (req.body.name === undefined || req.body.bio === undefined) {
        res.status(400).send({ errorMessage: "Please provide name and bio for the user." });
    } else {
        db.insert(req.body)
            .then(UserRes => {
                res.status(201).send(UserRes)
            })
            .catch (e => {
            res.status(500).send({ error: "There was an error while saving the user to the database" });
        })
    }
});


server.get('/api/users', (req, res) => {
    if (req.body === undefined) {
        res.status(500).send({ error: "The users information could not be retrieved." });
    }
});
server.listen(port, () => console.log(`Server running on port ${port}`));




