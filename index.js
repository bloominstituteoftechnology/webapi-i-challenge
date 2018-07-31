const express = require('express');
const db = require('./data/db.js');
const server = express();

server.get('/', (req,res) => {
		res.send('use the endpoints "/users", or "/users/"number" to view either all users, or a single user by id number');
	}
);

server.get('/users', (req,res) => {
db.find()
	.then(response =>
	res.status(200).json(response)
	)
	.catch(() =>
	res.status(500).json({message:"Internal server error"})
	)
});

server.get('/users/:id', (req,res) => {
let {id} = req.params; 
db.findById(id)
	.then(response => {
	if(response.length < 1){
		res.status(404).json({message:"The user with that specified ID does not exist."})
		}
	else {
		res.status(200).json(response)
		}
	}
	)
	.catch(()=>
	res.status(500).json({message:"Internal server error"})
	)
});

server.post('/users', (req,res) => {
	console.log(req.query);
const { name, bio, created_at, updated_at } = req.query;
if(!name || !bio){
res.status(400).json({message:"Please make sure you have a name and bio"});
return;
}
db.insert({name,bio})
	.then (response => {
	res.status(200).json(response)	
	})
	.catch(()=>{
	res.status(500).json({message:"Internal server error"})
	})
});

server.listen(8000, () => console.log('API running on port 8000'));











