// implement your API here

const express = require('express'); //import

const db = require('./data/db.js'); //add this line 

const server = express(); //creates express app using express module


//GET REQUEST FOR USERS
server.get('/', (req, res) => {
    res.send('Get request is working')
});



server.listen(5000, () => {
    console.log('\n*** API running on port 5K ***\n')
})