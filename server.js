const express = require('express');
const db = require('./data/db');

const port = 5000;
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    // 1st arg: route where a resource can be interacted with
    // 2nd arg: callback to deal with sending responses and handle incoming data
    res.send('Hello from express');
});

server.post('/api/users', (req, res) => {
   const { name, bio } = req.body;
   console.log(db.insert( { name, bio } ));
});

server.listen(5000, ()=> console.log('Server running on port ' + port));