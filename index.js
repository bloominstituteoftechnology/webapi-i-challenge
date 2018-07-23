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

server.get('/api/users/:id', (req, res) => {

	const request = database.findById(req.params.id);

	request.then(response => {
		res.json(response);
	})
	
	.catch(error => {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
        })


	});

/*server.post('/api/users/', (req, res) => {
 const {name, bio } = req.query;
console.log(req.query);	
  const user = {name, bio};

  const request = database.insert(user);
   
	request.then(response => {
                res.status(201).json(response);
        })

  });*/


server.delete('/api/users/:id', (req, res) => {
  const request = database.remove(req.params.id);
        
        request.then(response => {
                res.json(response);
        })

  });	

server.listen(8000, () => console.log('API running on port 8000'));
