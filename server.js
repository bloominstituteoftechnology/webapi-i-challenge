import { stringify } from 'querystring';

const express = require ('express');
const cors = require ('cors'); 
const db = require ('./data/db')

const port = 5555;
const server = express(); 
server.use(express.json()); 
server.use(cors({ origin: 'http://localhost:3000' })); 

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
};

const customLogger = (req, res, next) => {
    const ua = req.headers['user-agent']; 
    console.log(req.headers); 
    const { path } = req; 
    const timeStamp = Date.now(); 
    const log = { path, ua, timeStamp };
    const stringLog = JSON.stringify(log); 
    console.log(stringLog); 
    next(); // very important to move onto next routeHandler
};

server.use(customLogger); 

server.get('/', (req, res) => {
    //1st arg: route where a resource can be interacted with
    //2nd arg: callback to deal with sending responses, and handling incoming data.
    res.send("Hello from express"); 
});

server.post('/api/users', (req, res) => {
    const { name, bio, created_at, updated_at } = req.body; 
    if (!name || !bio) {
        sendUserError(400, 'Must provide name and bio', res);      
        return;   
    }
    db 
        .insert({ 
            name, 
            bio,
            created_at,
            updated_at
        })
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            console.log(error); 
            sendUserError(400, error, res); 
            return; 
    });
}); 

server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.json({ users }); 
        });
        .catch (error => {
            sendUserError(500, 'The users information could not be retrieved.', res);
            return; 
        }); 
});

server.get('/api/users/:id', (req, res) => {
    //pull id off of req.params    
    const { id } = req.params; 
    db
        .findById(id)
        .then(user => {
            if (user.length === 0) {
                sendUserError(404, 'User with that id not found', res); 
                return; 
            }
            res.json(user);           
        })
        .catch(error => {
            sendUserError(500, 'Error looking up user', res); 
        });
        //invoke proper db.method(id) passing it the id. 
        //handle the promise like ablve     
});

server.delete('/api/users/:id', (req, res) => {
    const  { id } = req.params;         
    db
        .remove(id)
        .then(response => {
            if (response === 0) {
                sendUserError(404, 'The user with that ID does not exist.', res);
                return;
            }
            res.json({ success: `User with id: ${id} removed from system` });           
        })
        .catch(error => {
            sendUserError(500, 'The user could not be removed.', res);          
            return;  
    });
}); 

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params; 
    const { name, id } = req.body;
    if (!name || !bio) {
        sendUserError(400, 'Must provide name and bio', res)
        return;
    }
    db
        .update(id, { name, bio }) 
        .then(response => {
            if (response == 0) {
                sendUserError(
                    404, 
                    'The user with the specified ID does not exist', 
                    res
                );
                return;             
            }
        db
            .findById(id)
            .then(user => {
                if (user.length === 0) {
                    sendUserError(404, 'User with that id not found', res)
                    return; 
                }
                res.json(user);
            })
            .catch(error => {
                sendUserError(500, 'Error looking up user', res);
            });        
        })
        .catch(error => {
            sendUserError(500, 'Something bad happended in the databse', res);
            return; 
        });
});

server.listen(port, () => console.log(`Server running on port ${port}`));