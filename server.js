const express = require('express' );
const cors =require('cors');
const db = require('./data/db');

const port = 5000;
const server = express();
server.use(express.json());
server.use(cors({origin: 'http://localhost:3000'}));

// const customMiddleware = (req, rex, next) => {

// };

const sendUserError = (status, message, res) => {
    res.status(status).json({errorMessage: message});
    return;
}

const customLogger = (req, res, next) => {
    console.log(req.path);
    next();
}
server.post('/api/users', (req, res) => {
   const { name, bio } = req.body;
   if ( !name || !bio ) {
       sendUserError(400, "Please provide title and contents for the post.", res);
       return;
   }
   db
    .insert( { name, bio } )
    .then(  (response) => {
        res.status(201);
        res.json(response);
    })
    .catch(error => {
        sendUserError(500, 'There was an error while saving the post to the database', res)
    })
});

server.get('/', customLogger, (req, res) => {
    // 1st arg: route where a resource can be interacted with
    // 2nd arg: callback to deal with sending responses and handle incoming data
    res.send('Hello from express');
});


server.get('/api/users', ((req, res) => {
    db
        .find().then(users => {
            res.json({ users })
        })
        .catch(error => {
            res.json({error});
        });
    })
);

server.get('/api/users/:id', ((req, res) => {
    const id = req.params.id;
    db
        .findById(id).then(users => {
            res.json({ users })
        })
        .catch(error => {
            res.json({error});
        });
    })
);

//Missing delete part
server.delete('.api/users/:id', ()=> {})




server.put('.api/users/:id', (req, res) => {
    const {id} = req.params;
    const { name, bio } = req.body
    if(!name || !bio) {
        sendUserError(400, "Must provide name and bio", res)
    }
    db.update(id, {name, bio} )
        .then(response => {
            if(response === 0) {
                sendUserError(
                    404,
                    'The user with the specified ID does not exist.',
                    res
                )
                db.findById(id)
                //find which is above that I didn't get too.....
            }
        })
        .catch(error => {
            sendUserError(500, 'Something bad happened in the datbase', res);
            return;
        })
})

server.listen(5000, ()=> console.log('Server running on port ' + port));
