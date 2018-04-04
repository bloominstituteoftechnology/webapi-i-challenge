const express = require('express');
const db = require('./data/db.js');

const server = express();

server.get('/', function(req, res) { //object represent request & object represent response
    res.json( { api: 'Running...'} )
});

server.get('/api/users', (req, res) => { // GET ALL DATA
    db
    .find() //get the data
    .then(users => {  //send the data
        res.json(users);
    })
    .catch(error => {   // send error if one
        // handle error
        res.status(500).json(error);
    });

});

server.get('/api/users/:id', (req, res) => { // GET DATA BY ID
    const { id } = req.params;

    db
    .findById(id) //get a data's id
    .then(users => {  //send the data for that id
        res.json(users[0]);
    })
    .catch(error => {   // send error if one
        // handle error
        res.status(500).json(error);
    });

});

//-----------------------------------------------------------------

server.post('/api/users/', (req, res) => {   // INSERT DATA

    db
    .insert(users) //insert object 
    .then(users => {  //send all data including inserted
        res.json(users);
    })
    .catch(error => {   // send error if one
        // handle error
        res.status(500).json(error);
    });

});

server.put('/api/users/:id', (req, res) => {  // UPDATE DATA
    const { id } = req.params;
    db
    .updates(id, user) // update object of specific id
    .then((id, {}) => {  //send the data for that id
        res.json(users);
    })
    .catch(error => {   // send error if one
        // handle error
        res.status(500).json(error);
    });

});

server.delete('/api/users/:id', (req, res) => { // DELETE DATA

    db
    .remove(id) // delete object of specific id
    .then(users => {  //send the data for that id
        res.json(users);
    })
    .catch(error => {   // send error if one
        // handle error
        res.status(500).json(error);
    });

});

server.listen(5000, () => console.log('API Running on port 5000'));