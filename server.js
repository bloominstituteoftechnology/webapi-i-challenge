const express = require('express');
const db = require('./data/db');
const app = express();
const port = 5000;


app.get('/api/users', (req, res) => {
    db.find()
        .then( users => {
            res.status(200).send({ users });
        })
        .catch( error => {
            res.status(500).send({ msg: 'Server error' });
        })
})


app.get('/api/users/:id', (req, res) => {
    const { id } = req.params; 

    db.findById(id)
        .then( users => {
            res.status(200).send({ users });
        })
        .catch(error => {
            res.status(500).send({ msg: 'Server error' });
        })
})


app.listen(port, () => {
    console.log(` === APP LISTENING IN ${port} === `);
})