// implement your API here
const express = require('express')
const server = express()
const port = 5000

server.get('/', (req, res) => {
  res.send(`I'm a get method!`)
})

server.listen(5000, () => console.log(`Server running on port ${port}`))
