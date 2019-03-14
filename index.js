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
    res.status(500).json({success:false,error: "The users information could not be retrieved." })
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
  
      res.status(400).json({success:false, error: "There was an error while saving the user to the database"})
  )}
})
//handle put actions
server.put('/api/users/:id',(req,res) =>{
  const { id } = req.params;
  const updates = req.body;
  if (id){ 
    if (updates.name && updates.bio){
  
  db
  .update(id,updates)
  console.log (updates)
  .then (upd =>{
    res.status(200).json({success:true,updates})
    })
 // checks to see if reffered data is an existing entree
  .catch(({ }) =>{
    res.status(500).json({success:false, error: "The user information could not be modified." })
  })}else{
    res.status(400).json({success:false, errorMessage: "Please provide name and bio for the user."})
  }
}else{
  res.status(404).json({success:false, message: "The user with the specified ID does not exist."})
}
})

//handle delete actions

server.delete('/api/users/:id',(req,res) =>{
  const {id}= req.params;
if(id){
  db

  .remove(id)

  .then(delId =>{res.status(200).json(delId);})

  .catch(({code, message}) =>{
    res.status(500).json({success:false,error: "The user could not be removed"})
  })}else{
    res.status(404).json({success:false, message: "The user with the specified ID does not exist."})
  }
})

// handle the find by id action
server.get('/api/users/:id',(req,res) =>{
  const { id } = req.params;
  const user = req.body;

  db
  
  .findById(id,user)

  .then (use =>{
    console.log (use)
    user?res.status(200).json({success:true,use})
    : res.status(404).json({success:false, message: "The user with the specified ID does not exist."})
  }) // checks to see if reffered data is an existing entree

  .catch(({ }) =>{
    res.status(500).json({success:false,error: "The user information could not be retrieved."})
  })
})

  server.listen (port, () => {
    console.log(`server listening on port: ${port}`);
  });

