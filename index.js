const express = require('express');
const data = require('./data/db')

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello World');
});


server.get('/users', (req, res) => {
    data.find()
        .then(response => res.status(200).json(response))
        .catch(error =>  res.status(500).json({error: 'The users information could not be retrieved.'}))
})

server.get('/users/:id', (req, res) => {
    data.findById(req.params.id)
        .then(response => {
            if (response.length === 0) {
                res.status(404).json({error: 'The user with the specified ID does not exist.'});
            } else {
                res.status(200).json(response); 
            }
        })
        .catch(error => res.status(500).json({error: 'The user information could not be retrieved.'}));
})

server.post('/users', (req, res) => {
    const { name, bio } = req.body;
    if (!name || !bio) {
        res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' })
    }
    data.insert({ name, bio })
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => res.status(500).json({ error: 'The user information could not be retrieved' }))
})


server.listen(8000, () => console.log('API running on port 8000'));