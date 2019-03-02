// implement your API her

//importing dependencies
const express = require('express');
const db = require('./data/db');

//lets app know the server is an express server and hardcode PORT to whatever port number we want to listen on
const server = express();
const PORT = '9090';

//needed in order to receive JSON from postman
server.use(express.json());


//GET	/api/users	Returns an array of all the user objects contained in the database.
server.get('/api/users', async (req, res) => {
    try {
        const user = await db.find();
        res.status(200).json(user);
    } catch(e) {
        res.status(500).json({ error: "The users information could not be retrieved." })
    }
})

//GET	/api/users/:id	Returns the user object with the specified id.
server.get('/api/users/:id', async (req, res) => {
    try {
        //find by id returns the full object related to the id passed to it. Will return undefined if the object does not exist
        const user = await db.findById(req.params.id);

        //if user resolves to true instead of undefined then send a success code and the specific object requested, if it resolves to undefined return 404 ID does not exist
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    } catch(e) {
        res.status(500).json(e)
    }
})

//DELETE	/api/users/:id	Removes the user with the specified id and returns the deleted user.
server.delete('/api/users/:id', async (req, res) => {
    try {
        //returns either 0 for failure or 1 for success
        const count = await db.remove(req.params.id);

        //if the response from db is greater than 0 then send success response if it is 0 or less send error. 

        if(count > 0) {
            res.status(200).json("success")
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    } catch (e) {
        res.status(500).json({ error: "The user could not be removed" })
    }
})

//POST	/api/users	Creates a user using the information sent inside the request body.
server.post('/api/users', async (req, res) => {
    try {
        const user = await db.insert(req.body);
        if(req.body.name && req.body.bio) {
            res.status(201).json(update);
        } else {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        }
    } catch (e) {
        res.status(500).json({ error: "There was an error while saving the user to the database" })
    }
})

//PUT	/api/users/:id	Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.
server.put('/api/users/:id', async (req, res) => {
    try {
        //returns 0 if it fails or 1 if success
        const update = await db.update(req.params.id, req.body);

        //if update's response was greater than 0 (aka 1 or success) then test to be sure it contains a name and bio section, if so return success code and new object if not then return a 404 and error message. if the first if statement fails, skip to the else statement and return 404 ID does not exist error message

        if(update > 0) {
            if(req.body.name && req.body.bio) {
                res.status(200).json(update);
            } else {
                res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
            }
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    } catch {
        res.status(500).json({ error: "The user information could not be modified." })
    }
})




server.listen(PORT, () => {
    console.log(`Our server is listening on port ${PORT}`);
  });