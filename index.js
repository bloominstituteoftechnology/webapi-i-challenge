// implement your API here

const express = require('express'); 

const db = require('./data/db.js');

const server = express(); // Creates the server
const PORT = 9000;

server.use(express.json()); // parses body and adds it to req object

// CREATE - POST

server.post('/api/users', (req, res) => {
	const user = req.body; 
	if (user.name && user.bio) {
		db.insert(user)
			.then(user => {
				res.status(201)
					.json(user);
			})
			.catch(err => {
				res.status(500)
					.json({ error: "There was an error while saving the user to the database" });
			})
	}
	else {
		res.status(400)
			.json({ errorMessage: "Please provide name and bio for the user." });
	}
});

// READ - GET

server.get('/api/users', (req, res) => {
	const name = req.params.name;
	db.find()
		.then(users => {
			res.json(users);
		})
		.catch(err => {
			res.status(500)
				.json({ err: "The users information could not be retrieved." })
		})
});

server.get('/api/users/:id', (req, res) => {
	const { id } = req.params;
	db.findById(id)
		.then(user => {
			if (user) {
				res.json(user);
			}
			else {
				res.status(404)
					.json({ message: "The user with the specified ID does not exist." });
			}
		})
		.catch(err => {
			res.status(500)
				.json({ message: "The user information could not be retrieved." });
		})
});


// UPDATE - PUT

server.put('/api/users/:id', (req, res) => {
	const { id } = req.params;
	const updatedUsers = req.body;
	if (updatedUsers.name && updatedUsers.bio) {
		db.update(id, updatedUsers)
		.then(count => {
			if (count) {
				db.findById(id)
					.then(updatedUsers => {
						res.status(201)
							.json(updatedUsers);
					})
			}
			else {
				res.status(404)
					.json({ message: "The user with the specified ID does not exist." });
			}	
		})
		.catch(err => {
			res.status(500)
				.json({ errorMessage: "The user information could not be modified." });
		})
	}
	else {
		res.status(400)
			.json({ error: "Please provide name and bio for the user." });
	}
	
});

// DELETE

server.delete('/api/users/:id', (req, res) => {
	const { id } = req.params;
	db.remove(id)
		.then(user => {
			if (user) {
				res.json({ message: "Deletion completed. "});
			}
			else {
				res.status(404)
					.json({ message: "The user with the specified ID does not exist." });
			}
		})
		.catch(err => {
			res.status(500)
				.json({ error: "The user could not be removed" });
		})
});

// Watch for traffic in a particular port
server.listen(PORT, () => console.log(`API running on port ${PORT}`));
