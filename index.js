const express = require('express');
const db = require('./data/db');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {

  res.send('Hello World');
});

server.get('/api/users', (req, res) => {
	db.find()
	.then(users => {
		res.json(users);
	})
	.catch(err => {
		res.status(500).json({error: "The users information could not be retrieved."});
	});
});

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  db
    .findById(id)
    .then(users => {
      if (users.length === 0) {
        res.status(404).json({message: 'User not Found'});
      } else {
      	res.json(users[0]);
      }
  })
    .catch(err => {
    	res.status(500).json({ error: err });
    });
});





server.listen(8000, () => console.log('API running on port 8000'));
