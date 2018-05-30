const express = require('express');
const db = require('./data/db.js');

const port = 5000;
const server = express();
server.use(express.json());

const sendUserError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
  return;
};


server.post('/api/users', (req, res) => {
    const { name, bio, created_at, updated_at } = req.body;
    if(!name || !bio) {
        sendUserError(400, 'Must provide name and bio', res);
        return;
    }
    db
        .insert({ 
            name, 
            bio, 
            created_at, 
            updated_at 
        })
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            console.log(error);
            res.json(error);
        });
});

server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            sendUserError(500, 'The users information could not be retrieved.', res);
        });
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(user => {
            if(user.length === 0) {
                sendUserError(404, 'User not found', res);
                return;
            }
            res.json(user);
        })
        .catch(error => {
            sendUserError(500, 'Error looking up user', res);
        });
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db
        .remove(id)
        .then(response => {
            if (response === 0) {
                sendUserError(404, 'The user does not exist', res);
            }
            res.json({ success: `User with id: ${id} removed from system` });
        })
        .catch(error => {
            sendUserError(500, 'The user could not be removed', res);
            return;
        });
});

server.listen(port, () => console.log(`Server is running on port ${port}`));