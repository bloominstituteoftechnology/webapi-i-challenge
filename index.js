const server = require('express')()
const db = require('./data/db')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

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

server.post('/api/users', jsonParser, (req, res) => {

  if (
    !req.body 
    || !req.body.name
    || !req.body.bio
  ) {
    return res
    .status(400)
    .json({errorMessage: 'Please provide name and bio for the user.'})
  }
 
  db
    .insert({
      name: req.body.name,
      bio: req.body.bio,
      created_at: Date.now(),
      updated_at: Date.now()
    })
    .then(id => res.status(201).json(id))
    .catch(error => res.status(500).json({error: 'There was an error while saving the user to the database'}))

})

server.get('/api/users', (req, res) => {
  db
    .find()
    .then(users => 
      res.status(200).json(users)
    )
})





server.listen(8000, () => console.log('api running ...'))
