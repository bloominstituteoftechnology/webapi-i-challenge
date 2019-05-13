const express = require('express');
const db = require ('./data/db.js')


const server = express();
server.use(express.json())

server.get('/', (req, res) => {

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


server.listen(3000, () => console.log('API running on port 3000')); 