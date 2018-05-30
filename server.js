const express = require('express');
const cors = require('cors');
const db = require('./data/db');
const port = 5000;
const server = express();
server.use(express.json());
server.use(cors());

const reportError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
};

server.get('/', (req, res) => {
    res.send('Hello from express');
});

server.post(`/api/users`, (req, res) => {
    const { name, bio } = req.body;
    if(!name || !bio) {
        reportError(400, 'Both name and bio fields are required', res);
        return;
    }
    db
    .insert({ name, bio })
    .then(response => {
        console.log(response);
        res.status(201).json(response);
        // res.send(response);
    })
    .catch(error => {
        console.log(error);
        reportError(400, error, res);
        return
        // res.json(error);
    });
});

server.get(`/api/users`, (req, res) => {
    db
    .find()
    .then(users => {
        res.json({ users })
    })
    .catch(error => {
        reportError(500, 'We cannot find this user information.', res);
        return;
        // res.json({ error });
    })
});

server.get(`/api/users/:id`, (req, res) => {
    // console.log(req.params);
    const { id } = req.params;
    db
    .findById(id)
    .then(user => {
        if (user.length === 0) {
            reportError(404, 'No such user ID exists', res);
            return;
        }
        res.json(user[0])
    })
    .catch(error => {
        reportError(500, 'Could not look up user', res);
        // res.json({ error });
    })
});

server.delete(`/api/users/:id`, (req, res) => {
    const { id } = req.params;
    db
    .remove(id)
    .then(response => {
        if (response === 0) {
            reportError(404, 'This userID does not exist.', res);
        }
        res.json(response)
    })
    .catch(error => {
        reportError(500, 'Could not remove user', res);
        return;
        // res.json({ error });
    });
});

server.put(`/api/users/:id`, (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;
    db
    .update(id, { name, bio })
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json({ error });
    })
});



server.listen(port, () => console.log(`Server running on port ${port}`));