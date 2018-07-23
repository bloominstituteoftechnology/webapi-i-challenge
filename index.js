const express = require('express');
const data = require('./data/db')

const server = express();

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.get('/users', (req, res) => {
    data.find()
        .then(response => res.status(200).json(response))
        .catch(error =>  res.status(500).json({error: 'The users information could not be retrieved.'}))
})


server.listen(8000, () => console.log('API running on port 8000'));