const express = require('express');
const db = require('./data/db');

const server = express();
const port = 5000;
server.use(express.json());

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message});
    return;
}

server.get(`/api/users`, (req, res) => {
    db
        .find()
        .then( users => {
            res.json({ users });
        })
        .catch( err => {
            sendUserError(500, "The users information could not be retrieved.", res);
        });
});

server.post(`/api/users`, (req, res) => {
    const { name, bio } = req.body;
    if (!name || !bio) {
        sendUserError(400, "Please provide name and bio for the user.", res);
        return;
    }
    db
        .insert({ name, bio })
        .then( response => {
            res.status(201);
            res.json(response);
        })
        .catch( err => {
            sendUserError(500, "There was an error while saving the user to the database", res);
        });
});

server.get(`/api/users/:id`, (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then( response => {
            if (response.length === 0) {
                sendUserError(404, "The user with the specified ID does not exist.", res);
                return;
            } else {
                res.json(response);
            }
        })
        .catch( err => {
            sendUserError(500, "The user information could not be retrieved.", res);
        });
});

server.delete(`/api/users/:id`, (req, res) => {
    const { id } = req.params;
    db
        .remove(id)
        .then( response => {
            if (response === 0) {
                sendUserError(404, "The user with the specified ID does not exist.", res);
                return;
            } else {
                res.json(response);
            }
        })
        .catch( err => {
            sendUserError(500, "The user could not be removed", res);
        });
});

server.put(`/api/users/:id`, (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;
    if (!name || !bio) {
        sendUserError(400, "Please provide name and bio for the user.", res);
        return;
    }
    db
        .update(id, { name, bio })
        .then( response => {
            if (response === 0) {
                sendUserError(404, "The user with the specified ID does not exist.", res);
                return;
            } else {
                db
                    .findById(id)
                    .then( response => {
                        if (response.length === 0) {
                            sendUserError(404, "The user with the specified ID does not exist.", res);
                            return;
                        } else {
                            res.json(response);
                        }
                    })
                    .catch( err => {
                        sendUserError(500, "The user information could not be retrieved.", res);
                    });
            }
        })
        .catch( err => {
            sendUserError(500, "The user information could not be modified.", res)
        });
})

server.listen(port, () => console.log(`Server running on port ${port}`));