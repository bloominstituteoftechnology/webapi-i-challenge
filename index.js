const express = require('express');
const db = require('./data/db');
const server = express();

//middleware
server.use(express.json());

//route handlers
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

server.post('/api/users', (req,res) => {
  const newUserInfo = req.body;
  db
    .insert(newUserInfo)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      if(err.error === 19){
      	res.status(400).json({ errorMessage: "Please provide name and bio for the user."});
      } else {
      	res.status(500).json({error: "There was an error while saving the user to the database"});
      }
    });
});

server.delete('/api/users', (req, res) => {
	const id = req.query;
	let user;
	db
		.findById(id)
		.then(foundUser => {
			user = { ...foundUser };

	db.remove(id).then(response => {
      res.status(200).json(response);
		});
 	})
    .catch(error => {
      res.status(500).json({ message: "The user could not be removed"});
    });
});

server.listen(8000, () => console.log('API running on port 8000'));
