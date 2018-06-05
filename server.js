const express = require('express');
const db = require('./data/db');
const cors = require('cors');

const port = 5555;
const server = express();
server.use(express.json());
server.use(cors());

//error msg variable for cleaner look
const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
}

server.get('/', (req, res) => {
    //1st arg: route where a resource can be interacted with
    //2nd arg: cb to deal with sending res and handling incoming.
    res.send('Hello from express');
});

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    if(!name || !bio) {
       sendUserError(400, 'Please provide name and bio for the user.', res)
        return;
    }
    db
        .insert({ name, bio })
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            sendUserError(500, 'There was an error while saving the user to the database.', res);
            return;
        });
});

server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            sendUserError(500, 'The users information could not be retrived.', res);
            return;
        });
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db
        .findById(id)
        .then(users => {
            if(users.length === 0) {
                sendUserError(404, 'The user with the specified ID does not exist.', res);
                return;
            }
            res.json({ users })
        })
        .catch(error => {
            sendUserError(500, 'The users information could not be retrived.', res);
            return;
        })
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;    
    db
        .remove(id)
        .then(users => {
            if(users === 0) {
                sendUserError(404, 'The user with the specified ID does not exist.', res)
            }
            res.json({ users })
        })
        .catch(error => {
            sendUserError(500, 'The user could not be removed.', res);
            return;
        })
})

server.put('/api/users/:id', (req, res) => {
    const { name, bio } = req.body;
    const id = req.params.id;
    if(!name || !bio) {
        sendUserError(400, 'Please provide name and bio for the user.', res);
        return;
    }
    db
        .update(id, { name, bio })
        .then(count => {
            if(count == 0) {
                sendUserError(404, 'The user with the specified ID does not exist.', res);
                return;
            }
            db
                .findById(id)
                .then(users => {
                    if(users.length === 0) {
                        sendUserError(404, 'The user with the specified ID does not exist.', res);
                        return;
                    }
                    res.json({ users })
                })
                .catch(error => {
                    sendUserError(500, 'The users information could not be retrived.', res);
                    return;
                })
        })
        .catch(error => {
            sendUserError(500, 'The user could not be removed.', res);
            return;
        })

})


server.listen(port, () => console.log(`Server running on port ${port}`));