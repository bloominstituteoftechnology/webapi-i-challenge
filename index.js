const express = require('express');
const server = express();
const database = require('./data/db');




server.get('/', (req, res) => {
  res.send('Hello World');
});

server.get('/api/users', (req, res) => {
const request = database.find();

request.then(response => {
	res.status(200).json(response);    
	})

	.catch(err => {
        res.status(500).json({error: "The users information could not be retrieved." });
	})

});

server.listen(8000, () => console.log('API running on port 8000'));
