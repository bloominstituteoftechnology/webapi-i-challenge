const express = require('express'); 

const db = require('./data/db.js');

const server = express(); 

server.use(express.json()); 

server.post('/users', (req, res)=>{
  db.find().then(name, bio =>{
        res.status(400).json(name, bio); 
  })
  .catch(err =>{
      console.log('error', err); 

      res.status(500).json({message:"There was an error while saving the user to the database"})
  })

   }
)

server.get('/', (req, res)=>{
    res.send("Hello World");
});

server.get('/users', (req, res)=>{
    db.find()
    .then( users => {
        res.status(200).json(users);
    })
    .catch(err =>{
        console.log('error', err); 

        res.status(500).json({ message:'Error Getting Data' })
    })
}); 
server.get('/users/:id', (req, res)=>{
    db.find()
    .then( id =>{
        res.status(404).json(id);
    }).catch(err=>{
        console.log('error', err);
        res.status(500).json({message: "The user with the specified ID does not exist."})
    })
})

server.listen(9000, ()=> console.log(`/n== API on port 9k ==/n`)); 