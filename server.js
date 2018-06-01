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
    //console.log("Path: ", req.path, "Body: ", req.body);
    next();
}

server.use(customLogger)

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

server.get('/', (req, res) => {
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
            sendUserError(500, "The users information could not be retrieved.", res)
            return;
        });
    })
);

server.get('/api/users/:id', ((req, res) => {
    const id = req.params.id;
    db
        .findById(id).then(users => {
            //console.log(users);
            if(!users.length){
                sendUserError(404, "The user with the specified ID does not exist.", res)
                //console.log('status: ',res.status(404))
                //console.log(users.response)
                return
            }
            res.json({ users })
        })
        .catch(error => {
            sendUserError(500, "The user information could not be retrieved.", res);
        });
    })
);

server.delete('/api/users/:id', (req, res)=> {
    const {id} = req.params;
    db
        .remove(id)
        .then(response => {
            //console.log(response)
            if(!response){
                sendUserError(404,"The user with the specified ID does not exist.", res)
                return;
            }
            res.json({success: `The user with id: ${id} was removed from system`})
        })
        .catch(error => {
            sendUserError(500, "The user could not be removed", res);
            return;
        })
})

// server.put('/api/users/:id', (req, res) => {
//     const {id} = req.params;
//     const { name, bio } = req.body
//     if(!name || !bio) {
//         sendUserError(400, "Must provide name and bio", res)
//     }
//     db
//         .update(id, {name, bio} )
//         .then(response => {
//             if(!response) {
//                 sendUserError(404,'The user with the specified ID does not exist.', res)
//             db.findById(id)

//             }
//         })
//         .catch(error => {
//             sendUserError(500, 'The user information could not be modified.', res);
//             return;
//         })
// })

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const { name, bio } = req.body
    db
        .update(id, { name, bio })
        .then(users => {
            if (!name || !bio) {
            res.status(400)
            res.json({ errorMessage: "Please provide name and bio for the user." })
           } else if (users === 0) {
            res.status(404)
            res.json({ message: "The user with the specified ID does not exist." })
           }
            else {
            db
                .findById(id)
                .then(user => {
                    res.json({ user })
                });
            }})
        .catch(error => {
            res.status(500)
            res.json({ error: "The user information could not be modified." });
        }
    )});

server.listen(5000, ()=> console.log('Server running on port ' + port));
