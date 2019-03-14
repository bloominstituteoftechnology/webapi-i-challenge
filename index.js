// implement your API here
const express = require ('express');
// this is the equivilant in importing a package similar to react. 
const server = express();
const port = 5000;
// by calling express and assigning it to server it creates a server that is powered by express.
server.use (express.json())
// use the require to import db.js function set. 
const db = require ('./data/db');

// use find() to retrieve database

server.get ("/api/users",(req,res)=>{
  db
  .find()
  .then(user=> res.status(200).json({success:true,user}))
  .catch(({ }) =>{
    res.status(500).json({success:false,message:'server timeout or error'})
  })
})

// handle create 

server.post("/api/users",(req,res) =>{
  const use = req.body;
 
  if(use.name && use.bio){return(

  db
  .insert(use)
  .then(user=>res.status(201).json({success:true,user}))
  .catch(({ }) =>{
  res.status(500).json({success:false,message:'server timeout or error'})
  })
  
)}else{
    return(
  
      res.status(400).json({success:false, message:'Please provide name and bio for the user.'})
  )}
})
////  put 
server.put('/api/users/:id',(req,res) =>{
  const { id } = req.params;
  const updates = req.body;

  db
  
  .update(id,updates)

  .then (upd =>{
    console.log (upd)
    upd?res.status(200).json({success:true,upd})
    : res.status(404).json({success:false, message:'invalid hub does not exist as requested'})
  }) // checks to see if reffered data is an existing entree

  .catch(({ }) =>{
    res.status(500).json({success:false,message:'server timeout or error'})
  })
})

server.delete('/api/users/:id',(req,res) =>{
  const {id}= req.params;

  db

  .remove(id)

  .then(delId =>{res.status(200).json(delId);})

  .catch(({code, message}) =>{
    res.status(code).json({success:false,message})
  })
})
// When the client makes a `DELETE` request to `/api/users/:id`:

// - If the _user_ with the specified `id` is not found:

//   - return HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The user with the specified ID does not exist." }`.

// - If there's an error in removing the _user_ from the database:
//   - cancel the request.
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ error: "The user could not be removed" }`.

  server.listen (port, () => {
    console.log(`server listening on port: ${port}`);
  });

