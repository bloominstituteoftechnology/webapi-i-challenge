const express = require('express')
const server = express()
const parser = express.json()
const PORT = '8888'
server.use(parser)
server.listen(PORT, _ => console.log(`listening on http://localhost:${PORT}`))
server.get('/', (req, res) => {
  res.send('<div>HEY</div>')
})
