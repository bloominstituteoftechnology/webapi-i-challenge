const express = require('express');

//"importing" the database
const db = require('./data/db.js');

const server = express();

//middleware being used
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello World')
})

server.get('/now', (req, res) => {
    const now = new Date().toISOString();
    res.send(now);
});

//R in CRUD
server.get('/hubs', (req, res) => {
    db.hubs
      .find()
      .then(hubs => {
        res.status(200).json(hubs);
      })
      .catch(({ code, message }) => {
        res.status(code).json({
          success: false,
          message,
        });
      });
});


server.get("/hubs/:id", (req, res) => {
    const { id } = req.params;
    console.log(id)
  
    db.hubs
      .findById(id)
      .then(hubs => {
        if (hubs) {
          res.status(200).json({ success: true, hubs });
        } else {
          res.status(404).json({
            success: false,
            message: "unable to find requested id"
          });
        }
      })
      .catch(({ code, message }) => {
        res.status(code).json({
          success: false,
          message: 'please make sure you typed correct ID'
        });
      });
  });


  //C in CRUD
server.post('/hubs', (req, res) => {
    const hubInfo = req.body

    db.hubs
    .add(hubInfo)
    .then(hub => {
        res.status(201).json({success: true, hub});
    })
    .catch(({ code, message }) => {
        res.status(code).json({
          success: false,
          message,
        });
    });
})

//D in CRUD
server.delete('/hubs/:id', (req, res) => {
    const id = req.params.id

    db.hubs
        .remove(id)
        .then(() => {
            res.status(204).end()
        })
        .catch(({ code, message }) => {
            res.status(code).json({
            success: false,
            message,
            });
    });
})

//U in CRUD
server.put('/hubs/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    db.hubs 
        .update(id, changes)
        .then(updated => {
            if(updated) {
                res.status(200).json({success: true, updated})
            } else {
                res.status(404).json({
                    success: false,
                    message: 'I cannot find that id'
                })
            }
        })
        .catch(({ code, message }) => {
            res.status(code).json({
            success: false,
            message,
            });
    });
})

server.get

//web server is listening for incoming traffic on port 4000
server.listen(4000, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n')
})