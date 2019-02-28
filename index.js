// implement your API here

const express = require('express'); 

const db = require('./data/db.js');

const server = express(); // Creates the server
const PORT = 9000;

server.use(express.json()); // parses body and adds it to req object

// CREATE - POST

server.post('/api/users', (req, res) => {

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

});


// UPDATE - PUT

server.put
// DELETE

server.delete('/api/users/:id', (req, res) => {
	const { id } = req.params;
	db
});

// Watch for traffic in a particular port
server.listen(PORT, () => console.log(`API running on port ${PORT}`));
