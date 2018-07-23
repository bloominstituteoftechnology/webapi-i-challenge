const server = require('express')()
const db = require('./data/db')

const hobbits = [
  {
    id: 1,
    name: 'Samwise Gamgee',
  },
  {
    id: 2,
    name: 'Frodo Baggins',
  },
]

server.get('/', (req, res) =>
  res.send('<h1>Hello World</h1>')
)

server.get('/hobbits', (req, res) => 
  res.status(200).json(hobbits)
)

server.get('/users', (req, res) => {
  db
    .find()
    .then(users => 
      res.status(200).json(users)
    )
})


server.listen(8000, () => console.log('api running ...'))
