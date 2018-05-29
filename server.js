const express = require('express');

const server = express();

var port = 5555;

server.use(express.json());

server.get('/', (req,res) => {
  res.send("hello from other side");
})

server.post('/api/users', (req,res) => {
  const { name,bio } = req.body;
  db.insert({name, bio})
  .then(response => {
    res.json(response);
  })
  .catch(error => {
    res.json({error});
  })
})

server.post('/api/users', (req,res) => {
  db.find()
  .then(response => {
    res.json(response);
  })
  .catch(error => {
    res.json({error});
  })
})

server.listen(port, () => console.log(`server running on port ${port}`))
