//common js = syntax for importing and exporting JS

const express = require('express');
const db = require('./data/db');


const port = 5555;
const server = express();
server.use(express.json());  

const sendUserError = (status, message, res) =>{
    res.status(status).json({Error: msg});
    return;
};

server.get('/', (req, res) => {
    // 1st arg: route where a resource can be interacted with
    // 2nd arg: callback to deal with sending responses, and handling incoming
    res.send("<h1>Hello from Express!!</h1>");
    
});

server.post('/api/users', (req, res) => { //create
    const { name, bio } = req.body; //the same as var name=req.body.name or var bio=req.body.bio
    const newUser = { name, bio, id:id}
    if(!name||!bio){
       return sendUserError(400, "Please provide name and bio for the user.", res)

    }
    
    db
        .insert({ name, bio })
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            console.error(error);
        });

});

server.get('/api/users', (req, res) => {//fetch


    db
        .find()
        .then(users => {
         res.json({ users });
        })
        .catch(error => {
            error = {Error: "The users' information could not be retrieved."}
            res.status(500).json(error);
        });
});

server.get(`/api/users/:id`, (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(user => {
            console.log("USER:", user)
            if(user.length===0){
                sendUserError(404, "User ID not found", res)
                return;
            }
            res.json(user);
        })
        .catch(error =>{
            error = {Error: "The user with the specified ID does not exist!"}
            res.status(500).json(error);
        });
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db
        .remove(id)
        .then(response => {
            if (response.response===0){
                sendUserError(404,"The user with the specified ID does not exist!", res )
            }
            res.json({success: `User with id: ${id} removed from system`});
        })
        .catch(error => {
            sendUserError(500, "This user can't be deleted", res);
            return;
        });
})

server.put("/api/users/:id", (req, res) =>{
    const { id } = req.params;
    const { name, bio } = req.body;
    if(!name|| !id){
        sendUserError(400, {Error: "Please include both name and bio"}, res);
        return;
    }
    const user = { name, bio };
    db
        
        .update(id, user)
        .then(user => {
            if(user==0){
               sendUserError(404, {Error: "The user with the specified ID does not exist", res});
               return; 
            }
            res.json({user});
            
        })
        .catch(error => {
            sendUserError(500, "This user can't be updated!", res);
            return;
        })
})

server.listen(port, () => console.log(`Server is running on port ${port}`));