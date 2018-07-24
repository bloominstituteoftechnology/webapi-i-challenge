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
		res.status(500).json({error: err});
	});
});







server.listen(8000, () => console.log('API running on port 8000'));
