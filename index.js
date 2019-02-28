// implement your API here
const express = require('express');

const server = express();
const parser = express.json()
const PORT ='9090';

server.use(parser);

// POST

server.post('/api/users', (req, res)=>{
  cosnt newHub

})

// GET

// GET ID

// DELETE

// PUT




server.listen(PORT, () => {
  console.log(`My server ${PORT}`)
})