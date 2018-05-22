const express = require('express');
const route = express();
const db = require('./data/db');
const bodyParser = require('body-parser');

route.use(bodyParser.json());

route.get('/', (req, res) => {
    db.find()
        .then( users => {
           if (users.length > 0) {
            res.status(200).send({ users });
           } else {
               res.status(404).send({ msg: 'No info found'})
           }
        })
        .catch( error => {
            res.status(500).send({ error: "The user information could not be retrieved." });
        })
})


route.get('/:id', (req, res) => {
    const { id } = req.params; 

    db.findById(id)
        .then( users => {
            if (users.length > 0) {
                res.status(200).send({ users });
               } else {
                   res.status(404).send({ msg: 'No user found'})
               }
        })
        .catch(error => {
            res.status(500).send({ message: "The user with the specified ID does not exist." });
        })
})

module.exports = route;