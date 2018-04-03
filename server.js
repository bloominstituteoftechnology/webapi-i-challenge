// use require instead of import
const express = require('express'); //libraries
const bodyParser = require('body-parser');
const db = require('./data/db.js'); // local code
const server = express();
const morgan = require('morgan');
const helmet = require('helmet');

// middleware
server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());

server.get('/', function(req, res) {
    res.send({ api: 'Running...' });
});

server.get('/api/users', function(req, res) {
    db
    .find()
    .then(users => {
        res.json(users);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

server.get('/api/users/search', (req, res) => {
    const { userid } = req.query;
//  console.log('id', userid);
    db.findById(userid)
    .then(users => {
        res.json(users[0]);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

// server.post('/api/users', function(req, res) {
//     const user = req.body;
//     db
//     .insert(user)
//     .then(users => {
//         res.json(users);
//     })
//     .catch(error => {
//         res.status(500).json(error);
//     });
// });

// new POST
server.post('/api/users', function(req, res) {
    const user = req.body;
    db
    .insert(user)
    .then(response => {
        res.status(201).json(response);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});


server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db
    .findById(id)
    .then(users => {
        res.json(users[0]);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;

    db
    .update(id, update)
    .then(count => {
        if (count > 0) {
            db
            .findById(id)
            .then(updatedUsers => {
                res.status(200).json(updatedUsers[0]);
            })
        } else {
            res.status(404).json({ message: 'The user with the specified ID does not exist' })
        }        
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

// server.delete('/api/users/:id', (req, res) => {
//     const { id } = req.params;

//     db
//     .remove(id)
//     .then(users => {
//         res.json(users[0]);
//     })
//     .catch(error => {
//         res.status(500).json(error);
//     });
// });

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    let user;
    db
    .findById(id)
    .then(response => {
        user = { ...response[0] };
    db
    .remove(id)
    .then(response => {
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).json(error);
    });
})
.catch(error => {
    res.status(500).json(error);
})
});


const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));