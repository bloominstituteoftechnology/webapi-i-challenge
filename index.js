// implement your API here
const express = require ('express');
// this is the equivilant in importing a package similar to react. 
const server = express();
const port = 5000;
// by calling express and assigning it to server it creates a server that is powered by express.
const addjson = express.json()
// use the require to import db.js function set. 
const dbjs = require ('./data/db');
// set server to use json by default
server.use(express.json());

server.post('/api/users',(req, res)=>{

})

server.get('/api/users',(req, res)=>{
dbjs.find()  
// find is brought in from the dbjs 
// the return will go through a promise .then and .catch with the user being the paramater
.then((user)=>res.json(user))
.catch (err => {
  res.status(500).json({error:"Server failed to return anything"})
})
})
// returns an array of all users on the database
server.get('/api/users/:id',(req, res)=>{

})

server.delete('/api/users/:id',(req, res)=>{

})

server.put('/api/users/:id',(req, res)=>{
  
})

//first we will assign a variable that calls the find function
// server.get('/hobbits', (req, res) => {
//   res.send ('welcome to Hobbiton')
//     // status code for 200 means o
//   })
//   server.post('/hobbits', (req,res)=>{
//   res.status(201).json({url:'/hobbits', operation: 'POST'})
//   })
//   server.put('/hobbits', (req,res)=>{
//     res.status(200).json({url:'/hobbits', operation: 'PUT'})
//   })
//   server.delete('/hobbits', (req,res)=>{
//     res.sendStatus(204)
//   })
  server.listen (port, () => {
    console.log(`server listening on port: ${port}`);
  });