const express = require('express');
const db = require('./data/db');
const cors = require('cors');

const port = 5555;
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000'}));

server.post('/', (req, res) => {
    // 1st arg: route where a resource can be interacted with
    // 2nd arg: callback to deal with sending responses, and handling incoming data.
    res.send('Hello from express');
});

const customLogger = (req, res, next) => {
    const ua = req.headers['user-agent'];
    const { path } = req;
    const timeStamp = Date.now();
    const log = { ua, path, timeStamp };
    const stringLog = JSON.stringify(log);
    
    console.log(stringLog);
    
    next(); // needed to move to next routehandler.
}
 
server.use(customLogger);

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    db
        .insert({ name, bio })
        .then(response => {
            res.json(response);
        })
        .catch(error => {
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
            res.json({ error });
        });
});


server.delete('/api/users', (req, res) => {
    const { id } = req.query;
    let user;

    db
        .findById(id)
        .then(foundUser => {
            user = { ...foundUser[0] };
        
            db.remove(id).then(response => {
                res.status(200).json(user);
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

server.get('/api/users/:id', (req, res) => {
    // pull id off of req.params;
    // invoke proper db.method(id) passing it the id.
    // handle the promise like above
    const id = req.params.id;

    db
        .findById(id)
        .then(users => {
            if (users.length === 0) {
                res.status(404).json({ message: 'user not found' });
            } else {
                res.json(users[0]);
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;

    db
        .update(id, update)
        .then(count => {
            if (count > 0) {
                db.findById(id).then(users => {
                    res.status(200).json(users[0]);
                }); 
                
            } else {
                res.status(404).json({ msg: 'user not found' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;
    if (!name || !bio) {
        sendUserError(400, 'Must provide name and bio', res);
        return;
    }
    db
        .update(id, { name, bio })
        .then(response => {
            if (response === 0) {
                sendUserError(404, 'The user with the specified ID does not exist.', res);
                return;
             }
            db
                .findById(id)
                .then(foundUser => {
                    user = { ...foundUser[0] };

                    db.remove(id).then(response => {
                        res.status(200).json(user);
                    });
                });
        })
        .cath(error => {
            sendUserError(500, 'Something bad happened in the database', res);
            return;
        });
});




server.listen(port, () => console.log(`Server running on port ${port}`));