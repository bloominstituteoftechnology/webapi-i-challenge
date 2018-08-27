const express = require('express');
const server = express();
const db = require('./data/db')

server.get('/', (req, res) => {
  // express will pass the request and response objects to this function
  // the .send() on the response object can be used to send a response to the client
  res.send('Hello World');
});

server.get('/api/users', (req, res) => {
  db.find().then((results)=>{
    res.status(200).json(results);
  });
});

server.listen(8000, () => console.log('API running on port 8000'));