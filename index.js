const express = require('express');

const server = express();
server.use(express.json());

const db = require('./data/db.js')

const sendUserError = (status, message, res) => {
    // This is just a helper method that we'll use for sending errors when things go wrong.
    res.status(status).json({ errorMessage: message });
    return;
};
server.get('/api/users', (req, res) => {
    db
        .find()
        .then(user => {
            res.json({ user })
        })
        .catch(error => {
            res.status(404).json({ error: 'not retrieved' })
            return;
        });

})

server.post('/api/users', (req, res) => {
    const user = req.body;
    if (!user.name || !user.bio) {
      sendUserError(400, 'Must provide name and bio', res);
      return;
    }
    db
        .insert({
            name: user.name,
            bio: user.bio,
        })
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            console.log(error);
            sendUserError(400, error, res);
            return;
        });
});

server.listen(8000, () => console.log('API running... *.*'))