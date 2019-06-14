// implement your API here
const express = require("express");

require("dotenv").config()
const port = process.env.PORT || 3333

const db = require('./data/db.js');

const server = express();
server.use(express.json())


server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});


//This code is just a test to make sure server is working.
server.get("/", (req,res)=> {
    res.send("Testing Server")
})

//--------------------------------------------------------

//GET method: db.find()- returns an array of all the user 
//objects contained in the database.


server.get("/api/users", (req, res) => {
    db.find()
    .then(users=> {
        res.status(200).json(users)
    })
     .catch(err => {
         res.status(500).json({
           success: false, 
           err,
          message:"The users information could not be retrieved."})})
})

//--------------------------------------------------------

//GET method: db.findById()- returns the user object with the specified 'id'.

server.get("/api/users/:id", (req, res) => {
    db.findById(req.params.id)
      .then(user => {
        if (user) {
          res.status(200).json({
            success: true,
            user,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "The user with the specified ID does not exist.",
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          err,
          message: "The user information could not be retrieved.",
        });
      });
   });

//----------------------------------------------------------

//DELETE method: db.remove() - removes the user with the specified 'id' and returns
// the deleted user.

 server.delete('api/users/:id', (req, res) => {
    const { id } = req.params;
   
    db.remove(id)
      .then(deleted => {
        if (deleted) {
          res.status(204).end();
        } else {
          res.status(404).json({
            success: false,
            message: "The user with the specified ID does not exist.",
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          err,
          message:"The user could not be removed",
        });
      });
   });

//--------------------------------------------------------------

//PUT method: db.update() - Updates the user with the specified 'id' using
// data from the 'request body'; returns the modified
// document, NOT the original.

   server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
   
    db.update(id, changes)
      .then(updated => {
        if (updated) {
          res.status(200).json({ success: true, updated });
        } else {
          res.status(404).json({
            success: false,
            message: "The user with the specified ID does not exist." ,
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          err,
          message: "The user information could not be modified.",
        });
      });
   });

//-----------------------------------------------

//POST method: db.insert() - creates a user using the information
// sent inside the 'request body'.

   server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    db.insert(userInfo)
      .then(user => {
          res.status(201).json({ success: true, user});
      })
      .catch(err=> {
          res.status(500).json({
              success: false,
              err,
              message:"There was an error while saving the user to the database.",
          })
      })
})
