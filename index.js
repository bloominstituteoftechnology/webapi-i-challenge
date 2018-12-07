// implement your API here
// how to import / export code between files
// introduce how routing works
// import express from 'express'; // ES2015 modules > export default someCode;
const express = require('express'); // CommonJS modules > module.exports = someCode;
const cors = require('cors'); // install this package to connect from React
const db = require('./data/db.js');

const server = express(); // Creates the server

server.use(cors()); //this needed to connect from React

server.get('/', (req, res) => { 
	//request/route handler
	res.send('<h1>Hello Erin!</h1>');

});

server.get('/api/users', (req, res) => {
	db.find()
	.then(users => {
		console.log('\n** users **', users);
		res.json(users)})
	.catch(err => res.send(err))
});

// Watch for traffic in a particular port
// Implement nodemon in package.json file under the "scripts"
const port = 9000;
server.listen(port, () => console.log(`API running on port ${port}`));

// http://localhost:3000 > the 3000 is the port
// 80: http, 443: https, 25: email servers, standard industry ports