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

  .catch(({code, message}) =>{
    res.status(code).json({success:false,message})
  })
})

// handle create 

server.post("/api/users",(req,res) =>{
  const use = req.body;
  console.log(use.bio)

  if(use.name && use.bio){return(
db

.insert(use)

.then(user=>res.status(201).json({success:true,user}))

.catch(({code, message}) =>{
  res.status(500).json({success:false,message})
})
  )}else{return(
  res.status(400).json({success:false, message:'Please provide name and bio for the user.'})
  )}
})







  server.listen (port, () => {
    console.log(`server listening on port: ${port}`);
  });