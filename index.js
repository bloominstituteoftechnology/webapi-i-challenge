const express = require('express');

const Users = require('./data/db.js');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
	res.send('<h1>Welcome to my first BE Project!</h1>');
});

server.post('/api/users', (req, res) => {
	const userInformation = req.body;
	if (userInformation.name || userInformation.bio) {
		res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' });
	}
	Users.insert(userInformation)
		.then(user => {
			res.status(201).json({ user });
		})
		.catch(err => {
			res.status(500).json({ error: 'There was an error while saving the user to the database' });
		});
});
server.get('/api/users', (req, res) => {
	Users.find()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(error => {
			res.status(500).json({ error: 'The users information could not be retrieved.' });
		});
});
server.get('/api/users/:id', (req, res) => {
	const userId = req.params.id;
	if (!userId) {
		res.status(404).json({ message: 'The user with the specified ID does not exist.' });
	}
	Users.findById(userId)
		.then(userId => {
			res.status(200).json(userId);
		})
		.catch(error => {
			res.status(500).json({ error: 'The user information could not be retrieved.' });
		});
});
server.delete('/api/users/:id', (req, res) => {
	const userId = req.params.id;
	if (!userId) {
		res.status(404).json({ message: 'The user with the specified ID does not exist.' });
	}

	Users.remove(userId)
		.then(user => {
			res.status(201), json({ message: 'User deleted successfully' });
		})
		.catch(err => {
			res.status(500).json({ error: 'The user could not be removed' });
		});
});
server.put('/api/users/id:', (req, res) => {
	const { id } = req.params;
	const changes = req.body;
	if (!id) {
		res.status(404).json({ message: 'The user with the specified ID does not exist.' });
	} else if (!userInformation.name || !userInformation.bio) {
		res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' });
	}

	Users.update(id, changes)
		.then(updated => {
			res.status(200).json(updated);
		})
		.catch(error => {
			res.status(500).json({ error: 'The user information could not be modified.' });
		});
});
const port = 8000;
server.listen(port, () => console.log('API running on port 8000'));
