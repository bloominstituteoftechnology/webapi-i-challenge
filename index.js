// Calling Express
const express = require('express')
// routes -> to organize our endpoints
// middleware -> allows to expand and customize

const db = require('./data/db.js')

const server = express()

// Adding Middleware // Body Parser // Express can handle receiving data in Body
server.use(express.json())

// Creating Endpoints 

// I want to make something available in case anyone needs
server.get('/', (req, res) => {
  res.send('<h2>Hello World</h2>')
})

// Sends Time Stamp 
server.get('/now', (req, res) => {
  const timestamp = new Date().toISOString()
  res.send(timestamp)
})


////////////////////////////////
//CRUD 
/////////////////////////////////


// POST 
//Creates a user using the information sent inside the request body.
//insert(): calling insert passing it a user object will add it to the database and return an object with the id of the inserted user. The object looks like this: { id: 123 }.
server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;
  console.log(req.body)

  if (!name || !bio) {
    res
      .status(400)
      .json({ error: 'Please provide name and bio for the user.' });
  } else {
    db.insert(req.body)
      .then(newUser => {
        res.status(201).json(newUser);
      })
      .catch(() => {
        res.status(500).json({
          error: 'There was an error while saving the user to the database',
        })
     })
  }
})

// GET - send back a list of all users
//Returns an array of all the user objects contained in the database.
// get the users from the db
// then send them back
//find(): calling find returns a promise that resolves to an array of all the users contained in the database.
server.get('/api/users', (req, res) => {
    db.find()
    .then(allUsers => {
      res.status(200).json(allUsers) // res.json same as res.send we just say send json
    })
    .catch(() => {
      res.status(500).json({ 
        error: 'The users information could not be retrieved.'
      })
    })
 })

   

  // GET - Returns the user object with the specified id.
  //findById(): this method expects an id as it's only parameter and returns the user corresponding to the id provided or an empty array if no user with that id is found.
  server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
    .then(user => {
      if(user) {
        res.status(200).json(user)
      } else {
        res
        status(404)
        .json({ message: 'The user with the specified ID does not exist.'})
      }
    })
    .catch(() => {
      res.status(500).json({ error: 'The user information could not be retrieved.'})
    })
  })


 //DELETE - Removes the user with the specified id and returns the deleted user.
 //remove(): the remove method accepts an id as it's first parameter and upon successfully deleting the user from the database it returns the number of records deleted.
  server.delete('/api/users/:id', (req, res) => {
    db.remove(req.params.id)
    
    .then(id => {
      if(id && id > 0) {
        res.status(200).json({
          message: 'User was deleted'
        })
      } else {
        res.status(404).json({ message: 'The user with the specified ID does not exist.'})
      }
    })
     .catch(() => {
       res.status(500).json({error: "The user could not be removed."})
     })
  })



  //PUT -Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.

  //update(): accepts two arguments, the first is the id of the user to update and the second is an object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.


  


// Listening
server.listen(3000, () => {
  console.log('Listening on port 3000')
})