const express = require ('express');
const cors = require('cors');
const db = require ('./data/db.js');


const port = 5555;
const server = express();
server.use(express.json())
server.use(cors({ origin: 'http://localhost:3000' }))


const customLogger = (req, res, next) => {
    const ua = req.headers['user-agent'];
    const { path } = req;
    const timeStamp = Date.now();
    const log = {path, ua, timeStamp};
    const stringLog = JSON.stringify(log);
    console.log(stringLog);

    next();
} 
server.get('/', customLogger, (req, res) => {
    // 1st arg: route where a resource can be interacted with - request
    // 2nd arg: callback to deal with sending responses and handling incoming data - response
    res.send('Hello from express');
});

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    if (!name  || !bio) {
        res.status(400);
        res.json({ errorMessage: "Please provide name and bio for the user." })
    } else {
    db
        .insert({ name, bio })
        .then(response => {
            res.status(201);
            db
                .findById(response.id)
                .then(user => {
                    res.json({ user })
                });
        })
        .catch(error => {
            res.status(500)
            res.json({ error: "There was an error while saving the user to the database" })
        });
}})
server.get('/api/users', customLogger, (req, res) => {
    db 
        .find()
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.status(500)
            res.json({ error: `The user's information could not be retrieved.` });
            
        });
});

server.get('/api/users/:id', customLogger, (req, res) => {
    const { id } = req.params
   db
    .findById(id)
    .then(users => {
        if (users.length > 0 ) {
            res.json({ users })
    } else {
        res.status(404);
        res.json({ message: "The user with the specified ID does not exist." });
    }})
    .catch(error => {
        res.status(500)
        res.json({ error: "The user information could not be retrieved." });
    })
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const { name, bio } = req.body
    db
        .update(id, { name, bio })
        .then(users => {
            if (!name || !bio) {
            res.status(400)
            res.json({ errorMessage: "Please provide name and bio for the user." })
           } else if (users === 0) {
            res.status(404)
            res.json({ message: "The user with the specified ID does not exist." })
           }
            else {
            db
                .findById(id)
                .then(user => {
                    res.json({ user })
                });
            }}) 
        .catch(error => {
            res.status(500)
            res.json({ error: "The user information could not be modified." });
        }
    )});
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    db
        .remove(id)
        .then(users => {
            if (users === 0) {
            res.status(404)
            res.json({ message: "The user with the specified ID does not exist." })
        } else {
            res.json({ users });
        }})
        .catch(error => {
            res.status(500)
            res.json({ error: "The user could not be removed" });
        });
});


server.listen(port, () => console.log(`Server running on port ${port}`));