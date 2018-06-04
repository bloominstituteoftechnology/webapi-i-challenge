//common js = syntax for importing and exporting dependencies
//there will be newer versions of node that will use the import export syntax we are used to. 

const express = require('express'); //this is common JS -- require takes a string as its argument -- go find the node directory call express...
const db = require('./data/db'); //this is our database directory full of helper methods
const cors = require('cors');


const port = 5000;
const server = express(); //server is the invocation to express - this is how you will build your server
server.use(express.json());  //global middleware - anything that we pipe in our request body we will pipe in
//as JSON - JavaScript Oriented Notation
//extend our server by using JSON
server.use(cors({
    credentials: true,
  }));

const sendUserError = (status, message, res) =>{
    res.status(status).json({Error:message});
    return;
};
//receive a resource from your API
server.get('/', (req, res) => {
    // 1st arg: route where a resource can be interacted with (where it can be found)
    // 2nd arg: callback to deal with sending responses, and handling incoming data
    //this is how you build an application programming interface (an API)
    //req and res are the homies
    //req = request
    //res = response
    res.send("<h1>Hello from Express!!</h1>");
    
});

server.post('/api/users', (req, res) => { //create
    const { name, bio } = req.body; //the same as var name=req.body.name or var bio=req.body.bio
    if(!name||!bio){
       return sendUserError(400, "Please provide name and bio for the user.", res)

    }
    
    db
        .insert({ name, bio }) //insert comes from db.js
        .then(response => {
            res.status(201).json(response); //good idea to console.log it to see how you will interact with it
        })
        .catch(error => {
           return sendUserError(500, "There was an error while saving the user to the database.", res)
        });

});

server.get('/api/users', (req, res) => {//fetch===read


    db
        .find()
        .then(users => {
         res.json({ users });
        })
        .catch(error => {
           return sendUserError(500, "There was an error retrieving users information", res)
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
            return sendUserError(500, "The user information could not be retrieved", res)
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
        sendUserError(400, "Please include both name and bio", res);
        return;
    }
    db
        
        .update(id, { name, bio })
        .then(user => {
            if(user==0){
               sendUserError(404, "The user with the specified ID does not exist", res);
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
//props up our node runtime environment to listen for any traffic
//nodemon is an auto refresh that will automatically update the server to refresh changes
//the "scripts" tag in the package.json file allows us to yarn start and use nodemon as a devDependency