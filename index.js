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
        .then(response => {
            res
                .status(200)
                .json(response)
    })
    .catch(err => {
        res
            .status(500)
            .json({
                error: 'The post information could not be retrieved.'
            });
    });
});

server.listen(8000, () => console.log('API running on port 8000'));