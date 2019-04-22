// implement your API here
// require the express npm module, needs to be added to the project using "yarn add" or "npm install"
const express = require('express');
const db = require ('./data/db.js') // brings data from db.js file. 

// creates an express application using the express module
const server = express();
server.use(express.json())

// configures our server to execute a function for every GET request to "/"
// the second argument passed to the .get() method is the "Route Handler Function"
// the route handler function will run on every GET request to "/"
server.get('/', (req, res) => {
  // express will pass the request and response objects to this function
  // the .send() on the response object can be used to send a response to the client
  res.send('Hello World');
});

server.post('/api/users', (req, res) => {
   const user = req.body 
   db.insert(user)
   .then(
       user =>{
           res.status(201).json(user)
       }
   ).catch( err => {
       res.status(500).json({error: err, message: 'The user with specified could not be retrieved'})
   })
})
server.get ('/users', (req, res) =>{
 db.find()
 .then(user =>{

    res.status(200).json(user);
 })
 .catch(error =>{
    res.status(500).json({error : err, message: 'oops my bad'})
 })
})
server.get('/api/users/:id', (req, res) =>{
    const userId = req.params.id
    db.findById(userId)
    .then(user =>{
        if(user){
            db.findById(userId) .then( finduser =>{
                res.status(201).json(finduser)
            }

            )
        } else{
            res.status( 404).json( {error : err, message :" The user with the secified ID does not exist" })
        }
        
    }
    )
    .catch(error =>{
        res.status(500).json({ error : err, message: 'The user information could not be retrieved'})
     })
})

server.delete('/api/users/:id', (req, res)=>{
    const UserId = req.params.id
    db.remove(UserId)
    .then( user =>{
        if(user){
            db.remove(UserId).then(
                removeruser => {
                    res.status(201).json(removeruser)
                }
            )
        }else{
            res.status(404).json({ error: err, mesage : "The user with specified ID does no exist"})
        }
    })
    .catch(error =>{
        res.status(500).json({  message: "The user could not be removed"})
     })
})
server.put('/api/users/:id', (req, res) => {

    const userId =req.params.id
    const userBody = req.body 
    db.update(userId, userBody)
    .then( user =>{
        if(user){
            db.findById(userId).then(
                userupdate=> {
                    res.status(201).json(userupdate)
                }
            )

        }else{
            res.status(400).json({ error : err, message : "not found" })
        }
    })
    .catch(error =>{
        res.status(404).json({ message: 'Not Found'})
     })

})


// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once when the server starts
server.listen(8000, () => console.log('API running on port 8000'));