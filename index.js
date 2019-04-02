// implement your API here
const express = require('express')


const db = require('./data/db')

const server = express();

server.use(express.json())

const sendUserError = (status, message, res) => {
 // This is just a helper method that we'll use for sending errors when things go wrong.
    res.status(status).json({ errorMessage: message });
        return;
};

// server.get('/', (req, res) => {
//     res.send('...api is running...')
// })

server.get('/api/users', (req, res) => {
   db
    .find()
    .then(users => {
        res.json({users})
    })
    .catch(({ code, message }) => {
        res.status(code).json({
            success: false,
            message: "The user information could not be retrieved."
        })
    })
})

// server.get('/api/users/:id', (req, res) => {
//     const {id} = req.params;
//     db
//     .findById(id)
//     .then(user => {
//         if (user.length === 0) {
//             res.status(404).json({
//                 message: "The user with the specified ID does not exist."
//             }) 
//             .catch(({ code, message }) => {
//                 res.status(code).json({
//                     message: "The user information could not be retrieved."
//                 })
//             }) 
//         }
//     })
// })


server.get('/api/users/:id', (req, res) => {
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
    // invoke proper db.method(id) passing it the id.
    // handle the promise like above
  });


// server.post('/api/users', (req, res) => {
//     const { name, bio, created_at, updated_at } = req.body;

//     if (!name || !bio) {
//         res.status(400).json({ success: false, 
//             errorMessage: "Please provide name and bio for the user." 
//         })
//     } else {
//         db
//         .insert({name, bio, created_at, updated_at
//         })
//         .then(res => {
//             res.status(201).json(res)
//         .catch(({code, message }) => {res.status(code).json({
//             message: "There was an error while saving the user to the database"
//             })
//         })
//         })
//     }
// })

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
        // created_at,
        // updated_at
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


server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    db
    .remove(id)
    .then(deleted => {
        if (deleted === 0) {
            res.status(404).end({
                success: false,
                message: "The user with the specified ID does not exist."
            }) 
            .catch(({ code, message }) => {
                res.status(code).json({
                    success: false,
                    message: ""
                })
            }) 
        }
    })
})

// server.put('/api/users/:id', (req, res) => {
//     const {id} = req.params;
//     const{user, bio} = req.body;
//     if (id === 0) {
//         res.status(404).json({
//             success: false,
//             message: "The user with the specified ID does not exist."
//         })
//         db.update(name, bio, {id})
//         .then(res => {
//             if (!name || !bio, res) {
//                 res.status(400).json({
//                     success: false,
//                     errorMessage: "Please provide name and bio for thr user"
//                 })
//                 .catch(({code, message}) => {
//                     res.status(500).json({
//                         success: false,
//                         message: "The user information could not be modified."
//                     })
//                 })  
//             } else {
//                 if (user) {
//                 res.status(200).json({
//                     success: true,
//                     message,    
//                 });
//                 return; 
//             }
//         }
//     })
// }});

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;
    if (!name || !bio) {
      sendUserError(400, 'Must provide name and bio', res);
      return;
    }
    db
      .update(id, { name, bio })
      .then(response => {
        if (response == 0) {
          sendUserError(
            404,
            'The user with the specified ID does not exist.',
            res
          );
          return;
        }
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
      })
      .catch(error => {
        sendUserError(500, 'Something bad happened in the database', res);
        return;
      });
  });

  
server.listen(3000, () => {
  
    console.log('/n*** Server running on port 3K ***/n')
})