//cb functions such as request handlers are also considered middleware and you can use as many middleware as you like
const express = require ('express');
const express = require('cors');
const db = require('./data/db');

const port = 5555;
const server = express();
server.use(express.json());
server.use(cors({origin: 'http://localhost:3000'})); //enabling cors as middleware

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
}; //helper function to make code cleaner

const customLogger = (req, res, next) => {
    // console.log(req.headers['user-agent']);
    const ua = eq.headers['user-agent'];
    const {path} = req;
    const timeStamp = Date.now();
    const log = {ua, path, timeStamp};
    const stringLog = JSON.stringify(log);
    console.log(stringLog);
    next(); //very important to move onto next routeHandler/requestHandler or next middleware since you can have as many as you like
};

// server.use(customerLogger); // use this line of code if you want to use customLogger (globally) in each request below instead of adding customLogger to each one

server.get('/', customLogger, (req, res) => {
    // 1st arg: route where a resource can be interacted with 
    // 2nd arg: callback to deal with sending responses, and handling incoming
    res.send('Hello from express'); 
});

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    if(!name || !bio) {
        //W/O HELPER FUNCTION: 
        // res
        // .status(400)
        // .json({errorMessage: "Please provide name and bio for the user."})
        // return;

        //USING HELPER FUNCTION:
        sendUserError(400, 'Must provide name and bio', res);
        return; 
    }
    db
        .insert({ name, bio })
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            sendUserError(400, error, res);
            return;
        });
});

server.get('/api/users', customLogger, (req, res) => {
    db
        .find()
        .then(users => {
            res.json(users)
        })
        .catch(error => {
            sendUserError(500, 'The users information could not be retrieved.', res);
        });
});

server.get('/api/users/:id', (req, res) => {
    //pull id off of req.params
    const { id } = req.params;
    db
        .findById(id)
        .then(users => {
            // console.log('USER: ', user); //user is an array
            if (user.length === 0) { //if the array is empty i.e. no users with requested id
                sendUserError(404, 'User with that id not found', res);
                return;
            }
            res.json(user[0]) //send the object that was asked for by id
        })
        .catch(error => {
            sendUserError(500, 'Error looking up user', res);
        });
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db  
        .remove(id)
        .then(response => {
            console.log(response)
            if(response === 0) {
                sendUserError(404, 'The user with the specified ID does not exist', res)
            }
            res.json({ success: `User with id: ${id} removed from system` });
        })
        .catch(error => {
            console.log(error);
            sendUserError(500, 'The user could not be removed', res)
            return;
        });
})


server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body

    if(!name || !bio) {
        sendUserError(400, 'Must provide name and bio', res);
        return;
    }
    db.update(id, {name, bio})
    .then(response => {
        if (response === 0) {
            sendUserError(404, 'The user with the specified ID does not exist.', res);
            return;
        }
        db.findById(id) //returns newly updated resource as is asked for in readme
        .then(users => {
            // console.log('USER: ', user); //user is an array
            if (user.length === 0) { //if the array is empty i.e. no users with requested id
                sendUserError(404, 'User with that id not found', res);
                return;
            }
            res.json(user[0])
        .catch(error => {
            sendUserError(500, 'Error looking up user', res);
        });
    })
    .catch(error => {
        sendUserError(500, 'Something bad happened in the database', res);
        return;
    })
})


server.listen(port, () => console.log(`Server running on port ${port}`));