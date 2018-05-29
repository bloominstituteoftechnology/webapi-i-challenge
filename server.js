const express = require('express');
const db = require('./data/db');

const port = 5555;
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
	//1st arg: route where a resource can be interacted with
	//2nd arg: callback to deal with sending responses, and handling incoming
  res.send('Hello from express');
})

server.post('/api/users', (req, res) => {
	if (!req.body.name || !req.body.bio) {
		res.status(400);
		res.json({ errorMessage: "Please provide name and bio for the user." });
	}
	else {

	const{ name, bio } = req.body;
	db.insert({ name, bio }).then(response => {
		res.status(201);
		db.findById(response.id)
			.then(user => {
				res.json({ user });
			});
	})
		.catch(error => {
			res.status(500);
			res.json({ error: "There was an error saving the user to the database." });
		})
	}
})


server.get('/api/users/', (req, res) => {
	db.find().then(users => {
		res.json({ users });
	})
		.catch(error => {
			res.json(error);
		})
});


server.get('/api/users/:id/', (req, res) => {
	// pull id off of req.params;
	// invoke proper db.method(id) passing it the id.
	// handle the promise like above
	const { id } = req.params
	db.findById(req.params.id).then(users => {
		res.json({ users });
	})
		.catch(error => {
			res.json(error);
	})
});

server.put('/api/users/:id/', (req, res) => {
	const { id } = req.params
	const { name, bio } = req.body
	db.update(id, { name, bio }).then(res => {
		res.json(res);
	})
		.catch(error=> {
			res.json(error);
		})
});


server.delete('/api/users/:id/', (req, res) => {
	const { id } = req.params
	db.remove(id).then(success => {
		if (success) {
			res.status(200);
			res.json({ success });
		}
		else {
			res.status(404);
			res.json({ message: "The user with the specified ID does not exist." })
		}
	})
			.catch(error => {
				res.status(500);
				res.json({ error: "The user could not be removed" });
		})
	})

server.listen(port, () => console.log(`Server running on port ${port}`));


