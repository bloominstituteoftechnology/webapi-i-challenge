// implement your API here

const express = require("express")
const db = require('./data/db.js')

const app = express();
const port = 3000;

app.use(express.json());

const todaydate = new Date();

//Get all users
app.get('/api/users', (request, response) => {
    db.find()
    .then(users=> {
        response.status(200).json({Success:true})
        console.log(users)
    })
    .catch(err=>{
        response.status(500).json({Success:false, err, error: "The user information could not be retrieved."})
    })
})

//Get single user
app.get('/api/users/:id', (request, response)=>{
    const {id} = request.params
    db.findById(id)
    .then(user => {
       user ? response.status(200).json({Success: true, user}) : response.status(404).json({Success:false, message: "The user with the specified ID does not exist."})
        console.log(user)
    })
    .catch(err => {
        response.status(500).json({Success:false, err})
    })
})

//POST a user
app.post('/api/users', (request, response)=>{
    const user = request.body

    const user = {
        name: "Ernesto Pena",
        bio: "You do not want to find out",
        created_at: todaydate,
        updated_at: todaydate
    }

    // if (user.name===null || user.bio===null) {
    //     response.status(400).json({errorMessage: "Please provide name and bio for the user})
    // }

    db.insert(user)
    
    
    
    .then(added=>{
        response.status(201).json({Success:true})
        console.log(added)
    })
    .catch(err => {
        response.status(500).json({Success:false, err})
    })
})

//Delete User
app.delete('/api/users/:id', (request, response) =>{
    const {id} = request.params;
    db.remove(id)
    .then(deleted => {
       return deleted ? response.status(204).json({success:true}) : response.status(404).json({Success: false, message: 'Could not find the user'})
    })
    .catch(err => {
        response.status(500).json({success:false, err})
    })
})

//PUT user

app.put('/api/users/:id', (request, response) => {
    const {id} = request.params
    const user = request.body
    db.update(id, user)
    .then(updated => {
        // if (updated) {
        //     response.status(200).json({success: true}) 
        // } else {
        //     response.status(404).json({Success: false, message: 'User could not be updated'})
        // }
         return updated ? response.status(200).jason({success: true}) : response.status(404).json({Success: false, message: 'User could not be updated'})
    })
    .catch(err => {
        response.status(404).json({Success:false, err})
    })
})










app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});

