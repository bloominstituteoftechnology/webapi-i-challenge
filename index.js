// Calling Express
const express = require('express')
// routes -> to organize our endpoints
// middleware -> allows to expand and customize

const db = require('./data/db')

const server = express();

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

// READ - send back a list of all users
//Returns an array of all the user objects contained in the database.
server.get('/api/users', (req, res) => {
   // get the users from the db
   // then send them back
   //find(): calling find returns a promise that resolves to an array of all the users contained in the database.
    db.find()
    .then(allUsers => {
        res.send(allUsers)
    })
    .catch(err => {
      res.status(500).send(err)
    })
 })









// Listening
server.listen(3000, () => {
  console.log('Listening on port 3000')
})