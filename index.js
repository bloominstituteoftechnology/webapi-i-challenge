const express = require('express');
const db = require('./data/db.js');

const server = express();

server.get('/api/users', (req, res) => {
  db.find().then(response => {
    // console.log(response)
    res.status(200).json(response)
  }).catch(err => {
    // console.log(err);
    res.status(500).json({ error: "The users information could not be retrieved." });
  });
});

server.get('/api/users/:id', (req, res) => {
  db.findById(req.params.id).then(response => {
    console.log('ss', response.length)
    if (response.length > 0) {
      res.status(200).json(response);
    } else {
    res.status(404).json({ message: "The user with the specified ID does not exist." })
  }
}).catch(err => {
  console.log("some Other err:", err);
})
})

server.listen(8000, () => console.log('App is listening...'));
