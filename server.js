const express = require('express');
const db = require('./data/db')

const port = 5555;
const server = express();
server.use(express.json());

const userError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
}

server.get('/', (req, res) => {
    // 1st argL route where a resource can be interacted with
    // 2nd arg: call back to deal with sending responsevs, and handling incoming
    res.send('Hello from express')

});

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;

    if (!name || !bio) {
        userError(400, "Please provide name and bio for the user.", res);
        return;
    }
    db
        .insert({ name, bio })
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            userError(400, error, res);
        })
});

server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.json({ users })
        })
        .catch(error => {
            userError(500, 'The user information could not be retrieved.', res);
        });
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(user => { console.log('user in line-52',user)
            if (user.length === 0) {
                userError(404, 'User does not exist', res);
                return;
            }
            res.send(user);
        })

        .catch(error => {
            userError(500, 'Error looking up user', res);
        });
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db
        .remove(id)
        .then(response => {
            if (response === 0) {
                userError(404, 'The user with the specific ID does not exist', res);
            }
            res.send({ success: `User with id: ${id} removed` });
        })
        .catch(error => {
            userError(500, 'The user could not be removed', res);
            return;
        });
});

server.put(`/api/users/:id`, (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;
    if (!name || !bio) {
        sendUserError(400,  "Please provide name and bio for the user.", res);
        return;
    }
    db
        .update(id, { name, bio })
        .then(response => {
            if (response === 0) {
                userError(404, "The user with the specified ID does not exist." , res);
                return;
            }
            db
                .findById(id)
                .then(user => {
                    if (user.length === 0) {
                        userError(404, "The user with the specified ID does not exist." , res);
                        return;
                    }
                    res.json(user);
                })
                .catch(error => {
                    userError(500, 'Error while looking for user', res);
                });
        })
        .catch(error => {
            userError(500, "The user information could not be modified." , res);
            return;
        });
});



server.listen(port, () => console.log(`Server running on port ${port}`));